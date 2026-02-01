/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// ============================================
// Import your BE Worker types
// Option 1: If using shared package
// import type { ApiWorker } from 'carlogoquiz-shared';
//
// Option 2: Define inline (we'll use this for now)
// ============================================

import type {
  StartSessionResult,
  RestoreSessionResult,
  SubmitAnswerResult,
  EndSessionResult,
  AnswerRequest
} from './lib/types';

/**
 * Type definition for your BE Worker's RPC interface
 * This should match the ApiWorker class in carlogoquiz-api
 */
interface QuizApiService {
  startSession(): Promise<StartSessionResult>;
  restoreSession(sessionId: string): Promise<RestoreSessionResult>;
  submitAnswer(sessionId: string, data: AnswerRequest): Promise<SubmitAnswerResult>;
  endSession(sessionId: string): Promise<EndSessionResult>;
}

/**
 * Cloudflare Worker environment bindings
 */
interface CloudflareEnv {
  /** Service binding to the BE worker */
  QUIZ_API: QuizApiService;
  /** Base URL for R2 media assets */
  MEDIA_BASE_URL: string;
  /** Assets binding for serving static files */
  ASSETS: Fetcher;
}

/**
 * Cloudflare runtime type for Astro
 */
type Runtime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>;

/**
 * Extend Astro's App namespace to include Cloudflare bindings
 */
declare namespace App {
  interface Locals extends Runtime {}
}
