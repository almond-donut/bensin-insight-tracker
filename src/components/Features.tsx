
import { Shield, Zap, TrendingUp, Users, Calculator, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Perhitungan Akurat',
      description: 'Algoritma canggih dengan data real konsumsi BBM dari 100+ model kendaraan populer.',
      color: 'from-primary to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Hasil Instan',
      description: 'Dapatkan estimasi biaya BBM dalam hitungan detik tanpa perlu menunggu.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Proyeksi Bulanan',
      description: 'Lihat estimasi pengeluaran harian, mingguan, dan bulanan untuk perencanaan budget.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Khusus Driver & Mahasiswa',
      description: 'Dirancang spesifik untuk kebutuhan driver Grab dan mahasiswa yang sering bepergian.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Data Terlindungi',
      description: 'Keamanan data terjamin dengan enkripsi tingkat enterprise untuk pengguna premium.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Riwayat Lengkap',
      description: 'Simpan dan analisis riwayat perhitungan untuk insights pengeluaran yang lebih baik.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      
      <div className="container mx-auto relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mengapa Pilih <span className="gradient-text">Bensinku</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform terdepan dengan teknologi canggih untuk menghitung dan mengelola 
            biaya bahan bakar dengan presisi tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-slide-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="glass-card p-8 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Siap Mengoptimalkan Pengeluaran BBM Anda?
            </h3>
            <p className="text-muted-foreground mb-6">
              Bergabung dengan ribuan driver dan mahasiswa yang sudah merasakan manfaatnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Mulai Sekarang - Gratis
              </button>
              <button className="btn-secondary">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
