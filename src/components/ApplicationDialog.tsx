
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { applyToTeam } from '@/services/teamsService';

interface ApplicationDialogProps {
  teamId: string;
  teamName: string;
  children: React.ReactNode;
  onApplicationSuccess?: () => void;
}

const ApplicationDialog = ({ teamId, teamName, children, onApplicationSuccess }: ApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please write a message explaining why you want to join this team.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await applyToTeam(teamId, message);
      toast({
        title: "Application sent!",
        description: `Your application to join "${teamName}" has been submitted successfully.`,
      });
      setMessage('');
      setOpen(false);
      onApplicationSuccess?.();
    } catch (error: any) {
      console.error('Application error:', error);
      toast({
        title: "Application failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply to Join Team</DialogTitle>
          <DialogDescription>
            Write a message explaining why you want to join "{teamName}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Tell the team creator why you're interested and what you can contribute..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
