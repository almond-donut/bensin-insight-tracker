
import { Fuel, Menu } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
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

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={() => openAuthModal('signin')}
                  >
                    Masuk
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => openAuthModal('signup')}
                  >
                    Daftar Gratis
                  </button>
                </>
              )}
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
                {!loading && (
                  <div className="flex flex-col space-y-2 pt-4">
                    {user ? (
                      <UserMenu />
                    ) : (
                      <>
                        <button 
                          className="btn-secondary"
                          onClick={() => openAuthModal('signin')}
                        >
                          Masuk
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={() => openAuthModal('signup')}
                        >
                          Daftar Gratis
                        </button>
                      </>
                    )}
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;
