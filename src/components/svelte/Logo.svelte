<script lang="ts">
  interface Props {
    src: string;
    alt: string;
  }
  
  let { src, alt }: Props = $props();
  
  let loaded = $state(false);
  let error = $state(false);
  
  function handleLoad() {
    loaded = true;
  }
  
  function handleError() {
    error = true;
  }
  
  // Reset states when src changes
  $effect(() => {
    // Access src to track it
    src;
    loaded = false;
    error = false;
  });
</script>

<div class="logo-wrapper">
  {#if !loaded && !error}
    <div class="skeleton"></div>
  {/if}
  
  {#if error}
    <div class="error-state">
      <span class="error-icon">🚫</span>
      <span class="error-text">Failed to load</span>
    </div>
  {:else}
    <img 
      {src} 
      {alt}
      class:loaded
      onload={handleLoad}
      onerror={handleError}
      draggable="false"
    />
  {/if}
</div>

<style>
  .logo-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.3s ease;
    user-select: none;
  }
  
  img.loaded {
    opacity: 1;
  }
  
  .skeleton {
    position: absolute;
    width: 70%;
    height: 70%;
    background: linear-gradient(
      90deg, 
      #e2e8f0 25%, 
      #f1f5f9 50%, 
      #e2e8f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-md);
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    color: #94a3b8;
  }
  
  .error-icon {
    font-size: 2rem;
  }
  
  .error-text {
    font-size: 0.75rem;
  }
</style>
