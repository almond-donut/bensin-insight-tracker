
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Fuel, 
  Calculator, 
  TrendingUp, 
  Car, 
  DollarSign,
  Calendar,
  Target,
  History
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMonthlyBudget } from '@/hooks/useMonthlyBudget';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useVehicles } from '@/hooks/useVehicles';
import BudgetPrediction from '@/components/BudgetPrediction';

const LoggedInHomepage = () => {
  const { user } = useAuth();
  const { budget } = useMonthlyBudget();
  const { calculations } = useFuelCalculations();
  const { vehicles } = useVehicles();

  // Calculate current month spending
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const currentMonthSpending = calculations
    .filter(calc => {
      const calcDate = new Date(calc.calculation_date);
      return calcDate.getMonth() === currentMonth && calcDate.getFullYear() === currentYear;
    })
    .reduce((total, calc) => total + calc.total_cost, 0);

  const budgetProgress = budget ? (currentMonthSpending / budget.budget_amount) * 100 : 0;
  const remainingBudget = budget ? budget.budget_amount - currentMonthSpending : 0;

  // Recent calculations (last 5)
  const recentCalculations = calculations.slice(0, 5);

  // Stats for this month
  const thisMonthCalculations = calculations.filter(calc => {
    const calcDate = new Date(calc.calculation_date);
    return calcDate.getMonth() === currentMonth && calcDate.getFullYear() === currentYear;
  });

  const totalFuelThisMonth = thisMonthCalculations.reduce((total, calc) => total + calc.total_fuel_needed, 0);
  const totalDistanceThisMonth = thisMonthCalculations.reduce((total, calc) => total + calc.distance_km, 0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">
          Selamat Datang, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Kelola anggaran bahan bakar Anda dengan lebih efisien
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kendaraan</p>
                <p className="text-2xl font-bold">{vehicles.length}</p>
              </div>
              <Car className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Perhitungan</p>
                <p className="text-2xl font-bold">{calculations.length}</p>
              </div>
              <Calculator className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">BBM Bulan Ini</p>
                <p className="text-2xl font-bold">{totalFuelThisMonth.toFixed(1)}L</p>
              </div>
              <Fuel className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jarak Bulan Ini</p>
                <p className="text-2xl font-bold">{totalDistanceThisMonth.toFixed(0)}km</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Budget Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Anggaran Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budget ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Terpakai</span>
                    <span>Rp {currentMonthSpending.toLocaleString('id-ID')}</span>
                  </div>
                  <Progress value={budgetProgress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{budgetProgress.toFixed(1)}% dari budget</span>
                    <span>Rp {budget.budget_amount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${remainingBudget >= 0 ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                  <p className="text-sm font-medium">
                    {remainingBudget >= 0 ? 'Sisa Budget' : 'Over Budget'}
                  </p>
                  <p className="text-lg font-bold">
                    Rp {Math.abs(remainingBudget).toLocaleString('id-ID')}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Belum ada budget bulanan</p>
                <Button size="sm" onClick={() => scrollToSection('budget')}>
                  Atur Budget
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget Prediction */}
        <BudgetPrediction />

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => scrollToSection('kalkulator')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Hitung BBM
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/budget'} 
              className="w-full justify-start"
              variant="outline"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Kelola Budget
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/vehicles'} 
              className="w-full justify-start"
              variant="outline"
            >
              <Car className="mr-2 h-4 w-4" />
              Kelola Kendaraan
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/dashboard'} 
              className="w-full justify-start"
              variant="outline"
            >
              <History className="mr-2 h-4 w-4" />
              Lihat Riwayat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calculations */}
      {recentCalculations.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Perhitungan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCalculations.map((calc) => (
                <div key={calc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {calc.distance_km}km • {calc.total_fuel_needed.toFixed(1)}L
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(calc.calculation_date).toLocaleDateString('id-ID')}
                      {calc.notes && (
                        <span>• {calc.notes}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Rp {calc.total_cost.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-muted-foreground">{calc.period_type}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {calculations.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard'}>
                  Lihat Semua Riwayat
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoggedInHomepage;
