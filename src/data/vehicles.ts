
export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: 'motor' | 'mobil' | 'truk' | 'bus';
  year: string;
  engine_cc: number;
  fuelEfficiency: number; // km/liter for motor/mobil, liter/100km for truk/bus
  tankCapacity: number; // liters
  maxDistance: number; // km
  fuelType: 'bensin' | 'solar';
}

export const vehicles: Vehicle[] = [
  // Motor (40 units)
  { id: 'honda-vario-125', name: 'Vario 125', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 125, fuelEfficiency: 51.7, tankCapacity: 5.5, maxDistance: 284, fuelType: 'bensin' },
  { id: 'honda-vario-160', name: 'Vario 160', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 160, fuelEfficiency: 46.9, tankCapacity: 5.5, maxDistance: 258, fuelType: 'bensin' },
  { id: 'yamaha-aerox-155', name: 'Aerox 155 Connected', brand: 'Yamaha', type: 'motor', year: '2024-2025', engine_cc: 155, fuelEfficiency: 47.1, tankCapacity: 5.5, maxDistance: 259, fuelType: 'bensin' },
  { id: 'yamaha-nmax-155', name: 'NMAX 155', brand: 'Yamaha', type: 'motor', year: '2024-2025', engine_cc: 155, fuelEfficiency: 45.0, tankCapacity: 7.1, maxDistance: 319, fuelType: 'bensin' },
  { id: 'honda-pcx-160', name: 'PCX 160', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 160, fuelEfficiency: 45.2, tankCapacity: 8.1, maxDistance: 366, fuelType: 'bensin' },
  { id: 'honda-beat', name: 'Beat', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 110, fuelEfficiency: 60.6, tankCapacity: 4.2, maxDistance: 254, fuelType: 'bensin' },
  { id: 'honda-scoopy', name: 'Scoopy', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 110, fuelEfficiency: 59.0, tankCapacity: 4.2, maxDistance: 248, fuelType: 'bensin' },
  { id: 'yamaha-mio-m3', name: 'Mio M3', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 50.0, tankCapacity: 4.2, maxDistance: 210, fuelType: 'bensin' },
  { id: 'yamaha-x-ride-125', name: 'X-Ride 125', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 48.0, tankCapacity: 4.2, maxDistance: 202, fuelType: 'bensin' },
  { id: 'honda-adv-160', name: 'ADV 160', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 160, fuelEfficiency: 45.0, tankCapacity: 8.1, maxDistance: 364, fuelType: 'bensin' },
  { id: 'suzuki-address-125', name: 'Address 125', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 52.0, tankCapacity: 5.0, maxDistance: 260, fuelType: 'bensin' },
  { id: 'suzuki-nex-ii', name: 'Nex II', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 115, fuelEfficiency: 55.0, tankCapacity: 3.5, maxDistance: 192, fuelType: 'bensin' },
  { id: 'honda-genio', name: 'Genio', brand: 'Honda', type: 'motor', year: '2024-2025', engine_cc: 110, fuelEfficiency: 59.1, tankCapacity: 4.2, maxDistance: 248, fuelType: 'bensin' },
  { id: 'yamaha-freego', name: 'FreeGo', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 49.0, tankCapacity: 4.2, maxDistance: 206, fuelType: 'bensin' },
  { id: 'yamaha-fino-125', name: 'Fino 125', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 50.0, tankCapacity: 4.2, maxDistance: 210, fuelType: 'bensin' },
  { id: 'honda-supra-x-125', name: 'Supra X 125', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 57.2, tankCapacity: 4.0, maxDistance: 229, fuelType: 'bensin' },
  { id: 'honda-revo', name: 'Revo', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 110, fuelEfficiency: 62.2, tankCapacity: 4.0, maxDistance: 249, fuelType: 'bensin' },
  { id: 'yamaha-jupiter-z1', name: 'Jupiter Z1', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 115, fuelEfficiency: 55.0, tankCapacity: 4.1, maxDistance: 226, fuelType: 'bensin' },
  { id: 'yamaha-vega-force', name: 'Vega Force', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 115, fuelEfficiency: 54.0, tankCapacity: 4.0, maxDistance: 216, fuelType: 'bensin' },
  { id: 'honda-cb150r', name: 'CB150R Streetfire', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 40.8, tankCapacity: 12.0, maxDistance: 490, fuelType: 'bensin' },
  { id: 'honda-cbr150r', name: 'CBR150R', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 39.0, tankCapacity: 12.0, maxDistance: 468, fuelType: 'bensin' },
  { id: 'yamaha-mt-15', name: 'MT-15', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 155, fuelEfficiency: 42.0, tankCapacity: 10.0, maxDistance: 420, fuelType: 'bensin' },
  { id: 'yamaha-xsr-155', name: 'XSR 155', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 155, fuelEfficiency: 41.0, tankCapacity: 10.0, maxDistance: 410, fuelType: 'bensin' },
  { id: 'suzuki-gsx-r150', name: 'GSX-R150', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 40.0, tankCapacity: 11.0, maxDistance: 440, fuelType: 'bensin' },
  { id: 'suzuki-satria-f150', name: 'Satria F150', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 39.0, tankCapacity: 4.0, maxDistance: 156, fuelType: 'bensin' },
  { id: 'honda-sonic-150r', name: 'Sonic 150R', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 40.0, tankCapacity: 4.0, maxDistance: 160, fuelType: 'bensin' },
  { id: 'yamaha-mx-king-150', name: 'MX King 150', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 41.0, tankCapacity: 4.2, maxDistance: 172, fuelType: 'bensin' },
  { id: 'honda-crf150l', name: 'CRF150L', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 39.0, tankCapacity: 7.2, maxDistance: 281, fuelType: 'bensin' },
  { id: 'yamaha-wr-155r', name: 'WR 155 R', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 155, fuelEfficiency: 38.0, tankCapacity: 8.1, maxDistance: 308, fuelType: 'bensin' },
  { id: 'kawasaki-klx-150', name: 'KLX 150', brand: 'Kawasaki', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 40.0, tankCapacity: 6.9, maxDistance: 276, fuelType: 'bensin' },
  { id: 'honda-verza-150', name: 'Verza 150', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 48.0, tankCapacity: 12.0, maxDistance: 576, fuelType: 'bensin' },
  { id: 'yamaha-byson-fi', name: 'Byson FI', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 45.0, tankCapacity: 12.0, maxDistance: 540, fuelType: 'bensin' },
  { id: 'suzuki-thunder-125', name: 'Thunder 125', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 50.0, tankCapacity: 4.0, maxDistance: 200, fuelType: 'bensin' },
  { id: 'honda-megapro-primus', name: 'Megapro Primus', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 150, fuelEfficiency: 46.0, tankCapacity: 12.0, maxDistance: 552, fuelType: 'bensin' },
  { id: 'yamaha-v-star-110', name: 'V Star 110', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 110, fuelEfficiency: 55.0, tankCapacity: 4.0, maxDistance: 220, fuelType: 'bensin' },
  { id: 'honda-blade-125', name: 'Blade 125', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 50.0, tankCapacity: 4.0, maxDistance: 200, fuelType: 'bensin' },
  { id: 'yamaha-soul-gt', name: 'Soul GT', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 48.0, tankCapacity: 4.2, maxDistance: 202, fuelType: 'bensin' },
  { id: 'suzuki-smash-fi', name: 'Smash FI', brand: 'Suzuki', type: 'motor', year: '2024', engine_cc: 110, fuelEfficiency: 60.0, tankCapacity: 4.0, maxDistance: 240, fuelType: 'bensin' },
  { id: 'honda-spacy', name: 'Spacy', brand: 'Honda', type: 'motor', year: '2024', engine_cc: 110, fuelEfficiency: 58.0, tankCapacity: 5.0, maxDistance: 290, fuelType: 'bensin' },
  { id: 'yamaha-lexi-125', name: 'Lexi 125', brand: 'Yamaha', type: 'motor', year: '2024', engine_cc: 125, fuelEfficiency: 47.0, tankCapacity: 4.2, maxDistance: 197, fuelType: 'bensin' },

  // Mobil (30 units)
  { id: 'toyota-avanza', name: 'Avanza', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 43, maxDistance: 645, fuelType: 'bensin' },
  { id: 'toyota-calya', name: 'Calya', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 20.0, tankCapacity: 36, maxDistance: 720, fuelType: 'bensin' },
  { id: 'daihatsu-sigra', name: 'Sigra', brand: 'Daihatsu', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 20.0, tankCapacity: 36, maxDistance: 720, fuelType: 'bensin' },
  { id: 'honda-brio', name: 'Brio', brand: 'Honda', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 20.0, tankCapacity: 35, maxDistance: 700, fuelType: 'bensin' },
  { id: 'toyota-agya', name: 'Agya', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 19.0, tankCapacity: 33, maxDistance: 627, fuelType: 'bensin' },
  { id: 'daihatsu-ayla', name: 'Ayla', brand: 'Daihatsu', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 19.0, tankCapacity: 33, maxDistance: 627, fuelType: 'bensin' },
  { id: 'mitsubishi-xpander', name: 'Xpander', brand: 'Mitsubishi', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 14.0, tankCapacity: 45, maxDistance: 630, fuelType: 'bensin' },
  { id: 'suzuki-ertiga', name: 'Ertiga', brand: 'Suzuki', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 14.5, tankCapacity: 45, maxDistance: 652, fuelType: 'bensin' },
  { id: 'toyota-veloz', name: 'Veloz', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 43, maxDistance: 645, fuelType: 'bensin' },
  { id: 'honda-mobilio', name: 'Mobilio', brand: 'Honda', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 14.8, tankCapacity: 42, maxDistance: 621, fuelType: 'bensin' },
  { id: 'toyota-innova-zenix-hybrid', name: 'Innova Zenix Hybrid', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 2000, fuelEfficiency: 23.4, tankCapacity: 52, maxDistance: 1216, fuelType: 'bensin' },
  { id: 'toyota-corolla-cross-hybrid', name: 'Corolla Cross Hybrid', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1800, fuelEfficiency: 23.4, tankCapacity: 36, maxDistance: 842, fuelType: 'bensin' },
  { id: 'honda-hr-v', name: 'HR-V', brand: 'Honda', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 17.0, tankCapacity: 40, maxDistance: 680, fuelType: 'bensin' },
  { id: 'toyota-yaris-cross', name: 'Yaris Cross', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 18.0, tankCapacity: 42, maxDistance: 756, fuelType: 'bensin' },
  { id: 'suzuki-xl7', name: 'XL7', brand: 'Suzuki', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 45, maxDistance: 675, fuelType: 'bensin' },
  { id: 'mitsubishi-pajero-sport', name: 'Pajero Sport', brand: 'Mitsubishi', type: 'mobil', year: '2024-2025', engine_cc: 2400, fuelEfficiency: 12.0, tankCapacity: 68, maxDistance: 816, fuelType: 'solar' },
  { id: 'toyota-fortuner', name: 'Fortuner', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 2400, fuelEfficiency: 12.0, tankCapacity: 80, maxDistance: 960, fuelType: 'solar' },
  { id: 'honda-cr-v', name: 'CR-V', brand: 'Honda', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 16.0, tankCapacity: 57, maxDistance: 912, fuelType: 'bensin' },
  { id: 'toyota-raize', name: 'Raize', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 18.0, tankCapacity: 36, maxDistance: 648, fuelType: 'bensin' },
  { id: 'daihatsu-rocky', name: 'Rocky', brand: 'Daihatsu', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 18.0, tankCapacity: 36, maxDistance: 648, fuelType: 'bensin' },
  { id: 'suzuki-ignis', name: 'Ignis', brand: 'Suzuki', type: 'mobil', year: '2024-2025', engine_cc: 1200, fuelEfficiency: 19.0, tankCapacity: 32, maxDistance: 608, fuelType: 'bensin' },
  { id: 'toyota-corolla-altis', name: 'Corolla Altis', brand: 'Toyota', type: 'mobil', year: '2024', engine_cc: 1800, fuelEfficiency: 15.0, tankCapacity: 50, maxDistance: 750, fuelType: 'bensin' },
  { id: 'honda-civic', name: 'Civic', brand: 'Honda', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 16.0, tankCapacity: 47, maxDistance: 752, fuelType: 'bensin' },
  { id: 'mazda-cx-3', name: 'CX-3', brand: 'Mazda', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 16.0, tankCapacity: 48, maxDistance: 768, fuelType: 'bensin' },
  { id: 'hyundai-creta', name: 'Creta', brand: 'Hyundai', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 16.0, tankCapacity: 40, maxDistance: 640, fuelType: 'bensin' },
  { id: 'kia-seltos', name: 'Seltos', brand: 'Kia', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 50, maxDistance: 750, fuelType: 'bensin' },
  { id: 'toyota-rush', name: 'Rush', brand: 'Toyota', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 45, maxDistance: 675, fuelType: 'bensin' },
  { id: 'daihatsu-terios', name: 'Terios', brand: 'Daihatsu', type: 'mobil', year: '2024-2025', engine_cc: 1500, fuelEfficiency: 15.0, tankCapacity: 45, maxDistance: 675, fuelType: 'bensin' },
  { id: 'nissan-livina', name: 'Livina', brand: 'Nissan', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 14.0, tankCapacity: 45, maxDistance: 630, fuelType: 'bensin' },
  { id: 'wuling-almaz', name: 'Almaz', brand: 'Wuling', type: 'mobil', year: '2024', engine_cc: 1500, fuelEfficiency: 14.0, tankCapacity: 45, maxDistance: 630, fuelType: 'bensin' },

  // Truk (20 units)
  { id: 'mitsubishi-colt-diesel-fe71', name: 'Colt Diesel FE 71', brand: 'Mitsubishi', type: 'truk', year: '2024', engine_cc: 3900, fuelEfficiency: 12.5, tankCapacity: 70, maxDistance: 560, fuelType: 'solar' },
  { id: 'mitsubishi-colt-diesel-fe74', name: 'Colt Diesel FE 74', brand: 'Mitsubishi', type: 'truk', year: '2024', engine_cc: 3900, fuelEfficiency: 12.0, tankCapacity: 100, maxDistance: 833, fuelType: 'solar' },
  { id: 'isuzu-elf-nmr71', name: 'Elf NMR 71', brand: 'Isuzu', type: 'truk', year: '2024-2025', engine_cc: 4700, fuelEfficiency: 10.0, tankCapacity: 100, maxDistance: 1000, fuelType: 'solar' },
  { id: 'isuzu-elf-nlr55', name: 'Elf NLR 55', brand: 'Isuzu', type: 'truk', year: '2024', engine_cc: 2800, fuelEfficiency: 11.0, tankCapacity: 75, maxDistance: 681, fuelType: 'solar' },
  { id: 'hino-dutro-110', name: 'Dutro 110', brand: 'Hino', type: 'truk', year: '2024', engine_cc: 4000, fuelEfficiency: 12.0, tankCapacity: 100, maxDistance: 833, fuelType: 'solar' },
  { id: 'hino-dutro-130', name: 'Dutro 130', brand: 'Hino', type: 'truk', year: '2024', engine_cc: 4000, fuelEfficiency: 11.5, tankCapacity: 100, maxDistance: 869, fuelType: 'solar' },
  { id: 'toyota-dyna-110', name: 'Dyna 110', brand: 'Toyota', type: 'truk', year: '2024', engine_cc: 4000, fuelEfficiency: 12.0, tankCapacity: 100, maxDistance: 833, fuelType: 'solar' },
  { id: 'toyota-dyna-130', name: 'Dyna 130', brand: 'Toyota', type: 'truk', year: '2024', engine_cc: 4000, fuelEfficiency: 11.5, tankCapacity: 100, maxDistance: 869, fuelType: 'solar' },
  { id: 'mitsubishi-fuso-fm517', name: 'Fuso FM 517', brand: 'Mitsubishi', type: 'truk', year: '2024', engine_cc: 7500, fuelEfficiency: 15.0, tankCapacity: 200, maxDistance: 1333, fuelType: 'solar' },
  { id: 'mitsubishi-fuso-fn527', name: 'Fuso FN 527', brand: 'Mitsubishi', type: 'truk', year: '2024', engine_cc: 7500, fuelEfficiency: 16.0, tankCapacity: 200, maxDistance: 1250, fuelType: 'solar' },
  { id: 'isuzu-giga-fvr', name: 'Giga FVR', brand: 'Isuzu', type: 'truk', year: '2024', engine_cc: 6400, fuelEfficiency: 14.0, tankCapacity: 200, maxDistance: 1428, fuelType: 'solar' },
  { id: 'isuzu-giga-fvm', name: 'Giga FVM', brand: 'Isuzu', type: 'truk', year: '2024', engine_cc: 6400, fuelEfficiency: 15.0, tankCapacity: 200, maxDistance: 1333, fuelType: 'solar' },
  { id: 'hino-ranger-fm260', name: 'Ranger FM 260', brand: 'Hino', type: 'truk', year: '2024', engine_cc: 7600, fuelEfficiency: 16.0, tankCapacity: 200, maxDistance: 1250, fuelType: 'solar' },
  { id: 'hino-ranger-fg235', name: 'Ranger FG 235', brand: 'Hino', type: 'truk', year: '2024', engine_cc: 7600, fuelEfficiency: 15.0, tankCapacity: 200, maxDistance: 1333, fuelType: 'solar' },
  { id: 'ud-trucks-quester-cwe', name: 'Quester CWE', brand: 'UD Trucks', type: 'truk', year: '2024', engine_cc: 11000, fuelEfficiency: 18.0, tankCapacity: 300, maxDistance: 1666, fuelType: 'solar' },
  { id: 'ud-trucks-kuzer-rke', name: 'Kuzer RKE', brand: 'UD Trucks', type: 'truk', year: '2024', engine_cc: 4700, fuelEfficiency: 12.0, tankCapacity: 100, maxDistance: 833, fuelType: 'solar' },
  { id: 'mercedes-axor-2528', name: 'Axor 2528', brand: 'Mercedes-Benz', type: 'truk', year: '2024', engine_cc: 7200, fuelEfficiency: 16.0, tankCapacity: 200, maxDistance: 1250, fuelType: 'solar' },
  { id: 'scania-p360', name: 'P360', brand: 'Scania', type: 'truk', year: '2024', engine_cc: 13000, fuelEfficiency: 18.0, tankCapacity: 300, maxDistance: 1666, fuelType: 'solar' },
  { id: 'volvo-fmx-400', name: 'FMX 400', brand: 'Volvo', type: 'truk', year: '2024', engine_cc: 12800, fuelEfficiency: 19.0, tankCapacity: 300, maxDistance: 1578, fuelType: 'solar' },
  { id: 'man-tgs-28360', name: 'TGS 28.360', brand: 'MAN', type: 'truk', year: '2024', engine_cc: 10500, fuelEfficiency: 17.0, tankCapacity: 300, maxDistance: 1764, fuelType: 'solar' },

  // Bus (10 units)
  { id: 'mercedes-oh-1626', name: 'OH 1626', brand: 'Mercedes-Benz', type: 'bus', year: '2024', engine_cc: 7200, fuelEfficiency: 20.0, tankCapacity: 400, maxDistance: 2000, fuelType: 'solar' },
  { id: 'hino-rn-285', name: 'RN 285', brand: 'Hino', type: 'bus', year: '2024', engine_cc: 7600, fuelEfficiency: 18.0, tankCapacity: 300, maxDistance: 1666, fuelType: 'solar' },
  { id: 'isuzu-nqr-71', name: 'NQR 71', brand: 'Isuzu', type: 'bus', year: '2024', engine_cc: 4700, fuelEfficiency: 15.0, tankCapacity: 200, maxDistance: 1333, fuelType: 'solar' },
  { id: 'scania-k360-ib', name: 'K360 IB', brand: 'Scania', type: 'bus', year: '2024', engine_cc: 9000, fuelEfficiency: 22.0, tankCapacity: 400, maxDistance: 1818, fuelType: 'solar' },
  { id: 'volvo-b11r', name: 'B11R', brand: 'Volvo', type: 'bus', year: '2024', engine_cc: 10800, fuelEfficiency: 23.0, tankCapacity: 400, maxDistance: 1739, fuelType: 'solar' },
  { id: 'mitsubishi-fuso-rm117', name: 'Fuso RM 117', brand: 'Mitsubishi', type: 'bus', year: '2024', engine_cc: 7500, fuelEfficiency: 19.0, tankCapacity: 300, maxDistance: 1578, fuelType: 'solar' },
  { id: 'hino-ak-240', name: 'AK 240', brand: 'Hino', type: 'bus', year: '2024', engine_cc: 7600, fuelEfficiency: 18.0, tankCapacity: 300, maxDistance: 1666, fuelType: 'solar' },
  { id: 'mercedes-of-917', name: 'OF 917', brand: 'Mercedes-Benz', type: 'bus', year: '2024', engine_cc: 4800, fuelEfficiency: 16.0, tankCapacity: 200, maxDistance: 1250, fuelType: 'solar' },
  { id: 'man-r37', name: 'R37', brand: 'MAN', type: 'bus', year: '2024', engine_cc: 10500, fuelEfficiency: 22.0, tankCapacity: 400, maxDistance: 1818, fuelType: 'solar' },
  { id: 'scania-k410-eb', name: 'K410 EB', brand: 'Scania', type: 'bus', year: '2024', engine_cc: 13000, fuelEfficiency: 24.0, tankCapacity: 400, maxDistance: 1666, fuelType: 'solar' }
];

export const getVehiclesByType = (type: 'motor' | 'mobil' | 'truk' | 'bus') => {
  return vehicles.filter(vehicle => vehicle.type === type);
};

export const getVehicleById = (id: string) => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const getBrandsByType = (type: 'motor' | 'mobil' | 'truk' | 'bus') => {
  const vehiclesOfType = getVehiclesByType(type);
  const brands = [...new Set(vehiclesOfType.map(vehicle => vehicle.brand))];
  return brands.sort();
};

export const getVehiclesByBrand = (type: 'motor' | 'mobil' | 'truk' | 'bus', brand: string) => {
  return vehicles.filter(vehicle => vehicle.type === type && vehicle.brand === brand);
};

export const defaultFuelPrice = {
  motor: 10000, // Pertalite
  mobil: 10000, // Pertalite
  truk: 12000,  // Solar
  bus: 12000    // Solar
};
