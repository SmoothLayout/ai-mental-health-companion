import React, { useState } from 'react';
import { useWellness, MoodEntry } from '@/hooks/use-wellness';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Smile, Frown, Meh } from 'lucide-react';

const moodIcons = {
  great: { icon: Smile, color: 'text-green-500', label: 'Great', emoji: '😁' },
  good: { icon: Smile, color: 'text-emerald-400', label: 'Good', emoji: '🙂' },
  neutral: { icon: Meh, color: 'text-blue-400', label: 'Neutral', emoji: '😐' },
  bad: { icon: Frown, color: 'text-orange-400', label: 'Bad', emoji: '😔' },
  awful: { icon: Frown, color: 'text-red-500', label: 'Awful', emoji: '😫' },
};

export default function MoodTracker() {
  const { moods, addMood } = useWellness();
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error('Please select a mood');
      return;
    }
    addMood(selectedMood, note);
    toast.success('Mood logged successfully');
    setSelectedMood(null);
    setNote('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">How are you feeling?</h2>
        <p className="text-muted-foreground text-lg">Daily mood tracking helps you understand your emotional patterns.</p>
      </div>

      <Card className="border-2 border-primary/10">
        <CardContent className="pt-8 space-y-8">
          <div className="grid grid-cols-5 gap-2">
            {(Object.entries(moodIcons) as [MoodEntry['mood'], typeof moodIcons.great][]).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                aria-label={`Mood: ${value.label}`}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${
                  selectedMood === key 
                    ? 'bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/20' 
                    : 'bg-muted/50 hover:bg-muted text-muted-foreground'
                }`}
              >
                <value.icon className={`w-8 h-8 ${selectedMood === key ? 'text-current' : value.color}`} />
                <span className="text-xs font-semibold">{value.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground px-1">Add a note (optional)</label>
            <Textarea
              placeholder="What's contributing to your mood today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] resize-none focus-visible:ring-primary/30"
            />
          </div>

          <Button 
            className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.01]" 
            size="lg"
            onClick={handleSubmit}
          >
            Log Mood
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold px-1">Recent History</h3>
        <div className="space-y-3">
          {moods.slice(0, 5).map((entry) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={entry.id}
            >
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`p-2 rounded-full bg-background border ${moodIcons[entry.mood].color}`}>
                    {React.createElement(moodIcons[entry.mood].icon, { className: 'w-5 h-5' })}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold capitalize">{entry.mood}</span>
                      <span className="text-xs text-muted-foreground">{format(new Date(entry.date), 'MMM d, h:mm a')}</span>
                    </div>
                    {entry.note && <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{entry.note}</p>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {moods.length === 0 && (
            <p className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
              No moods logged yet. Start by sharing how you feel today.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
