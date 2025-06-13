
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAiFuelAdvisor = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const { toast } = useToast();

  const getAdvice = async (userInput?: string, calculations?: any[], budget?: any, vehicles?: any[]) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-fuel-advisor', {
        body: {
          userInput,
          calculations,
          budget,
          vehicles
        }
      });

      if (error) throw error;

      if (data.status === 'error') {
        throw new Error(data.error);
      }

      setAdvice(data.advice);
      return data.advice;
    } catch (error) {
      console.error('Error getting AI advice:', error);
      toast({
        title: 'Error',
        description: 'Gagal mendapatkan saran AI. Pastikan API key sudah dikonfigurasi.',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAdvice,
    advice,
    loading
  };
};
