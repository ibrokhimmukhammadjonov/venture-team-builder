
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings, Bell, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">TeamFinder</h1>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="my-teams" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="my-teams" className="text-sm">My Teams</TabsTrigger>
              <TabsTrigger value="my-applications" className="text-sm">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="my-teams" className="space-y-3">
              {myTeams.length > 0 ? (
                <div className="space-y-3">
                  {myTeams.map((team) => (
                    <Card key={team.id} className="border border-gray-200 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 mt-1">
                              {team.description}
                            </CardDescription>
                          </div>
                          <Badge variant={team.isPaid ? "default" : "secondary"} className="ml-2">
                            {team.isPaid ? 'Paid' : 'Volunteer'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {team.membersCount}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {team.role}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
                  <p className="text-gray-600 mb-4">Create your first team to get started</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-applications" className="space-y-3">
              {myApplications.length > 0 ? (
                <div className="space-y-3">
                  {myApplications.map((application) => (
                    <Card key={application.id} className="border border-gray-200 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold">{application.teamName}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 mt-1">
                              {application.description}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">{application.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600 mb-4">Start applying to teams</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
