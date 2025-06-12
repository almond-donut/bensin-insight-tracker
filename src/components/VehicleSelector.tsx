
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onVehicleChange: (vehicleId: string) => void;
  loading?: boolean;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicleId,
  onVehicleChange,
  loading = false
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Pilih Kendaraan
      </label>
      <Select 
        value={selectedVehicleId || ''} 
        onValueChange={onVehicleChange}
        disabled={loading || vehicles.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue 
            placeholder={
              loading 
                ? "Memuat kendaraan..." 
                : vehicles.length === 0 
                  ? "Belum ada kendaraan" 
                  : "Pilih kendaraan"
            } 
          />
        </SelectTrigger>
        <SelectContent>
          {vehicles.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id}>
              <div className="flex flex-col">
                <span className="font-medium">
                  {vehicle.vehicle_model || vehicle.vehicle_type}
                </span>
                {vehicle.fuel_consumption && (
                  <span className="text-xs text-muted-foreground">
                    {vehicle.fuel_consumption} L/100km
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
