
import { Calculator, TrendingUp, Users, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Platform #1 untuk Driver Grab & Mahasiswa</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Kelola Biaya
            <span className="gradient-text block">Bahan Bakar</span>
            dengan Cerdas
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Kalkulator canggih untuk menghitung estimasi biaya BBM harian dan bulanan. 
            Khusus untuk driver Grab dan mahasiswa yang ingin mengoptimalkan pengeluaran.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              className="btn-primary text-lg px-8 py-4"
              onClick={() => document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Mulai Hitung Sekarang
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Lihat Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="glass-card p-8 rounded-2xl text-center animate-slide-in">
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">100+</h3>
              <p className="text-muted-foreground">Model Kendaraan</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">99%</h3>
              <p className="text-muted-foreground">Akurasi Perhitungan</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">Instan</h3>
              <p className="text-muted-foreground">Perhitungan Real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
