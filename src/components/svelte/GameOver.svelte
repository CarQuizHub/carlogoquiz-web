<script lang="ts">
  interface Props {
    score: number;
    questionsAnswered: number;
    totalQuestions: number;
    livesRemaining: number;
    onPlayAgain: () => void;
    onGoHome: () => void;
  }
  
  let { 
    score, 
    questionsAnswered, 
    totalQuestions, 
    livesRemaining,
    onPlayAgain,
    onGoHome
  }: Props = $props();
  
  // Did they complete the quiz or run out of lives?
  let completed = $derived(livesRemaining > 0);
  
  // Calculate accuracy
  let correctAnswers = $derived(questionsAnswered - (3 - livesRemaining));
  let accuracy = $derived(
    questionsAnswered > 0 
      ? Math.round((correctAnswers / questionsAnswered) * 100) 
      : 0
  );
  
  // Rating based on performance
  let rating = $derived(() => {
    if (completed && accuracy >= 90) return { emoji: '🏆', label: 'Perfect!', color: 'gold' };
    if (completed && accuracy >= 70) return { emoji: '🌟', label: 'Great Job!', color: 'success' };
    if (completed) return { emoji: '✅', label: 'Well Done!', color: 'primary' };
    if (accuracy >= 50) return { emoji: '💪', label: 'Good Try!', color: 'primary' };
    return { emoji: '🔄', label: 'Keep Practicing!', color: 'secondary' };
  });
</script>

<div class="gameover">
  <!-- Header -->
  <div class="header">
    <span class="emoji">{rating().emoji}</span>
    <h1 class="title">{completed ? 'Quiz Complete!' : 'Game Over'}</h1>
    <p class="subtitle">{rating().label}</p>
  </div>
  
  <!-- Score highlight -->
  <div class="score-highlight">
    <span class="score-label">Final Score</span>
    <span class="score-value">{score}</span>
  </div>
  
  <!-- Stats grid -->
  <div class="stats-grid">
    <div class="stat-card">
      <span class="stat-icon">📝</span>
      <span class="stat-value">{questionsAnswered}/{totalQuestions}</span>
      <span class="stat-label">Questions</span>
    </div>
    
    <div class="stat-card">
      <span class="stat-icon">🎯</span>
      <span class="stat-value">{accuracy}%</span>
      <span class="stat-label">Accuracy</span>
    </div>
    
    <div class="stat-card">
      <span class="stat-icon">❤️</span>
      <span class="stat-value">{livesRemaining}</span>
      <span class="stat-label">Lives Left</span>
    </div>
  </div>
  
  <!-- Actions -->
  <div class="actions">
    <button class="btn-play-again" onclick={onPlayAgain}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6M1 20v-6h6"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
      <span>Play Again</span>
    </button>
    
    <button class="btn-home" onclick={onGoHome}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>Back to Home</span>
    </button>
  </div>
</div>

<style>
  .gameover {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    padding: var(--space-xl) var(--space-md);
    animation: fadeIn 0.5s ease;
  }
  
  /* Header */
  .header {
    text-align: center;
  }
  
  .emoji {
    font-size: 4rem;
    display: block;
    margin-bottom: var(--space-md);
    animation: scaleIn 0.5s ease;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: var(--space-xs);
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
  }
  
  /* Score highlight */
  .score-highlight {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xl) var(--space-3xl);
    background: var(--color-bg-card);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: var(--radius-xl);
    animation: scaleIn 0.4s ease 0.1s backwards;
  }
  
  .score-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .score-value {
    font-family: var(--font-mono);
    font-size: 3.5rem;
    font-weight: 700;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Stats grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    width: 100%;
    animation: fadeIn 0.4s ease 0.2s backwards;
  }
  
  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-lg);
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
  }
  
  .stat-icon {
    font-size: 1.5rem;
  }
  
  .stat-card .stat-value {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  .stat-card .stat-label {
    font-size: 0.7rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Actions */
  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    width: 100%;
    max-width: 280px;
    animation: fadeIn 0.4s ease 0.3s backwards;
  }
  
  .btn-play-again,
  .btn-home {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .btn-play-again {
    color: var(--color-bg-primary);
    background: var(--gradient-accent);
    box-shadow: var(--shadow-glow);
  }
  
  .btn-play-again:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.5);
  }
  
  .btn-home {
    color: var(--color-text-secondary);
    background: var(--color-bg-tertiary);
  }
  
  .btn-home:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-card);
  }
  
  /* Responsive */
  @media (max-width: 400px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .stat-card {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
