/**
 * Authentication utilities for client-side
 */

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

interface DecodedToken {
  userId: string;
  email?: string;
  phone?: string;
  role: string;
  exp: number;
}

/**
 * Get auth token from cookies
 */
export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

/**
 * Set auth token in cookies
 */
export function setAuthToken(token: string, expires: number = 7): void {
  Cookies.set(TOKEN_KEY, token, { expires, secure: true, sameSite: 'strict' });
}

/**
 * Remove auth token from cookies
 */
export function removeAuthToken(): void {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Check if token is expired
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    console.error('Failed to decode token:', error);
    return false;
  }
}

/**
 * Get user data from token
 */
export function getUserFromToken(): DecodedToken | null {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Get user ID from token
 */
export function getUserId(): string | null {
  const user = getUserFromToken();
  return user?.userId || null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  const token = getAuthToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
}

/**
 * Get token expiry time
 */
export function getTokenExpiry(): Date | null {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return new Date(decoded.exp * 1000);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Protected route helper
 */
export function requireAuth(): boolean {
  if (!isAuthenticated()) {
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return false;
  }
  return true;
}
