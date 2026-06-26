<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<div class={`ui-card-header ${className}`.trim()}>
  {@render children?.()}
</div>

<style>
  .ui-card-header {
    display: grid;
    gap: 0.4rem;
    padding: 1.5rem 1.5rem 0;
  }
</style>
