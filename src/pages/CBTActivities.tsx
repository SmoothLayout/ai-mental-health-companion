import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Heart, 
  Brain, 
  Target, 
  Zap,
  ArrowRight,
  ArrowLeft,
  Sun,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExerciseStep {
  prompt: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'list';
}

interface Exercise {
  title: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  time: string;
  intensity: string;
  steps: ExerciseStep[];
}

const exercises: Exercise[] = [
  {
    title: 'Gratitude List',
    description: 'Focus on the positive aspects of your life by listing things you are thankful for today.',
    icon: Sun,
    category: 'Positivity',
    color: 'bg-amber-100 text-amber-600',
    time: '5 min',
    intensity: 'Low',
    steps: [
      { prompt: 'What is one thing you are grateful for today?', placeholder: 'e.g., A warm cup of coffee this morning...', type: 'textarea' },
      { prompt: 'Who is someone in your life you appreciate? What do they do?', placeholder: 'Think about someone who made a difference...', type: 'textarea' },
      { prompt: 'What is a personal strength you are thankful for?', placeholder: 'Reflect on your own qualities...', type: 'textarea' },
    ]
  },
  {
    title: 'Thought Challenging',
    description: 'Identify negative thought patterns and reframe them with more balanced perspectives.',
    icon: Brain,
    category: 'Cognitive',
    color: 'bg-violet-100 text-violet-600',
    time: '15 min',
    intensity: 'Medium',
    steps: [
      { prompt: 'What is the negative thought or situation bothering you?', placeholder: 'Describe the situation and your automatic thought...', type: 'textarea' },
      { prompt: 'What evidence supports this thought?', placeholder: 'List facts that seem to confirm it...', type: 'textarea' },
      { prompt: 'What evidence contradicts this thought?', placeholder: 'Consider alternative explanations or facts...', type: 'textarea' },
      { prompt: 'What is a more balanced, realistic way to think about this?', placeholder: 'Reframe the thought in a fairer way...', type: 'textarea' },
    ]
  },
  {
    title: 'Value Discovery',
    description: 'Clarify what truly matters to you to guide your decisions and improve daily fulfillment.',
    icon: Target,
    category: 'Intention',
    color: 'bg-emerald-100 text-emerald-600',
    time: '10 min',
    intensity: 'Low',
    steps: [
      { prompt: 'Think of a moment when you felt most fulfilled. What were you doing?', placeholder: 'Describe the situation in detail...', type: 'textarea' },
      { prompt: 'What core value does this moment reflect? (e.g., connection, creativity, growth)', placeholder: 'Name the value...', type: 'text' },
      { prompt: 'How can you honor this value in your daily life this week?', placeholder: 'List one small action you can take...', type: 'textarea' },
    ]
  },
  {
    title: 'Behavioral Activation',
    description: 'Plan small, manageable activities that bring a sense of accomplishment or pleasure.',
    icon: Zap,
    category: 'Action',
    color: 'bg-orange-100 text-orange-600',
    time: '10 min',
    intensity: 'Medium',
    steps: [
      { prompt: 'Name one activity that usually makes you feel good or accomplished.', placeholder: 'e.g., Taking a walk, calling a friend, cooking...', type: 'text' },
      { prompt: 'When will you do this activity? Be specific about day and time.', placeholder: 'e.g., Tomorrow at 3pm...', type: 'text' },
      { prompt: 'What might get in the way? How will you handle it?', placeholder: 'Plan for obstacles...', type: 'textarea' },
    ]
  },
  {
    title: 'Worry Window',
    description: 'Set aside a specific time each day to address worries, keeping the rest of your day clear.',
    icon: ShieldCheck,
    category: 'Management',
    color: 'bg-blue-100 text-blue-600',
    time: '15 min',
    intensity: 'High',
    steps: [
      { prompt: 'List your current worries. What is on your mind?', placeholder: 'Write down everything that is worrying you...', type: 'textarea' },
      { prompt: 'For each worry, is it something you can control or influence?', placeholder: 'Mark each as "controllable" or "uncontrollable"...', type: 'textarea' },
      { prompt: 'For controllable worries, what is one small step you can take?', placeholder: 'Plan your next action...', type: 'textarea' },
      { prompt: 'Choose your daily "Worry Window" time (15-20 min). When will it be?', placeholder: 'e.g., 5:00 PM daily...', type: 'text' },
    ]
  },
  {
    title: 'Self-Compassion Break',
    description: 'Acknowledge suffering, recognize common humanity, and speak kindly to yourself.',
    icon: Heart,
    category: 'Support',
    color: 'bg-rose-100 text-rose-600',
    time: '3 min',
    intensity: 'Low',
    steps: [
      { prompt: 'What are you struggling with right now? Acknowledge it.', placeholder: 'Say to yourself: "This is a moment of suffering..."', type: 'textarea' },
      { prompt: 'Remember: suffering is part of the human experience. You are not alone.', placeholder: 'Reflect: "Other people feel this way too..."', type: 'textarea' },
      { prompt: 'What would you say to a dear friend in this situation? Say that to yourself.', placeholder: 'Offer yourself kindness and understanding...', type: 'textarea' },
    ]
  }
];

