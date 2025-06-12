
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFuelCalculations } from '@/hooks/useFuelCalculations';

interface SaveCalculationButtonProps {
  calculationData: {
    distance_km: number;
    fuel_price_per_liter: number;
    fuel_consumption: number;
    total_fuel_needed: number;
    total_cost: number;
  };
}

const SaveCalculationButton: React.FC<SaveCalculationButtonProps> = ({ calculationData }) => {
  const { user } = useAuth();
  const { saveCalculation } = useFuelCalculations();
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [periodType, setPeriodType] = useState('one-time');

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCalculation({
        ...calculationData,
        period_type: periodType,
        notes: notes.trim() || undefined
      });
      setIsOpen(false);
      setNotes('');
      setPeriodType('one-time');
    } catch (error) {
      console.error('Failed to save calculation:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4" variant="outline">
          <Save className="mr-2 h-4 w-4" />
          Simpan Perhitungan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Simpan Perhitungan</DialogTitle>
          <DialogDescription>
            Simpan perhitungan ini untuk melacak pengeluaran BBM Anda
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="period_type">Jenis Perjalanan</Label>
            <Select value={periodType} onValueChange={setPeriodType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis perjalanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">Sekali Jalan</SelectItem>
                <SelectItem value="daily">Harian</SelectItem>
                <SelectItem value="weekly">Mingguan</SelectItem>
                <SelectItem value="monthly">Bulanan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Perjalanan ke kantor, mudik, dll"
            />
          </div>

          <div className="bg-muted p-3 rounded-lg space-y-1">
            <p className="text-sm font-medium">Ringkasan:</p>
            <p className="text-sm">Jarak: {calculationData.distance_km} km</p>
            <p className="text-sm">BBM: {calculationData.total_fuel_needed.toFixed(2)} liter</p>
            <p className="text-sm font-bold">Total: Rp {calculationData.total_cost.toLocaleString('id-ID')}</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={saving}>
              Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveCalculationButton;
