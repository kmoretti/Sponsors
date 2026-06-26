<script lang="ts">
	import HomeLinkButton from '$lib/components/HomeLinkButton.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import sponsorRecords from '$lib/data/sponsors.json';
	import {
		Button,
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
		Tabs,
		type TabItem
	} from '$lib/components/ui';

	type SponsorRecord = {
		name: string;
		avatar: string | null;
		date: string;
		amount: number;
	};

	type Sponsor = {
		id: number;
		name: string;
		avatar: string | null;
		date: string;
		amount: string;
	};

	const paymentTabs: TabItem[] = [
		{ value: 'wechat', label: '微信支付', icon: 'simple-icons:wechat' },
		{ value: 'alipay', label: '支付宝', icon: 'simple-icons:alipay' }
	];

	const qrCodeMap = {
		wechat: '/sponsors/qrcode/weixin.png',
		alipay: '/sponsors/qrcode/zhifubao.png'
	} as const;

	const qrCodeFallbackMap = {
		wechat: '/sponsors/qrcode/wechat.svg',
		alipay: '/sponsors/qrcode/alipay.svg'
	} as const;

	const sponsors: Sponsor[] = (sponsorRecords as SponsorRecord[]).map((sponsor, index) => ({
		id: index + 1,
		name: sponsor.name,
		avatar: sponsor.avatar,
		date: sponsor.date,
		amount: `¥${sponsor.amount}`
	}));

	let activeTab: TabItem['value'] = 'wechat';
	let avatarFallback: Record<number, boolean> = {};

	function handleAvatarError(id: number) {
		avatarFallback = { ...avatarFallback, [id]: true };
	}

	function handleQrError(event: Event, type: keyof typeof qrCodeFallbackMap) {
		const image = event.currentTarget as HTMLImageElement;
		image.src = qrCodeFallbackMap[type];
	}

	function getInitial(name: string) {
		return name.trim().charAt(0).toUpperCase() || '?';
	}
</script>

<svelte:head>
	<title>赞助支持 | Donate</title>
	<meta name="description" content="通过赞助支持项目持续维护与创作。" />
</svelte:head>

<HomeLinkButton href="/" label="返回主页" title="返回主页" />

