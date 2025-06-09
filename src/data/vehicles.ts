
export interface Vehicle {
  id: string;
  name: string;
  type: 'motor' | 'mobil';
  fuelEfficiency: number; // km/liter
  brand: string;
}

export const vehicles: Vehicle[] = [
  // Motor
  { id: 'honda-beat', name: 'Honda Beat', type: 'motor', fuelEfficiency: 47, brand: 'Honda' },
  { id: 'yamaha-nmax', name: 'Yamaha NMax', type: 'motor', fuelEfficiency: 35, brand: 'Yamaha' },
  { id: 'suzuki-address', name: 'Suzuki Address', type: 'motor', fuelEfficiency: 45, brand: 'Suzuki' },
  { id: 'kawasaki-ninja-250', name: 'Kawasaki Ninja 250', type: 'motor', fuelEfficiency: 28, brand: 'Kawasaki' },
  { id: 'yamaha-mio', name: 'Yamaha Mio', type: 'motor', fuelEfficiency: 50, brand: 'Yamaha' },
  { id: 'honda-vario', name: 'Honda Vario', type: 'motor', fuelEfficiency: 45, brand: 'Honda' },
  { id: 'suzuki-satria', name: 'Suzuki Satria', type: 'motor', fuelEfficiency: 35, brand: 'Suzuki' },
  { id: 'yamaha-jupiter', name: 'Yamaha Jupiter', type: 'motor', fuelEfficiency: 48, brand: 'Yamaha' },
  { id: 'honda-scoopy', name: 'Honda Scoopy', type: 'motor', fuelEfficiency: 50, brand: 'Honda' },
  { id: 'yamaha-xmax', name: 'Yamaha XMAX', type: 'motor', fuelEfficiency: 30, brand: 'Yamaha' },
  { id: 'honda-pcx', name: 'Honda PCX', type: 'motor', fuelEfficiency: 35, brand: 'Honda' },
  { id: 'yamaha-aerox', name: 'Yamaha Aerox', type: 'motor', fuelEfficiency: 32, brand: 'Yamaha' },
  { id: 'honda-cb150r', name: 'Honda CB150R', type: 'motor', fuelEfficiency: 30, brand: 'Honda' },
  { id: 'yamaha-r15', name: 'Yamaha R15', type: 'motor', fuelEfficiency: 28, brand: 'Yamaha' },
  { id: 'suzuki-nex', name: 'Suzuki NEX', type: 'motor', fuelEfficiency: 45, brand: 'Suzuki' },
  { id: 'honda-supra', name: 'Honda Supra X', type: 'motor', fuelEfficiency: 48, brand: 'Honda' },
  { id: 'yamaha-soul', name: 'Yamaha Soul GT', type: 'motor', fuelEfficiency: 42, brand: 'Yamaha' },
  { id: 'honda-revo', name: 'Honda Revo', type: 'motor', fuelEfficiency: 50, brand: 'Honda' },
  { id: 'suzuki-spin', name: 'Suzuki Spin', type: 'motor', fuelEfficiency: 47, brand: 'Suzuki' },
  { id: 'yamaha-vega', name: 'Yamaha Vega Force', type: 'motor', fuelEfficiency: 45, brand: 'Yamaha' },
  { id: 'honda-blade', name: 'Honda Blade', type: 'motor', fuelEfficiency: 48, brand: 'Honda' },
  { id: 'yamaha-fino', name: 'Yamaha Fino', type: 'motor', fuelEfficiency: 45, brand: 'Yamaha' },
  { id: 'suzuki-skydrive', name: 'Suzuki Skydrive', type: 'motor', fuelEfficiency: 42, brand: 'Suzuki' },
  { id: 'honda-spacy', name: 'Honda Spacy', type: 'motor', fuelEfficiency: 40, brand: 'Honda' },
  { id: 'yamaha-lexi', name: 'Yamaha Lexi', type: 'motor', fuelEfficiency: 35, brand: 'Yamaha' },
  { id: 'honda-genio', name: 'Honda Genio', type: 'motor', fuelEfficiency: 45, brand: 'Honda' },
  { id: 'yamaha-freego', name: 'Yamaha FreeGo', type: 'motor', fuelEfficiency: 38, brand: 'Yamaha' },
  { id: 'suzuki-burgman', name: 'Suzuki Burgman Street', type: 'motor', fuelEfficiency: 32, brand: 'Suzuki' },
  { id: 'honda-adv', name: 'Honda ADV 150', type: 'motor', fuelEfficiency: 35, brand: 'Honda' },
  { id: 'yamaha-gear', name: 'Yamaha Gear 125', type: 'motor', fuelEfficiency: 40, brand: 'Yamaha' },
  { id: 'honda-forza', name: 'Honda Forza', type: 'motor', fuelEfficiency: 28, brand: 'Honda' },
  { id: 'vespa-lx', name: 'Vespa LX 125', type: 'motor', fuelEfficiency: 30, brand: 'Vespa' },
  { id: 'vespa-primavera', name: 'Vespa Primavera', type: 'motor', fuelEfficiency: 32, brand: 'Vespa' },
  { id: 'vespa-sprint', name: 'Vespa Sprint', type: 'motor', fuelEfficiency: 30, brand: 'Vespa' },
  { id: 'benelli-zafferano', name: 'Benelli Zafferano', type: 'motor', fuelEfficiency: 35, brand: 'Benelli' },
  { id: 'honda-monkey', name: 'Honda Monkey', type: 'motor', fuelEfficiency: 40, brand: 'Honda' },
  { id: 'kawasaki-w175', name: 'Kawasaki W175', type: 'motor', fuelEfficiency: 38, brand: 'Kawasaki' },
  { id: 'honda-crf150l', name: 'Honda CRF150L', type: 'motor', fuelEfficiency: 35, brand: 'Honda' },
  { id: 'yamaha-wr155r', name: 'Yamaha WR155R', type: 'motor', fuelEfficiency: 32, brand: 'Yamaha' },
  { id: 'kawasaki-klx150', name: 'Kawasaki KLX150', type: 'motor', fuelEfficiency: 30, brand: 'Kawasaki' },
  { id: 'suzuki-gsx-r150', name: 'Suzuki GSX-R150', type: 'motor', fuelEfficiency: 28, brand: 'Suzuki' },
  { id: 'honda-cbr150r', name: 'Honda CBR150R', type: 'motor', fuelEfficiency: 30, brand: 'Honda' },
  { id: 'yamaha-mt15', name: 'Yamaha MT-15', type: 'motor', fuelEfficiency: 28, brand: 'Yamaha' },
  { id: 'kawasaki-z125', name: 'Kawasaki Z125 Pro', type: 'motor', fuelEfficiency: 45, brand: 'Kawasaki' },
  { id: 'honda-grom', name: 'Honda Grom', type: 'motor', fuelEfficiency: 47, brand: 'Honda' },
  { id: 'suzuki-raider', name: 'Suzuki Raider J', type: 'motor', fuelEfficiency: 40, brand: 'Suzuki' },
  { id: 'yamaha-sniper', name: 'Yamaha Sniper', type: 'motor', fuelEfficiency: 35, brand: 'Yamaha' },
  { id: 'honda-tmx', name: 'Honda TMX Supremo', type: 'motor', fuelEfficiency: 42, brand: 'Honda' },
  { id: 'suzuki-smash', name: 'Suzuki Smash', type: 'motor', fuelEfficiency: 50, brand: 'Suzuki' },
  { id: 'yamaha-crypton', name: 'Yamaha Crypton', type: 'motor', fuelEfficiency: 48, brand: 'Yamaha' },
  { id: 'honda-wave', name: 'Honda Wave', type: 'motor', fuelEfficiency: 52, brand: 'Honda' },

  // Mobil
  { id: 'toyota-avanza', name: 'Toyota Avanza', type: 'mobil', fuelEfficiency: 13, brand: 'Toyota' },
  { id: 'honda-brio', name: 'Honda Brio', type: 'mobil', fuelEfficiency: 16, brand: 'Honda' },
  { id: 'suzuki-ertiga', name: 'Suzuki Ertiga', type: 'mobil', fuelEfficiency: 14, brand: 'Suzuki' },
  { id: 'daihatsu-xenia', name: 'Daihatsu Xenia', type: 'mobil', fuelEfficiency: 13, brand: 'Daihatsu' },
  { id: 'mitsubishi-xpander', name: 'Mitsubishi Xpander', type: 'mobil', fuelEfficiency: 14, brand: 'Mitsubishi' },
  { id: 'toyota-calya', name: 'Toyota Calya', type: 'mobil', fuelEfficiency: 15, brand: 'Toyota' },
  { id: 'honda-mobilio', name: 'Honda Mobilio', type: 'mobil', fuelEfficiency: 14, brand: 'Honda' },
  { id: 'suzuki-ignis', name: 'Suzuki Ignis', type: 'mobil', fuelEfficiency: 18, brand: 'Suzuki' },
  { id: 'daihatsu-sigra', name: 'Daihatsu Sigra', type: 'mobil', fuelEfficiency: 15, brand: 'Daihatsu' },
  { id: 'toyota-rush', name: 'Toyota Rush', type: 'mobil', fuelEfficiency: 12, brand: 'Toyota' },
  { id: 'honda-jazz', name: 'Honda Jazz', type: 'mobil', fuelEfficiency: 15, brand: 'Honda' },
  { id: 'toyota-yaris', name: 'Toyota Yaris', type: 'mobil', fuelEfficiency: 16, brand: 'Toyota' },
  { id: 'nissan-march', name: 'Nissan March', type: 'mobil', fuelEfficiency: 17, brand: 'Nissan' },
  { id: 'honda-city', name: 'Honda City', type: 'mobil', fuelEfficiency: 15, brand: 'Honda' },
  { id: 'toyota-vios', name: 'Toyota Vios', type: 'mobil', fuelEfficiency: 16, brand: 'Toyota' },
  { id: 'nissan-grand-livina', name: 'Nissan Grand Livina', type: 'mobil', fuelEfficiency: 13, brand: 'Nissan' },
  { id: 'daihatsu-ayla', name: 'Daihatsu Ayla', type: 'mobil', fuelEfficiency: 18, brand: 'Daihatsu' },
  { id: 'toyota-agya', name: 'Toyota Agya', type: 'mobil', fuelEfficiency: 18, brand: 'Toyota' },
  { id: 'suzuki-wagon-r', name: 'Suzuki Wagon R', type: 'mobil', fuelEfficiency: 17, brand: 'Suzuki' },
  { id: 'daihatsu-terios', name: 'Daihatsu Terios', type: 'mobil', fuelEfficiency: 12, brand: 'Daihatsu' },
  { id: 'toyota-innova', name: 'Toyota Innova', type: 'mobil', fuelEfficiency: 11, brand: 'Toyota' },
  { id: 'mitsubishi-pajero', name: 'Mitsubishi Pajero Sport', type: 'mobil', fuelEfficiency: 10, brand: 'Mitsubishi' },
  { id: 'honda-crv', name: 'Honda CR-V', type: 'mobil', fuelEfficiency: 11, brand: 'Honda' },
  { id: 'toyota-fortuner', name: 'Toyota Fortuner', type: 'mobil', fuelEfficiency: 10, brand: 'Toyota' },
  { id: 'suzuki-sx4', name: 'Suzuki SX4', type: 'mobil', fuelEfficiency: 14, brand: 'Suzuki' },
  { id: 'nissan-juke', name: 'Nissan Juke', type: 'mobil', fuelEfficiency: 13, brand: 'Nissan' },
  { id: 'honda-hrv', name: 'Honda HR-V', type: 'mobil', fuelEfficiency: 14, brand: 'Honda' },
  { id: 'mazda-cx3', name: 'Mazda CX-3', type: 'mobil', fuelEfficiency: 15, brand: 'Mazda' },
  { id: 'toyota-chr', name: 'Toyota C-HR', type: 'mobil', fuelEfficiency: 14, brand: 'Toyota' },
  { id: 'suzuki-vitara', name: 'Suzuki Vitara', type: 'mobil', fuelEfficiency: 13, brand: 'Suzuki' },
  { id: 'mitsubishi-outlander', name: 'Mitsubishi Outlander', type: 'mobil', fuelEfficiency: 11, brand: 'Mitsubishi' },
  { id: 'nissan-xtrail', name: 'Nissan X-Trail', type: 'mobil', fuelEfficiency: 12, brand: 'Nissan' },
  { id: 'honda-pilot', name: 'Honda Pilot', type: 'mobil', fuelEfficiency: 9, brand: 'Honda' },
  { id: 'toyota-sienta', name: 'Toyota Sienta', type: 'mobil', fuelEfficiency: 16, brand: 'Toyota' },
  { id: 'honda-freed', name: 'Honda Freed', type: 'mobil', fuelEfficiency: 15, brand: 'Honda' },
  { id: 'nissan-serena', name: 'Nissan Serena', type: 'mobil', fuelEfficiency: 13, brand: 'Nissan' },
  { id: 'mazda-biante', name: 'Mazda Biante', type: 'mobil', fuelEfficiency: 12, brand: 'Mazda' },
  { id: 'toyota-alphard', name: 'Toyota Alphard', type: 'mobil', fuelEfficiency: 9, brand: 'Toyota' },
  { id: 'honda-odyssey', name: 'Honda Odyssey', type: 'mobil', fuelEfficiency: 10, brand: 'Honda' },
  { id: 'nissan-elgrand', name: 'Nissan Elgrand', type: 'mobil', fuelEfficiency: 8, brand: 'Nissan' },
  { id: 'suzuki-apv', name: 'Suzuki APV', type: 'mobil', fuelEfficiency: 12, brand: 'Suzuki' },
  { id: 'daihatsu-luxio', name: 'Daihatsu Luxio', type: 'mobil', fuelEfficiency: 13, brand: 'Daihatsu' },
  { id: 'isuzu-panther', name: 'Isuzu Panther', type: 'mobil', fuelEfficiency: 10, brand: 'Isuzu' },
  { id: 'mitsubishi-kuda', name: 'Mitsubishi Kuda', type: 'mobil', fuelEfficiency: 11, brand: 'Mitsubishi' },
  { id: 'toyota-hiace', name: 'Toyota Hiace', type: 'mobil', fuelEfficiency: 9, brand: 'Toyota' },
  { id: 'daihatsu-gran-max', name: 'Daihatsu Gran Max', type: 'mobil', fuelEfficiency: 13, brand: 'Daihatsu' },
  { id: 'suzuki-carry', name: 'Suzuki Carry', type: 'mobil', fuelEfficiency: 15, brand: 'Suzuki' },
  { id: 'honda-accord', name: 'Honda Accord', type: 'mobil', fuelEfficiency: 12, brand: 'Honda' },
  { id: 'toyota-camry', name: 'Toyota Camry', type: 'mobil', fuelEfficiency: 11, brand: 'Toyota' },
  { id: 'nissan-teana', name: 'Nissan Teana', type: 'mobil', fuelEfficiency: 10, brand: 'Nissan' },
  { id: 'mazda6', name: 'Mazda 6', type: 'mobil', fuelEfficiency: 12, brand: 'Mazda' },
  { id: 'bmw-320i', name: 'BMW 320i', type: 'mobil', fuelEfficiency: 10, brand: 'BMW' },
  { id: 'mercedes-c200', name: 'Mercedes C200', type: 'mobil', fuelEfficiency: 9, brand: 'Mercedes' }
];

export const getVehiclesByType = (type: 'motor' | 'mobil') => {
  return vehicles.filter(vehicle => vehicle.type === type);
};

export const getVehicleById = (id: string) => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const defaultFuelPrice = {
  motor: 10000, // Pertalite
  mobil: 10000  // Pertalite
};
