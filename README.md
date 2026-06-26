# Donate

一个基于 SvelteKit 构建的静态赞助展示页项目，适合部署到 Cloudflare Pages / Cloudflare Workers。

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

### 类型检查

```bash
npm run check
```

### 生产构建

```bash
npm run build
```

### 本地预览

```bash
npm run preview
```

## 页面说明

- `/`：自动 307 跳转到 `/sponsors`
- `/sponsors`：赞助展示页面

页面特性：

- 左上角主页跳转按钮（`HomeLinkButton.svelte`）
- 右下角明暗模式切换按钮
- 浅色强调色：`#FFF799`
- 深色强调色：`#B1D5C8`
- 微信 / 支付宝双二维码 Tab
- 赞助名单数据来自 `src/lib/data/sponsors.json`

## 赞助数据维护

数据文件：

- `src/lib/data/sponsors.json`

数据结构示例：

```json
{
  "name": "Alex Chen",
  "avatar": "/avatars/alex-chen.jpg",
  "date": "2026-06-01",
  "amount": 50
}
```

字段说明：

- `name`：赞助者名称
- `avatar`：头像路径，可为 `null`
- `date`：赞助日期
- `amount`：赞助金额（数字）

## 二维码资源位置

当前页面使用本地静态资源：

- `static/sponsors/qrcode/wechat.svg`
- `static/sponsors/qrcode/alipay.svg`

你可以直接替换这两个文件为正式二维码图片，保持同名即可。

## Cloudflare Pages 部署

项目使用：

- `@sveltejs/adapter-cloudflare`

### 在 Cloudflare Pages 中创建项目

构建命令：

```bash
npm run build
```

输出目录：

```bash
.svelte-kit/cloudflare
```

Node 版本建议：

```bash
20
```

如果 Cloudflare Pages 要求框架预设，可以选择：

```bash
SvelteKit
```

## Wrangler 配置

项目已提供：

- `wrangler.toml`

核心配置：

```toml
name = "donate"
main = ".svelte-kit/cloudflare/_worker.js"
compatibility_date = "2026-06-26"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".svelte-kit/cloudflare"
binding = "ASSETS"
```

如果你想用 Wrangler 部署：

```bash
npm install
npm run build
npx wrangler deploy
```

## 项目结构

```text
src/
  lib/
    components/
      HomeLinkButton.svelte
      ThemeToggle.svelte
      ui/
    data/
      sponsors.json
  routes/
    +page.ts
    sponsors/
      +page.svelte
static/
  sponsors/
    qrcode/
      wechat.svg
      alipay.svg
wrangler.toml
```
