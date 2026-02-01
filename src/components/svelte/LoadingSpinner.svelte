<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg';
  }
  
  let { size = 'md' }: Props = $props();
</script>

<div class="spinner-container" class:sm={size === 'sm'} class:md={size === 'md'} class:lg={size === 'lg'}>
  <div class="spinner">
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
  </div>
</div>

<style>
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    position: relative;
  }
  
  .spinner-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: var(--color-accent-primary);
    animation: spin 1.2s linear infinite;
  }
  
  /* Size variants */
  .sm .spinner {
    width: 24px;
    height: 24px;
  }
  
  .sm .spinner-ring {
    border-width: 2px;
  }
  
  .sm .spinner-ring:nth-child(1) {
    width: 24px;
    height: 24px;
  }
  
  .sm .spinner-ring:nth-child(2) {
    width: 18px;
    height: 18px;
    top: 3px;
    left: 3px;
    animation-delay: 0.15s;
  }
  
  .sm .spinner-ring:nth-child(3) {
    width: 12px;
    height: 12px;
    top: 6px;
    left: 6px;
    animation-delay: 0.3s;
  }
  
  .md .spinner {
    width: 40px;
    height: 40px;
  }
  
  .md .spinner-ring {
    border-width: 3px;
  }
  
  .md .spinner-ring:nth-child(1) {
    width: 40px;
    height: 40px;
  }
  
  .md .spinner-ring:nth-child(2) {
    width: 30px;
    height: 30px;
    top: 5px;
    left: 5px;
    animation-delay: 0.15s;
  }
  
  .md .spinner-ring:nth-child(3) {
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
    animation-delay: 0.3s;
  }
  
  .lg .spinner {
    width: 56px;
    height: 56px;
  }
  
  .lg .spinner-ring {
    border-width: 3px;
  }
  
  .lg .spinner-ring:nth-child(1) {
    width: 56px;
    height: 56px;
  }
  
  .lg .spinner-ring:nth-child(2) {
    width: 42px;
    height: 42px;
    top: 7px;
    left: 7px;
    animation-delay: 0.15s;
  }
  
  .lg .spinner-ring:nth-child(3) {
    width: 28px;
    height: 28px;
    top: 14px;
    left: 14px;
    animation-delay: 0.3s;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
