import { create } from 'zustand';
import { User } from '@/types';
import * as authService from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Login failed' });
        return false;
      }

      // Store auth data in local storage
      authService.storeAuthData(response.data);
      
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ name, email, password });
      
      if (response.error || !response.data) {
        set({ isLoading: false, error: response.error || 'Registration failed' });
        return false;
      }

      // Store auth data in local storage
      authService.storeAuthData(response.data);
      
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      });
      return false;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    set({ isLoading: true });
    try {
      // Try to get user from local storage first
      const storedUser = authService.getStoredUser();
      if (storedUser) {
        set({ user: storedUser, isAuthenticated: true });
      }

      // Then fetch fresh data from API
      const response = await authService.getProfile();
      
      if (response.error || !response.data) {
        // If API call fails, but we have stored user, keep them logged in
        if (!storedUser) {
          set({ isAuthenticated: false, user: null });
          authService.logout();
        }
      } else {
        set({ user: response.data, isAuthenticated: true });
      }
    } catch (error) {
      // If error occurs but we have stored user, keep them logged in
      if (!authService.getStoredUser()) {
        set({ isAuthenticated: false, user: null });
        authService.logout();
      }
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
