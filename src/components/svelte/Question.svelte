<script lang="ts">
  import type { Question } from '@lib/types';
  import Logo from './Logo.svelte';
  
  interface Props {
    question: Question;
    mediaBaseUrl: string;
  }
  
  let { question, mediaBaseUrl }: Props = $props();
  
  let logoUrl = $derived(`${mediaBaseUrl}/${question.logoPath}`);
  
  // Generate difficulty stars
  let difficultyStars = $derived('★'.repeat(question.difficulty) + '☆'.repeat(5 - question.difficulty));
</script>

<div class="question">
  <div class="question-header">
    <span class="question-number">Question {question.questionNumber}</span>
    <span class="difficulty" title="Difficulty: {question.difficulty}/5">
      {difficultyStars}
    </span>
  </div>
  
  <div class="logo-container">
    <div class="logo-frame">
      <Logo src={logoUrl} alt="Car logo to identify" />
    </div>
    <div class="logo-glow"></div>
  </div>
  
  <p class="prompt">Which brand is this?</p>
</div>

<style>
  .question {
    text-align: center;
    animation: scaleIn 0.3s ease;
  }
  
  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
    padding: 0 var(--space-sm);
  }
  
  .question-number {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .difficulty {
    font-size: 0.875rem;
    color: var(--color-accent-warning);
    letter-spacing: 0.1em;
  }
  
  .logo-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-xl);
  }
  
  .logo-frame {
    position: relative;
    z-index: 1;
    width: 200px;
    height: 200px;
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
  }
  
  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    background: var(--color-accent-primary);
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.15;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  
  .prompt {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  /* Responsive */
  @media (max-width: 400px) {
    .logo-frame {
      width: 160px;
      height: 160px;
      padding: var(--space-lg);
    }
  }
</style>
