import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    session: Session | null;
  }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    session: Session | null;
    needsConfirmation: boolean;
  }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Failed to get session:', error);
        }

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Authentication initialization error:', error);

        if (mounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event);

      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /**
   * SIGN IN
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return {
          error: new Error(error.message),
          session: null,
        };
      }

      return {
        error: null,
        session: data.session ?? null,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error('Unable to sign in. Please try again.'),
        session: null,
      };
    }
  };

  /**
   * SIGN UP
   */
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return {
          error: new Error(error.message),
          session: null,
          needsConfirmation: false,
        };
      }

      /*
       * When email confirmation is enabled by Supabase,
       * data.session will normally be null.
       */
      const needsConfirmation =
        !!data.user && !data.session;

      return {
        error: null,
        session: data.session ?? null,
        needsConfirmation,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error('Unable to create your account. Please try again.'),
        session: null,
        needsConfirmation: false,
      };
    }
  };

  /**
   * SIGN OUT
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          error: new Error(error.message),
        };
      }

      setUser(null);
      setSession(null);

      return {
        error: null,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error('Unable to sign out. Please try again.'),
      };
    }
  };

  /**
   * SEND PASSWORD RESET EMAIL
   */
  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim().toLowerCase(),
          {
            redirectTo: redirectUrl,
          }
        );

      if (error) {
        return {
          error: new Error(error.message),
        };
      }

      return {
        error: null,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error(
                'Unable to send the password reset email. Please try again.'
              ),
      };
    }
  };

  /**
   * UPDATE PASSWORD
   */
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return {
          error: new Error(error.message),
        };
      }

      return {
        error: null,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error('Unable to update your password. Please try again.'),
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}
