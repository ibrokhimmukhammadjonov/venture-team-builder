
import { supabase } from '@/integrations/supabase/client';

export interface CreateTeamData {
  name: string;
  description: string;
  team_type: string;
  team_size?: number;
  skills_needed?: string[];
  is_paid?: boolean;
  deadline?: string;
  city?: string;
  rent_budget?: number;
  gender_preference?: string;
  room_type?: string;
  sport_type?: string;
  schedule?: string;
  location?: string;
  genre?: string;
  instruments_needed?: string[];
  subject?: string;
  study_level?: string;
  destination?: string;
  travel_dates?: string;
  budget_range?: string;
}

export const createTeam = async (teamData: CreateTeamData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('teams')
    .insert([{
      ...teamData,
      creator_id: user.id,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const applyToTeam = async (teamId: string, message: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('team_applications')
    .insert([{
      team_id: teamId,
      applicant_id: user.id,
      message,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
  const { data, error } = await supabase
    .from('team_applications')
    .update({ status })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTeams = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserTeams = async (userId: string) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('creator_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('team_applications')
    .select(`
      *,
      teams (
        id,
        name,
        description,
        team_type
      )
    `)
    .eq('applicant_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getTeamApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('team_applications')
    .select(`
      *,
      teams!inner (
        id,
        name,
        creator_id
      )
    `)
    .eq('teams.creator_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const checkExistingApplication = async (teamId: string, userId: string) => {
  const { data, error } = await supabase
    .from('team_applications')
    .select('id, status')
    .eq('team_id', teamId)
    .eq('applicant_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};
