import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, MessageSquareText, Building2, CheckCircle, Loader2, AlertTriangle, TrendingUp, Settings, Edit, Save, X } from "lucide-react";

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

export default function InteractiveRentalDashboard() {
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
            className="flex-1 px-2 py-1 border rounded text-sm"
            autoFocus
          />
          <Button size="sm" variant="ghost" onClick={saveEdit}>
            <Save className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={cancelEdit}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 group">
        <span>{displayValue || value}</span>
        <Button
          size="sm"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
          onClick={() => startEdit(field, value)}
        >
          <Edit className="h-3 w-3" />
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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Fastighetsinställningar</h1>
            <Button onClick={() => setShowSettings(false)}>
              Tillbaka till Dashboard
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Grundinformation</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Månadshy ra (SEK)</label>
                    <input
                      type="number"
                      value={propertyData.monthlyRent}
                      onChange={(e) => setPropertyData(prev => ({...prev, monthlyRent: parseInt(e.target.value) || 0}))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fastighetstyp</label>
                    <select
                      value={propertyData.propertyType}
                      onChange={(e) => setPropertyData(prev => ({...prev, propertyType: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Lägenhet">Lägenhet</option>
                      <option value="Hus">Hus</option>
                      <option value="Studentlägenhet">Studentlägenhet</option>
                      <option value="Radhus">Radhus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Adress/Ort</label>
                    <input
                      type="text"
                      value={propertyData.address}
                      onChange={(e) => setPropertyData(prev => ({...prev, address: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="t.ex. Södermalm, Stockholm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Hyresgästinformation</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Hyresgästens namn</label>
                    <input
                      type="text"
                      value={propertyData.tenantName}
                      onChange={(e) => setPropertyData(prev => ({...prev, tenantName: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Lämna tom om vakant"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={propertyData.tenantStatus}
                      onChange={(e) => setPropertyData(prev => ({...prev, tenantStatus: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Occupied">Uthyrd</option>
                      <option value="Vacant">Vakant</option>
                      <option value="Notice Given">Uppsägning given</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Inflyttningsdatum</label>
                    <input
                      type="date"
                      value={propertyData.moveInDate}
                      onChange={(e) => setPropertyData(prev => ({...prev, moveInDate: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Viktiga datum</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nästa hyra förfaller</label>
                    <input
                      type="date"
                      value={propertyData.nextRentDue}
                      onChange={(e) => setPropertyData(prev => ({...prev, nextRentDue: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">BRF-tillstånd upphör</label>
                    <input
                      type="date"
                      value={propertyData.brfPermitExpiry}
                      onChange={(e) => setPropertyData(prev => ({...prev, brfPermitExpiry: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Meddelanden</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Senaste meddelande från hyresgäst</label>
                    <textarea
                      value={propertyData.lastMessage}
                      onChange={(e) => setPropertyData(prev => ({...prev, lastMessage: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fastighetsportal</h1>
            <p className="text-gray-600 mt-2">{propertyData.propertyType} - {propertyData.address}</p>
          </div>
          <Button onClick={() => setShowSettings(true)} variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Inställningar
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Månadshy ra</p>
                  <EditableField 
                    field="monthlyRent" 
                    value={propertyData.monthlyRent}
                    displayValue={`${propertyData.monthlyRent.toLocaleString()} SEK`}
                    type="number"
                  />
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Uthyrningsstatus</p>
                  <p className="text-2xl font-bold text-green-900">
                    {propertyData.tenantStatus === 'Occupied' ? 'Uthyrd' : 'Vakant'}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Dagar till BRF-förnyelse</p>
                  <p className="text-2xl font-bold text-yellow-900">{daysToRenewal}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Olästa meddelanden</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {propertyData.lastMessage ? '1' : '0'}
                  </p>
                </div>
                <MessageSquareText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Property Status */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="text-blue-500" /> Fastighetsstatus
                </h2>
                <Badge variant="secondary" className={
                  propertyData.tenantStatus === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }>
                  {propertyData.tenantStatus === 'Occupied' ? 'Uthyrd' : 'Vakant'}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Hyresgäst:</p>
                  <EditableField 
                    field="tenantName" 
                    value={propertyData.tenantName}
                    displayValue={propertyData.tenantName || 'Ingen hyresgäst'}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Visa fastighet</Button>
                  <Button variant="outline" size="sm">Detaljer</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="text-emerald-500" /> Betalningsstatus
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Juni 2025</span>
                  <Badge className="bg-green-100 text-green-800">Betald</Badge>
                </div>
                <p className="text-2xl font-bold text-emerald-600">
                  {propertyData.monthlyRent.toLocaleString()} SEK
                </p>
                <p className="text-sm text-gray-500">
                  Mottagen {new Date(propertyData.rentReceivedDate).toLocaleDateString('sv-SE')}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Ladda ner kvitto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* BRF Permit */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="text-yellow-500" /> BRF Andrahandsuthyrning
                </h2>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                  Aktivt
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Upphör:</span>
                  <EditableField 
                    field="brfPermitExpiry" 
                    value={propertyData.brfPermitExpiry}
                    displayValue={new Date(propertyData.brfPermitExpiry).toLocaleDateString('sv-SE')}
                    type="date"
                  />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{width: `${Math.max(0, Math.min(100, (daysToRenewal / 365) * 100))}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{daysToRenewal} dagar kvar</p>
                <Button size="sm" className="w-full">
                  Förnya tillstånd
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquareText className="text-purple-500" /> Meddelanden
                </h2>
                {propertyData.lastMessage && (
                  <Badge variant="destructive">1 Nytt</Badge>
                )}
              </div>
              <div className="space-y-3">
                {propertyData.lastMessage ? (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">Från: {propertyData.tenantName || 'Hyresgäst'}</p>
                    <EditableField 
                      field="lastMessage" 
                      value={propertyData.lastMessage}
                      displayValue={propertyData.lastMessage}
                    />
                    <p className="text-xs text-gray-500 mt-2">2 timmar sedan</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Inga meddelanden</p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Svara</Button>
                  <Button variant="outline" size="sm">Visa alla</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="hover:shadow-md transition-shadow lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CalendarDays className="text-red-500" /> Kommande händelser
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Hyra förfaller</p>
                    <p className="text-xs text-gray-500">
                      {new Date(propertyData.nextRentDue).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">BRF-tillstånd förnyelse</p>
                    <p className="text-xs text-gray-500">
                      {new Date(propertyData.brfPermitExpiry).toLocaleDateString('sv-SE')} ({daysToRenewal} dagar)
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Visa kalender
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}