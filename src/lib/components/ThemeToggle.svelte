<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	type ThemeMode = 'light' | 'dark';

	const THEME_STORAGE_KEY = 'theme-mode';

	let theme: ThemeMode = 'light';
	let isDark = false;
	let label = '切换到深色模式';
	let icon = 'solar:moon-stars-bold-duotone';

	function syncPresentation() {
		isDark = theme === 'dark';
		label = isDark ? '切换到浅色模式' : '切换到深色模式';
		icon = isDark ? 'solar:sun-bold-duotone' : 'solar:moon-stars-bold-duotone';
	}

	function resolveTheme(): ThemeMode {
		if (!browser) {
			return 'light';
		}

		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedTheme === 'light' || storedTheme === 'dark') {
			return storedTheme;
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(nextTheme: ThemeMode) {
		theme = nextTheme;
		syncPresentation();

		if (!browser) {
			return;
		}

		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	}

	function toggleTheme() {
		applyTheme(theme === 'light' ? 'dark' : 'light');
	}

	onMount(() => {
		applyTheme(resolveTheme());
	});
</script>

<button type="button" class="theme-toggle" on:click={toggleTheme} aria-label={label} title={label}>
	<span class="sr-only">{label}</span>
	<Icon icon={icon} width="24" height="24" aria-hidden="true" />
</button>

<style>
	.theme-toggle {
		position: fixed;
		right: max(1rem, env(safe-area-inset-right));
		bottom: max(1rem, env(safe-area-inset-bottom));
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border: 1px solid var(--theme-border);
		border-radius: 9999px;
		background: var(--theme-surface);
		color: var(--theme-text);
		box-shadow: var(--theme-shadow);
		cursor: pointer;
		z-index: 50;
		transition:
			transform 0.2s ease,
			background-color 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease,
			box-shadow 0.25s ease;
		-webkit-tap-highlight-color: transparent;
		touch-action: manipulation;
	}

	.theme-toggle:hover {
		transform: translateY(-2px);
	}

	.theme-toggle:active {
		transform: translateY(0) scale(0.97);
	}

	.theme-toggle:focus-visible {
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
		.theme-toggle {
			right: max(0.875rem, env(safe-area-inset-right));
			bottom: max(0.875rem, env(safe-area-inset-bottom));
			width: 3.75rem;
			height: 3.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
		}

		.theme-toggle:hover,
		.theme-toggle:active {
			transform: none;
		}
	}
</style>
