export { authAPI } from './auth';
export { filesAPI } from './files';
export { adminAPI } from './admin';
export { contactAPI } from './contact';

// Common API utilities
export const API_BASE_URL = '/api';

export interface APIError {
  message: string;
  status?: number;
  field?: string;
}

export class APIClient {
  private static csrfToken: string | null = null;

  static async getCSRFToken(): Promise<string> {
    if (this.csrfToken) {
      return this.csrfToken;
    }

    try {
      const response = await fetch('/api/csrf-token', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.csrf_token;
        return this.csrfToken;
      }
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }

    return '';
  }

  static async request(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const csrfToken = await this.getCSRFToken();
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (csrfToken && (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE')) {
      defaultHeaders['X-CSRF-Token'] = csrfToken;
    }

    const config: RequestInit = {
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    // Handle common error responses
    if (response.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/login';
      throw new Error('Authentication required');
    }

    if (response.status === 403) {
      // Forbidden - insufficient permissions
      throw new Error('Insufficient permissions');
    }

    if (response.status === 419) {
      // CSRF token mismatch - refresh token and retry
      this.csrfToken = null;
      const newToken = await this.getCSRFToken();
      
      if (newToken) {
        const newHeaders = { ...config.headers } as Record<string, string>;
        newHeaders['X-CSRF-Token'] = newToken;
        
        return fetch(url, {
          ...config,
          headers: newHeaders,
        });
      }
    }

    return response;
  }

  static async get(url: string): Promise<Response> {
    return this.request(url, { method: 'GET' });
  }

  static async post(url: string, data?: any): Promise<Response> {
    return this.request(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async put(url: string, data?: any): Promise<Response> {
    return this.request(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async delete(url: string): Promise<Response> {
    return this.request(url, { method: 'DELETE' });
  }
}

// Error handling utility
export function handleAPIError(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

// Response validation utility
export function validateResponse<T>(response: any): T {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format');
  }
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response as T;
}
