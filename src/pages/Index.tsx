
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FuelCalculator from '@/components/FuelCalculator';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import LoggedInHomepage from '@/components/LoggedInHomepage';

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {loading ? (
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        ) : user ? (
          <LoggedInHomepage />
        ) : (
          <>
            <Hero />
            <FuelCalculator />
            <Features />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
