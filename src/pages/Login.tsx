import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Brain,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const resetFormState = () => {
    setConfirmationSent(false);
    setShowPassword(false);
  };

  const switchMode = () => {
    if (loading) return;

    setIsSignUp((previous) => !previous);
    resetFormState();
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      toast.error('Please enter your email and password.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setConfirmationSent(false);

    try {
      if (isSignUp) {
        const { error, session } = await signUp(cleanEmail, password);

        if (error) {
          const message = error.message.toLowerCase();

          if (
            message.includes('already registered') ||
            message.includes('already exists') ||
            message.includes('user already registered')
          ) {
            toast.error(
              'An account with this email already exists. Please sign in instead.'
            );
          } else if (message.includes('rate limit')) {
            toast.error(
              'Too many attempts. Please wait a few minutes and try again.'
            );
          } else if (message.includes('password')) {
            toast.error(error.message);
          } else {
            toast.error(error.message || 'Unable to create your account.');
          }

          return;
        }

        // Supabase returns a session when email confirmation is disabled.
        if (session) {
          toast.success('Account created successfully!');

          navigate('/dashboard', { replace: true });
          return;
        }

        // No session means email confirmation is required.
        setConfirmationSent(true);

        toast.success('Check your email to confirm your account.');
      } else {
        const { error, session } = await signIn(cleanEmail, password);

        if (error) {
          const message = error.message.toLowerCase();

          if (
            message.includes('invalid login credentials') ||
            message.includes('invalid credentials')
          ) {
            toast.error('Incorrect email or password.');
          } else if (message.includes('email not confirmed')) {
            toast.error(
              'Please confirm your email address before signing in.'
            );
          } else if (message.includes('rate limit')) {
            toast.error(
              'Too many login attempts. Please wait a few minutes and try again.'
            );
          } else {
            toast.error(error.message || 'Unable to sign in.');
          }

          return;
        }

        if (!session) {
          toast.error('Sign in could not be completed. Please try again.');
          return;
        }

        toast.success('Welcome back!');

        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Authentication error:', error);

      toast.error(
        isSignUp
          ? 'We could not create your account. Please try again.'
          : 'We could not sign you in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Brand */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>

            <h1 className="text-3xl font-bold text-foreground">
              MindCare AI
            </h1>
          </div>
        </div>

        <Card className="border-2 border-primary/10 shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-2xl">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </CardTitle>

            <CardDescription className="text-base">
              {isSignUp
                ? 'Start your mental wellness journey today'
                : 'Sign in to continue your wellness journey'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Email confirmation state */}
            {confirmationSent ? (
              <div className="text-center space-y-5 py-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">
                    Check your email
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We've sent a confirmation link to:
                  </p>

                  <p className="font-medium break-all">
                    {email.trim().toLowerCase()}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                    Click the link in that email to activate your account.
                    Once confirmed, come back here and sign in.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setConfirmationSent(false);
                    setPassword('');
                  }}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium"
                    >
                      Email
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11"
                        autoComplete="email"
                        aria-label="Email address"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-11"
                        autoComplete={
                          isSignUp ? 'new-password' : 'current-password'
                        }
                        aria-label="Password"
                        disabled={loading}
                        required
                        minLength={6}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        disabled={loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />

                        {isSignUp
                          ? 'Creating your account...'
                          : 'Signing you in...'}
                      </span>
                    ) : (
                      <>
                        {isSignUp ? (
                          <UserPlus className="w-4 h-4" />
                        ) : (
                          <LogIn className="w-4 h-4" />
                        )}

                        {isSignUp
                          ? 'Create Account'
                          : 'Sign In'}
                      </>
                    )}
                  </Button>
                </form>

                {/* Switch mode */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-sm text-primary hover:underline font-medium"
                    disabled={loading}
                  >
                    {isSignUp
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your data is securely stored and private. We care about your
          mental wellness.
        </p>
      </motion.div>
    </div>
  );
}
