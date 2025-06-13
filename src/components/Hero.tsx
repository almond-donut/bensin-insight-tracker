
import { Calculator, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all animated elements
    const elements = [heroRef.current, headingRef.current, subtitleRef.current, ctaRef.current, statsRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Trigger initial animation
    setTimeout(() => setIsVisible(true), 100);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="py-20 px-4 relative overflow-hidden scroll-animate-target">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 scroll-animate-item transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Zap className="h-4 w-4 text-primary animate-pulse-soft" />
            <span className="text-sm font-medium">Platform #1 untuk Driver Grab & Mahasiswa</span>
          </div>

          {/* Main Heading with enhanced slide-up animation */}
          <h1 
            ref={headingRef}
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight scroll-animate-item transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Kelola Biaya
            <span className="gradient-text block animate-gradient-shift">Bahan Bakar</span>
            dengan Cerdas
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed scroll-animate-item transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ animationDelay: '0.4s' }}
          >
            Kalkulator canggih untuk menghitung estimasi biaya BBM harian dan bulanan. 
            Khusus untuk driver Grab dan mahasiswa yang ingin mengoptimalkan pengeluaran.
          </p>

          {/* CTA Buttons */}
          <div 
            ref={ctaRef}
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 scroll-animate-item transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <button 
              className="btn-primary text-lg px-8 py-4 hover-lift animate-bounce-subtle"
              onClick={() => document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Mulai Hitung Sekarang
            </button>
            <button className="btn-secondary text-lg px-8 py-4 hover-lift">
              Lihat Demo
            </button>
          </div>

          {/* Stats */}
          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 scroll-animate-item transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ animationDelay: '0.8s' }}
          >
            <div className="glass-card p-8 rounded-2xl text-center hover-lift animate-scale-in" style={{ animationDelay: '1s' }}>
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">100+</h3>
              <p className="text-muted-foreground">Model Kendaraan</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center hover-lift animate-scale-in" style={{ animationDelay: '1.2s' }}>
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">99%</h3>
              <p className="text-muted-foreground">Akurasi Perhitungan</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center hover-lift animate-scale-in" style={{ animationDelay: '1.4s' }}>
              <div className="bg-gradient-to-r from-primary to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>
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
