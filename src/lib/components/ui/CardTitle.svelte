<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<h3 class={`ui-card-title ${className}`.trim()}>
  {@render children?.()}
</h3>

<style>
  .ui-card-title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--theme-text);
  }
</style>
