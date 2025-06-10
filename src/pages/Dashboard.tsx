
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fuel, TrendingUp, Calendar, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DashboardStats {
  totalCalculations: number;
  monthlySpending: number;
  averageDaily: number;
  favoriteVehicle: string;
}

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalCalculations: 0,
    monthlySpending: 0,
    averageDaily: 0,
    favoriteVehicle: 'Belum ada'
  });
  const [recentCalculations, setRecentCalculations] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent calculations
      const { data: calculations } = await supabase
        .from('fuel_calculations')
        .select('*')
        .eq('user_id', user?.id)
        .order('calculation_date', { ascending: false })
        .limit(5);

      // Fetch monthly spending (current month)
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const { data: monthlyData } = await supabase
        .from('fuel_calculations')
        .select('total_cost')
        .eq('user_id', user?.id)
        .gte('calculation_date', `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`)
        .lt('calculation_date', `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`);

      const monthlySpending = monthlyData?.reduce((sum, calc) => sum + Number(calc.total_cost), 0) || 0;
      const averageDaily = monthlySpending / new Date().getDate();

      setStats({
        totalCalculations: calculations?.length || 0,
        monthlySpending,
        averageDaily,
        favoriteVehicle: 'Motor' // Placeholder, bisa diperbaiki dengan query terpisah
      });

      setRecentCalculations(calculations || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Perhitungan</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCalculations}</div>
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
                  Rp {stats.monthlySpending.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">Total bulan ini</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Harian</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp {Math.round(stats.averageDaily).toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">Per hari bulan ini</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kendaraan Favorit</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favoriteVehicle}</div>
                <p className="text-xs text-muted-foreground">Paling sering digunakan</p>
              </CardContent>
            </Card>
          </div>

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
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{calc.distance_km} km</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(calc.calculation_date).toLocaleDateString('id-ID')}
                        </p>
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
