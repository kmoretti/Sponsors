<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  export interface TabItem {
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }

  interface Props {
    items: TabItem[];
    value: string;
    class?: string;
    children?: Snippet<[string]>;
    onChange?: (value: string) => void;
  }

  let { items, value = '', class: className = '', children, onChange }: Props = $props();

  function selectTab(nextValue: string, disabled = false) {
    if (disabled || nextValue === value) return;
    value = nextValue;
    onChange?.(nextValue);
  }
</script>

<div class={`ui-tabs ${className}`.trim()}>
  <div class="ui-tabs__list" role="tablist" aria-label="Tabs">
    {#each items as item}
      <button
        type="button"
        role="tab"
        class={`ui-tabs__trigger ${item.value === value ? 'is-active' : ''}`.trim()}
        aria-selected={item.value === value}
        aria-disabled={item.disabled}
        disabled={item.disabled}
        onclick={() => selectTab(item.value, item.disabled)}
      >
        <span class="ui-tabs__trigger-label">
          {#if item.icon}
            <Icon icon={item.icon} width="16" height="16" aria-hidden="true" />
          {/if}
          <span>{item.label}</span>
        </span>
      </button>
    {/each}
  </div>

  <div class="ui-tabs__content">
    {@render children?.(value)}
  </div>
</div>

<style>
  .ui-tabs {
    display: grid;
    gap: 1rem;
  }

  .ui-tabs__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 0.375rem;
    width: 100%;
    border: 1px solid var(--theme-border);
    border-radius: 1rem;
    background: var(--theme-surface-soft);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .ui-tabs__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.9rem;
    padding: 0.75rem 1rem;
    border: 0;
    border-radius: 0.8rem;
    background: transparent;
    color: var(--theme-text-muted);
    box-shadow: none;
    font-weight: 600;
  }

  .ui-tabs__trigger-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    line-height: 1;
  }

  .ui-tabs__trigger:hover {
    background: color-mix(in srgb, var(--theme-surface) 60%, transparent);
    color: var(--theme-text);
  }

  .ui-tabs__trigger.is-active {
    background: var(--theme-surface);
    color: var(--theme-text);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  }

  .ui-tabs__trigger:disabled,
  .ui-tabs__trigger[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .ui-tabs__content {
    min-width: 0;
  }
</style>
