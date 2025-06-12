
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useVehicles } from '@/hooks/useVehicles';

const AddVehicleModal: React.FC = () => {
  const { addVehicle } = useVehicles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_type: '',
    vehicle_model: '',
    fuel_consumption: ''
  });

  const vehicleTypes = [
    'Motor',
    'Mobil',
    'Truk',
    'Bus',
    'Lainnya'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicle_type) return;

    setLoading(true);
    try {
      await addVehicle({
        vehicle_type: formData.vehicle_type,
        vehicle_model: formData.vehicle_model || undefined,
        fuel_consumption: formData.fuel_consumption ? parseFloat(formData.fuel_consumption) : undefined
      });

      setFormData({
        vehicle_type: '',
        vehicle_model: '',
        fuel_consumption: ''
      });
      setOpen(false);
    } catch (error) {
      // Error handled by hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kendaraan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kendaraan Baru</DialogTitle>
          <DialogDescription>
            Tambahkan kendaraan untuk melacak anggaran bahan bakar per kendaraan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="vehicle_type">Jenis Kendaraan *</Label>
            <Select 
              value={formData.vehicle_type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kendaraan" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vehicle_model">Model/Nama Kendaraan</Label>
            <Input
              id="vehicle_model"
              placeholder="contoh: Honda Beat, Toyota Avanza"
              value={formData.vehicle_model}
              onChange={(e) => setFormData(prev => ({ ...prev, vehicle_model: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="fuel_consumption">Konsumsi BBM (L/100km)</Label>
            <Input
              id="fuel_consumption"
              type="number"
              step="0.1"
              placeholder="contoh: 5.5"
              value={formData.fuel_consumption}
              onChange={(e) => setFormData(prev => ({ ...prev, fuel_consumption: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || !formData.vehicle_type}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
