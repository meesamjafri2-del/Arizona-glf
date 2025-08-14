interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
}

class ContactAPI {
  private baseUrl = '/api/contact';

  async sendMessage(data: ContactMessage): Promise<ContactResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    return response.json();
  }

  async getMessages(): Promise<{ success: boolean; messages: any[] }> {
    const response = await fetch(`${this.baseUrl}/messages`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  }

  async markMessageAsRead(messageId: string): Promise<ContactResponse> {
    const response = await fetch(`${this.baseUrl}/messages/${messageId}/read`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark message as read');
    }

    return response.json();
  }

  async deleteMessage(messageId: string): Promise<ContactResponse> {
    const response = await fetch(`${this.baseUrl}/messages/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete message');
    }

    return response.json();
  }
}

export const contactAPI = new ContactAPI();
