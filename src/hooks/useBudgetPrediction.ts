
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface BudgetPrediction {
  nextWeekPrediction: number;
  nextMonthPrediction: number;
  weeklyAverage: number;
  monthlyAverage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export const useBudgetPrediction = () => {
  const { user } = useAuth();
  const [prediction, setPrediction] = useState<BudgetPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const calculatePrediction = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get calculations from last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data, error } = await supabase
        .from('fuel_calculations')
        .select('total_cost, calculation_date')
        .eq('user_id', user.id)
        .gte('calculation_date', threeMonthsAgo.toISOString())
        .order('calculation_date', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        setPrediction(null);
        return;
      }

      // Calculate weekly and monthly averages
      const weeklyData: { [key: string]: number } = {};
      const monthlyData: { [key: string]: number } = {};

      data.forEach(calc => {
        const date = new Date(calc.calculation_date || '');
        const weekKey = getWeekKey(date);
        const monthKey = getMonthKey(date);

        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + calc.total_cost;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + calc.total_cost;
      });

      const weeklyValues = Object.values(weeklyData);
      const monthlyValues = Object.values(monthlyData);

      const weeklyAverage = weeklyValues.reduce((a, b) => a + b, 0) / weeklyValues.length || 0;
      const monthlyAverage = monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length || 0;

      // Simple trend analysis (last 3 data points vs previous 3)
      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (weeklyValues.length >= 6) {
        const recent = weeklyValues.slice(-3).reduce((a, b) => a + b, 0) / 3;
        const previous = weeklyValues.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
        
        if (recent > previous * 1.1) trend = 'increasing';
        else if (recent < previous * 0.9) trend = 'decreasing';
      }

      // Simple linear prediction (using moving average)
      const nextWeekPrediction = weeklyAverage;
      const nextMonthPrediction = monthlyAverage;

      setPrediction({
        nextWeekPrediction,
        nextMonthPrediction,
        weeklyAverage,
        monthlyAverage,
        trend
      });

    } catch (error) {
      console.error('Error calculating prediction:', error);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeekKey = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${weekNumber}`;
  };

  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  };

  useEffect(() => {
    calculatePrediction();
  }, [user]);

  return {
    prediction,
    loading,
    refetch: calculatePrediction
  };
};
