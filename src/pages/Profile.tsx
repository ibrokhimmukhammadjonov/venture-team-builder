
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { User, Edit, Save, Plus, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [bio, setBio] = useState('Passionate full-stack developer with 5 years of experience building web applications. Love working on innovative projects that make a real impact.');
  const [role, setRole] = useState('Developer');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['React', 'Node.js', 'TypeScript', 'Python', 'UI Design']);
  const [avatar, setAvatar] = useState('');

  const roles = [
    'Developer', 'Designer', 'Product Manager', 'Marketing', 'Business Development',
    'Data Scientist', 'DevOps', 'QA Engineer', 'Founder', 'Student', 'Other'
  ];

  const suggestedSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript',
    'UI Design', 'UX Design', 'Graphic Design', 'Product Design', 'Web Design',
    'Marketing', 'Digital Marketing', 'Content Marketing', 'Social Media', 'SEO',
    'Project Management', 'Business Development', 'Sales', 'Data Analysis', 'Machine Learning'
  ];

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    // TODO: Implement profile update with Supabase
    console.log('Saving profile:', { fullName, bio, role, skills, avatar });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values (in real app, fetch from database)
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your profile information and showcase your skills</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={avatar} alt={fullName} />
                  <AvatarFallback className="text-xl">
                    {fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{fullName}</CardTitle>
                <CardDescription>{role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">About</Label>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-4">{bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Profile Information</span>
                    </CardTitle>
                    <CardDescription>
                      Update your profile to help others find and connect with you
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      disabled={!isEditing}
                      placeholder="Tell others about yourself, your experience, and what you're passionate about..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Skills</Label>
                    
                    {/* Current Skills */}
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          {isEditing && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => removeSkill(skill)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>

                    {/* Add Skills (only when editing) */}
                    {isEditing && (
                      <>
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
                              .filter(skill => !skills.includes(skill))
                              .slice(0, 8)
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
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-4 pt-6">
                      <Button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
