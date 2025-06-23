
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import ApplicationDialog from '@/components/ApplicationDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getTeams, checkExistingApplication } from '@/services/teamsService';
import { Search, Users, DollarSign, Clock, MapPin, Calendar, Music, BookOpen, Home, Plane } from 'lucide-react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeamType, setFilterTeamType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [teams, setTeams] = useState<any[]>([]);
  const [applications, setApplications] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (user && teams.length > 0) {
      loadUserApplications();
    }
  }, [user, teams]);

  const loadTeams = async () => {
    try {
      const teamsData = await getTeams();
      setTeams(teamsData || []);
    } catch (error) {
      console.error('Error loading teams:', error);
      toast({
        title: "Error",
        description: "Failed to load teams. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserApplications = async () => {
    if (!user) return;
    
    try {
      const applicationsData: Record<string, any> = {};
      
      for (const team of teams) {
        const existingApp = await checkExistingApplication(team.id, user.id);
        if (existingApp) {
          applicationsData[team.id] = existingApp;
        }
      }
      
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const handleApplicationSuccess = () => {
    loadUserApplications();
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterTeamType === 'all' || team.team_type === filterTeamType;
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
            {team.skills_needed && team.skills_needed.length > 0 && (
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
            {team.instruments_needed && team.instruments_needed.length > 0 && (
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

  const renderActionButton = (team: any) => {
    if (!user) {
      return (
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => window.location.href = '/login'}
        >
          Login to Apply
        </Button>
      );
    }

    if (user.id === team.creator_id) {
      return (
        <Button 
          variant="outline"
          className="w-full"
          disabled
        >
          Your Team
        </Button>
      );
    }

    const existingApplication = applications[team.id];
    
    if (existingApplication) {
      const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      };
      
      return (
        <Button 
          variant="outline"
          className="w-full"
          disabled
        >
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusColors[existingApplication.status as keyof typeof statusColors]}`}>
            {existingApplication.status === 'pending' && 'Application Pending'}
            {existingApplication.status === 'accepted' && 'Application Accepted'}
            {existingApplication.status === 'rejected' && 'Application Rejected'}
          </span>
        </Button>
      );
    }

    if (team.status === 'closed') {
      return (
        <Button 
          className="w-full"
          disabled
        >
          Team Full
        </Button>
      );
    }

    return (
      <ApplicationDialog 
        teamId={team.id} 
        teamName={team.name}
        onApplicationSuccess={handleApplicationSuccess}
      >
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Apply to Join
        </Button>
      </ApplicationDialog>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading teams...</p>
          </div>
        </div>
      </div>
    );
  }

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
                      Team Size: {team.team_size || 'N/A'}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(team.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {renderActionButton(team)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && !loading && (
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
