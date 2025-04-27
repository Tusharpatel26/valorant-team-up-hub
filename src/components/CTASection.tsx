
import { Link } from 'react-router-dom';

interface CTASectionProps {
  isAuthenticated: boolean;
}

const CTASection = ({ isAuthenticated }: CTASectionProps) => {
  return (
    <section className="valorant-card p-8 md:p-12 text-center hover:scale-105 transition-transform duration-300 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in delay-200">
        Ready to find your next teammate?
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-300">
        Join thousands of players who are already using fiveQ.gg to connect, team up, and rank up together.
      </p>
      {isAuthenticated ? (
        <Link 
          to="/dashboard" 
          className="valorant-button hover:animate-pulse"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link 
          to="/register" 
          className="valorant-button hover:animate-pulse"
        >
          Create Free Account
        </Link>
      )}
    </section>
  );
};

export default CTASection;
