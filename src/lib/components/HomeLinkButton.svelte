<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		href?: string;
		label?: string;
		title?: string;
		icon?: string;
	}

	let {
		href = '/',
		label = '返回主页',
		title = label,
		icon = 'solar:home-2-bold-duotone'
	}: Props = $props();
</script>

<a class="home-link-button" {href} aria-label={label} title={title}>
	<span class="sr-only">{label}</span>
	<Icon {icon} width="24" height="24" aria-hidden="true" />
</a>

<style>
	.home-link-button {
		position: fixed;
		left: max(1rem, env(safe-area-inset-left));
		top: max(1rem, env(safe-area-inset-top));
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border: 1px solid var(--theme-border);
		border-radius: 9999px;
		background: color-mix(in srgb, var(--theme-surface) 92%, transparent);
		color: var(--theme-text);
		box-shadow: var(--theme-shadow);
		text-decoration: none;
		cursor: pointer;
		z-index: 50;
		backdrop-filter: blur(14px);
		transition:
			transform var(--transition-base),
			background-color var(--transition-base),
			color var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base);
		-webkit-tap-highlight-color: transparent;
		touch-action: manipulation;
	}

	.home-link-button:hover {
		transform: translateY(-2px);
		border-color: var(--theme-accent-strong);
		background: var(--theme-surface-soft);
	}

	.home-link-button:active {
		transform: translateY(0) scale(0.97);
	}

	.home-link-button:focus-visible {
		outline: 3px solid var(--theme-accent-strong);
		outline-offset: 3px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 640px) {
		.home-link-button {
			left: max(0.875rem, env(safe-area-inset-left));
			top: max(0.875rem, env(safe-area-inset-top));
			width: 3.75rem;
			height: 3.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.home-link-button {
			transition:
				background-color var(--transition-base),
				color var(--transition-base),
				border-color var(--transition-base),
				box-shadow var(--transition-base);
		}

		.home-link-button:hover,
		.home-link-button:active {
			transform: none;
		}
	}
</style>
