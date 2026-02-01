import type { APIRoute } from 'astro';
import type { AnswerRequest } from '@lib/types';

/**
 * POST /api/quiz/answer
 * 
 * Submits an answer for the current quiz question.
 * Returns whether the answer was correct, updated score/lives, and the revealed logo.
 * 
 * Request body:
 * - sessionId: string
 * - questionNumber: number (1-indexed)
 * - brandId: number
 * - timeTaken: number | null (optional, in milliseconds)
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { sessionId, questionNumber, brandId, timeTaken } = body;

    // Validate sessionId
    if (!sessionId || typeof sessionId !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'sessionId is required and must be a string'
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Validate questionNumber
    if (typeof questionNumber !== 'number' || questionNumber < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'questionNumber is required and must be a positive number'
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Validate brandId
    if (typeof brandId !== 'number') {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'brandId is required and must be a number'
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Build answer request
    const answerData: AnswerRequest = {
      questionNumber,
      brandId,
      timeTaken: typeof timeTaken === 'number' ? timeTaken : null
    };

    // Call BE worker via RPC service binding
    const result = await locals.runtime.env.QUIZ_API.submitAnswer(sessionId, answerData);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('[API] Failed to submit answer:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to submit answer. Please try again.'
        }
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
