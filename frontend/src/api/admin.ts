interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  registrationDate: string;
  lastLogin: string;
  isActive: boolean;
  fileCount: number;
  storageUsed: number;
}

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalFiles: number;
  totalStorage: number;
  newUsersThisMonth: number;
  newFilesThisMonth: number;
}

interface SystemSettings {
  maxFileSize: number;
  allowedFileTypes: string[];
  enableTwoFactorAuth: boolean;
  requirePasswordComplexity: boolean;
  sessionTimeout: number;
}

class AdminAPI {
  private baseUrl = '/api/admin';

  async getStats(): Promise<AdminStats> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin statistics');
    }

    return response.json();
  }

  async getUsers(): Promise<{ success: boolean; users: User[] }> {
    const response = await fetch(`${this.baseUrl}/users`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<{ success: boolean; message?: string }> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/status`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user status');
    }

    return response.json();
  }

  async deleteUser(userId: string): Promise<{ success: boolean; message?: string }> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user');
    }

    return response.json();
  }

  async getAllFiles(): Promise<{ success: boolean; files: any[] }> {
    const response = await fetch(`${this.baseUrl}/files`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  }

  async deleteFile(fileId: string): Promise<{ success: boolean; message?: string }> {
    const response = await fetch(`${this.baseUrl}/files/delete/${fileId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete file');
    }

    return response.json();
  }

  async getSystemSettings(): Promise<SystemSettings> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch system settings');
    }

    return response.json();
  }

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<{ success: boolean; message?: string }> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update settings');
    }

    return response.json();
  }

  async getActivityLog(): Promise<{ success: boolean; activities: any[] }> {
    const response = await fetch(`${this.baseUrl}/activity`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch activity log');
    }

    return response.json();
  }
}

export const adminAPI = new AdminAPI();
