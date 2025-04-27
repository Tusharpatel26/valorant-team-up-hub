
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Search, Users, User, Clock, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Find Players', path: '/dashboard', icon: <Search className="w-5 h-5" /> },
    { label: 'Social', path: '/social', icon: <Users className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
    { label: 'Match History', path: '/history', icon: <Clock className="w-5 h-5" /> },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-card border-b border-valorant-blue/20 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl">fiveQ<span className="text-valorant-red">.gg</span></span>
            </Link>
            <div className="ml-10 flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) ? 'bg-valorant-blue/30 text-valorant-red' : 'hover:bg-valorant-blue/20'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Logged in as </span>
                  <span className="font-semibold">{user.displayName}</span>
                </div>
                <img 
                  src={user.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + user.id}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <button 
                  onClick={logout}
                  className="valorant-button-outline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="valorant-button-outline">Login</Link>
                <Link to="/register" className="valorant-button">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-valorant-blue/20 z-40">
        <div className="flex justify-between items-center h-full px-4">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl">fiveQ<span className="text-valorant-red">.gg</span></span>
          </Link>
          
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleMobileMenu}>
          <div 
            className="fixed right-0 top-16 bottom-0 w-64 bg-card border-l border-valorant-blue/20 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center space-x-2 p-3 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) ? 'bg-valorant-blue/30 text-valorant-red' : 'hover:bg-valorant-blue/20'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-valorant-blue/20 my-2 pt-2">
                {user ? (
                  <>
                    <div className="flex items-center p-3">
                      <img 
                        src={user.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + user.id}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div className="text-sm">
                        <div className="font-semibold">{user.displayName}</div>
                        <div className="text-muted-foreground text-xs">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { logout(); toggleMobileMenu(); }}
                      className="w-full valorant-button-outline mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link 
                      to="/login" 
                      onClick={toggleMobileMenu}
                      className="valorant-button-outline w-full text-center"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      onClick={toggleMobileMenu}
                      className="valorant-button w-full text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
