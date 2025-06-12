
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface FuelPrice {
  type: string;
  name: string;
  price: number;
  change: number;
  lastUpdate: string;
}

const FuelPriceWidget: React.FC = () => {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>([
    { type: 'pertalite', name: 'Pertalite', price: 10000, change: 0, lastUpdate: new Date().toISOString() },
    { type: 'pertamax', name: 'Pertamax', price: 12400, change: +100, lastUpdate: new Date().toISOString() },
    { type: 'pertamax_turbo', name: 'Pertamax Turbo', price: 13400, change: +50, lastUpdate: new Date().toISOString() },
    { type: 'solar', name: 'Solar', price: 6800, change: -50, lastUpdate: new Date().toISOString() }
  ]);

  const [lastFetch, setLastFetch] = useState<Date>(new Date());

  // Simulate fetching real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price changes
      setFuelPrices(prev => prev.map(fuel => ({
        ...fuel,
        change: Math.floor(Math.random() * 200) - 100, // Random change between -100 and +100
        lastUpdate: new Date().toISOString()
      })));
      setLastFetch(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-primary" />
            <span>Harga BBM Terkini</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatTime(lastFetch.toISOString())}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {fuelPrices.map((fuel) => (
          <div key={fuel.type} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
            <div>
              <p className="font-medium">{fuel.name}</p>
              <p className="text-sm text-muted-foreground">per liter</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{formatCurrency(fuel.price)}</p>
              {fuel.change !== 0 && (
                <div className="flex items-center justify-end gap-1">
                  {fuel.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-red-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-500" />
                  )}
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${fuel.change > 0 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {fuel.change > 0 ? '+' : ''}{fuel.change}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Update otomatis setiap menit
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelPriceWidget;
