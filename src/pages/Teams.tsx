import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { ApplicationDialog } from '@/components/ApplicationDialog';
import { getTeams, applyToTeam, getUserApplications } from '@/services/teamsService';
import { useAuth } from '@/contexts/AuthContext';

const Teams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadTeams();
    if (user) {
      loadUserApplications();
    }
  }, [user]);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const teamsData = await getTeams();
      setTeams(teamsData);
    } catch (error) {
      console.error('Error fetching teams:', error);
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
    try {
      const applications = await getUserApplications();
      setUserApplications(applications);
    } catch (error) {
      console.error('Error fetching user applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || team.team_type === selectedType;
    return matchesSearch && matchesType;
  });

  const hasApplied = (teamId: string) => {
    return userApplications.some(app => app.team_id === teamId);
  };

  const getApplicationStatus = (teamId: string) => {
    const application = userApplications.find(app => app.team_id === teamId);
    return application?.status || null;
  };

  const handleApplyClick = (team: any) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to apply to teams.",
        variant: "destructive",
      });
      return;
    }

    if (hasApplied(team.id)) {
      toast({
        title: "Already applied",
        description: "You have already applied to this team.",
        variant: "destructive",
      });
      return;
    }

    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleApplicationSubmit = async (teamId: string, message: string) => {
    try {
      await applyToTeam(teamId, message);
      toast({
        title: "Application sent!",
        description: "Your application has been submitted successfully.",
      });
      setIsDialogOpen(false);
      loadUserApplications();
    } catch (error) {
      console.error('Error applying to team:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40 p-4">
        <h1 className="text-2xl font-bold text-black mb-4">Explore Teams</h1>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-0"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full bg-gray-50 border-0">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="project_startup">Project/Startup</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Teams List */}
      <div className="p-4 space-y-3">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team, index) => {
            const applicationStatus = getApplicationStatus(team.id);
            const applied = hasApplied(team.id);
            
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {team.team_type?.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {team.is_paid && (
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {team.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Skills */}
                    {team.skills_needed && team.skills_needed.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {team.skills_needed.slice(0, 3).map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {team.skills_needed.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{team.skills_needed.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-3">
                        {team.city && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {team.city}
                          </div>
                        )}
                        {team.team_size && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {team.team_size} people
                          </div>
                        )}
                      </div>
                      {team.deadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(team.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        View Details
                      </Button>
                      
                      {applied ? (
                        <Badge className={
                          applicationStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                          applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {applicationStatus === 'accepted' ? 'Accepted' :
                           applicationStatus === 'rejected' ? 'Rejected' :
                           'Applied'}
                        </Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleApplyClick(team)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <ApplicationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleApplicationSubmit}
        team={selectedTeam}
      />
    </div>
  );
};

export default Teams;
