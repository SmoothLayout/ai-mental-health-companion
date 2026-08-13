import React, { useState } from 'react';
import { useWellness } from '@/hooks/use-wellness';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Plus, Trash2, Book, Search } from 'lucide-react';

export default function Journal() {
  const { journals, addJournal, deleteJournal } = useWellness();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide a title and content');
      return;
    }
    addJournal(title, content);
    toast.success('Entry saved');
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  const filteredJournals = journals.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Mindful Journal</h2>
          <p className="text-muted-foreground">Safe space for your thoughts and reflections.</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          className="gap-2 self-start"
          variant={isAdding ? 'secondary' : 'default'}
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> New Entry</>}
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Title of your entry..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-semibold border-none bg-muted/30 focus-visible:ring-0 px-0 h-10"
                />
                <Textarea
                  placeholder="Write freely here. What's on your mind? How did today go?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[250px] border-none bg-transparent focus-visible:ring-0 px-0 resize-none text-base leading-relaxed"
                />
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button onClick={handleSave} className="px-8">Save Reflection</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          aria-label="Search journal entries"
          placeholder="Search your entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-muted/30"
        />
      </div>

      <div className="grid gap-4">
        {filteredJournals.map((entry) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={entry.id}
          >
            <Card className="group hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Book className="w-3 h-3" />
                      <span>{format(new Date(entry.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{entry.title}</h3>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {entry.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete entry: ${entry.title}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (confirm('Delete this entry permanently?')) {
                        deleteJournal(entry.id);
                        toast.success('Entry deleted');
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filteredJournals.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <Book className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium text-foreground">No entries found</p>
              <p className="text-muted-foreground">Start your journaling journey today.</p>
            </div>
            <Button onClick={() => setIsAdding(true)} variant="outline">Create your first entry</Button>
          </div>
        )}
      </div>
    </div>
  );
}
