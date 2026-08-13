import React from 'react';
import { useWellness } from '@/hooks/use-wellness';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Smile, 
  BookOpen, 
  MessageSquare, 
  Wind, 
  Brain, 
  ArrowRight,
  TrendingUp,
  Heart,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function Dashboard() {
  const { moods, journals } = useWellness();
  const latestMood = moods[0];
  const latestJournal = journals[0];

  const stats = [
    { label: 'Check-ins', value: moods.length, icon: Calendar, color: 'text-blue-500' },
    { label: 'Journals', value: journals.length, icon: BookOpen, color: 'text-emerald-500' },
    { label: 'Current Streak', value: '3 Days', icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-10">
      <header className="relative py-8 md:py-12 px-6 rounded-3xl overflow-hidden bg-primary text-primary-foreground shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-20 -mb-20 blur-3xl" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Mindful Morning, Alex</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl mt-4">
              "The secret of health for both mind and body is not to mourn for the past, nor to worry about the future, but to live the present moment wisely and earnestly."
            </p>
          </motion.div>
          <div className="flex gap-4 pt-4">
            <Link to="/mood">
              <Button size="lg" variant="secondary" className="font-semibold px-8 shadow-sm">
                Track Mood
              </Button>
            </Link>
            <Link to="/breathing">
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 font-semibold gap-2">
                <Wind className="w-5 h-5" /> Focus Breath
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none bg-card/50 backdrop-blur shadow-sm overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
              </div>
              <div className={`p-3 rounded-2xl bg-muted/50 transition-colors group-hover:bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-2xl font-bold tracking-tight">Recent Activity</h3>
            <Link to="/mood" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
              View History <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {latestMood ? (
              <Card className="border-none bg-emerald-50 dark:bg-emerald-950/20 shadow-sm border-l-4 border-l-emerald-400 rounded-2xl">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                    <Smile className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium">Last Mood Check-in</p>
                    <h4 className="font-bold text-lg capitalize">{latestMood.mood}</h4>
                    <p className="text-xs text-emerald-700/60 dark:text-emerald-300/60">{format(new Date(latestMood.date), 'MMM d, h:mm a')}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed bg-muted/20 border-2 rounded-2xl">
                <CardContent className="p-8 text-center space-y-3">
                  <Heart className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground font-medium">How are you feeling right now?</p>
                  <Link to="/mood">
                    <Button variant="outline" size="sm">Log your mood</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {latestJournal ? (
              <Card className="border-none bg-blue-50 dark:bg-blue-950/20 shadow-sm border-l-4 border-l-blue-400 rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold">Latest Reflection</h4>
                    </div>
                    <span className="text-xs text-blue-700/60 dark:text-blue-300/60">{format(new Date(latestJournal.date), 'MMM d')}</span>
                  </div>
                  <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">{latestJournal.title}</h5>
                  <p className="text-sm text-blue-800/70 dark:text-blue-200/70 line-clamp-2">{latestJournal.content}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed bg-muted/20 border-2 rounded-2xl">
                <CardContent className="p-8 text-center space-y-3">
                  <BookOpen className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground font-medium">No journal entries yet</p>
                  <Link to="/journal">
                    <Button variant="outline" size="sm">Start writing</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight px-1">Explore Wellness</h3>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/chat">
              <div className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">AI Companion</h4>
                  <p className="text-sm text-muted-foreground">Talk about your day or get support.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <Link to="/breathing">
              <div className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wind className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">Breathing Guide</h4>
                  <p className="text-sm text-muted-foreground">Regulate your nervous system.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <Link to="/cbt">
              <div className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">CBT Activities</h4>
                  <p className="text-sm text-muted-foreground">Cognitive behavioral therapy exercises.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
