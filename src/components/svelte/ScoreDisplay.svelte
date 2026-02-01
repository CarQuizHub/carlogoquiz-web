<script lang="ts">
  interface Props {
    score: number;
    lives: number;
    current: number;
    total: number;
    progress: number;
  }
  
  let { score, lives, current, total, progress }: Props = $props();
  
  // Generate hearts array
  let hearts = $derived(
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      active: i < lives
    }))
  );
</script>

<div class="score-display">
  <!-- Progress bar -->
  <div class="progress-bar">
    <div class="progress-fill" style="width: {progress}%"></div>
  </div>
  
  <div class="stats">
    <!-- Score -->
    <div class="stat">
      <span class="stat-label">Score</span>
      <span class="stat-value score-value">{score}</span>
    </div>
    
    <!-- Lives -->
    <div class="stat">
      <span class="stat-label">Lives</span>
      <span class="stat-value lives-value">
        {#each hearts as heart (heart.id)}
          <span 
            class="heart" 
            class:lost={!heart.active}
            style="animation-delay: {heart.id * 100}ms"
          >
            ❤️
          </span>
        {/each}
      </span>
    </div>
    
    <!-- Question counter -->
    <div class="stat">
      <span class="stat-label">Question</span>
      <span class="stat-value">
        <span class="current">{current}</span>
        <span class="separator">/</span>
        <span class="total">{total}</span>
      </span>
    </div>
  </div>
</div>

<style>
  .score-display {
    background: var(--color-bg-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  
  /* Progress bar */
  .progress-bar {
    height: 3px;
    background: var(--color-bg-tertiary);
  }
  
  .progress-fill {
    height: 100%;
    background: var(--gradient-accent);
    transition: width 0.4s ease;
  }
  
  /* Stats */
  .stats {
    display: flex;
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .stat-label {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  /* Score specific */
  .score-value {
    color: var(--color-accent-primary);
  }
  
  /* Lives specific */
  .lives-value {
    display: flex;
    gap: 2px;
  }
  
  .heart {
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .heart.lost {
    opacity: 0.2;
    filter: grayscale(1);
    transform: scale(0.9);
  }
  
  /* Question counter */
  .current {
    color: var(--color-text-primary);
  }
  
  .separator {
    color: var(--color-text-muted);
    margin: 0 2px;
  }
  
  .total {
    color: var(--color-text-muted);
  }
  
  /* Responsive */
  @media (max-width: 400px) {
    .stats {
      padding: var(--space-sm) var(--space-md);
    }
    
    .stat-value {
      font-size: 1rem;
    }
  }
</style>
