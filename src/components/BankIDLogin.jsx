import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Shield, Loader2 } from "lucide-react";

export default function BankIDLogin({ onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('initial'); // initial, qr, waiting, success
  const [orderRef, setOrderRef] = useState('');

  const startBankIDLogin = async () => {
    setIsLoading(true);
    setStep('qr');
    
    // Simulate BankID API call
    try {
      // In real implementation, this would call your backend which calls BankID API
      // const response = await fetch('/api/bankid/auth', { method: 'POST' });
      // const data = await response.json();
      
      // For demo purposes, we'll simulate the flow
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
            <div className="mx-auto w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-black mx-auto mb-2 rounded"></div>
                <p className="text-sm text-gray-500">QR Code</p>
                <p className="text-xs text-gray-400 mt-1">Scan with BankID app</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Öppna BankID-appen</h3>
              <p className="text-gray-600 text-sm">
                Skanna QR-koden med din BankID-app eller använd autostart på samma enhet
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setStep('initial')}
              className="w-full"
            >
              Avbryt
            </Button>
          </div>
        );
        
      case 'waiting':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Väntar på BankID</h3>
              <p className="text-gray-600 text-sm">
                Slutför identifieringen i BankID-appen
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Se till att du har öppnat BankID-appen och följ instruktionerna där
              </p>
            </div>
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Inloggning lyckades!</h3>
              <p className="text-gray-600 text-sm">
                Du omdirigeras till din instrumentpanel...
              </p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Logga in med BankID</h2>
              <p className="text-gray-600">
                Säker inloggning till din fastighetsportal
              </p>
            </div>
            <Button 
              onClick={startBankIDLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Smartphone className="mr-2 h-4 w-4" />
              )}
              Logga in med BankID
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Genom att logga in godkänner du våra användarvillkor och integritetspolicy
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderContent()}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Säker fastighetshantering med BankID
          </p>
        </div>
      </div>
    </div>
  );
}