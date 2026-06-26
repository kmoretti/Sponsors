<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<div class={`ui-card-content ${className}`.trim()}>
  {@render children?.()}
</div>

<style>
  .ui-card-content {
    padding: 1.5rem;
  }
</style>
