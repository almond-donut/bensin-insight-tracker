
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Bike, Plus, Edit, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  vehicle_type: string;
  vehicle_model: string;
  fuel_consumption: number;
  created_at: string;
}

const Vehicles: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    vehicle_type: '',
    vehicle_model: '',
    fuel_consumption: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      fetchVehicles();
    }
  }, [user, loading, navigate]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_vehicles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data kendaraan',
        variant: 'destructive'
      });
    } finally {
      setLoadingVehicles(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.vehicle_type || !formData.vehicle_model || !formData.fuel_consumption) {
      toast({
        title: 'Error',
        description: 'Semua field harus diisi',
        variant: 'destructive'
      });
      return;
    }

    try {
      const vehicleData = {
        user_id: user?.id,
        vehicle_type: formData.vehicle_type,
        vehicle_model: formData.vehicle_model,
        fuel_consumption: parseFloat(formData.fuel_consumption)
      };

      if (editingVehicle) {
        const { error } = await supabase
          .from('user_vehicles')
          .update(vehicleData)
          .eq('id', editingVehicle.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Kendaraan berhasil diperbarui'
        });
      } else {
        const { error } = await supabase
          .from('user_vehicles')
          .insert(vehicleData);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Kendaraan berhasil ditambahkan'
        });
      }

      setFormData({ vehicle_type: '', vehicle_model: '', fuel_consumption: '' });
      setShowAddForm(false);
      setEditingVehicle(null);
      fetchVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyimpan kendaraan',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicle_type: vehicle.vehicle_type,
      vehicle_model: vehicle.vehicle_model,
      fuel_consumption: vehicle.fuel_consumption.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus kendaraan ini?')) return;

    try {
      const { error } = await supabase
        .from('user_vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Berhasil',
        description: 'Kendaraan berhasil dihapus'
      });

      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus kendaraan',
        variant: 'destructive'
      });
    }
  };

  if (loading || loadingVehicles) {
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
              <h1 className="text-3xl font-bold gradient-text">Kelola Kendaraan</h1>
              <p className="text-muted-foreground">Tambah dan kelola kendaraan Anda</p>
            </div>
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingVehicle(null);
                setFormData({ vehicle_type: '', vehicle_model: '', fuel_consumption: '' });
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tambah Kendaraan
            </Button>
          </div>

          {showAddForm && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>
                  {editingVehicle ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="vehicle_type">Jenis Kendaraan</Label>
                    <Select 
                      value={formData.vehicle_type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kendaraan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motor">Motor</SelectItem>
                        <SelectItem value="mobil">Mobil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vehicle_model">Model Kendaraan</Label>
                    <Input
                      id="vehicle_model"
                      value={formData.vehicle_model}
                      onChange={(e) => setFormData(prev => ({ ...prev, vehicle_model: e.target.value }))}
                      placeholder="Contoh: Honda Beat, Toyota Avanza"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fuel_consumption">Konsumsi BBM (km/liter)</Label>
                    <Input
                      id="fuel_consumption"
                      type="number"
                      step="0.1"
                      value={formData.fuel_consumption}
                      onChange={(e) => setFormData(prev => ({ ...prev, fuel_consumption: e.target.value }))}
                      placeholder="Contoh: 40"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingVehicle ? 'Update' : 'Simpan'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingVehicle(null);
                        setFormData({ vehicle_type: '', vehicle_model: '', fuel_consumption: '' });
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {vehicle.vehicle_type === 'motor' ? (
                        <Bike className="h-5 w-5 text-primary" />
                      ) : (
                        <Car className="h-5 w-5 text-primary" />
                      )}
                      <CardTitle className="text-lg">{vehicle.vehicle_model}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Jenis: <span className="capitalize">{vehicle.vehicle_type}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Konsumsi: {vehicle.fuel_consumption} km/liter
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ditambahkan: {new Date(vehicle.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {vehicles.length === 0 && (
            <Card className="glass-card">
              <CardContent className="text-center py-8">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada kendaraan</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Tambahkan kendaraan untuk mempermudah perhitungan BBM
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Kendaraan Pertama
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

export default Vehicles;
