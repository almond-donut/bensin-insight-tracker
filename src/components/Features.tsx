
import { Shield, Zap, TrendingUp, Users, Calculator, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '20px' }
    );

    // Observe title
    if (titleRef.current) observer.observe(titleRef.current);

    // Observe feature cards
    const featureCards = sectionRef.current?.querySelectorAll('.feature-card');
    featureCards?.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      
      <div className="container mx-auto relative">
        <div 
          ref={titleRef}
          className="text-center mb-16 scroll-animate-item transition-all duration-1000 opacity-0 translate-y-12"
          data-index="-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Mengapa Pilih <span className="gradient-text animate-gradient-shift">Bensinku</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Platform terdepan dengan teknologi canggih untuk menghitung dan mengelola 
            biaya bahan bakar dengan presisi tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card glass-card p-8 rounded-2xl border-border/50 hover:border-primary/30 transition-all duration-700 hover:shadow-lg hover:shadow-primary/10 group hover-lift ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: `${visibleItems.includes(-1) ? index * 0.1 : 0}s`,
              }}
            >
              <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 animate-bounce-subtle`}
                   style={{ animationDelay: `${index * 0.2}s` }}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 ${
          visibleItems.length >= features.length 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <div className="glass-card p-8 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 max-w-2xl mx-auto hover-lift">
            <h3 className="text-2xl font-bold mb-4 animate-slide-up">
              Siap Mengoptimalkan Pengeluaran BBM Anda?
            </h3>
            <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Bergabung dengan ribuan driver dan mahasiswa yang sudah merasakan manfaatnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <button className="btn-primary hover-lift">
                Mulai Sekarang - Gratis
              </button>
              <button className="btn-secondary hover-lift">
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
