
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface MonthlyBudget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  budget_amount: number;
  created_at: string;
}

export const useMonthlyBudget = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [budget, setBudget] = useState<MonthlyBudget | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentMonthBudget = async () => {
    if (!user) return;

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('monthly_fuel_budgets')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)
        .maybeSingle();

      if (error) throw error;
      setBudget(data);
    } catch (error) {
      console.error('Error fetching budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const setBudgetAmount = async (amount: number) => {
    if (!user) return;

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    try {
      const { data, error } = await supabase
        .from('monthly_fuel_budgets')
        .upsert({
          user_id: user.id,
          month,
          year,
          budget_amount: amount
        })
        .select()
        .single();

      if (error) throw error;

      setBudget(data);
      toast({
        title: 'Berhasil',
        description: 'Budget bulanan berhasil diatur'
      });
    } catch (error) {
      console.error('Error setting budget:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengatur budget',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    getCurrentMonthBudget();
  }, [user]);

  return {
    budget,
    loading,
    setBudgetAmount,
    refetch: getCurrentMonthBudget
  };
};
