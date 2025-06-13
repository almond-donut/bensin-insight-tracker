
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { useBudgetPrediction } from '@/hooks/useBudgetPrediction';

const BudgetPrediction: React.FC = () => {
  const { prediction, loading } = useBudgetPrediction();

  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Prediksi Pengeluaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Prediksi Pengeluaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Belum cukup data untuk membuat prediksi. Simpan beberapa perhitungan terlebih dahulu.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    switch (prediction.trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendText = () => {
    switch (prediction.trend) {
      case 'increasing':
        return 'Pengeluaran cenderung naik';
      case 'decreasing':
        return 'Pengeluaran cenderung turun';
      default:
        return 'Pengeluaran relatif stabil';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Prediksi Pengeluaran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Minggu Depan</span>
            <span className="font-semibold">
              Rp {prediction.nextWeekPrediction.toLocaleString('id-ID')}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Bulan Depan</span>
            <span className="font-semibold">
              Rp {prediction.nextMonthPrediction.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            {getTrendIcon()}
            <span className="text-sm">{getTrendText()}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>* Prediksi berdasarkan rata-rata riwayat 3 bulan terakhir</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPrediction;