export default function CBTActivities() {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setResponses(new Array(exercise.steps.length).fill(''));
    setCompleted(false);
  };

  const handleResponseChange = (value: string) => {
    const updated = [...responses];
    updated[currentStep] = value;
    setResponses(updated);
  };

  const handleNext = () => {
    if (!activeExercise) return;
    if (currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      toast.success('Exercise completed! Great work 🎉');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setActiveExercise(null);
    setCurrentStep(0);
    setResponses([]);
    setCompleted(false);
  };

  // Active exercise view
  if (activeExercise) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleReset}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Activities
        </Button>

        <Card className="border-2 border-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${activeExercise.color}`}>
                <activeExercise.icon className="w-6 h-6" />
              </div>
              <div>
                <Badge className="mb-1 bg-primary/10 text-primary border-none">
                  {activeExercise.category}
                </Badge>
                <CardTitle className="text-2xl">{activeExercise.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!completed ? (
              <>
                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  {activeExercise.steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        idx <= currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {activeExercise.steps.length}
                </p>

                {/* Current step */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <label className="text-lg font-medium leading-relaxed block">
                      {activeExercise.steps[currentStep].prompt}
                    </label>
                    {activeExercise.steps[currentStep].type === 'text' ? (
                      <Input
                        value={responses[currentStep]}
                        onChange={(e) => handleResponseChange(e.target.value)}
                        placeholder={activeExercise.steps[currentStep].placeholder}
                        className="h-11"
                        aria-label="Your response"
                      />
                    ) : (
                      <Textarea
                        value={responses[currentStep]}
                        onChange={(e) => handleResponseChange(e.target.value)}
                        placeholder={activeExercise.steps[currentStep].placeholder}
                        className="min-h-[150px] resize-none"
                        aria-label="Your response"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!responses[currentStep]?.trim()}
                    className="gap-2"
                  >
                    {currentStep === activeExercise.steps.length - 1 ? (
                      <>
                        <Check className="w-4 h-4" />
                        Complete
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              /* Completion view */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Exercise Complete!</h3>
                  <p className="text-muted-foreground">
                    You've completed the "{activeExercise.title}" exercise. 
                    Remember, consistent practice leads to lasting change.
                  </p>
                </div>
                <div className="space-y-3 text-left">
                  <h4 className="font-medium text-sm text-muted-foreground">Your Responses:</h4>
                  {activeExercise.steps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-muted/50 rounded-lg space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">{step.prompt}</p>
                      <p className="text-sm">{responses[idx]}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    All Activities
                  </Button>
                  <Button onClick={() => startExercise(activeExercise)} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Do Again
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Activity list view
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">CBT Self-Help Activities</h2>
        <p className="text-muted-foreground text-lg">Evidence-based exercises to improve your mental wellbeing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full group hover:shadow-md transition-all border-none bg-card/50 backdrop-blur">
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${exercise.color}`}>
                    <exercise.icon className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="font-medium">{exercise.time}</Badge>
                    <Badge variant="outline" className="font-medium">{exercise.intensity}</Badge>
                  </div>
                </div>
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary border-none hover:bg-primary/20">
                    {exercise.category}
                  </Badge>
                  <CardTitle className="text-2xl">{exercise.title}</CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">
                    {exercise.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full gap-2 font-semibold" 
                  variant="outline"
                  onClick={() => startExercise(exercise)}
                >
                  Start Exercise <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold">New to CBT?</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Cognitive Behavioral Therapy (CBT) is a form of psychological treatment that has been demonstrated to be effective for a range of problems including depression, anxiety disorders, and stress.
            </p>
          </div>
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Brain className="w-16 h-16 md:w-24 md:h-24 opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
