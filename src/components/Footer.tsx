import { Link } from 'react-router-dom';
import { Brain, Mail, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MindCare AI</span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed">
              AI-powered mental wellness platform combining evidence-based therapy techniques with modern technology to support your mental health journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-background transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-background transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-background/70 hover:text-background transition-colors text-sm">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-background/70 text-sm">AI Chat Support</span>
              </li>
              <li>
                <span className="text-background/70 text-sm">Mood Tracking</span>
              </li>
              <li>
                <span className="text-background/70 text-sm">Guided Journaling</span>
              </li>
              <li>
                <span className="text-background/70 text-sm">Breathing Exercises</span>
              </li>
              <li>
                <span className="text-background/70 text-sm">CBT Activities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {currentYear} MindCare AI. Built by Cyril Ofide. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@mindcare.ai" className="text-background/60 hover:text-background transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
