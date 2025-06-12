
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fuel, TrendingUp, Calendar, Car, Target, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useMonthlyBudget } from '@/hooks/useMonthlyBudget';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { calculations, loading: calculationsLoading } = useFuelCalculations();
  const { budget } = useMonthlyBudget();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }
  }, [user, loading, navigate]);

  // Calculate monthly statistics
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyCalculations = calculations.filter(calc => {
    const calcDate = new Date(calc.calculation_date);
    return calcDate.getMonth() === currentMonth && calcDate.getFullYear() === currentYear;
  });

  const monthlySpending = monthlyCalculations.reduce((sum, calc) => sum + Number(calc.total_cost), 0);
  const averageDaily = monthlySpending / currentDate.getDate();

  // Get recent calculations (last 5)
  const recentCalculations = calculations.slice(0, 5);

  // Calculate budget progress
  const budgetProgress = budget ? (monthlySpending / budget.budget_amount) * 100 : 0;
  const remainingBudget = budget ? budget.budget_amount - monthlySpending : 0;

  // Get most used vehicle type
  const vehicleUsage = calculations.reduce((acc, calc) => {
    // Since we don't have vehicle_id linked yet, we'll use a placeholder
    const vehicleType = 'Motor'; // This should be dynamic when vehicles are linked
    acc[vehicleType] = (acc[vehicleType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteVehicle = Object.entries(vehicleUsage).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Belum ada';

  if (loading || calculationsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              Selamat datang, {user?.user_metadata?.full_name || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Kelola pengeluaran BBM Anda dengan mudah dan efisien.
            </p>
          </div>

          {/* Budget Alert */}
          {budget && budgetProgress > 80 && (
            <Card className="glass-card border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      {budgetProgress > 100 ? 'Budget Terlampaui!' : 'Mendekati Batas Budget'}
                    </p>
                    <p className="text-sm text-yellow-600">
                      Anda sudah menggunakan {budgetProgress.toFixed(1)}% dari budget bulan ini
                      {budgetProgress > 100 && ` dan melebihi sebesar Rp ${Math.abs(remainingBudget).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Perhitungan</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculations.length}</div>
                <p className="text-xs text-muted-foreground">Perhitungan tersimpan</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengeluaran Bulan Ini</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp {monthlySpending.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  {monthlyCalculations.length} transaksi bulan ini
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Harian</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp {Math.round(averageDaily).toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">Per hari bulan ini</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {budget ? `${budgetProgress.toFixed(1)}%` : 'Belum diatur'}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {budget ? 'Dari budget bulanan' : 'Budget belum diatur'}
                </p>
                {budget && (
                  <Progress 
                    value={Math.min(budgetProgress, 100)} 
                    className="h-2"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Budget Card */}
          {budget && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Budget Bulanan</CardTitle>
                <CardDescription>
                  Target: Rp {budget.budget_amount.toLocaleString('id-ID')} • 
                  Terpakai: Rp {monthlySpending.toLocaleString('id-ID')} • 
                  Sisa: Rp {remainingBudget.toLocaleString('id-ID')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress Budget</span>
                    <span className={budgetProgress > 100 ? 'text-red-500 font-bold' : ''}>
                      {budgetProgress.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(budgetProgress, 100)} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Calculations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Perhitungan Terbaru</CardTitle>
              <CardDescription>5 perhitungan BBM terakhir Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {recentCalculations.length === 0 ? (
                <div className="text-center py-8">
                  <Fuel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada perhitungan</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Mulai hitung biaya BBM Anda sekarang
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Buat Perhitungan
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCalculations.map((calc, index) => (
                    <div key={calc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{calc.distance_km} km</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(calc.calculation_date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
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
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button 
              onClick={() => navigate('/')}
              className="h-20 text-lg"
              variant="outline"
            >
              <Fuel className="mr-2 h-5 w-5" />
              Hitung BBM Baru
            </Button>
            <Button 
              onClick={() => navigate('/vehicles')}
              className="h-20 text-lg"
              variant="outline"
            >
              <Car className="mr-2 h-5 w-5" />
              Kelola Kendaraan
            </Button>
            <Button 
              onClick={() => navigate('/budget')}
              className="h-20 text-lg"
              variant="outline"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Atur Budget
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
