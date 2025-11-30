/**
 * AUTHENTICATION CONTEXT
 *
 * Provides authentication state and methods throughout the application using Supabase Auth.
 * This context handles user authentication, session management, and auth state persistence.
 *
 * Features:
 * - Email/password authentication via Supabase Auth
 * - Persistent sessions (survives page refreshes)
 * - Real-time auth state synchronization
 * - Loading states for login operations
 *
 * Security:
 * - Uses Supabase's built-in authentication system
 * - Sessions are securely stored and managed by Supabase
 * - Supports Row-Level Security (RLS) policies on database/storage
 *
 * @module AuthContext
 */

"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Type definition for the authentication context
 */
interface AuthContextType {
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;

  /** Login function that authenticates with email and password */
  login: (email: string, password: string) => Promise<boolean>;

  /** Logout function that signs out the current user */
  logout: () => void;

  /** Whether a login attempt is currently in progress */
  isLoggingIn: boolean;

  /** Whether the initial auth check is loading */
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * Must be used within an AuthProvider
 *
 * @throws Error if used outside of AuthProvider
 * @returns Authentication context with state and methods
 *
 * @example
 * ```tsx
 * const { isAuthenticated, login, logout } = useAuth();
 *
 * if (!isAuthenticated) {
 *   return <LoginForm onLogin={login} />;
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 *
 * Wraps the application to provide authentication state and methods.
 * Handles session persistence and real-time auth state updates.
 *
 * How it works:
 * 1. On mount: Checks for existing Supabase session
 * 2. Sets up listener for auth state changes (login/logout/token refresh)
 * 3. Updates isAuthenticated state automatically when session changes
 * 4. Provides login/logout methods to child components
 *
 * @param {AuthProviderProps} props - Component props
 * @returns React context provider
 *
 * @example
 * ```tsx
 * // In your app root or layout
 * <AuthProvider>
 *   <YourApp />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    /**
     * Checks for existing authentication session on component mount
     * This allows users to stay logged in across page refreshes
     */
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth session:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    /**
     * Subscribe to auth state changes
     * This listener will trigger whenever:
     * - User logs in
     * - User logs out
     * - Session token is refreshed
     * - User session expires
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Authenticates a user with email and password
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise that resolves to true if login successful, false otherwise
   *
   * On success:
   * - Creates a new Supabase session
   * - Sets isAuthenticated to true
   * - Session is stored securely by Supabase
   * - User can now perform authenticated operations (upload/delete images, etc.)
   *
   * @example
   * ```tsx
   * const handleLogin = async () => {
   *   const success = await login('admin@example.com', 'password123');
   *   if (success) {
   *     console.log('Login successful');
   *   } else {
   *     console.log('Invalid credentials');
   *   }
   * };
   * ```
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        setIsLoggingIn(false);
        return false;
      }

      if (data.session) {
        setIsAuthenticated(true);
        setIsLoggingIn(false);
        return true;
      }

      setIsLoggingIn(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggingIn(false);
      return false;
    }
  };

  /**
   * Signs out the current user
   *
   * Clears the Supabase session and updates authentication state.
   * After logout, user will need to login again to perform authenticated operations.
   *
   * @example
   * ```tsx
   * const handleLogout = async () => {
   *   await logout();
   *   console.log('User logged out');
   * };
   * ```
   */
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoggingIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};