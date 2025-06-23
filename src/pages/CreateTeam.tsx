
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Users, Calendar, MapPin, DollarSign, Music, BookOpen, Home, Plane } from 'lucide-react';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamType, setTeamType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Project/Startup fields
  const [skillInput, setSkillInput] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState<string[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [deadline, setDeadline] = useState('');

  // Housing fields
  const [city, setCity] = useState('');
  const [rentBudget, setRentBudget] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [roomType, setRoomType] = useState('');

  // Sports fields
  const [sportType, setSportType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');

  // Music fields
  const [genre, setGenre] = useState('');
  const [instrumentInput, setInstrumentInput] = useState('');
  const [instrumentsNeeded, setInstrumentsNeeded] = useState<string[]>([]);

  // Study fields
  const [subject, setSubject] = useState('');
  const [studyLevel, setStudyLevel] = useState('');

  // Travel fields
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [budgetRange, setBudgetRange] = useState('');

  const teamTypeOptions = [
    { value: 'project_startup', label: 'Project/Startup Team', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'sports', label: 'Sports Team', icon: <Users className="w-4 h-4" /> },
    { value: 'housing', label: 'Housing/Flatmate', icon: <Home className="w-4 h-4" /> },
    { value: 'music', label: 'Music Group/Band', icon: <Music className="w-4 h-4" /> },
    { value: 'study', label: 'Study Group', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'travel', label: 'Travel Buddy', icon: <Plane className="w-4 h-4" /> },
    { value: 'other', label: 'Other', icon: <Users className="w-4 h-4" /> }
  ];

  const suggestedSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript',
    'UI Design', 'UX Design', 'Graphic Design', 'Product Design', 'Web Design',
    'Marketing', 'Digital Marketing', 'Content Marketing', 'Social Media', 'SEO',
    'Project Management', 'Business Development', 'Sales', 'Data Analysis', 'Machine Learning'
  ];

  const instruments = [
    'Guitar', 'Bass Guitar', 'Drums', 'Piano', 'Keyboard', 'Violin', 'Saxophone', 'Trumpet', 'Vocals'
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

  const addInstrument = (instrument: string) => {
    if (instrument.trim() && !instrumentsNeeded.includes(instrument.trim())) {
      setInstrumentsNeeded([...instrumentsNeeded, instrument.trim()]);
      setInstrumentInput('');
    }
  };

  const removeInstrument = (instrumentToRemove: string) => {
    setInstrumentsNeeded(instrumentsNeeded.filter(instrument => instrument !== instrumentToRemove));
  };

  const renderTypeSpecificFields = () => {
    switch (teamType) {
      case 'project_startup':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Skills Needed</Label>
              
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

              <div>
                <p className="text-sm text-gray-600 mb-2">Suggested skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills
                    .filter(skill => !skillsNeeded.includes(skill))
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
            </div>
          </div>
        );

      case 'housing':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Brooklyn, NY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentBudget">Monthly Rent Budget</Label>
              <Input
                id="rentBudget"
                type="number"
                value={rentBudget}
                onChange={(e) => setRentBudget(e.target.value)}
                placeholder="e.g., 1200"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender Preference</Label>
              <Select value={genderPreference} onValueChange={setGenderPreference}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private bedroom</SelectItem>
                  <SelectItem value="shared">Shared bedroom</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="master">Master bedroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'sports':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sportType">Sport Type *</Label>
                <Input
                  id="sportType"
                  value={sportType}
                  onChange={(e) => setSportType(e.target.value)}
                  placeholder="e.g., Basketball, Soccer, Tennis"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Central Park Courts"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g., Every Wednesday 7PM"
              />
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Rock, Jazz, Electronic"
              />
            </div>

            <div className="space-y-4">
              <Label>Instruments Needed</Label>
              
              {instrumentsNeeded.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {instrumentsNeeded.map((instrument) => (
                    <Badge key={instrument} variant="secondary" className="flex items-center gap-1">
                      {instrument}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeInstrument(instrument)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={instrumentInput}
                  onChange={(e) => setInstrumentInput(e.target.value)}
                  placeholder="Add an instrument..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInstrument(instrumentInput);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addInstrument(instrumentInput)}
                  disabled={!instrumentInput.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Common instruments:</p>
                <div className="flex flex-wrap gap-2">
                  {instruments
                    .filter(instrument => !instrumentsNeeded.includes(instrument))
                    .map((instrument) => (
                      <Button
                        key={instrument}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addInstrument(instrument)}
                        className="text-xs h-7"
                      >
                        {instrument}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'study':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Data Science, Spanish, SAT Prep"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Study Level</Label>
              <Select value={studyLevel} onValueChange={setStudyLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="mixed">Mixed Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'travel':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Japan, Europe, Bali"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Input
                  id="budgetRange"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  placeholder="e.g., $2000-3000, Budget-friendly"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDates">Travel Dates</Label>
              <Input
                id="travelDates"
                value={travelDates}
                onChange={(e) => setTravelDates(e.target.value)}
                placeholder="e.g., July 15-29, 2024 or Summer 2024"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement team creation with Supabase
    const teamData = {
      name: teamName,
      description,
      team_type: teamType,
      team_size: parseInt(teamSize),
      status: 'open',
      // Type-specific fields
      ...(teamType === 'project_startup' && {
        skills_needed: skillsNeeded,
        is_paid: isPaid,
        deadline: deadline || null
      }),
      ...(teamType === 'housing' && {
        city,
        rent_budget: rentBudget ? parseInt(rentBudget) : null,
        gender_preference: genderPreference,
        room_type: roomType
      }),
      ...(teamType === 'sports' && {
        sport_type: sportType,
        schedule,
        location
      }),
      ...(teamType === 'music' && {
        genre,
        instruments_needed: instrumentsNeeded
      }),
      ...(teamType === 'study' && {
        subject,
        study_level: studyLevel
      }),
      ...(teamType === 'travel' && {
        destination,
        travel_dates: travelDates,
        budget_range: budgetRange
      })
    };

    console.log('Creating team:', teamData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/teams');
    }, 1000);
  };

  const isFormValid = teamName && description && teamType && 
    (teamType !== 'housing' || city) &&
    (teamType !== 'sports' || sportType) &&
    (teamType !== 'study' || subject) &&
    (teamType !== 'travel' || destination);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Team</h1>
          <p className="text-gray-600">Start building your team for any type of project or activity</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Team Details</span>
            </CardTitle>
            <CardDescription>
              Provide information about your team and what you're looking for
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
                  placeholder="e.g., AI Recipe App, Basketball Team, Study Group"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Team Type *</Label>
                <RadioGroup value={teamType} onValueChange={setTeamType} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {teamTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer">
                        {option.icon}
                        <span>{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're building, looking for, or want to achieve together..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="e.g., 4"
                  min="1"
                  max="50"
                />
              </div>

              {teamType && renderTypeSpecificFields()}

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading || !isFormValid}
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
