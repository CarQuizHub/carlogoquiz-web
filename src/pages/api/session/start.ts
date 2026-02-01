import type { APIRoute } from 'astro';

/**
 * POST /api/session/start
 * 
 * Starts a new quiz session by calling the BE worker via RPC.
 * Returns session ID, available brands, and generated questions.
 */
export const POST: APIRoute = async ({ locals }) => {
  try {
    // Call BE worker via RPC service binding
    const result = await locals.runtime.env.QUIZ_API.startSession();

    // Return the result directly (preserves success/error structure)
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('[API] Failed to start session:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to start session. Please try again.'
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
