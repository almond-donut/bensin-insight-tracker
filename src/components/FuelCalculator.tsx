
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Car, Fuel, DollarSign, Truck, Bus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';
import { useVehicles } from '@/hooks/useVehicles';
import { vehicles, getVehiclesByType, getBrandsByType, getVehiclesByBrand, getVehicleById } from '@/data/vehicles';
import VehicleSelector from '@/components/VehicleSelector';
import AddVehicleModal from '@/components/AddVehicleModal';

const FuelCalculator = () => {
  const { user } = useAuth();
  const { saveCalculation } = useFuelCalculations();
  const { vehicles: userVehicles, loading: vehiclesLoading } = useVehicles();
  
  const [distance, setDistance] = useState([50]);
  const [fuelPrice, setFuelPrice] = useState('10000');
  const [fuelConsumption, setFuelConsumption] = useState('10');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<'motor' | 'mobil' | 'truk' | 'bus'>('motor');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPresetVehicle, setSelectedPresetVehicle] = useState('');
  const [fuelType, setFuelType] = useState('pertalite');
  const [periodType, setPeriodType] = useState('one-time');
  const [notes, setNotes] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fuelCalculatorData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setDistance([data.distance || 50]);
        setFuelPrice(data.fuelPrice || '10000');
        setFuelConsumption(data.fuelConsumption || '10');
        setFuelType(data.fuelType || 'pertalite');
        setPeriodType(data.periodType || 'one-time');
        setNotes(data.notes || '');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    const dataToSave = {
      distance: distance[0],
      fuelPrice,
      fuelConsumption,
      fuelType,
      periodType,
      notes
    };
    localStorage.setItem('fuelCalculatorData', JSON.stringify(dataToSave));
  }, [distance, fuelPrice, fuelConsumption, fuelType, periodType, notes]);

  // Auto-fill fuel consumption when vehicle is selected
  useEffect(() => {
    if (selectedVehicleId && vehicles.length > 0) {
      const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
      if (selectedVehicle?.fuelEfficiency) {
        setFuelConsumption(selectedVehicle.fuelEfficiency.toString());
      }
    }
  }, [selectedVehicleId, vehicles]);

  const fuelTypes = [
    { value: 'pertalite', label: 'Pertalite', basePrice: 10000, applicableFor: ['motor', 'mobil'] },
    { value: 'pertamax', label: 'Pertamax', basePrice: 12400, applicableFor: ['motor', 'mobil'] },
    { value: 'pertamax_turbo', label: 'Pertamax Turbo', basePrice: 13400, applicableFor: ['motor', 'mobil'] },
    { value: 'solar', label: 'Solar', basePrice: 12000, applicableFor: ['truk', 'bus', 'mobil'] },
    { value: 'dexlite', label: 'Dexlite', basePrice: 13700, applicableFor: ['truk', 'bus'] }
  ];

  const periodTypes = [
    { value: 'one-time', label: 'Sekali Jalan' },
    { value: 'daily', label: 'Harian' },
    { value: 'weekly', label: 'Mingguan' },
    { value: 'monthly', label: 'Bulanan' }
  ];

  const vehicleTypeOptions = [
    { value: 'motor', label: 'Motor', icon: Car },
    { value: 'mobil', label: 'Mobil', icon: Car },
    { value: 'truk', label: 'Truk', icon: Truck },
    { value: 'bus', label: 'Bus', icon: Bus }
  ];

  // Update fuel type when vehicle type changes
  useEffect(() => {
    const applicableFuels = fuelTypes.filter(f => f.applicableFor.includes(vehicleType));
    if (applicableFuels.length > 0) {
      setFuelType(applicableFuels[0].value);
      setFuelPrice(applicableFuels[0].basePrice.toString());
    }
    setSelectedBrand('');
    setSelectedPresetVehicle('');
  }, [vehicleType]);

  // Update fuel price when fuel type changes
  useEffect(() => {
    const selectedFuelType = fuelTypes.find(f => f.value === fuelType);
    if (selectedFuelType) {
      setFuelPrice(selectedFuelType.basePrice.toString());
    }
  }, [fuelType]);

  // Update fuel consumption when preset vehicle is selected
  useEffect(() => {
    if (selectedPresetVehicle) {
      const vehicle = getVehicleById(selectedPresetVehicle);
      if (vehicle) {
        if (vehicle.type === 'motor' || vehicle.type === 'mobil') {
          // For motor/mobil: km/liter -> convert to L/100km
          const consumptionPer100km = 100 / vehicle.fuelEfficiency;
          setFuelConsumption(consumptionPer100km.toFixed(1));
        } else {
          // For truk/bus: already in L/100km
          setFuelConsumption(vehicle.fuelEfficiency.toString());
        }
      }
    }
  }, [selectedPresetVehicle]);

  // Auto-fill fuel consumption when user vehicle is selected
  useEffect(() => {
    if (selectedVehicleId && userVehicles.length > 0) {
      const selectedVehicle = userVehicles.find(v => v.id === selectedVehicleId);
      if (selectedVehicle?.fuel_consumption) {
        setFuelConsumption(selectedVehicle.fuel_consumption.toString());
      }
    }
  }, [selectedVehicleId, userVehicles]);

  const calculateResults = () => {
    const distanceKm = distance[0];
    const pricePerLiter = parseFloat(fuelPrice);
    const consumptionPer100km = parseFloat(fuelConsumption);
    
    if (!distanceKm || !pricePerLiter || !consumptionPer100km) {
      return { fuelNeeded: 0, totalCost: 0, co2Emission: 0, maxDistance: 0 };
    }

    const fuelNeeded = (distanceKm * consumptionPer100km) / 100;
    const totalCost = fuelNeeded * pricePerLiter;
    const co2Emission = fuelNeeded * 2.31; // 1 liter = 2.31 kg CO2
    
    // Calculate max distance with selected vehicle's tank
    let maxDistance = 0;
    if (selectedPresetVehicle) {
      const vehicle = getVehicleById(selectedPresetVehicle);
      if (vehicle) {
        maxDistance = vehicle.maxDistance;
      }
    }

    return { fuelNeeded, totalCost, co2Emission, maxDistance };
  };

  const { fuelNeeded, totalCost, co2Emission, maxDistance } = calculateResults();

  const handleReset = () => {
    setDistance([50]);
    setFuelPrice('10000');
    setFuelConsumption('10');
    setSelectedVehicleId(null);
    setVehicleType('motor');
    setSelectedBrand('');
    setSelectedPresetVehicle('');
    setFuelType('pertalite');
    setPeriodType('one-time');
    setNotes('');
    localStorage.removeItem('fuelCalculatorData');
  };

  const handleSaveCalculation = async () => {
    if (!user) return;

    try {
      await saveCalculation({
        distance_km: distance[0],
        fuel_price_per_liter: parseFloat(fuelPrice),
        fuel_consumption: parseFloat(fuelConsumption),
        total_fuel_needed: fuelNeeded,
        total_cost: totalCost,
        period_type: periodType,
        notes: notes || undefined,
        vehicle_id: selectedVehicleId || undefined
      });
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  };

  const availableBrands = getBrandsByType(vehicleType);
  const availableVehicles = selectedBrand ? getVehiclesByBrand(vehicleType, selectedBrand) : [];
  const applicableFuelTypes = fuelTypes.filter(f => f.applicableFor.includes(vehicleType));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="glass-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Kalkulator Anggaran BBM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vehicle Type Selection */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Label className="text-sm font-medium">Jenis Kendaraan</Label>
            <Select value={vehicleType} onValueChange={(value: 'motor' | 'mobil' | 'truk' | 'bus') => setVehicleType(value)}>
              <SelectTrigger className="input-focus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypeOptions.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Preset Vehicle Selection */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label className="text-sm font-medium">Pilih Kendaraan Preset (Opsional)</Label>
            
            {/* Brand Selection */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Pilih Merek" />
              </SelectTrigger>
              <SelectContent>
                {availableBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model Selection */}
            {selectedBrand && (
              <Select value={selectedPresetVehicle} onValueChange={setSelectedPresetVehicle}>
                <SelectTrigger className="input-focus">
                  <SelectValue placeholder="Pilih Model" />
                </SelectTrigger>
                <SelectContent>
                  {availableVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{vehicle.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {vehicle.year} • {vehicle.engine_cc}cc • 
                          {vehicle.type === 'motor' || vehicle.type === 'mobil' 
                            ? ` ${vehicle.fuelEfficiency} km/L` 
                            : ` ${vehicle.fuelEfficiency} L/100km`}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* User Vehicle Selection */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <VehicleSelector
                vehicles={userVehicles}
                selectedVehicleId={selectedVehicleId}
                onVehicleChange={setSelectedVehicleId}
                loading={vehiclesLoading}
              />
              <AddVehicleModal />
            </div>
          </div>

          {/* Fuel Type Selection */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Label className="text-sm font-medium">Jenis Bahan Bakar</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger className="input-focus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {applicableFuelTypes.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{fuel.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Rp {fuel.basePrice.toLocaleString()}/L
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Label className="text-sm font-medium">
              Jarak Tempuh: {distance[0]} km
            </Label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={vehicleType === 'truk' || vehicleType === 'bus' ? 1000 : 500}
              min={1}
              step={1}
              className="w-full slider-animate"
            />
          </div>

          {/* Fuel Price */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Label htmlFor="fuelPrice" className="text-sm font-medium">
              Harga BBM per Liter (Rp)
            </Label>
            <Input
              id="fuelPrice"
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="10000"
              className="input-focus"
            />
          </div>

          {/* Fuel Consumption */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <Label htmlFor="fuelConsumption" className="text-sm font-medium">
              Konsumsi BBM (L/100km)
            </Label>
            <Input
              id="fuelConsumption"
              type="number"
              step="0.1"
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(e.target.value)}
              placeholder="10"
              className="input-focus"
            />
          </div>

          {/* Period Type */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Label className="text-sm font-medium">Periode</Label>
            <Select value={periodType} onValueChange={setPeriodType}>
              <SelectTrigger className="input-focus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodTypes.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <Label htmlFor="notes" className="text-sm font-medium">
              Catatan (Opsional)
            </Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="contoh: perjalanan ke kantor"
              className="input-focus"
            />
          </div>

          <div className="flex gap-2 animate-slide-up" style={{ animationDelay: '1s' }}>
            <Button onClick={handleReset} variant="outline" className="flex-1 button-press">
              Reset
            </Button>
            {user && (
              <Button onClick={handleSaveCalculation} className="flex-1 button-press hover-lift">
                Simpan Perhitungan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Results Card */}
        <Card className="glass-card animate-slide-up hover-lift" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Hasil Perhitungan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">BBM Dibutuhkan</span>
                </div>
                <span className="font-semibold">{fuelNeeded.toFixed(2)} L</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-all duration-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Total Biaya</span>
                </div>
                <span className="font-semibold text-lg">
                  Rp {totalCost.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Emisi CO₂</span>
                </div>
                <span className="font-semibold">{co2Emission.toFixed(2)} kg</span>
              </div>

              {maxDistance > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Jarak Maks Tangki Penuh</span>
                  </div>
                  <span className="font-semibold">{maxDistance} km</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="glass-card animate-slide-up hover-lift" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-base">💡 Tips Hemat BBM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="hover-lift transition-all duration-200">• Gunakan kendaraan umum untuk menghemat hingga 70%</p>
            <p className="hover-lift transition-all duration-200">• Periksa tekanan ban secara rutin</p>
            <p className="hover-lift transition-all duration-200">• Hindari akselerasi mendadak</p>
            <p className="hover-lift transition-all duration-200">• Matikan AC saat di jalan macet</p>
            {(vehicleType === 'truk' || vehicleType === 'bus') && (
              <>
                <p className="hover-lift transition-all duration-200">• Lakukan perawatan mesin secara berkala</p>
                <p className="hover-lift transition-all duration-200">• Gunakan rute yang optimal</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FuelCalculator;
