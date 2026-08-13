import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, X, Sparkles, Layout, Trash2, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface VisionItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

const INITIAL_ITEMS: VisionItem[] = [
  {
    id: '1',
    title: 'Daily Meditation',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fe037680-86d8-460f-9328-ce9e797d35a0/mental-clarity-078357db-1783333734346.webp',
    category: 'Mindset',
  },
  {
    id: '2',
    title: 'Morning Reading',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fe037680-86d8-460f-9328-ce9e797d35a0/self-care-e4f598d2-1783333733364.webp',
    category: 'Growth',
  },
  {
    id: '3',
    title: 'Quality Time',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fe037680-86d8-460f-9328-ce9e797d35a0/social-connection-6d93dae1-1783333732823.webp',
    category: 'Relationships',
  },
];

const CATEGORIES = ['Mindset', 'Health', 'Growth', 'Relationships', 'Career', 'Travel'];

export default function VisionBoard() {
  const [items, setItems] = useState<VisionItem[]>(INITIAL_ITEMS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', image_url: '', category: 'Mindset' });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.image_url) return;
    
    const item: VisionItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };
    
    setItems((prev) => [item, ...prev]);
    setNewItem({ title: '', image_url: '', category: 'Mindset' });
    setIsAddOpen(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vision Board</h1>
          <p className="text-muted-foreground mt-1">Visualize your wellness goals and stay inspired.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm">
              <Plus className="w-4 h-4" /> Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Vision Board</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Daily Yoga, Read 12 Books"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="Paste an image URL"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddItem} disabled={!newItem.title || !newItem.image_url}>
                Save Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative aspect-[4/3]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-red-500/50 hover:text-white border-none"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl bg-muted/20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Layout className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Your Vision Board is empty</h3>
            <p className="text-muted-foreground mt-2">Add goals that inspire you to keep going.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsAddOpen(true)}
            >
              Add Your First Goal
            </Button>
          </div>
        )}
      </div>

      <Card className="bg-primary/5 border-none rounded-3xl overflow-hidden">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">Stay Focused on Your Why</h3>
            <p className="text-muted-foreground mt-1">
              Visualizing your goals daily can help increase motivation and improve your mental resilience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
