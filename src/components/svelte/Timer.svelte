<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  interface Props {
    /** Whether the timer is running */
    running?: boolean;
    /** Callback when timer updates (returns ms elapsed) */
    onTick?: (elapsed: number) => void;
    /** Maximum time in ms (optional, for countdown display) */
    maxTime?: number;
  }
  
  let { running = true, onTick, maxTime }: Props = $props();
  
  let elapsed = $state(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;
  
  // Formatted time display
  let displayTime = $derived(() => {
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });
  
  // Progress for countdown mode
  let progress = $derived(
    maxTime ? Math.min((elapsed / maxTime) * 100, 100) : 0
  );
  
  // Is time running out?
  let isWarning = $derived(
    maxTime ? elapsed > maxTime * 0.75 : false
  );
  
  function startTimer() {
    if (intervalId) return;
    
    const startTime = Date.now() - elapsed;
    intervalId = setInterval(() => {
      elapsed = Date.now() - startTime;
      onTick?.(elapsed);
    }, 100);
  }
  
  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  function resetTimer() {
    elapsed = 0;
  }
  
  // React to running prop changes
  $effect(() => {
    if (running) {
      startTimer();
    } else {
      stopTimer();
    }
  });
  
  onMount(() => {
    if (running) {
      startTimer();
    }
  });
  
  onDestroy(() => {
    stopTimer();
  });
  
  // Export methods for parent control
  export { resetTimer, elapsed };
</script>

<div class="timer" class:warning={isWarning}>
  {#if maxTime}
    <div class="timer-progress">
      <div class="timer-progress-bar" style="width: {100 - progress}%"></div>
    </div>
  {/if}
  
  <div class="timer-display">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
    <span class="timer-value">{displayTime()}</span>
  </div>
</div>

<style>
  .timer {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .timer-display {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text-secondary);
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
  
  .timer.warning .timer-display {
    color: var(--color-accent-warning);
  }
  
  .timer-value {
    min-width: 3.5em;
  }
  
  .timer-progress {
    height: 3px;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
  }
  
  .timer-progress-bar {
    height: 100%;
    background: var(--color-accent-primary);
    transition: width 0.1s linear;
  }
  
  .timer.warning .timer-progress-bar {
    background: var(--color-accent-warning);
  }
</style>
