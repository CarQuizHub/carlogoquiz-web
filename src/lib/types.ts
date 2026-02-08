// ============================================
// Types from BE Worker (carlogoquiz-api)
// Keep in sync with your backend types
// ============================================

/**
 * A single quiz question
 */
export interface Question {
  questionNumber: number;
  difficulty: number;
  logoPath: string;
  correctBrandId: number;
}

/**
 * A car brand option
 */
export interface Brand {
  id: number;
  brand_name: string;
}

/**
 * Request payload for submitting an answer
 */
export interface AnswerRequest {
  questionNumber: number;
  brandId: number;
  timeTaken: number | null;
}

// ============================================
// API Response Types
// ============================================

/**
 * Error codes returned by the API
 */
export enum SessionErrorCode {
  NO_BRANDS_AVAILABLE = "NO_BRANDS_AVAILABLE",
  NO_QUESTIONS_AVAILABLE = "NO_QUESTIONS_AVAILABLE",
  NO_ACTIVE_SESSION = "NO_ACTIVE_SESSION",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  GAME_OVER = "GAME_OVER",
  INVALID_INPUT_FORMAT = "INVALID_INPUT_FORMAT",
  INVALID_QUESTION_NUMBER = "INVALID_QUESTION_NUMBER",
  INVALID_SESSION_ID = "INVALID_SESSION_ID",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

/**
 * Error structure returned by the API
 */
export interface SessionError {
  code: SessionErrorCode | string;
  message: string;
}

/**
 * Response when starting a new session
 */
export interface ApiStartSessionResponse {
  brands: Brand[];
  questions: { question: Question }[];
}

/**
 * Response when starting/restoring with session ID
 */
export interface ApiStartSessionResponseWithId extends ApiStartSessionResponse {
  sessionId: string;
}

/**
 * Response when submitting an answer
 */
export interface ApiSubmitAnswerResponse {
  isCorrect: boolean;
  score: number;
  lives: number;
  logo: string;
}

/**
 * Response when ending a session
 */
export interface ApiEndSessionResponse {
  message: string;
}

// ============================================
// Result Wrappers (discriminated unions)
// ============================================

export interface SuccessResult<T> {
  success: true;
  data: T;
}

export interface ErrorResult {
  success: false;
  error: SessionError;
}

export type Result<T> = SuccessResult<T> | ErrorResult;

export type StartSessionResult = Result<ApiStartSessionResponseWithId>;
export type RestoreSessionResult = Result<ApiStartSessionResponseWithId>;
export type SubmitAnswerResult = Result<ApiSubmitAnswerResponse>;
export type EndSessionResult = Result<ApiEndSessionResponse>;

// ============================================
// Client-Side State Types
// ============================================

/**
 * Quiz status states
 */
export type QuizStatus =
  | "idle"
  | "loading"
  | "playing"
  | "feedback"
  | "gameover";

/**
 * Information about the last submitted answer
 */
export interface LastAnswer {
  isCorrect: boolean;
  correctBrandId: number;
  revealedLogo: string;
}

/**
 * Complete quiz state for the client
 */
export interface QuizState {
  status: QuizStatus;
  sessionId: string | null;
  brands: Brand[];
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  lives: number;
  lastAnswer: LastAnswer | null;
  error: string | null;
}

/**
 * Initial state for the quiz
 */
export const initialQuizState: QuizState = {
  status: "idle",
  sessionId: null,
  brands: [],
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  lives: 3,
  lastAnswer: null,
  error: null,
};
