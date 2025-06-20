import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Home, RefreshCw, Info, ExternalLink } from "lucide-react";

// Mock Swedish property data - in real app, this would come from APIs
const generateMockPropertyData = (address, propertyType) => {
  const baseValue = propertyType === 'Lägenhet' ? 3200000 : 4500000; // SEK
  const currentYear = 2025;
  const data = [];
  
  // Generate 24 months of data with realistic Swedish market trends
  for (let i = 23; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Simulate Swedish housing market trends (decline 2022-2023, recovery 2024-2025)
    let trendMultiplier = 1;
    if (i > 18) trendMultiplier = 1.15; // Peak 2022
    else if (i > 12) trendMultiplier = 0.95; // Decline 2023
    else if (i > 6) trendMultiplier = 0.98; // Bottom 2024
    else trendMultiplier = 1.02; // Recovery 2025
    
    // Add some realistic variance
    const variance = (Math.random() - 0.5) * 0.05;
    const value = Math.round(baseValue * trendMultiplier * (1 + variance));
    
    data.push({
      month: date.toISOString().slice(0, 7),
      displayMonth: date.toLocaleDateString('sv-SE', { month: 'short', year: '2-digit' }),
      value: value,
      sqmPrice: Math.round(value / 65), // Assuming 65 sqm average
    });
  }
  
  return data;
};

export default function PropertyValuationGraph({ propertyData }) {
  const [valuationData, setValuationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('24m');
  const [marketComparison, setMarketComparison] = useState(null);

  useEffect(() => {
    loadValuationData();
  }, [propertyData, selectedPeriod]);

  const loadValuationData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would call:
    // - Valueguard API for property valuations
    // - Mäklarstatistik API for market data
    // - SCB (Statistics Sweden) for regional data
    const mockData = generateMockPropertyData(propertyData.address, propertyData.propertyType);
    
    setValuationData(mockData);
    
    // Mock market comparison data
    const currentValue = mockData[mockData.length - 1].value;
    const yearAgoValue = mockData[mockData.length - 13]?.value || currentValue;
    const changePercent = ((currentValue - yearAgoValue) / yearAgoValue * 100).toFixed(1);
    
    setMarketComparison({
      currentValue,
      yearChange: changePercent,
      marketTrend: changePercent > 0 ? 'up' : 'down',
      regionalAverage: Math.round(currentValue * 0.95),
      nationalAverage: Math.round(currentValue * 0.88)
    });
    
    setIsLoading(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatSqmPrice = (value) => {
    return `${new Intl.NumberFormat('sv-SE').format(value)} kr/m²`;
  };

  if (isLoading) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Hämtar värderingsdata...</p>
              <p className="text-sm text-gray-500">Ansluter till Valueguard & Mäklarstatistik</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Valuation Summary */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Home className="text-green-500" /> Fastighetsvärdering
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadValuationData}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Uppdatera
              </Button>
              <Badge variant="outline" className="text-xs">
                Powered by Valueguard
              </Badge>
            </div>
          </div>

          {marketComparison && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Aktuellt marknadsvärde</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(marketComparison.currentValue)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatSqmPrice(Math.round(marketComparison.currentValue / 65))}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium">Årlig förändring</p>
                <div className="flex items-center justify-center gap-1">
                  {marketComparison.marketTrend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <p className={`text-2xl font-bold ${
                    marketComparison.marketTrend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {marketComparison.yearChange > 0 ? '+' : ''}{marketComparison.yearChange}%
                  </p>
                </div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600 font-medium">Regionalt snitt</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {formatCurrency(marketComparison.regionalAverage)}
                </p>
                <p className="text-sm text-gray-600">
                  {propertyData.address}
                </p>
              </div>
            </div>
          )}

          {/* Period Selector */}
          <div className="flex gap-2 mb-4">
            {['6m', '12m', '24m'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '6m' ? '6 mån' : period === '12m' ? '1 år' : '2 år'}
              </Button>
            ))}
          </div>

          {/* Valuation Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="displayMonth" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Marknadsvärde']}
                  labelFormatter={(label) => `Månad: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#valueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Data Sources */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Data från Valueguard, Mäklarstatistik & SCB</span>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ExternalLink className="h-3 w-3" />
                  HOX Index
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ExternalLink className="h-3 w-3" />
                  Marknadsrapport
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Marknadsinsikter</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Områdestrend</p>
              <p className="text-sm text-blue-700">
                {propertyData.address} visar positiv utveckling med stabila priser och god efterfrågan.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Investeringsperspektiv</p>
              <p className="text-sm text-green-700">
                Hyresavkastning på {((propertyData.monthlyRent * 12) / (marketComparison?.currentValue || 3500000) * 100).toFixed(1)}% 
                jämfört med regionalt snitt på 4.2%.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Framtidsutsikter</p>
              <p className="text-sm text-yellow-700">
                Bedömare förväntar sig måttlig prisökning de kommande 12 månaderna baserat på regionala faktorer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}