import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Users, User, Clock } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      title: 'Find Teammates',
      description: 'Connect with players who match your skill level and play style.',
      icon: <Search className="w-6 h-6 text-valorant-red" />,
    },
    {
      title: 'Build Your Team',
      description: 'Create or join teams to compete and rank up together.',
      icon: <Users className="w-6 h-6 text-valorant-red" />,
    },
    {
      title: 'Track Progress',
      description: 'Monitor your stats and see how you improve over time.',
      icon: <User className="w-6 h-6 text-valorant-red" />,
    },
    {
      title: 'Match History',
      description: 'Keep track of your games and teammates.',
      icon: <Clock className="w-6 h-6 text-valorant-red" />,
    },
  ];

  return (
    <div className="pt-4 pb-16">
      {/* Hero section with fade-in and scale animations */}
      <section className="relative mb-16 animate-fade-in animate-scale-in">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find Your Perfect <span className="text-valorant-red">Valorant</span> Team
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with players of similar skill, build teams that communicate well,
              and climb the ranks together. Never solo queue again.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="valorant-button">
                  Find Players Now
                </Link>
              ) : (
                <>
                  <Link to="/register" className="valorant-button">
                    Join For Free
                  </Link>
                  <Link to="/login" className="valorant-button-outline">
                    Login
                  </Link>
                </>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Already used by <span className="font-semibold text-valorant-light">5,000+</span> Valorant players
            </div>
          </div>
          <div className="relative bg-valorant-dark/50 rounded-lg h-72 md:h-96 overflow-hidden">
            {/* We'll replace this with a proper hero image later */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-extrabold text-valorant-red">5Q</div>
                <div className="mt-2 text-xl font-semibold">.GG</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section with staggered animations */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center animate-fade-in">
          Everything You Need To Build The Perfect Squad
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              animationDelay={
                index === 0 ? 'delay-100' : 
                index === 1 ? 'delay-200' : 
                index === 2 ? 'delay-300' : 
                'delay-400'
              }
            />
          ))}
        </div>
      </section>
      
      <CTASection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Landing;
