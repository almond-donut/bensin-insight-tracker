
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Fuel, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserMenu } from '@/components/UserMenu';
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
      <header className="fixed top-0 w-full z-50 glass-header backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary to-emerald-500 p-2 rounded-xl">
                <Fuel className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Bensinku</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('kalkulator')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Kalkulator
              </button>
              <button 
                onClick={() => scrollToSection('fitur')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Fitur
              </button>
              {user && (
                <a 
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </a>
              )}
            </nav>

            {/* Desktop Auth & Theme */}
            <div className="hidden md:flex items-center space-x-4">
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
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/40 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('kalkulator')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Kalkulator
              </button>
              <button 
                onClick={() => scrollToSection('fitur')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Fitur
              </button>
              {user && (
                <a 
                  href="/dashboard"
                  className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
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
