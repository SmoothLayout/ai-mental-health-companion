import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, Target, Users, Shield, Sparkles, Eye } from 'lucide-react';
import { Footer } from '@/components/Footer';

const values = [
  {
    icon: Heart,
    title: 'Empathy First',
    description: 'We believe everyone deserves compassionate support on their mental health journey.',
  },
  {
    icon: Shield,
    title: 'Privacy & Trust',
    description: 'Your data is encrypted, private, and never shared. We prioritize your security above all.',
  },
  {
    icon: Target,
    title: 'Evidence-Based',
    description: 'Our techniques are grounded in cognitive behavioral therapy and positive psychology research.',
  },
  {
    icon: Users,
    title: 'Accessible to All',
    description: 'Mental health support should be available to everyone, regardless of location or background.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MindCare AI</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/login">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">About MindCare AI</h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Building the future of accessible mental health support through the power of artificial intelligence and evidence-based therapy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Making Mental Health Support Accessible to Everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MindCare AI was created with a simple belief: everyone deserves access to quality mental health tools. 
                By combining cutting-edge AI with proven therapeutic techniques, we're building a platform that meets you 
                where you are — whether you need a quick breathing exercise, want to journal your thoughts, or need to 
                talk through a difficult moment.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Eye className="w-4 h-4" />
                Our Vision
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                A World Empowered by Mental Wellness
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a future where mental health support is proactive, personalized, and completely 
                destigmatized. A world where every individual possesses the digital companions and evidence-based 
                tools necessary to navigate life's challenges with resilience, clarity, and inner peace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="mt-3 text-muted-foreground">The principles that guide everything we build.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border border-border/50 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-primary">CO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Cyril Ofide</h2>
          <p className="text-primary font-medium mb-4">Founder & Creator</p>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cyril is passionate about leveraging technology to make mental health support more accessible and 
              destigmatized. His founding vision is to bridge the gap between traditional therapy and everyday self-care,
              ensuring that no one has to face their mental health journey alone.
            </p>
            <p className="italic text-muted-foreground">
              "Mental wellness shouldn't be a luxury; it should be a fundamental human right powered by the best 
              tools we can build." — Cyril Ofide
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Us on This Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start taking care of your mental health today with MindCare AI.
          </p>
          <Link to="/login">
            <Button size="lg" className="gap-2 text-base px-8 h-12">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
