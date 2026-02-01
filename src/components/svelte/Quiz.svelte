<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    quizApi, 
    saveSessionToStorage, 
    getSessionFromStorage, 
    clearSessionFromStorage 
  } from '@lib/api';
  import type { QuizState, Question, Brand } from '@lib/types';
  import { initialQuizState } from '@lib/types';
  
  import QuestionDisplay from './Question.svelte';
  import AnswerGrid from './AnswerGrid.svelte';
  import ScoreDisplay from './ScoreDisplay.svelte';
  import Feedback from './Feedback.svelte';
  import GameOver from './GameOver.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  // Props
  interface Props {
    mediaBaseUrl: string;
  }
  
  let { mediaBaseUrl }: Props = $props();
  
  // State using Svelte 5 runes
  let state = $state<QuizState>({ ...initialQuizState });
  
  // Derived values
  let currentQuestion = $derived(
    state.questions[state.currentQuestionIndex] ?? null
  );
  
  let totalQuestions = $derived(state.questions.length);
  
  let isLastQuestion = $derived(
    state.currentQuestionIndex >= totalQuestions - 1
  );
  
  let progress = $derived(
    totalQuestions > 0 
      ? ((state.currentQuestionIndex) / totalQuestions) * 100 
      : 0
  );

  // ============================================
  // Session Management
  // ============================================
  
  async function startNewSession() {
    state.status = 'loading';
    state.error = null;
    
    const result = await quizApi.startSession();
    
    if (!result.success) {
      state.error = result.error.message;
      state.status = 'idle';
      return;
    }
    
    // Update state with session data
    state = {
      status: 'playing',
      sessionId: result.data.sessionId,
      brands: result.data.brands,
      questions: result.data.questions.map(q => q.question),
      currentQuestionIndex: 0,
      score: 0,
      lives: 3,
      lastAnswer: null,
      error: null
    };
    
    // Save session for restoration
    saveSessionToStorage(result.data.sessionId);
  }
  
  async function restoreSession(sessionId: string) {
    state.status = 'loading';
    state.error = null;
    
    const result = await quizApi.restoreSession(sessionId);
    
    if (!result.success) {
      // Session expired or invalid - start fresh
      clearSessionFromStorage();
      await startNewSession();
      return;
    }
    
    // Update state with restored session
    state = {
      status: 'playing',
      sessionId: result.data.sessionId,
      brands: result.data.brands,
      questions: result.data.questions.map(q => q.question),
      currentQuestionIndex: 0, // TODO: Track this in BE if needed
      score: 0,
      lives: 3,
      lastAnswer: null,
      error: null
    };
  }

  // ============================================
  // Quiz Actions
  // ============================================
  
  async function submitAnswer(brandId: number) {
    if (!state.sessionId || !currentQuestion) return;
    
    const result = await quizApi.submitAnswer(
      state.sessionId,
      currentQuestion.questionNumber,
      brandId
    );
    
    if (!result.success) {
      state.error = result.error.message;
      return;
    }
    
    // Update state with result
    state.score = result.data.score;
    state.lives = result.data.lives;
    state.lastAnswer = {
      isCorrect: result.data.isCorrect,
      correctBrandId: currentQuestion.correctBrandId,
      revealedLogo: result.data.logo
    };
    
    // Check for game over (no lives left)
    if (state.lives <= 0) {
      state.status = 'gameover';
      clearSessionFromStorage();
    } else {
      state.status = 'feedback';
    }
  }
  
  function nextQuestion() {
    if (isLastQuestion) {
      // Quiz completed!
      state.status = 'gameover';
      clearSessionFromStorage();
    } else {
      // Advance to next question
      state.currentQuestionIndex++;
      state.lastAnswer = null;
      state.status = 'playing';
    }
  }
  
  async function playAgain() {
    clearSessionFromStorage();
    state = { ...initialQuizState };
    await startNewSession();
  }
  
  function goHome() {
    clearSessionFromStorage();
    window.location.href = '/';
  }

  // ============================================
  // Initialization
  // ============================================
  
  onMount(async () => {
    const savedSessionId = getSessionFromStorage();
    
    if (savedSessionId) {
      await restoreSession(savedSessionId);
    } else {
      await startNewSession();
    }
  });
</script>

<div class="quiz">
  {#if state.status === 'loading'}
    <div class="quiz-loading">
      <LoadingSpinner />
      <p>Loading your quiz...</p>
    </div>
    
  {:else if state.status === 'idle'}
    <div class="quiz-idle">
      {#if state.error}
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <p>{state.error}</p>
        </div>
      {/if}
      <button class="btn btn-primary btn-large" onclick={startNewSession}>
        Start Quiz
      </button>
    </div>
    
  {:else if state.status === 'playing' && currentQuestion}
    <ScoreDisplay 
      score={state.score} 
      lives={state.lives}
      current={state.currentQuestionIndex + 1}
      total={totalQuestions}
      {progress}
    />
    
    <QuestionDisplay 
      question={currentQuestion}
      {mediaBaseUrl}
    />
    
    <AnswerGrid 
      brands={state.brands}
      onSelect={submitAnswer}
    />
    
  {:else if state.status === 'feedback' && state.lastAnswer && currentQuestion}
    <ScoreDisplay 
      score={state.score} 
      lives={state.lives}
      current={state.currentQuestionIndex + 1}
      total={totalQuestions}
      {progress}
    />
    
    <Feedback 
      isCorrect={state.lastAnswer.isCorrect}
      correctBrandId={state.lastAnswer.correctBrandId}
      revealedLogo={state.lastAnswer.revealedLogo}
      brands={state.brands}
      {mediaBaseUrl}
      onContinue={nextQuestion}
      isLast={isLastQuestion}
    />
    
  {:else if state.status === 'gameover'}
    <GameOver 
      score={state.score}
      questionsAnswered={state.currentQuestionIndex + 1}
      {totalQuestions}
      livesRemaining={state.lives}
      onPlayAgain={playAgain}
      onGoHome={goHome}
    />
  {/if}
  
  {#if state.error && state.status !== 'idle'}
    <div class="toast-error">
      {state.error}
    </div>
  {/if}
</div>

<style>
  .quiz {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    animation: fadeIn 0.4s ease;
  }
  
  .quiz-loading,
  .quiz-idle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: var(--space-lg);
    text-align: center;
  }
  
  .quiz-loading p {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }
  
  .error-message {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    background: rgba(255, 51, 102, 0.1);
    border: 1px solid rgba(255, 51, 102, 0.3);
    border-radius: var(--radius-md);
    color: var(--color-accent-secondary);
  }
  
  .error-icon {
    font-size: 1.25rem;
  }
  
  .toast-error {
    position: fixed;
    bottom: var(--space-lg);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-md) var(--space-lg);
    background: var(--color-accent-secondary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: var(--shadow-lg);
    animation: fadeIn 0.3s ease;
    z-index: 100;
  }
</style>
