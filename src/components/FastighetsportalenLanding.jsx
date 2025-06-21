'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, CheckCircle, TrendingUp, MessageSquareText, FileText, Building2, Shield, Clock, Euro, Users, ArrowRight, Star, Calendar, BarChart3 } from "lucide-react";

export default function FastighetsportalenLanding() {
  const [email, setEmail] = useState('');

  const handleDemoClick = () => {
    // Navigate to dashboard demo
    window.location.href = '/';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email signup
    alert('Tack! Vi kontaktar dig inom 24 timmar.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                      Hyra tryggt
                </h1>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-600 font-medium">Premium fastighetshantering</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleDemoClick}>
                Logga in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  🚀 Lanserat 2025 - Redan 100+ fastighetsägare
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Hyra ut smart –{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    full kontroll,
                  </span>{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    noll stress
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Modern fastighetshantering med live-uppdateringar och smidig hyresgästkommunikation. 
                  Spåra din uthyrning som en proffs – från annons till BRF-tillstånd.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleDemoClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Ingen setup-kostnad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>BankID säkerhet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-600" />
                  <span>Premium support</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm">
                <div className="relative h-80">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&w=800&q=85" 
                    alt="Modern Stockholm building exterior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Månadshy ra</span>
                        <Badge className="bg-green-100 text-green-800">✅ Betald</Badge>
                      </div>
                      <p className="text-2xl font-bold text-green-600">11,000 SEK</p>
                      <p className="text-xs text-gray-500">Mottagen 1 juni 2025</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-2xl shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Varför svenska fastighetsägare väljer oss</h2>
            <p className="text-xl text-gray-600">Slipp betala 15% till mäklare för saker som kan automatiseras</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-2xl w-fit mx-auto">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Live-uppdateringar</h3>
                <p className="text-gray-600">Få notiser direkt när hyran betalas, hyresgästen flyttar in, eller BRF-tillstånd snart upphör.</p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="p-4 bg-purple-100 rounded-2xl w-fit mx-auto">
                  <MessageSquareText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Chatta med hyresgäster</h3>
                <p className="text-gray-600">Slipp email-röran. Kommunicera direkt med din hyresgäst i dashboarden med full historik.</p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="p-4 bg-yellow-100 rounded-2xl w-fit mx-auto">
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold">BRF & Kontraktsverktyg</h3>
                <p className="text-gray-600">Missa aldrig en förnyelse. Få påminnelser och mallar för BRF-tillstånd och digitala kontrakt.</p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto">
                  <Euro className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Fast pris-modell</h3>
                <p className="text-gray-600">Inga 15% mäklaravgifter. Bara ett lågt fast pris för fullständig kontroll över uthyrningen.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transparent prissättning - inga doldar avgifter</h2>
            <p className="text-xl text-gray-600">Välj det paket som passar din situation bäst</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <Card className="p-8 border-2 border-gray-200 rounded-2xl bg-white">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Grundpaket</h3>
                  <p className="text-gray-600">För dig som vill ha kontroll</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">Gratis</span>
                  <p className="text-gray-500">för alltid</p>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Dashboard med live-status</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Hyresgäst-meddelanden</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>BRF-påminnelser</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl">
                  Kom igång gratis
                </Button>
              </div>
            </Card>

            {/* Pro */}
            <Card className="p-8 border-2 border-blue-500 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                Mest populär
              </Badge>
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Hel-cykel</h3>
                  <p className="text-gray-600">Allt du behöver för trygg uthyrning</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">4,990 kr</span>
                  <p className="text-gray-500">per uthyrningscykel</p>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Allt i Grundpaket</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Kontrakt & BRF-hjälp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Hyresgäst-screening</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Premium support</span>
                  </div>
                </div>
                <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  Välj Hel-cykel
                </Button>
              </div>
            </Card>

            {/* Enterprise */}
            <Card className="p-8 border-2 border-gray-200 rounded-2xl bg-white">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Företag</h3>
                  <p className="text-gray-600">För flera fastigheter</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">Kontakta oss</span>
                  <p className="text-gray-500">skräddarsydd lösning</p>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Allt i Hel-cykel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Flera fastigheter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>API-integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Dedikerad support</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl">
                  Kontakta försäljning
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Redo att modernisera din fastighetshantering?</h2>
          <p className="text-xl opacity-90">
            Gå med i 100+ svenska fastighetsägare som redan kör smart med Fastighetsportalen
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleDemoClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="din@email.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-4 rounded-xl text-gray-900 flex-1 min-w-64"
              />
              <Button 
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-4 rounded-xl font-medium"
              >
                Få tidigt tillgång
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>GDPR-kompatibel</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <span>Svensk support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>30 dagar gratis test</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">                  Hyra tryggt</span>
              </div>
              <p className="text-gray-400">
                Modern fastighetshantering för svenska fastighetsägare.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <div className="space-y-2 text-gray-400">
                <div>Funktioner</div>
                <div>Priser</div>
                <div>Demo</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Hjälpcenter</div>
                <div>Kontakta oss</div>
                <div>BRF-guide</div>
                <div>Status</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Företag</h4>
              <div className="space-y-2 text-gray-400">
                <div>Om oss</div>
                <div>Karriär</div>
                <div>Integritet</div>
                <div>Villkor</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                          <p>&copy; 2025 Hyra tryggt. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}