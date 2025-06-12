
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Vehicle {
  id: string;
  user_id: string;
  vehicle_type: string;
  vehicle_model?: string;
  fuel_consumption?: number;
  created_at: string;
}

export const useVehicles = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVehicles = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_vehicles')
        .select('*')
        .eq('user_id', user.id)
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
      setLoading(false);
    }
  };

  const addVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_vehicles')
        .insert({
          user_id: user.id,
          ...vehicleData
        })
        .select()
        .single();

      if (error) throw error;

      setVehicles(prev => [data, ...prev]);
      toast({
        title: 'Berhasil',
        description: 'Kendaraan berhasil ditambahkan'
      });

      return data;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: 'Error',
        description: 'Gagal menambahkan kendaraan',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updateVehicle = async (id: string, vehicleData: Partial<Omit<Vehicle, 'id' | 'user_id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('user_vehicles')
        .update(vehicleData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setVehicles(prev => prev.map(vehicle => 
        vehicle.id === id ? data : vehicle
      ));

      toast({
        title: 'Berhasil',
        description: 'Kendaraan berhasil diperbarui'
      });

      return data;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast({
        title: 'Error',
        description: 'Gagal memperbarui kendaraan',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      toast({
        title: 'Berhasil',
        description: 'Kendaraan berhasil dihapus'
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus kendaraan',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  return {
    vehicles,
    loading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    refetch: fetchVehicles
  };
};
