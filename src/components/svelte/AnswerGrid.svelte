<script lang="ts">
  import type { Brand } from '@lib/types';
  
  interface Props {
    brands: Brand[];
    onSelect: (brandId: number) => void;
    disabled?: boolean;
  }
  
  let { brands, onSelect, disabled = false }: Props = $props();
  
  let selectedId = $state<number | null>(null);
  let isSubmitting = $state(false);
  
  async function handleSelect(brand: Brand) {
    if (disabled || selectedId !== null || isSubmitting) return;
    
    selectedId = brand.id;
    isSubmitting = true;
    
    await onSelect(brand.id);
    
    // Reset after selection is processed
    // (Parent will change state, causing re-render)
  }
  
  // Reset selection when brands change (new question)
  $effect(() => {
    // Access brands to track it
    brands;
    selectedId = null;
    isSubmitting = false;
  });
</script>

<div class="answer-grid">
  {#each brands as brand, index (brand.id)}
    <button
      class="answer-btn"
      class:selected={selectedId === brand.id}
      class:disabled={disabled || (selectedId !== null && selectedId !== brand.id)}
      disabled={disabled || selectedId !== null}
      onclick={() => handleSelect(brand)}
      style="animation-delay: {index * 50}ms"
    >
      <span class="brand-name">{brand.brand_name}</span>
      {#if selectedId === brand.id && isSubmitting}
        <span class="loading-dot"></span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .answer-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }
  
  .answer-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-lg) var(--space-md);
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text-primary);
    background: var(--color-bg-card);
    border: 2px solid var(--color-bg-tertiary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    animation: fadeIn 0.3s ease backwards;
  }
  
  .answer-btn:hover:not(:disabled) {
    background: var(--color-bg-tertiary);
    border-color: var(--color-accent-primary);
    transform: translateY(-2px);
  }
  
  .answer-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .answer-btn:disabled {
    cursor: not-allowed;
  }
  
  .answer-btn.disabled {
    opacity: 0.5;
  }
  
  .answer-btn.selected {
    background: var(--color-accent-primary);
    border-color: var(--color-accent-primary);
    color: var(--color-bg-primary);
    opacity: 1;
  }
  
  .brand-name {
    text-align: center;
    line-height: 1.3;
  }
  
  .loading-dot {
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
    animation: pulse 0.6s ease-in-out infinite;
  }
  
  /* Responsive - 1 column on very small screens */
  @media (max-width: 360px) {
    .answer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
