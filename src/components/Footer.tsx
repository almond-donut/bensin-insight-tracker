
import { Fuel, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-emerald-500 p-2 rounded-xl">
                <Fuel className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Bensinku</h3>
            </div>
            <p className="text-muted-foreground">
              Platform terdepan untuk mengelola biaya bahan bakar dengan cerdas. 
              Khusus untuk driver Grab dan mahasiswa.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Dibuat dengan</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>untuk Indonesia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Tautan Cepat</h4>
            <div className="space-y-2">
              <a href="#kalkulator" className="block text-muted-foreground hover:text-primary transition-colors">
                Kalkulator BBM
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Panduan Penggunaan
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Daftar Kendaraan
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Tips Hemat BBM
              </a>
            </div>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Untuk Pengguna</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Driver Grab
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Mahasiswa
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Komunitas
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog & Artikel
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@bensinku.id</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+62 821 2345 6789</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Bensinku. Semua hak dilindungi.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
