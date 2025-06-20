import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, MessageSquareText, Building2, CheckCircle, Loader2, AlertTriangle, TrendingUp, Settings, Edit, Save, X, Home, Sparkles, Crown, Award } from "lucide-react";

const defaultPropertyData = {
  monthlyRent: 11000,
  propertyType: 'Lägenhet',
  address: 'Stockholm',
  tenantName: '',
  tenantStatus: 'Occupied',
  nextRentDue: '2025-07-01',
  brfPermitExpiry: '2026-05-01',
  lastMessage: 'Kan jag få Wi-Fi information?',
  moveInDate: '2025-06-28',
  rentReceived: true,
  rentReceivedDate: '2025-06-01'
};

export default function BeautifulRentalDashboard() {
  const [propertyData, setPropertyData] = useState(defaultPropertyData);
  const [showSettings, setShowSettings] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('rental-property-data');
    if (savedData) {
      setPropertyData(JSON.parse(savedData));
    }
  }, []);

  // Save data whenever propertyData changes
  useEffect(() => {
    localStorage.setItem('rental-property-data', JSON.stringify(propertyData));
  }, [propertyData]);

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue.toString());
  };

  const saveEdit = () => {
    if (editingField && tempValue.trim()) {
      const value = editingField === 'monthlyRent' ? parseInt(tempValue) : tempValue;
      setPropertyData(prev => ({
        ...prev,
        [editingField]: value
      }));
    }
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const EditableField = ({ field, value, displayValue, type = 'text' }) => {
    if (editingField === field) {
      return (
        <div className="flex items-center gap-2">
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-xl text-sm font-medium focus:border-blue-500 focus:outline-none transition-colors"
            autoFocus
          />
          <Button size="sm" variant="ghost" onClick={saveEdit} className="rounded-xl bg-green-100 hover:bg-green-200">
            <Save className="h-3 w-3 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" onClick={cancelEdit} className="rounded-xl bg-red-100 hover:bg-red-200">
            <X className="h-3 w-3 text-red-600" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 group">
        <span className="font-medium">{displayValue || value}</span>
        <Button
          size="sm"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-blue-100 transition-all"
          onClick={() => startEdit(field, value)}
        >
          <Edit className="h-3 w-3 text-blue-600" />
        </Button>
      </div>
    );
  };

  const calculateDaysToRenewal = () => {
    const today = new Date();
    const renewalDate = new Date(propertyData.brfPermitExpiry);
    const diffTime = renewalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysToRenewal = calculateDaysToRenewal();

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Fastighetsinställningar</h1>
              <p className="text-gray-600">Anpassa din fastighetsportals inställningar</p>
            </div>
            <Button onClick={() => setShowSettings(false)} className="rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg">
              Tillbaka till Dashboard
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Grundinformation</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Månadshy ra (SEK)</label>
                    <input
                      type="number"
                      value={propertyData.monthlyRent}
                      onChange={(e) => setPropertyData(prev => ({...prev, monthlyRent: parseInt(e.target.value) || 0}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fastighetstyp</label>
                    <select
                      value={propertyData.propertyType}
                      onChange={(e) => setPropertyData(prev => ({...prev, propertyType: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="Lägenhet">🏠 Lägenhet</option>
                      <option value="Hus">🏡 Hus</option>
                      <option value="Studentlägenhet">🎓 Studentlägenhet</option>
                      <option value="Radhus">🏘️ Radhus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adress/Ort</label>
                    <input
                      type="text"
                      value={propertyData.address}
                      onChange={(e) => setPropertyData(prev => ({...prev, address: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="t.ex. Södermalm, Stockholm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-green-100">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Hyresgästinformation</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hyresgästens namn</label>
                    <input
                      type="text"
                      value={propertyData.tenantName}
                      onChange={(e) => setPropertyData(prev => ({...prev, tenantName: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Lämna tom om vakant"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={propertyData.tenantStatus}
                      onChange={(e) => setPropertyData(prev => ({...prev, tenantStatus: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="Occupied">✅ Uthyrd</option>
                      <option value="Vacant">⭕ Vakant</option>
                      <option value="Notice Given">⚠️ Uppsägning given</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Inflyttningsdatum</label>
                    <input
                      type="date"
                      value={propertyData.moveInDate}
                      onChange={(e) => setPropertyData(prev => ({...prev, moveInDate: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-yellow-100">
                    <CalendarDays className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Viktiga datum</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nästa hyra förfaller</label>
                    <input
                      type="date"
                      value={propertyData.nextRentDue}
                      onChange={(e) => setPropertyData(prev => ({...prev, nextRentDue: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BRF-tillstånd upphör</label>
                    <input
                      type="date"
                      value={propertyData.brfPermitExpiry}
                      onChange={(e) => setPropertyData(prev => ({...prev, brfPermitExpiry: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <MessageSquareText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Meddelanden</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Senaste meddelande från hyresgäst</label>
                    <textarea
                      value={propertyData.lastMessage}
                      onChange={(e) => setPropertyData(prev => ({...prev, lastMessage: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-medium focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      rows={4}
                      placeholder="Skriv senaste meddelande här..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fastighetsportal
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-xl text-gray-600 font-medium">{propertyData.propertyType} - {propertyData.address}</p>
          </div>
          <Button onClick={() => setShowSettings(true)} className="rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg">
            <Settings className="h-5 w-5 mr-2" />
            Inställningar
          </Button>
        </div>

        {/* Featured Property Image */}
        <Card className="mb-8 shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Home className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-bold mb-2">Modern Stockholm Apartment</h2>
                <p className="text-lg opacity-90">Premium Lägenhet i {propertyData.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats with Icons */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <TrendingUp className="h-8 w-8 opacity-30" />
              </div>
              <div>
                <p className="text-blue-100 font-medium mb-1">💰 Månadshy ra</p>
                <EditableField 
                  field="monthlyRent" 
                  value={propertyData.monthlyRent}
                  displayValue={`${propertyData.monthlyRent.toLocaleString()} SEK`}
                  type="number"
                />
              </div>
              <div className="mt-4 flex items-center text-blue-200 text-sm">
                <Award className="h-4 w-4 mr-1" />
                Premium fastighet
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <CheckCircle className="h-8 w-8 opacity-30" />
              </div>
              <div>
                <p className="text-green-100 font-medium mb-1">🏠 Uthyrningsstatus</p>
                <p className="text-2xl font-bold">
                  {propertyData.tenantStatus === 'Occupied' ? 'Uthyrd ✅' : 'Vakant ⭕'}
                </p>
              </div>
              <div className="mt-4 flex items-center text-green-200 text-sm">
                <Sparkles className="h-4 w-4 mr-1" />
                100% beläggning
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <AlertTriangle className="h-8 w-8 opacity-30" />
              </div>
              <div>
                <p className="text-yellow-100 font-medium mb-1">📅 Dagar till BRF-förnyelse</p>
                <p className="text-2xl font-bold">{daysToRenewal}</p>
              </div>
              <div className="mt-4 flex items-center text-yellow-200 text-sm">
                <CalendarDays className="h-4 w-4 mr-1" />
                Nästa förnyelse
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <MessageSquareText className="h-8 w-8 opacity-30" />
              </div>
              <div>
                <p className="text-purple-100 font-medium mb-1">📬 Olästa meddelanden</p>
                <p className="text-2xl font-bold">
                  {propertyData.lastMessage ? '1 📩' : '0 ✅'}
                </p>
              </div>
              <div className="mt-4 flex items-center text-purple-200 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                Aktiv kommunikation
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Property Status */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Fastighetsstatus</h2>
                </div>
                <Badge variant="secondary" className={`rounded-full px-3 py-1 font-medium ${
                  propertyData.tenantStatus === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {propertyData.tenantStatus === 'Occupied' ? '✅ Uthyrd' : '⭕ Vakant'}
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="text-sm font-semibold text-gray-600 mb-1">👤 Hyresgäst:</p>
                  <EditableField 
                    field="tenantName" 
                    value={propertyData.tenantName}
                    displayValue={propertyData.tenantName || 'Ingen hyresgäst'}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="rounded-xl border-2 flex-1 font-medium hover:bg-blue-50">
                    🏠 Visa fastighet
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-2 flex-1 font-medium hover:bg-blue-50">
                    📋 Detaljer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Betalningsstatus</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-green-50">
                  <span className="font-medium text-gray-700">Juni 2025</span>
                  <Badge className="bg-green-500 text-white rounded-full">✅ Betald</Badge>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-emerald-600 mb-1">
                    {propertyData.monthlyRent.toLocaleString()} SEK
                  </p>
                  <p className="text-sm text-gray-500">
                    💳 Mottagen {new Date(propertyData.rentReceivedDate).toLocaleDateString('sv-SE')}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-2 w-full font-medium hover:bg-emerald-50">
                  📄 Ladda ner kvitto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* BRF Permit */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-yellow-100">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">BRF Tillstånd</h2>
                </div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700 rounded-full font-medium">
                  ✅ Aktivt
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between p-4 rounded-xl bg-yellow-50">
                  <span className="font-medium text-gray-700">📅 Upphör:</span>
                  <EditableField 
                    field="brfPermitExpiry" 
                    value={propertyData.brfPermitExpiry}
                    displayValue={new Date(propertyData.brfPermitExpiry).toLocaleDateString('sv-SE')}
                    type="date"
                  />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${Math.max(0, Math.min(100, (daysToRenewal / 365) * 100))}%`}}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 font-medium">⏰ {daysToRenewal} dagar kvar</p>
                <Button size="sm" className="rounded-xl w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium">
                  🔄 Förnya tillstånd
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <MessageSquareText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Meddelanden</h2>
                </div>
                {propertyData.lastMessage && (
                  <Badge variant="destructive" className="rounded-full animate-pulse">📩 1 Nytt</Badge>
                )}
              </div>
              <div className="space-y-4">
                {propertyData.lastMessage ? (
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-400">
                    <p className="font-medium text-sm text-purple-800 mb-2">👤 Från: {propertyData.tenantName || 'Hyresgäst'}</p>
                    <EditableField 
                      field="lastMessage" 
                      value={propertyData.lastMessage}
                      displayValue={propertyData.lastMessage}
                    />
                    <p className="text-xs text-purple-600 mt-2">🕐 2 timmar sedan</p>
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <MessageSquareText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Inga meddelanden</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button size="sm" className="rounded-xl flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium">
                    📝 Svara
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-2 font-medium hover:bg-purple-50">
                    📋 Visa alla
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 lg:col-span-2">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-100">
                  <CalendarDays className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Kommande händelser</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border-l-4 border-red-400">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">💰 Hyra förfaller</p>
                    <p className="text-sm text-red-600">
                      📅 {new Date(propertyData.nextRentDue).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">📋 BRF-tillstånd förnyelse</p>
                    <p className="text-sm text-yellow-600">
                      📅 {new Date(propertyData.brfPermitExpiry).toLocaleDateString('sv-SE')} ({daysToRenewal} dagar)
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-2 w-full mt-4 font-medium hover:bg-blue-50">
                  📅 Visa kalender
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}