
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMonthlyBudget } from '@/hooks/useMonthlyBudget';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useToast } from '@/hooks/use-toast';

const Budget: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { budget, setBudgetAmount } = useMonthlyBudget();
  const { calculations } = useFuelCalculations();
  const [budgetInput, setBudgetInput] = useState('');
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }
  }, [user, loading, navigate]);

  // Calculate current month spending
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthSpending = calculations
    .filter(calc => {
      const calcDate = new Date(calc.calculation_date);
      return calcDate.getMonth() === currentMonth && calcDate.getFullYear() === currentYear;
    })
    .reduce((sum, calc) => sum + Number(calc.total_cost), 0);

  const budgetProgress = budget ? (currentMonthSpending / budget.budget_amount) * 100 : 0;
  const remainingBudget = budget ? budget.budget_amount - currentMonthSpending : 0;

  const handleSetBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(budgetInput);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Error',
        description: 'Masukkan jumlah budget yang valid',
        variant: 'destructive'
      });
      return;
    }

    await setBudgetAmount(amount);
    setBudgetInput('');
    setShowBudgetForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Budget BBM</h1>
              <p className="text-muted-foreground">Kelola budget pengeluaran BBM bulanan Anda</p>
            </div>
            <Button
              onClick={() => {
                setShowBudgetForm(!showBudgetForm);
                setBudgetInput(budget?.budget_amount?.toString() || '');
              }}
            >
              {budget ? 'Edit Budget' : 'Atur Budget'}
            </Button>
          </div>

          {showBudgetForm && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Atur Budget Bulanan</CardTitle>
                <CardDescription>
                  Tentukan target pengeluaran BBM untuk bulan {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSetBudget} className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Jumlah Budget (Rp)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      placeholder="Contoh: 500000"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Simpan Budget</Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowBudgetForm(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Bulan Ini</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {budget ? `Rp ${budget.budget_amount.toLocaleString('id-ID')}` : 'Belum diatur'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengeluaran Bulan Ini</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp {currentMonthSpending.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  {budget ? `${budgetProgress.toFixed(1)}% dari budget` : 'Budget belum diatur'}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sisa Budget</CardTitle>
                {remainingBudget >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {budget ? `Rp ${remainingBudget.toLocaleString('id-ID')}` : 'Belum diatur'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {remainingBudget < 0 ? 'Melebihi budget' : 'Tersisa'}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress Budget</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {budget ? `${budgetProgress.toFixed(1)}%` : '0%'}
                </div>
                <p className="text-xs text-muted-foreground mb-2">Dari target bulanan</p>
                {budget && (
                  <Progress 
                    value={Math.min(budgetProgress, 100)} 
                    className="h-2"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {budget && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Analisis Budget</CardTitle>
                <CardDescription>Ringkasan pengeluaran BBM bulan ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Progress Budget:</span>
                    <span className={budgetProgress > 100 ? 'text-red-500 font-bold' : 'font-medium'}>
                      {budgetProgress.toFixed(1)}%
                    </span>
                  </div>
                  
                  <Progress value={Math.min(budgetProgress, 100)} className="h-3" />
                  
                  {budgetProgress > 80 && budgetProgress <= 100 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Anda sudah menggunakan {budgetProgress.toFixed(1)}% dari budget bulan ini. Pertimbangkan untuk menghemat pengeluaran BBM.
                      </p>
                    </div>
                  )}
                  
                  {budgetProgress > 100 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        🚨 Budget bulan ini sudah terlampaui sebesar Rp {Math.abs(remainingBudget).toLocaleString('id-ID')}. 
                        Pertimbangkan untuk mengurangi penggunaan kendaraan atau mencari alternatif transportasi.
                      </p>
                    </div>
                  )}
                  
                  {budgetProgress <= 50 && budget && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✅ Pengeluaran BBM Anda masih dalam batas yang baik. Pertahankan kebiasaan berkendara yang efisien!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {!budget && (
            <Card className="glass-card">
              <CardContent className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada budget</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Atur budget bulanan untuk melacak pengeluaran BBM Anda
                </p>
                <Button onClick={() => setShowBudgetForm(true)}>
                  Atur Budget Sekarang
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Budget;
