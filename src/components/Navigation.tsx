
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Menu, X, Home, Search, Plus, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleHomeClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { 
      icon: Home, 
      label: user ? 'Dashboard' : 'Home', 
      onClick: handleHomeClick 
    },
    { 
      icon: Search, 
      label: 'Browse Teams', 
      onClick: () => { navigate('/teams'); setIsMenuOpen(false); } 
    },
    { 
      icon: Plus, 
      label: 'Create Team', 
      onClick: () => { navigate('/create-team'); setIsMenuOpen(false); } 
    },
    { 
      icon: User, 
      label: 'Profile', 
      onClick: () => { navigate('/profile'); setIsMenuOpen(false); } 
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={handleHomeClick}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TeamFinder</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === (item.label === 'Dashboard' ? '/dashboard' : 
                  item.label === 'Home' ? '/' :
                  item.label === 'Browse Teams' ? '/teams' :
                  item.label === 'Create Team' ? '/create-team' :
                  item.label === 'Profile' ? '/profile' : '');

                return (
                  <Button
                    key={item.label}
                    variant={isActive ? "default" : "ghost"}
                    onClick={item.onClick}
                    className="flex items-center space-x-1"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-1">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    onClick={item.onClick}
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full justify-start flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
