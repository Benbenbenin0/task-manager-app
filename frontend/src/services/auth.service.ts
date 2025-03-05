import { ApiResponse, AuthUser, LoginCredentials, RegisterCredentials, User } from '@/types';
import { apiRequest } from './api';

/**
 * Register a new user
 * @param credentials User registration data
 * @returns API response with authenticated user data
 */
export const register = async (
  credentials: RegisterCredentials
): Promise<ApiResponse<AuthUser>> => {
  return apiRequest<AuthUser>({
    method: 'POST',
    url: '/auth/register',
    data: credentials,
  });
};

/**
 * Login a user
 * @param credentials User login credentials
 * @returns API response with authenticated user data
 */
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<AuthUser>> => {
  return apiRequest<AuthUser>({
    method: 'POST',
    url: '/auth/login',
    data: credentials,
  });
};

/**
 * Get current user profile
 * @returns API response with user profile data
 */
export const getProfile = async (): Promise<ApiResponse<User>> => {
  return apiRequest<User>({
    method: 'GET',
    url: '/users/me',
  });
};

/**
 * Update user profile
 * @param userData User data to update
 * @returns API response with updated user data
 */
export const updateProfile = async (
  userData: Partial<User>
): Promise<ApiResponse<User>> => {
  return apiRequest<User>({
    method: 'PUT',
    url: '/users/me',
    data: userData,
  });
};

/**
 * Store authentication data in local storage
 * @param user Authenticated user data
 */
export const storeAuthData = (user: AuthUser): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }
};

/**
 * Get stored user data from local storage
 * @returns User data or null if not found
 */
export const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns True if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};

/**
 * Logout user by removing auth data from local storage
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
