
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface FuelCalculation {
  id: string;
  user_id: string;
  distance_km: number;
  fuel_price_per_liter: number;
  fuel_consumption: number;
  total_fuel_needed: number;
  total_cost: number;
  calculation_date: string;
  period_type: string;
  notes?: string;
}

export const useFuelCalculations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [calculations, setCalculations] = useState<FuelCalculation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCalculations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('fuel_calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('calculation_date', { ascending: false });

      if (error) throw error;
      setCalculations(data || []);
    } catch (error) {
      console.error('Error fetching calculations:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data perhitungan',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCalculation = async (calculationData: Omit<FuelCalculation, 'id' | 'user_id' | 'calculation_date'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('fuel_calculations')
        .insert({
          user_id: user.id,
          ...calculationData,
          calculation_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setCalculations(prev => [data, ...prev]);
      toast({
        title: 'Berhasil',
        description: 'Perhitungan berhasil disimpan'
      });

      return data;
    } catch (error) {
      console.error('Error saving calculation:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyimpan perhitungan',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const deleteCalculation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('fuel_calculations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCalculations(prev => prev.filter(calc => calc.id !== id));
      toast({
        title: 'Berhasil',
        description: 'Perhitungan berhasil dihapus'
      });
    } catch (error) {
      console.error('Error deleting calculation:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus perhitungan',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, [user]);

  return {
    calculations,
    loading,
    saveCalculation,
    deleteCalculation,
    refetch: fetchCalculations
  };
};
