
-- Create enum for team types
CREATE TYPE team_type AS ENUM (
  'project_startup',
  'sports',
  'housing',
  'music',
  'study',
  'travel',
  'other'
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  team_type team_type NOT NULL,
  team_size INTEGER,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Project/Startup specific fields
  skills_needed TEXT[],
  is_paid BOOLEAN,
  deadline DATE,
  
  -- Housing specific fields
  city TEXT,
  rent_budget INTEGER,
  gender_preference TEXT,
  room_type TEXT,
  
  -- Sports specific fields
  sport_type TEXT,
  schedule TEXT,
  location TEXT,
  
  -- Music specific fields
  genre TEXT,
  instruments_needed TEXT[],
  
  -- Study specific fields
  subject TEXT,
  study_level TEXT,
  
  -- Travel specific fields
  destination TEXT,
  travel_dates TEXT,
  budget_range TEXT
);

-- Add Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Create policies for teams
CREATE POLICY "Anyone can view teams" 
  ON public.teams 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create teams" 
  ON public.teams 
  FOR INSERT 
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own teams" 
  ON public.teams 
  FOR UPDATE 
  USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own teams" 
  ON public.teams 
  FOR DELETE 
  USING (auth.uid() = creator_id);

-- Create team applications table
CREATE TABLE public.team_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams NOT NULL,
  applicant_id UUID REFERENCES auth.users NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, applicant_id)
);

-- Add RLS for applications
ALTER TABLE public.team_applications ENABLE ROW LEVEL SECURITY;

-- Policies for applications
CREATE POLICY "Users can view applications for their teams or their own applications" 
  ON public.team_applications 
  FOR SELECT 
  USING (
    auth.uid() = applicant_id OR 
    auth.uid() IN (SELECT creator_id FROM teams WHERE id = team_id)
  );

CREATE POLICY "Users can create applications" 
  ON public.team_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Team creators can update application status" 
  ON public.team_applications 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT creator_id FROM teams WHERE id = team_id));
