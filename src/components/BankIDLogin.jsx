import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Shield, Loader2, Building2, Crown, Sparkles, CheckCircle, TrendingUp, Home } from "lucide-react";

export default function BeautifulBankIDLogin({ onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('initial'); // initial, qr, waiting, success
  const [orderRef, setOrderRef] = useState('');

  const startBankIDLogin = async () => {
    setIsLoading(true);
    setStep('qr');
    
    // Simulate BankID API call
    try {
      const mockOrderRef = 'mock-order-' + Date.now();
      setOrderRef(mockOrderRef);
      
      // Simulate waiting for user to complete BankID
      setTimeout(() => {
        setStep('waiting');
        // Simulate successful authentication after 3 seconds
        setTimeout(() => {
          setStep('success');
          setIsLoading(false);
          // Call success callback after brief delay
          setTimeout(() => {
            onLoginSuccess({
              personalNumber: '198001011234',
              name: 'Demo User',
              orderRef: mockOrderRef
            });
          }, 1000);
        }, 3000);
      }, 1000);
      
    } catch (error) {
      console.error('BankID login failed:', error);
      setIsLoading(false);
      setStep('initial');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'qr':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 flex items-center justify-center rounded-3xl shadow-inner">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-3 rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <p className="text-sm font-semibold text-gray-700">QR-kod</p>
                <p className="text-xs text-gray-500 mt-1">Skanna med BankID-appen</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Öppna BankID-appen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Skanna QR-koden med din BankID-app eller använd autostart på samma enhet
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setStep('initial')}
              className="w-full rounded-xl border-2 font-medium hover:bg-gray-50"
            >
              Avbryt
            </Button>
          </div>
        );
        
      case 'waiting':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Väntar på BankID</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Slutför identifieringen i BankID-appen
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
              <p className="text-sm text-blue-800 font-medium">
                💡 Se till att du har öppnat BankID-appen och följ instruktionerna där
              </p>
            </div>
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Inloggning lyckades! ✅</h3>
              <p className="text-gray-600 text-sm">
                Välkommen till Fastighetsportalen...
              </p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center space-y-8">
            <div className="mx-auto">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Smartphone className="h-10 w-10 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Logga in med BankID</h2>
              <p className="text-gray-600 text-lg">
                Säker inloggning till din fastighetsportal
              </p>
            </div>
            <Button 
              onClick={startBankIDLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {isLoading ? (
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              ) : (
                <Smartphone className="mr-3 h-5 w-5" />
              )}
              Logga in med BankID
            </Button>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Genom att logga in godkänner du våra användarvillkor och integritetspolicy
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="text-left space-y-8">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Fastighetsportalen
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600 font-medium">Premium fastighetshantering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building2 className="h-16 w-16 mx-auto mb-4 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">Moderna Stockholmslägenheter</h3>
                    <p className="text-sm opacity-90">Premium fastigheter i hjärtat av Stockholm</p>
                  </div>
                </div>
                {/* Floating elements for visual appeal */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Taglines */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">🧠 Professional Platform</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Modern rental management platform with live updates and streamlined landlord tools.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Built a property rental dashboard for landlords to track tenants, rent, and compliance in real time.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">🧲 Smart Management</h2>
                <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  "Rent out smarter — full control, zero stress."
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  "Track your rental like a pro — from listings to BRF permits."
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="font-medium text-gray-800">BankID säkerhet</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-800">Live uppdateringar</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <Building2 className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-gray-800">BRF hantering</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <Crown className="h-6 w-6 text-yellow-600" />
                <span className="font-medium text-gray-800">Premium portal</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-md">
              <CardContent className="p-10">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">
            Säker fastighetshantering med svensk BankID-teknik
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-400">
            <span>Användarvillkor</span>
            <span>•</span>
            <span>Integritetspolicy</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}