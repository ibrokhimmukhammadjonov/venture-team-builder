
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Users,
      title: "Find Your Team",
      description: "Connect with talented individuals who share your vision and complement your skills."
    },
    {
      icon: Target,
      title: "Build Projects",
      description: "Turn your ideas into reality with the right team members by your side."
    },
    {
      icon: Zap,
      title: "Quick Matching",
      description: "Our smart filters help you find the perfect team or project in minutes."
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description: "Learn, build, and succeed with like-minded professionals and creators."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-first Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TeamFinder
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              size="sm"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dream Team</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect with talented individuals and build amazing projects together.
          </p>
          <div className="space-y-3">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/teams')}
              className="w-full"
            >
              Browse Teams
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Why TeamFinder?</h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
        <p className="mb-6">Join thousands of creators building the future together.</p>
        <Button 
          size="lg" 
          onClick={() => navigate('/register')}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          Join TeamFinder Today
        </Button>
      </div>
    </div>
  );
};

export default Index;
