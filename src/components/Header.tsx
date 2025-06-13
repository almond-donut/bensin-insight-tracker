
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Fuel, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/UserMenu';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass-header backdrop-blur-xl border-b border-border/40 animate-slide-down">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 animate-slide-in">
              <div className="bg-gradient-to-br from-primary to-emerald-500 p-2 rounded-xl hover-lift animate-float">
                <Fuel className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Bensinku</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
              <button 
                onClick={() => scrollToSection('kalkulator')}
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Kalkulator
              </button>
              <button 
                onClick={() => scrollToSection('fitur')}
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Fitur
              </button>
              {user && (
                <a 
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  Dashboard
                </a>
              )}
            </nav>

            {/* Desktop Auth & Theme */}
            <div className="hidden md:flex items-center space-x-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <ThemeToggle />
              {user ? (
                <UserMenu />
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary"
                >
                  Masuk / Daftar
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden animate-slide-in">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden button-press"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 transition-transform duration-200 rotate-0" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-200" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/40 py-4 space-y-4 animate-slide-down">
              <button 
                onClick={() => scrollToSection('kalkulator')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted/50 rounded px-2"
              >
                Kalkulator
              </button>
              <button 
                onClick={() => scrollToSection('fitur')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted/50 rounded px-2"
              >
                Fitur
              </button>
              {user && (
                <a 
                  href="/dashboard"
                  className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted/50 rounded px-2"
                >
                  Dashboard
                </a>
              )}
              <div className="pt-4 border-t border-border/40">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Masuk / Daftar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;
