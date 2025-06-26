
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/dashboard',
      onClick: () => navigate('/dashboard')
    },
    { 
      icon: Search, 
      label: 'Explore', 
      path: '/teams',
      onClick: () => navigate('/teams')
    },
    { 
      icon: Plus, 
      label: 'Create', 
      path: '/create-team',
      onClick: () => navigate('/create-team')
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile',
      onClick: () => navigate('/profile')
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center p-2 h-12 w-16 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
