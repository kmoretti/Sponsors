<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type ThemeMode = 'light' | 'dark';

	const THEME_STORAGE_KEY = 'theme-mode';

	let theme: ThemeMode = 'light';

	function applyTheme(nextTheme: ThemeMode) {
		theme = nextTheme;

		if (!browser) {
			return;
		}

		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	}

	function resolveInitialTheme(): ThemeMode {
		if (!browser) {
			return 'light';
		}

		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedTheme === 'light' || storedTheme === 'dark') {
			return storedTheme;
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	onMount(() => {
		applyTheme(resolveInitialTheme());
	});
</script>

<svelte:head>
	<script>
		(() => {
			const storageKey = 'theme-mode';
			const storedTheme = localStorage.getItem(storageKey);
			const theme = storedTheme === 'light' || storedTheme === 'dark'
				? storedTheme
				: window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light';

			document.documentElement.dataset.theme = theme;
		})();
	</script>
</svelte:head>

<slot />

<style global>
	:root {
		color-scheme: light;
		--theme-bg: #fffdf4;
		--theme-bg-muted: #fff7d6;
		--theme-surface: #ffffff;
		--theme-surface-soft: #fffbea;
		--theme-text: #1f2937;
		--theme-text-muted: #5b6472;
		--theme-border: rgba(31, 41, 55, 0.12);
		--theme-shadow: 0 10px 30px rgba(31, 41, 55, 0.08);
		--theme-accent: #fff799;
		--theme-accent-strong: #f4e96b;
	}

	:root[data-theme='dark'] {
		color-scheme: dark;
		--theme-bg: #111827;
		--theme-bg-muted: #172033;
		--theme-surface: #1f2937;
		--theme-surface-soft: #243042;
		--theme-text: #f3f4f6;
		--theme-text-muted: #c2cad6;
		--theme-border: rgba(177, 213, 200, 0.2);
		--theme-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
		--theme-accent: #b1d5c8;
		--theme-accent-strong: #8fc0ae;
	}

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100%;
		background: var(--theme-bg);
		color: var(--theme-text);
	}

	:global(body) {
		transition:
			background-color 0.25s ease,
			color 0.25s ease;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