<main class="page">
	<div class="page-heading">
		<h1>赞助支持</h1>
		<p>感谢您的支持，您的赞助将帮助我持续创作优质内容</p>
	</div>

	<div class="support-block">
		<Card class="support-card-shell">
			<CardHeader class="support-header">
				<CardTitle class="support-title">扫码赞助</CardTitle>
				<CardDescription class="support-description">选择您喜欢的支付方式</CardDescription>
			</CardHeader>
			<CardContent class="support-content">
				<Tabs items={paymentTabs} value={activeTab} onChange={(value) => (activeTab = value)} class="payment-tabs">
					{#snippet children(currentTab)}
						<div class="tab-panel">
							<img
								class="qr-image"
								src={qrCodeMap[currentTab as keyof typeof qrCodeMap]}
								alt={currentTab === 'wechat' ? '微信支付二维码' : '支付宝支付二维码'}
								loading="lazy"
								on:error={(event) => handleQrError(event, currentTab as keyof typeof qrCodeFallbackMap)}
							/>
						</div>
					{/snippet}
				</Tabs>
			</CardContent>
		</Card>
	</div>

	<div class="sponsor-list-block">
		<div class="sponsor-list-header">
			<h2>赞助名单</h2>
			<Button href="https://github.com/kmoretti/Sponsors/issues/new?template=sponsor.yml" variant="secondary" size="sm">加入名单</Button>
		</div>
		{#if sponsors.length === 0}
			<Card>
				<CardContent class="empty-content">暂无赞助记录</CardContent>
			</Card>
		{:else}
			<div class="sponsor-grid">
				{#each sponsors as sponsor (sponsor.id)}
					<Card class="sponsor-card" padded={false}>
						<CardContent class="sponsor-content">
							<div class="avatar-shell">
								{#if sponsor.avatar && !avatarFallback[sponsor.id]}
									<img
										class="avatar"
										src={sponsor.avatar}
										alt={sponsor.name}
										loading="lazy"
										on:error={() => handleAvatarError(sponsor.id)}
									/>
								{:else}
									<div class="avatar avatar-fallback" aria-hidden="true">{getInitial(sponsor.name)}</div>
								{/if}
							</div>

							<div class="sponsor-meta">
								<div class="sponsor-name">{sponsor.name}</div>
								<div class="sponsor-date">{sponsor.date}</div>
							</div>

							<div class="sponsor-amount">{sponsor.amount}</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</main>

<ThemeToggle />

<style>
	:global(body) {
		font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
	}

	.page {
		max-width: 56rem;
		margin: 0 auto;
		padding: 6rem 1rem 6rem;
	}

	.page-heading {
		margin-bottom: 2.5rem;
		text-align: center;
	}

	.page-heading h1 {
		margin: 0 0 1rem;
		font-size: clamp(2.35rem, 4.6vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.12;
	}

	.page-heading p {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.8;
		color: var(--theme-text-muted);
	}

	.support-block {
		margin-bottom: 3rem;
	}

	:global(.support-card-shell) {
		overflow: hidden;
	}

	:global(.support-header) {
		text-align: center;
	}

	:global(.support-title) {
		font-size: 1.5rem;
	}

	:global(.support-description) {
		font-size: 0.96rem;
	}

	:global(.support-content) {
		padding-top: 1.25rem;
	}

	:global(.payment-tabs .ui-tabs__list) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		max-width: 23rem;
		margin: 0 auto;
	}

	:global(.payment-tabs .ui-tabs__trigger) {
		min-height: 2.7rem;
		font-size: 0.95rem;
	}

	.tab-panel {
		display: flex;
		justify-content: center;
		padding-top: 1.5rem;
	}

	.qr-image {
		width: min(100%, 16rem);
		height: auto;
		aspect-ratio: 1;
		padding: 0.35rem;
		border-radius: 0.9rem;
		background: #fff;
		object-fit: contain;
		box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
	}

	.sponsor-list-block {
		display: grid;
		gap: 1.25rem;
	}

	.sponsor-list-block h2 {
		margin: 0;
		font-size: 1.55rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.sponsor-list-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	:global(.empty-content) {
		padding-top: 2.9rem;
		padding-bottom: 2.9rem;
		text-align: center;
		color: var(--theme-text-muted);
	}

	.sponsor-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	:global(.sponsor-card) {
		height: 100%;
	}

	:global(.sponsor-content) {
		display: flex;
		align-items: center;
		gap: 0.95rem;
		padding: 1rem 1rem;
		min-height: 5rem;
	}

	.avatar-shell {
		position: relative;
		flex: 0 0 3rem;
		width: 3rem;
		height: 3rem;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 9999px;
		object-fit: cover;
		background: var(--theme-bg-muted);
	}

	.avatar-fallback {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		font-weight: 700;
		color: var(--theme-text);
		background: linear-gradient(135deg, var(--theme-accent), var(--theme-accent-strong));
	}

	.sponsor-meta {
		flex: 1;
		min-width: 0;
	}

	.sponsor-name {
		font-size: 0.98rem;
		font-weight: 700;
		line-height: 1.35;
	}

	.sponsor-date {
		margin-top: 0.18rem;
		font-size: 0.84rem;
		line-height: 1.35;
		color: var(--theme-text-muted);
	}

	.sponsor-amount {
		flex-shrink: 0;
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--theme-accent-strong);
		white-space: nowrap;
	}

	@media (max-width: 900px) {
		.page {
			max-width: 46rem;
		}

		.sponsor-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.page {
			padding-top: 5.5rem;
			padding-inline: 0.95rem;
		}

		.page-heading {
			margin-bottom: 2rem;
		}

		.page-heading h1 {
			font-size: 2rem;
		}

		:global(.support-content) {
			padding: 1rem;
		}

		.tab-panel {
			padding-top: 1.15rem;
		}

		.qr-image {
			width: min(100%, 14.75rem);
			padding: 0.28rem;
		}

		.sponsor-grid {
			grid-template-columns: 1fr;
			gap: 0.9rem;
		}

		:global(.sponsor-content) {
			padding: 0.95rem 1rem;
		}
	}
</style>
