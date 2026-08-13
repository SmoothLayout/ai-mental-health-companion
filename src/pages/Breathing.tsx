import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Play, Pause, RefreshCw, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BREATH_PHASES = [
  { label: 'Inhale', duration: 4000, color: 'bg-blue-400' },
  { label: 'Hold', duration: 4000, color: 'bg-cyan-400' },
  { label: 'Exhale', duration: 4000, color: 'bg-emerald-400' },
  { label: 'Hold', duration: 4000, color: 'bg-cyan-400' },
];

export default function Breathing() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATH_PHASES[0].duration);

  useEffect(() => {
    let timer: number;
    if (isActive) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            setPhaseIndex((idx) => (idx + 1) % BREATH_PHASES.length);
            return BREATH_PHASES[(phaseIndex + 1) % BREATH_PHASES.length].duration;
          }
          return prev - 100;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isActive, phaseIndex]);

  const currentPhase = BREATH_PHASES[phaseIndex];
  const progress = (timeLeft / currentPhase.duration) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto py-8">
      <div className="w-full flex justify-start mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold tracking-tight">Box Breathing</h2>
        <p className="text-muted-foreground text-lg">A simple technique to calm your nervous system and reduce stress.</p>
      </div>

      <div className="relative flex items-center justify-center mb-16">
        {/* Outer Glow */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: phaseIndex === 0 ? 1.5 : phaseIndex === 2 ? 0.8 : 1,
                opacity: 0.2
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className={`absolute w-64 h-64 rounded-full blur-3xl ${currentPhase.color}`}
            />
          )}
        </AnimatePresence>

        {/* Breathing Circle */}
        <div className="relative w-64 h-64 rounded-full border-8 border-muted/20 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ 
              scale: phaseIndex === 0 ? 1.2 : phaseIndex === 2 ? 0.8 : 1.2,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className={`absolute inset-0 opacity-20 ${currentPhase.color}`}
          />
          
          <div className="relative z-10 text-center space-y-2">
            <motion.h3 
              key={currentPhase.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-widest uppercase"
            >
              {currentPhase.label}
            </motion.h3>
            <p className="text-xl font-medium text-muted-foreground">
              {Math.ceil(timeLeft / 1000)}s
            </p>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <svg className="absolute w-72 h-72 -rotate-90 pointer-events-none">
          <circle
            cx="144"
            cy="144"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary/10"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="880"
            animate={{ strokeDashoffset: 880 - (880 * progress) / 100 }}
            className="text-primary"
          />
        </svg>
      </div>

      <div className="flex gap-4">
        <Button 
          size="lg" 
          className="h-16 w-16 rounded-full shadow-xl"
          aria-label={isActive ? "Pause breathing exercise" : "Start breathing exercise"}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full"
          aria-label="Reset breathing exercise"
          onClick={() => {
            setIsActive(false);
            setPhaseIndex(0);
            setTimeLeft(BREATH_PHASES[0].duration);
          }}
        >
          <RefreshCw className="w-6 h-6" />
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full">
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-none">
          <CardContent className="p-4 text-center">
            <h4 className="font-bold text-blue-700 dark:text-blue-300">Relaxation</h4>
            <p className="text-xs text-blue-600/60">Lowers cortisol levels</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-none">
          <CardContent className="p-4 text-center">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300">Focus</h4>
            <p className="text-xs text-emerald-600/60">Improves concentration</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
