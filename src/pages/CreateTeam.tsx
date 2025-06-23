
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Users } from 'lucide-react';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Predefined skills for suggestions
  const suggestedSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript',
    'UI Design', 'UX Design', 'Graphic Design', 'Product Design', 'Web Design',
    'Marketing', 'Digital Marketing', 'Content Marketing', 'Social Media', 'SEO',
    'Project Management', 'Business Development', 'Sales', 'Data Analysis', 'Machine Learning'
  ];

  const addSkill = (skill: string) => {
    if (skill.trim() && !skillsNeeded.includes(skill.trim())) {
      setSkillsNeeded([...skillsNeeded, skill.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsNeeded(skillsNeeded.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement team creation with Supabase
    const teamData = {
      name: teamName,
      description,
      skillsNeeded,
      isPaid,
      teamSize: parseInt(teamSize),
      status: 'open'
    };

    console.log('Creating team:', teamData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/teams');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Team</h1>
          <p className="text-gray-600">Start building your dream team for your next project</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Team Details</span>
            </CardTitle>
            <CardDescription>
              Provide information about your project and the team you're building
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team/Project Name *</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., AI-Powered Recipe App"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project, goals, and what you're trying to build..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="e.g., 4"
                    min="1"
                    max="20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="isPaid"
                      checked={isPaid}
                      onCheckedChange={setIsPaid}
                    />
                    <Label htmlFor="isPaid" className="cursor-pointer">
                      {isPaid ? 'Paid Project' : 'Volunteer Project'}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Skills Needed</Label>
                
                {/* Current Skills */}
                {skillsNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skillsNeeded.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add Skill Input */}
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(skillInput);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSkill(skillInput)}
                    disabled={!skillInput.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Suggested Skills */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Suggested skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills
                      .filter(skill => !skillsNeeded.includes(skill))
                      .slice(0, 10)
                      .map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          className="text-xs h-7"
                        >
                          {skill}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading || !teamName || !description}
                >
                  {isLoading ? 'Creating Team...' : 'Create Team'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/teams')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTeam;
