
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { useAiFuelAdvisor } from '@/hooks/useAiFuelAdvisor';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useMonthlyBudget } from '@/hooks/useMonthlyBudget';
import { useVehicles } from '@/hooks/useVehicles';

const AiFuelAdvisor: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const { getAdvice, advice, loading } = useAiFuelAdvisor();
  const { calculations } = useFuelCalculations();
  const { budget } = useMonthlyBudget();
  const { vehicles } = useVehicles();

  const handleGetAdvice = async () => {
    try {
      await getAdvice(userInput, calculations, budget, vehicles);
      setUserInput('');
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleQuickAdvice = async (question: string) => {
    try {
      await getAdvice(question, calculations, budget, vehicles);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const quickQuestions = [
    'Bagaimana cara menghemat BBM?',
    'Apakah anggaran saya sudah optimal?',
    'Berikan tips untuk perjalanan jauh',
    'Analisis pola pengeluaran saya'
  ];

  return (
    <Card className="glass-card hover-lift animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 animate-pulse-soft" />
          AI Fuel Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Custom Question Input */}
        <div className="space-y-2 animate-slide-up">
          <div className="flex gap-2">
            <Input
              placeholder="Tanyakan sesuatu tentang anggaran BBM Anda..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleGetAdvice()}
              className="input-focus"
            />
            <Button 
              onClick={handleGetAdvice} 
              disabled={loading || !userInput.trim()}
              size="sm"
              className="button-press"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-medium">Pertanyaan Cepat:</p>
          <div className="grid grid-cols-1 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdvice(question)}
                disabled={loading}
                className="justify-start text-left button-press hover-lift transition-all duration-200"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* AI Response */}
        {advice && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg animate-slide-up border border-primary/20">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0 animate-bounce-subtle" />
              <p className="text-sm font-medium">Saran AI:</p>
            </div>
            <div className="text-sm whitespace-pre-line pl-6 animate-fade-in">
              {advice}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm animate-pulse">Menganalisis data Anda...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiFuelAdvisor;
