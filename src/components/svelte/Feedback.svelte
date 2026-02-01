<script lang="ts">
  import type { Brand } from '@lib/types';
  import Logo from './Logo.svelte';
  
  interface Props {
    isCorrect: boolean;
    correctBrandId: number;
    revealedLogo: string;
    brands: Brand[];
    mediaBaseUrl: string;
    onContinue: () => void;
    isLast: boolean;
  }
  
  let { 
    isCorrect, 
    correctBrandId, 
    revealedLogo, 
    brands, 
    mediaBaseUrl, 
    onContinue,
    isLast 
  }: Props = $props();
  
  let correctBrand = $derived(
    brands.find(b => b.id === correctBrandId)
  );
  
  let logoUrl = $derived(`${mediaBaseUrl}/${revealedLogo}`);
</script>

<div class="feedback" class:correct={isCorrect} class:incorrect={!isCorrect}>
  <!-- Result indicator -->
  <div class="result-indicator">
    <div class="result-icon" class:correct={isCorrect}>
      {#if isCorrect}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      {:else}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      {/if}
    </div>
    <h2 class="result-text">
      {isCorrect ? 'Correct!' : 'Wrong!'}
    </h2>
  </div>
  
  <!-- Revealed answer -->
  <div class="reveal-card">
    <div class="logo-container">
      <Logo src={logoUrl} alt={correctBrand?.brand_name ?? 'Car logo'} />
    </div>
    <p class="brand-name">{correctBrand?.brand_name}</p>
  </div>
  
  <!-- Continue button -->
  <button class="continue-btn" onclick={onContinue}>
    <span>{isLast ? 'See Results' : 'Next Question'}</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </button>
</div>

<style>
  .feedback {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    padding: var(--space-xl);
    border-radius: var(--radius-xl);
    animation: scaleIn 0.3s ease;
  }
  
  .feedback.correct {
    background: linear-gradient(
      to bottom,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 100%
    );
  }
  
  .feedback.incorrect {
    background: linear-gradient(
      to bottom,
      rgba(255, 51, 102, 0.1) 0%,
      transparent 100%
    );
  }
  
  /* Result indicator */
  .result-indicator {
    text-align: center;
  }
  
  .result-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: var(--space-md);
    animation: scaleIn 0.4s ease 0.1s backwards;
  }
  
  .feedback.correct .result-icon {
    background: rgba(0, 255, 136, 0.2);
    color: var(--color-accent-success);
  }
  
  .feedback.incorrect .result-icon {
    background: rgba(255, 51, 102, 0.2);
    color: var(--color-accent-secondary);
  }
  
  .result-text {
    font-size: 1.75rem;
    animation: fadeIn 0.3s ease 0.2s backwards;
  }
  
  .feedback.correct .result-text {
    color: var(--color-accent-success);
  }
  
  .feedback.incorrect .result-text {
    color: var(--color-accent-secondary);
  }
  
  /* Reveal card */
  .reveal-card {
    text-align: center;
    animation: fadeIn 0.4s ease 0.3s backwards;
  }
  
  .logo-container {
    width: 140px;
    height: 140px;
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    margin: 0 auto var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
  }
  
  .brand-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  /* Continue button */
  .continue-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-xl);
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-bg-primary);
    background: var(--gradient-accent);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
    animation: fadeIn 0.3s ease 0.4s backwards;
  }
  
  .continue-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
  
  .continue-btn svg {
    transition: transform var(--transition-fast);
  }
  
  .continue-btn:hover svg {
    transform: translateX(4px);
  }
</style>
