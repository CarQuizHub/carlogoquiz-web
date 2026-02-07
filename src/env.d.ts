/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type {
  StartSessionResult,
  RestoreSessionResult,
  SubmitAnswerResult,
  EndSessionResult,
  AnswerRequest,
} from "./lib/types";

interface QuizApiService {
  startSession(): Promise<StartSessionResult>;
  restoreSession(sessionId: string): Promise<RestoreSessionResult>;
  submitAnswer(
    sessionId: string,
    data: AnswerRequest,
  ): Promise<SubmitAnswerResult>;
  endSession(sessionId: string): Promise<EndSessionResult>;
}

interface CloudflareEnv {
  QUIZ_API: QuizApiService;
  MEDIA_BASE_URL: string;
  ASSETS: Fetcher;
}

declare namespace App {
  interface Locals {
    runtime: {
      env: CloudflareEnv;
      cf: IncomingRequestCfProperties;
      ctx: ExecutionContext;
    };
  }
}
