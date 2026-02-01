import type {
  StartSessionResult,
  RestoreSessionResult,
  SubmitAnswerResult,
  EndSessionResult
} from './types';

/**
 * API client for communicating with the quiz backend
 * All methods make fetch calls to our FE worker API endpoints,
 * which then call the BE worker via RPC
 */
class QuizApiClient {
  /**
   * Make a POST request and return typed JSON response
   */
  private async post<T>(url: string, body?: object): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      // Try to parse error response
      try {
        return await response.json();
      } catch {
        return {
          success: false,
          error: {
            code: 'NETWORK_ERROR',
            message: `Request failed: ${response.status} ${response.statusText}`
          }
        } as T;
      }
    }

    return response.json();
  }

  /**
   * Start a new quiz session
   * @returns Session data including sessionId, brands, and questions
   */
  async startSession(): Promise<StartSessionResult> {
    return this.post('/api/session/start');
  }

  /**
   * Restore an existing session
   * @param sessionId - The session ID to restore
   * @returns Session data if valid, error if expired/invalid
   */
  async restoreSession(sessionId: string): Promise<RestoreSessionResult> {
    return this.post('/api/session/restore', { sessionId });
  }

  /**
   * Submit an answer for the current question
   * @param sessionId - Current session ID
   * @param questionNumber - Question number (1-indexed)
   * @param brandId - Selected brand ID
   * @param timeTaken - Optional time taken in milliseconds
   * @returns Result including isCorrect, updated score, lives, and revealed logo
   */
  async submitAnswer(
    sessionId: string,
    questionNumber: number,
    brandId: number,
    timeTaken: number | null = null
  ): Promise<SubmitAnswerResult> {
    return this.post('/api/quiz/answer', {
      sessionId,
      questionNumber,
      brandId,
      timeTaken
    });
  }

  /**
   * End the current session
   * @param sessionId - Session ID to end
   * @returns Confirmation message
   */
  async endSession(sessionId: string): Promise<EndSessionResult> {
    return this.post('/api/session/end', { sessionId });
  }
}

/**
 * Singleton instance of the API client
 */
export const quizApi = new QuizApiClient();

// ============================================
// Session Storage Helpers
// ============================================

const SESSION_STORAGE_KEY = 'carlogoquiz_session';

/**
 * Save session ID to localStorage for restoration
 */
export function saveSessionToStorage(sessionId: string): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch (e) {
    // localStorage may be unavailable (private browsing, etc.)
    console.warn('Failed to save session to localStorage:', e);
  }
}

/**
 * Get saved session ID from localStorage
 */
export function getSessionFromStorage(): string | null {
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to get session from localStorage:', e);
    return null;
  }
}

/**
 * Clear saved session from localStorage
 */
export function clearSessionFromStorage(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear session from localStorage:', e);
  }
}
