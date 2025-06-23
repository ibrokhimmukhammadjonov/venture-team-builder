
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { Search, Users, DollarSign, Clock, MapPin, Calendar, Music, BookOpen, Home, Plane } from 'lucide-react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeamType, setFilterTeamType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - will be replaced with real data from Supabase
  const mockTeams = [
    {
      id: 1,
      name: "AI-Powered Recipe App",
      description: "Building a smart recipe recommendation app using machine learning. Looking for passionate developers to join our team!",
      team_type: "project_startup",
      skills_needed: ["React", "Python", "Machine Learning"],
      is_paid: true,
      team_size: 4,
      status: "open",
      creator: "Sarah Chen",
      deadline: "2024-08-15"
    },
    {
      id: 2,
      name: "Weekly Basketball Team",
      description: "Looking for players to join our weekly basketball games. All skill levels welcome!",
      team_type: "sports",
      sport_type: "Basketball",
      schedule: "Every Wednesday 7PM",
      location: "Central Park Courts",
      team_size: 10,
      status: "open",
      creator: "Mike Johnson"
    },
    {
      id: 3,
      name: "2BR Apartment in Brooklyn",
      description: "Looking for a roommate to share a beautiful 2BR apartment in Brooklyn. Great location near subway.",
      team_type: "housing",
      city: "Brooklyn, NY",
      rent_budget: 1200,
      gender_preference: "Any",
      room_type: "Private bedroom",
      team_size: 2,
      status: "open",
      creator: "Emma Davis"
    },
    {
      id: 4,
      name: "Indie Rock Band",
      description: "Established indie rock band looking for a bassist. We practice twice a week and gig monthly.",
      team_type: "music",
      genre: "Indie Rock",
      instruments_needed: ["Bass Guitar"],
      team_size: 4,
      status: "open",
      creator: "Alex Rodriguez"
    },
    {
      id: 5,
      name: "Data Science Study Group",
      description: "Weekly study group for data science certification prep. Working through Python and ML concepts together.",
      team_type: "study",
      subject: "Data Science",
      study_level: "Intermediate",
      team_size: 6,
      status: "open",
      creator: "Lisa Wang"
    },
    {
      id: 6,
      name: "Japan Trip Summer 2024",
      description: "Planning a 2-week trip to Japan this summer. Looking for travel buddies to share costs and experiences!",
      team_type: "travel",
      destination: "Japan",
      travel_dates: "July 15-29, 2024",
      budget_range: "$3000-4000",
      team_size: 4,
      status: "open",
      creator: "Tom Chen"
    }
  ];

  const teamTypeLabels = {
    project_startup: "Project/Startup",
    sports: "Sports",
    housing: "Housing",
    music: "Music",
    study: "Study Group",
    travel: "Travel",
    other: "Other"
  };

  const getTeamTypeIcon = (type: string) => {
    switch (type) {
      case 'project_startup': return <DollarSign className="w-4 h-4" />;
      case 'sports': return <Users className="w-4 h-4" />;
      case 'housing': return <Home className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'travel': return <Plane className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterTeamType === 'all' || team.team_type === filterTeamType;
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApply = (teamId: number) => {
    console.log('Applying to team:', teamId);
  };

  const renderTeamSpecificInfo = (team: any) => {
    switch (team.team_type) {
      case 'project_startup':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {team.is_paid && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Paid Project
                </Badge>
              )}
              {team.deadline && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due: {new Date(team.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
            {team.skills_needed && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Skills Needed:</p>
                <div className="flex flex-wrap gap-1">
                  {team.skills_needed.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'sports':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {team.sport_type && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Sport:</span>
                  <span>{team.sport_type}</span>
                </div>
              )}
              {team.schedule && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{team.schedule}</span>
                </div>
              )}
              {team.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{team.location}</span>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'housing':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {team.city && (
                <div>
                  <span className="font-medium text-gray-700">City:</span>
                  <p>{team.city}</p>
                </div>
              )}
              {team.rent_budget && (
                <div>
                  <span className="font-medium text-gray-700">Rent:</span>
                  <p className="text-green-600 font-medium">${team.rent_budget}/month</p>
                </div>
              )}
              {team.room_type && (
                <div>
                  <span className="font-medium text-gray-700">Room:</span>
                  <p>{team.room_type}</p>
                </div>
              )}
              {team.gender_preference && (
                <div>
                  <span className="font-medium text-gray-700">Preference:</span>
                  <p>{team.gender_preference}</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'music':
        return (
          <div className="space-y-2">
            {team.genre && (
              <div>
                <span className="font-medium text-gray-700 mr-2">Genre:</span>
                <Badge variant="outline">{team.genre}</Badge>
              </div>
            )}
            {team.instruments_needed && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Instruments Needed:</p>
                <div className="flex flex-wrap gap-1">
                  {team.instruments_needed.map((instrument: string) => (
                    <Badge key={instrument} variant="outline" className="text-xs">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'study':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {team.subject && (
                <div>
                  <span className="font-medium text-gray-700">Subject:</span>
                  <p>{team.subject}</p>
                </div>
              )}
              {team.study_level && (
                <div>
                  <span className="font-medium text-gray-700">Level:</span>
                  <p>{team.study_level}</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'travel':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {team.destination && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">{team.destination}</span>
                </div>
              )}
              {team.travel_dates && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{team.travel_dates}</span>
                </div>
              )}
              {team.budget_range && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{team.budget_range}</span>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Teams & Groups</h1>
          <p className="text-gray-600">Find the perfect team to join or discover exciting opportunities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search teams, projects, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterTeamType} onValueChange={setFilterTeamType}>
              <SelectTrigger>
                <SelectValue placeholder="Team Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="project_startup">Project/Startup</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="study">Study Group</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl line-clamp-2">{team.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTeamTypeIcon(team.team_type)}
                      {teamTypeLabels[team.team_type as keyof typeof teamTypeLabels]}
                    </Badge>
                    <Badge variant={team.status === 'open' ? 'default' : 'secondary'}>
                      {team.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="line-clamp-3">
                  {team.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {renderTeamSpecificInfo(team)}
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      Team Size: {team.team_size}
                    </div>
                    <p className="text-xs text-gray-500">by {team.creator}</p>
                  </div>
                  
                  <Button 
                    onClick={() => handleApply(team.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={team.status === 'closed'}
                  >
                    {team.status === 'closed' ? 'Team Full' : 'Apply to Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
