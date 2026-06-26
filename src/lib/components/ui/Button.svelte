<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    type?: 'button' | 'submit' | 'reset';
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    class?: string;
    children?: Snippet;
    onclick?: (event: MouseEvent) => void;
  }

  let {
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    href,
    target,
    rel,
    class: className = '',
    children,
    onclick
  }: Props = $props();

  const variantClass: Record<Variant, string> = {
    primary: 'ui-button--primary',
    secondary: 'ui-button--secondary',
    ghost: 'ui-button--ghost'
  };

  const sizeClass: Record<Size, string> = {
    sm: 'ui-button--sm',
    md: 'ui-button--md',
    lg: 'ui-button--lg'
  };
</script>

{#if href}
  <a
    class={`ui-button ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
    {href}
    {target}
    {rel}
    aria-disabled={disabled}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    class={`ui-button ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
    {type}
    {disabled}
    onclick={onclick}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  .ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: fit-content;
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition:
      background var(--transition-base),
      color var(--transition-base),
      border-color var(--transition-base),
      transform var(--transition-base),
      box-shadow var(--transition-base);
  }

  .ui-button[aria-disabled='true'],
  .ui-button:disabled {
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  }

  .ui-button--primary {
    background: var(--accent);
    color: var(--accent-contrast);
    box-shadow: var(--shadow-sm);
  }

  .ui-button--primary:hover {
    background: var(--accent-hover);
  }

  .ui-button--secondary {
    background: var(--bg-elevated);
    color: var(--text);
    border-color: var(--border);
    box-shadow: none;
  }

  .ui-button--secondary:hover {
    border-color: var(--border-strong);
    background: var(--bg-muted);
  }

  .ui-button--ghost {
    background: transparent;
    color: var(--accent);
    box-shadow: none;
  }

  .ui-button--ghost:hover {
    background: var(--accent-soft);
  }

  .ui-button--sm {
    min-height: 2.25rem;
    padding: 0.55rem 0.85rem;
    font-size: 0.9rem;
  }

  .ui-button--md {
    min-height: 2.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }

  .ui-button--lg {
    min-height: 3rem;
    padding: 0.9rem 1.2rem;
    font-size: 1rem;
  }
</style>
