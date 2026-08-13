import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Sparkles, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUPPORTIVE_RESPONSES = [
  "I'm here to listen. Tell me more about how you're feeling.",
  "It's completely valid to feel that way. Many people experience similar emotions.",
  "How can I support you right now? We could try a breathing exercise or just talk.",
  "You're showing a lot of strength by sharing this.",
  "Remember to be kind to yourself today. You're doing your best.",
  "What's one small thing that might make you feel 1% better right now?",
  "I hear you. It sounds like you've had a lot on your mind lately.",
  "That sounds challenging. Would you like to explore some coping strategies for this?",
];

const GREETINGS = [
  "Hello! I'm MindCare AI, your wellness companion. How are you feeling today?",
  "Hi there. I'm here if you need a safe space to talk. What's on your mind?",
  "Welcome back. I'm ready to listen whenever you're ready to share.",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{
      id: 'initial',
      role: 'ai',
      content: greeting,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: SUPPORTIVE_RESPONSES[Math.floor(Math.random() * SUPPORTIVE_RESPONSES.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-none">MindCare Companion</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Always here to help</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Chat information">
          <Info className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      <Card className="flex-1 overflow-hidden border-none bg-muted/30 flex flex-col shadow-inner">
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className={`w-8 h-8 mt-1 shrink-0 ${message.role === 'ai' ? 'bg-primary/20 text-primary' : 'bg-muted-foreground/20'}`}>
                      {message.role === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </Avatar>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-card text-card-foreground rounded-tl-none border border-border/50'
                    }`}>
                      <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                      <span className="text-[10px] opacity-50 mt-2 block font-medium">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 mt-1 shrink-0 bg-primary/20 text-primary">
                    <Sparkles className="w-4 h-4" />
                  </Avatar>
                  <div className="bg-card border border-border/50 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 bg-background/50 border-t border-border/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type your message"
              placeholder="Type your message..."
              className="h-12 rounded-xl bg-background border-none shadow-sm focus-visible:ring-primary/30 text-base"
            />
            <Button 
              type="submit" 
              size="icon" 
              aria-label="Send message"
              className="h-12 w-12 rounded-xl shrink-0 shadow-lg shadow-primary/20 transition-transform active:scale-95"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-bold opacity-60">
            MindCare AI Companion • Encrypted & Private
          </p>
        </div>
      </Card>
    </div>
  );
}
