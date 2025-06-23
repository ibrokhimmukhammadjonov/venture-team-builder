
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { Search, Users, DollarSign, Clock } from 'lucide-react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPaid, setFilterPaid] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - will be replaced with real data from Supabase
  const mockTeams = [
    {
      id: 1,
      name: "AI-Powered Recipe App",
      description: "Building a smart recipe recommendation app using machine learning. Looking for passionate developers to join our team!",
      skillsNeeded: ["React", "Python", "Machine Learning"],
      isPaid: true,
      teamSize: 4,
      status: "open",
      creator: "Sarah Chen"
    },
    {
      id: 2,
      name: "Sustainable Shopping Platform",
      description: "Creating an e-commerce platform focused on sustainable products. Need designers and marketers.",
      skillsNeeded: ["UI Design", "Marketing", "Node.js"],
      isPaid: false,
      teamSize: 3,
      status: "open",
      creator: "Marcus Rodriguez"
    },
    {
      id: 3,
      name: "Fitness Tracking Mobile App",
      description: "Developing a comprehensive fitness app with social features. Looking for mobile developers.",
      skillsNeeded: ["React Native", "UI Design", "Backend"],
      isPaid: true,
      teamSize: 5,
      status: "open",
      creator: "Emily Watson"
    }
  ];

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPaid = filterPaid === 'all' || 
                       (filterPaid === 'paid' && team.isPaid) ||
                       (filterPaid === 'unpaid' && !team.isPaid);
    
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    
    return matchesSearch && matchesPaid && matchesStatus;
  });

  const handleApply = (teamId: number) => {
    // TODO: Implement application logic with Supabase
    console.log('Applying to team:', teamId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Teams</h1>
          <p className="text-gray-600">Find the perfect team to join or discover exciting projects</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search teams, skills, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterPaid} onValueChange={setFilterPaid}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="paid">Paid Projects</SelectItem>
                <SelectItem value="unpaid">Unpaid Projects</SelectItem>
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
                    {team.isPaid ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Volunteer
                      </Badge>
                    )}
                    <Badge variant={team.status === 'open' ? 'default' : 'secondary'}>
                      <Clock className="w-3 h-3 mr-1" />
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
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills Needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {team.skillsNeeded.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      Team Size: {team.teamSize}
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
