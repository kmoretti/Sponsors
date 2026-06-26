<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>主页 | Donate</title>
	<meta name="description" content="Donate 项目主页入口。" />
</svelte:head>

<main class="home-page">
	<section class="hero-card">
		<p class="eyebrow">Welcome</p>
		<h1>Donate 项目主页</h1>
		<p class="intro">这是一个极简主页入口，用于承接 sponsors 页面左上角的主页跳转语义。</p>
		<a class="entry-link" href="/sponsors">
			<Icon icon="solar:heart-bold-duotone" width="20" height="20" aria-hidden="true" />
			<span>进入赞助页面</span>
		</a>
	</section>
</main>

<style>
	.home-page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 2rem 1rem;
	}

	.hero-card {
		width: min(100%, 42rem);
		padding: 2rem;
		border: 1px solid var(--theme-border);
		border-radius: 1.75rem;
		background: color-mix(in srgb, var(--theme-surface) 96%, transparent);
		box-shadow: var(--theme-shadow);
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		font-size: 0.85rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--theme-text-muted);
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.intro {
		margin: 1rem 0 1.5rem;
		line-height: 1.8;
		color: var(--theme-text-muted);
	}

	.entry-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.9rem 1.2rem;
		border-radius: 999px;
		background: var(--theme-accent);
		color: #1f2937;
		font-weight: 700;
		text-decoration: none;
	}

	:root[data-theme='dark'] .entry-link {
		color: #111827;
	}
</style>
