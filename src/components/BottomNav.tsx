import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Smile, MessageSquare, Wind, Brain, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Smile, label: 'Mood', path: '/mood' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Wind, label: 'Breath', path: '/breathing' },
  { icon: Brain, label: 'Activities', path: '/cbt' },
];

export function BottomNav() {
  const { signOut } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-4 py-2 z-50" aria-label="Mobile navigation">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={() => signOut()}
          className="flex flex-col items-center gap-1 p-2 transition-colors text-muted-foreground"
          aria-label="Sign out"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
