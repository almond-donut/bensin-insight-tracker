
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Fuel, TrendingUp, Calendar, Car, Target, Plus, Eye, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useMonthlyBudget } from '@/hooks/useMonthlyBudget';
import FuelCalculator from '@/components/FuelCalculator';
import FuelPriceWidget from '@/components/FuelPriceWidget';

const LoggedInHomepage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { calculations } = useFuelCalculations();
  const { budget } = useMonthlyBudget();

  // Calculate monthly statistics
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyCalculations = calculations.filter(calc => {
    const calcDate = new Date(calc.calculation_date);
    return calcDate.getMonth() === currentMonth && calcDate.getFullYear() === currentYear;
  });

  const monthlySpending = monthlyCalculations.reduce((sum, calc) => sum + Number(calc.total_cost), 0);
  const budgetProgress = budget ? (monthlySpending / budget.budget_amount) * 100 : 0;
  const remainingBudget = budget ? budget.budget_amount - monthlySpending : 0;

  // Get recent calculations (last 3)
  const recentCalculations = calculations.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">
            Selamat datang kembali, {user?.user_metadata?.full_name || 'User'}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Kelola pengeluaran BBM Anda dengan mudah dan efisien
          </p>
        </div>

        {/* Quick Stats and Fuel Price */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  Rp {monthlySpending.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  {monthlyCalculations.length} perhitungan
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Perhitungan</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{calculations.length}</div>
                <p className="text-xs text-muted-foreground">
                  Semua waktu
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {budget ? `${budgetProgress.toFixed(0)}%` : 'Belum diatur'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {budget ? 'Dari target bulanan' : 'Atur budget sekarang'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fuel Price Widget */}
          <div className="lg:col-span-1">
            <FuelPriceWidget />
          </div>
        </div>

        {/* Budget Progress */}
        {budget && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Progress Budget Bulan Ini
              </CardTitle>
              <CardDescription>
                Target: Rp {budget.budget_amount.toLocaleString('id-ID')} • 
                Terpakai: Rp {monthlySpending.toLocaleString('id-ID')} • 
                {remainingBudget >= 0 ? 'Sisa: ' : 'Lebih: '}
                Rp {Math.abs(remainingBudget).toLocaleString('id-ID')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className={budgetProgress > 100 ? 'text-red-500 font-bold' : 'text-primary'}>
                    {budgetProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(budgetProgress, 100)} 
                  className="h-3"
                />
                {budgetProgress > 80 && (
                  <p className={`text-sm ${budgetProgress > 100 ? 'text-red-500' : 'text-yellow-600'}`}>
                    {budgetProgress > 100 ? '⚠️ Budget sudah terlampaui!' : '⚠️ Mendekati batas budget'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card hover:bg-card/70 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Plus className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium">Hitung BBM Baru</p>
              <p className="text-sm text-muted-foreground">Buat perhitungan baru</p>
            </CardContent>
          </Card>

          <Card 
            className="glass-card hover:bg-card/70 transition-colors cursor-pointer group"
            onClick={() => navigate('/dashboard')}
          >
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium">Lihat Dashboard</p>
              <p className="text-sm text-muted-foreground">Analisis lengkap</p>
            </CardContent>
          </Card>

          <Card 
            className="glass-card hover:bg-card/70 transition-colors cursor-pointer group"
            onClick={() => navigate('/vehicles')}
          >
            <CardContent className="p-6 text-center">
              <Car className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium">Kelola Kendaraan</p>
              <p className="text-sm text-muted-foreground">Atur kendaraan Anda</p>
            </CardContent>
          </Card>

          <Card 
            className="glass-card hover:bg-card/70 transition-colors cursor-pointer group"
            onClick={() => navigate('/budget')}
          >
            <CardContent className="p-6 text-center">
              <Settings className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium">Atur Budget</p>
              <p className="text-sm text-muted-foreground">Target pengeluaran</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Calculations */}
        {recentCalculations.length > 0 && (
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Perhitungan Terbaru</CardTitle>
                <CardDescription>3 perhitungan BBM terakhir</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Lihat Semua
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalculations.map((calc) => (
                  <div key={calc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{calc.distance_km} km</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(calc.calculation_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {calc.notes && (
                        <p className="text-xs text-muted-foreground">{calc.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        Rp {Number(calc.total_cost).toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Number(calc.total_fuel_needed).toFixed(2)} L
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fuel Calculator Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Kalkulator BBM
            </h2>
            <p className="text-muted-foreground">
              Hitung estimasi biaya BBM untuk perjalanan Anda
            </p>
          </div>
          <FuelCalculator />
        </div>
      </div>
    </div>
  );
};

export default LoggedInHomepage;
