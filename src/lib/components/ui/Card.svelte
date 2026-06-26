<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    padded?: boolean;
    children?: Snippet;
  }

  let { class: className = '', padded = true, children }: Props = $props();
</script>

<div class={`ui-card ${padded ? 'ui-card--padded' : ''} ${className}`.trim()}>
  {@render children?.()}
</div>

<style>
  .ui-card {
    border: 1px solid var(--theme-border);
    border-radius: 1.5rem;
    background: color-mix(in srgb, var(--theme-surface) 96%, transparent);
    box-shadow: var(--theme-shadow);
    backdrop-filter: blur(14px);
  }

  .ui-card--padded {
    padding: 1.5rem;
  }
</style>
