import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Shield, Loader2, Crown, CheckCircle } from "lucide-react";

export default function SimpleBankIDLogin({ onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('initial'); // initial, qr, waiting, success

  const startBankIDLogin = async () => {
    setIsLoading(true);
    setStep('qr');
    
    // Simulate BankID API call
    try {
      const mockOrderRef = 'mock-order-' + Date.now();
      
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
                Skanna QR-koden med din BankID-app
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
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fastighetsportalen
                </h1>
              </div>
            </div>

            {/* BankID Icon */}
            <div className="mx-auto">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Smartphone className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Logga in med BankID</h2>
            </div>

            {/* Login Button */}
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

            {/* Simple footer */}
            <p className="text-xs text-gray-500 mt-6">
              Säker inloggning med svensk BankID-teknik
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 rounded-3xl bg-white/90 backdrop-blur-md">
          <CardContent className="p-8">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}