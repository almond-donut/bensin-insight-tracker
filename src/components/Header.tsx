
import { Fuel, Menu, User } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-emerald-500 p-2 rounded-xl">
              <Fuel className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">
              Bensinku
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#kalkulator" className="text-foreground hover:text-primary transition-colors">
              Kalkulator
            </a>
            <a href="#tentang" className="text-foreground hover:text-primary transition-colors">
              Tentang
            </a>
            <a href="#kontak" className="text-foreground hover:text-primary transition-colors">
              Kontak
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-secondary">
              Masuk
            </button>
            <button className="btn-primary">
              Daftar Gratis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#kalkulator" className="text-foreground hover:text-primary transition-colors">
                Kalkulator
              </a>
              <a href="#tentang" className="text-foreground hover:text-primary transition-colors">
                Tentang
              </a>
              <a href="#kontak" className="text-foreground hover:text-primary transition-colors">
                Kontak
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="btn-secondary">
                  Masuk
                </button>
                <button className="btn-primary">
                  Daftar Gratis
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
