import type { APIRoute } from 'astro';

/**
 * POST /api/session/restore
 * 
 * Restores an existing quiz session by session ID.
 * Used when user returns to the quiz page with a saved session.
 * 
 * Request body:
 * - sessionId: string
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { sessionId } = body;

    // Validate input
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

    // Call BE worker via RPC service binding
    const result = await locals.runtime.env.QUIZ_API.restoreSession(sessionId);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('[API] Failed to restore session:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to restore session. Please try again.'
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
