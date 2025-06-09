
import { useState, useEffect } from 'react';
import { Calculator, Car, Bike, Fuel, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vehicles, getVehiclesByType, getVehicleById, defaultFuelPrice } from '@/data/vehicles';

const FuelCalculator = () => {
  const [vehicleType, setVehicleType] = useState<'motor' | 'mobil'>('motor');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [customEfficiency, setCustomEfficiency] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [fuelPrice, setFuelPrice] = useState<string>(defaultFuelPrice[vehicleType].toString());
  const [result, setResult] = useState<{
    fuelNeeded: number;
    totalCost: number;
    dailyCost: number;
    monthlyCost: number;
  } | null>(null);

  const handleVehicleTypeChange = (type: 'motor' | 'mobil') => {
    setVehicleType(type);
    setSelectedVehicle('');
    setCustomEfficiency('');
    setFuelPrice(defaultFuelPrice[type].toString());
    setResult(null);
  };

  const calculateFuelCost = () => {
    if (!distance || !fuelPrice) return;

    let efficiency = 0;
    
    if (selectedVehicle) {
      const vehicle = getVehicleById(selectedVehicle);
      efficiency = vehicle?.fuelEfficiency || 0;
    } else if (customEfficiency) {
      efficiency = parseFloat(customEfficiency);
    }

    if (efficiency <= 0) return;

    const distanceNum = parseFloat(distance);
    const fuelPriceNum = parseFloat(fuelPrice);
    
    const fuelNeeded = distanceNum / efficiency;
    const totalCost = fuelNeeded * fuelPriceNum;
    const dailyCost = totalCost; // untuk sekali jalan
    const monthlyCost = totalCost * 30; // estimasi 30 hari

    setResult({
      fuelNeeded: fuelNeeded,
      totalCost: totalCost,
      dailyCost: dailyCost,
      monthlyCost: monthlyCost
    });
  };

  useEffect(() => {
    if (distance && fuelPrice && (selectedVehicle || customEfficiency)) {
      calculateFuelCost();
    }
  }, [distance, fuelPrice, selectedVehicle, customEfficiency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredVehicles = getVehiclesByType(vehicleType);

  return (
    <section id="kalkulator" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Kalkulator BBM</span> Pintar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hitung estimasi biaya bahan bakar untuk perjalanan Anda dengan akurat. 
            Data real dari 100+ kendaraan populer driver Grab.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="glass-card border-border/50 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Calculator className="h-6 w-6 text-primary" />
                  <span>Input Data Perjalanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Pilih Jenis Kendaraan</Label>
                  <Tabs value={vehicleType} onValueChange={(value) => handleVehicleTypeChange(value as 'motor' | 'mobil')}>
                    <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                      <TabsTrigger value="motor" className="flex items-center space-x-2">
                        <Bike className="h-4 w-4" />
                        <span>Motor</span>
                      </TabsTrigger>
                      <TabsTrigger value="mobil" className="flex items-center space-x-2">
                        <Car className="h-4 w-4" />
                        <span>Mobil</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-base font-medium">
                    Pilih Model Kendaraan
                  </Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder={`Pilih ${vehicleType === 'motor' ? 'motor' : 'mobil'} Anda`} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover backdrop-blur-xl border-border/50 max-h-60">
                      {filteredVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{vehicle.name}</span>
                            <span className="text-muted-foreground text-sm ml-4">
                              {vehicle.fuelEfficiency} km/L
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Efficiency */}
                <div className="space-y-2">
                  <Label htmlFor="efficiency" className="text-base font-medium">
                    Atau Input Konsumsi BBM Manual (km/liter)
                  </Label>
                  <Input
                    id="efficiency"
                    type="number"
                    placeholder="Contoh: 35"
                    value={customEfficiency}
                    onChange={(e) => {
                      setCustomEfficiency(e.target.value);
                      setSelectedVehicle('');
                    }}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <Label htmlFor="distance" className="text-base font-medium">
                    Jarak Tempuh (km)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Contoh: 25"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                {/* Fuel Price */}
                <div className="space-y-2">
                  <Label htmlFor="fuelPrice" className="text-base font-medium">
                    Harga BBM per Liter (Rp)
                  </Label>
                  <Input
                    id="fuelPrice"
                    type="number"
                    placeholder="10000"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculateFuelCost}
                  className="w-full btn-primary text-lg py-6"
                  disabled={!distance || !fuelPrice || (!selectedVehicle && !customEfficiency)}
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Hitung Biaya BBM
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              {result ? (
                <>
                  <Card className="glass-card border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-2xl">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <span>Hasil Perhitungan</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 p-4 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1">BBM Dibutuhkan</p>
                          <p className="text-2xl font-bold text-primary">
                            {result.fuelNeeded.toFixed(2)} L
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-primary/10 p-4 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1">Biaya Sekali Jalan</p>
                          <p className="text-2xl font-bold text-emerald-400">
                            {formatCurrency(result.totalCost)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-xl">Proyeksi Biaya</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                          <span className="font-medium">Per Hari (PP)</span>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(result.dailyCost * 2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                          <span className="font-medium">Per Minggu</span>
                          <span className="text-lg font-bold text-emerald-400">
                            {formatCurrency(result.dailyCost * 2 * 7)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-lg border border-primary/30">
                          <span className="font-medium">Per Bulan</span>
                          <span className="text-xl font-bold gradient-text">
                            {formatCurrency(result.dailyCost * 2 * 30)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA for Registration */}
                  <Card className="glass-card border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5">
                    <CardContent className="p-6 text-center">
                      <Fuel className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Ingin Lacak Pengeluaran Anda?</h3>
                      <p className="text-muted-foreground mb-4">
                        Daftar gratis untuk menyimpan riwayat perhitungan dan dapatkan insights pengeluaran BBM Anda.
                      </p>
                      <Button className="btn-primary">
                        Daftar Sekarang - Gratis
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="glass-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <div className="bg-gradient-to-r from-primary/20 to-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Siap Menghitung?</h3>
                    <p className="text-muted-foreground">
                      Isi form di sebelah kiri untuk melihat estimasi biaya BBM Anda.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuelCalculator;
