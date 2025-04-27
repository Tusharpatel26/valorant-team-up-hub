
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  animationDelay?: string;
}

const FeatureCard = ({ title, description, icon, animationDelay }: FeatureCardProps) => {
  return (
    <div 
      className={`valorant-card p-6 animate-fade-in ${animationDelay}`}
    >
      <div className="rounded-full bg-valorant-blue/30 p-3 inline-block mb-4 animate-pulse">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
