
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with Supabase data
  const myTeams = [
    {
      id: 1,
      name: "AI Recipe App",
      description: "Building an AI-powered recipe recommendation app",
      status: "active",
      role: "Team Creator",
      membersCount: 3,
      skillsNeeded: ["UI/UX Design", "Marketing"],
      isPaid: false
    },
    {
      id: 2,
      name: "Fitness Tracker",
      description: "Mobile app for tracking workouts and nutrition",
      status: "active",
      role: "Member",
      membersCount: 4,
      skillsNeeded: ["Backend Development"],
      isPaid: true
    }
  ];

  const myApplications = [
    {
      id: 1,
      teamName: "EcoTracker",
      description: "Carbon footprint tracking app",
      status: "pending",
      appliedDate: "2024-01-15",
      message: "I'm excited to contribute my React skills to this environmental cause."
    },
    {
      id: 2,
      teamName: "Local Business Directory",
      description: "Connecting local businesses with customers",
      status: "accepted",
      appliedDate: "2024-01-10",
      message: "I have experience with local SEO and marketing."
    },
    {
      id: 3,
      teamName: "StudyBuddy",
      description: "Platform for students to find study partners",
      status: "rejected",
      appliedDate: "2024-01-08",
      message: "I'd love to help with the UI/UX design."
    }
  ];

  const teamApplications = [
    {
      id: 1,
      applicantName: "Alex Chen",
      applicantRole: "UI/UX Designer",
      teamName: "AI Recipe App",
      message: "I'm passionate about food and have 3 years of design experience. I'd love to create an intuitive interface for your recipe app.",
      status: "pending",
      appliedDate: "2024-01-16"
    },
    {
      id: 2,
      applicantName: "Maria Rodriguez",
      applicantRole: "Marketing Manager",
      teamName: "AI Recipe App",
      message: "I specialize in food industry marketing and have launched 5 successful food apps. I can help with user acquisition and branding.",
      status: "pending",
      appliedDate: "2024-01-14"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your teams and applications</p>
            </div>
            <Button 
              onClick={() => navigate('/create-team')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>

          <Tabs defaultValue="my-teams" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-teams">My Teams</TabsTrigger>
              <TabsTrigger value="my-applications">My Applications</TabsTrigger>
              <TabsTrigger value="team-applications">Team Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="my-teams" className="space-y-4">
              {myTeams.length > 0 ? (
                <div className="grid gap-4">
                  {myTeams.map((team) => (
                    <Card key={team.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {team.name}
                              <Badge variant={team.isPaid ? "default" : "secondary"}>
                                {team.isPaid ? 'Paid' : 'Volunteer'}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="mt-2">{team.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {team.role}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {team.membersCount} members
                            </div>
                            <div className="flex gap-1">
                              {team.skillsNeeded.slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {team.skillsNeeded.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{team.skillsNeeded.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Team
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <CardTitle className="text-xl mb-2">No teams yet</CardTitle>
                    <CardDescription className="mb-4">
                      Create your first team or join an existing one to get started
                    </CardDescription>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => navigate('/create-team')}>
                        Create Team
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/teams')}>
                        Browse Teams
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="my-applications" className="space-y-4">
              {myApplications.length > 0 ? (
                <div className="grid gap-4">
                  {myApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{application.teamName}</CardTitle>
                            <CardDescription className="mt-2">{application.description}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">{application.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">"{application.message}"</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          Applied on {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <CardTitle className="text-xl mb-2">No applications yet</CardTitle>
                    <CardDescription className="mb-4">
                      Start applying to teams that match your skills and interests
                    </CardDescription>
                    <Button onClick={() => navigate('/teams')}>
                      Browse Teams
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="team-applications" className="space-y-4">
              {teamApplications.length > 0 ? (
                <div className="grid gap-4">
                  {teamApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {application.applicantName}
                              <Badge variant="outline">{application.applicantRole}</Badge>
                            </CardTitle>
                            <CardDescription className="mt-1">
                              Applied to: {application.teamName}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-4">"{application.message}"</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Reject
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <CardTitle className="text-xl mb-2">No applications yet</CardTitle>
                    <CardDescription className="mb-4">
                      When people apply to your teams, you'll see their applications here
                    </CardDescription>
                    <Button onClick={() => navigate('/create-team')}>
                      Create Your First Team
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
