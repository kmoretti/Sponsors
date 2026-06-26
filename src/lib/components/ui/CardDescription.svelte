<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<p class={`ui-card-description ${className}`.trim()}>
  {@render children?.()}
</p>

<style>
  .ui-card-description {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.65;
    color: var(--theme-text-muted);
  }
</style>
