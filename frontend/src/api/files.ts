interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  userId: string;
  userName?: string;
  downloadUrl: string;
}

interface UploadResponse {
  success: boolean;
  file?: FileItem;
  message?: string;
}

interface FilesResponse {
  success: boolean;
  files: FileItem[];
  totalCount: number;
}

interface FileStats {
  totalFiles: number;
  totalStorage: number;
  filesByType: Record<string, number>;
}

class FilesAPI {
  private baseUrl = '/api/files';

  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status === 200) {
            resolve(response);
          } else {
            reject(new Error(response.message || 'Upload failed'));
          }
        } catch (error) {
          reject(new Error('Invalid response from server'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', `${this.baseUrl}/upload`);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  }

  async getFiles(userId?: string): Promise<FilesResponse> {
    const url = userId ? `${this.baseUrl}/list?userId=${userId}` : `${this.baseUrl}/list`;
    
    const response = await fetch(url, {
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
    const response = await fetch(`${this.baseUrl}/delete/${fileId}`, {
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

  async downloadFile(fileId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/download/${fileId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    return response.blob();
  }

  async getFileStats(): Promise<FileStats> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch file statistics');
    }

    return response.json();
  }
}

export const filesAPI = new FilesAPI();
