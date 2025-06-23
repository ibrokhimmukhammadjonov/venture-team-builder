
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const availableSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'UI/UX Design', 
    'Marketing', 'Data Science', 'Mobile Development', 'DevOps', 'Product Management',
    'Graphic Design', 'Content Writing', 'SEO', 'Social Media', 'Sales', 'Blockchain',
    'Machine Learning', 'Cloud Computing', 'Cybersecurity'
  ];

  const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer',
    'Product Manager', 'Data Scientist', 'Marketing Manager', 'DevOps Engineer',
    'Mobile Developer', 'Graphic Designer', 'Content Creator', 'Sales Manager',
    'Business Analyst', 'Project Manager', 'Entrepreneur'
  ];

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill) && skills.length < 10) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
      setSkillInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Save profile data to Supabase
    console.log('Profile setup:', { bio, role, skills });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Complete Your Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Let others know what you bring to the team
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Primary Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((roleOption) => (
                      <SelectItem key={roleOption} value={roleOption}>
                        {roleOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillInputKeyPress}
                    placeholder="Type a skill and press Enter"
                    className="h-11"
                  />
                  <div className="flex flex-wrap gap-1">
                    {availableSkills
                      .filter(skill => !skills.includes(skill))
                      .slice(0, 15)
                      .map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          className="text-xs h-7"
                        >
                          + {skill}
                        </Button>
                      ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">Add up to 10 skills</p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11"
                disabled={isLoading || !role || skills.length === 0}
              >
                {isLoading ? 'Setting up profile...' : 'Complete Setup'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
