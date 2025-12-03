// Environment variables utility

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.oraglan.com';
export const JWT_TOKEN_KEY = process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || 'adminToken';

// Auth token management
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(JWT_TOKEN_KEY);
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(JWT_TOKEN_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(JWT_TOKEN_KEY);
  }
  return false;
};