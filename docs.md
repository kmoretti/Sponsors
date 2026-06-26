# 项目架构总结文档

> 本文档由 Trae AI 自动生成，用于快速了解项目全貌。

## 1. 项目简述

- **项目名称**: donate
- **项目类型**: Web 前端 / 赞助页应用
- **简述**: 一个基于 SvelteKit 构建的捐赠/赞助页面，展示赞助者列表，并提供微信支付和支付宝的二维码扫码捐赠功能。部署于 Cloudflare Workers/Pages。

## 2. 技术栈

- **核心语言**: TypeScript, Svelte (v5)
- **主要框架**: SvelteKit (v2), Vite (v6)
- **关键依赖**:
  - `@iconify/svelte` — 图标库
  - `@sveltejs/adapter-cloudflare` — Cloudflare Workers/Pages 适配器
  - `@sveltejs/kit` — 核心框架
  - `svelte-check` — Svelte 类型检查
- **包管理工具**: npm
- **部署平台**: Cloudflare Workers/Pages (通过 wrangler)

## 3. 目录结构说明

```text
项目根目录/
├── .github/                    # GitHub 配置
│   ├── ISSUE_TEMPLATE/         # Issue 模板 (sponsor.yml)
│   ├── scripts/                # CI 脚本 (add-sponsor.mjs)
│   └── workflows/              # GitHub Actions 工作流 (add-sponsor.yml)
├── src/                        # 源代码主目录
│   ├── lib/
│   │   ├── components/         # 可复用组件
│   │   │   ├── ui/             # UI 基础组件 (Button, Card, Tabs 等)
│   │   │   ├── HomeLinkButton.svelte  # 返回主页按钮
│   │   │   └── ThemeToggle.svelte     # 明暗主题切换
│   │   └── data/               # 静态数据
│   │       └── sponsors.json   # 赞助者记录数据
│   ├── routes/                 # 页面路由
│   │   ├── sponsors/           # 赞助页 (+page.svelte)
│   │   ├── +layout.svelte      # 全局布局 (主题初始化)
│   │   ├── +page.svelte        # 首页
│   │   └── +page.ts            # 首页加载器
│   ├── app.css                 # 全局样式 (CSS 变量主题系统)
│   ├── app.d.ts                # 全局类型声明
│   └── app.html                # HTML 模板入口
├── static/                     # 静态资源
│   └── sponsors/qrcode/        # 微信/支付宝收款码
├── .gitignore
├── package.json                # 依赖与脚本配置
├── svelte.config.js            # SvelteKit 配置 (Cloudflare 适配器)
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 构建配置
├── wrangler.toml               # Cloudflare Workers 部署配置
└── README.md                   # 项目说明
```

## 4. 核心模块解析

- **入口文件**: `src/app.html` — 应用 HTML 模板，SvelteKit 将生成的 head 和 body 注入其中。
- **路由系统** (`src/routes/`):
  - `+layout.svelte` — 全局布局，负责初始化明暗主题（从 localStorage 或系统偏好读取），内联脚本防止闪烁 (FOUC)。
  - `+page.svelte` / `+page.ts` — 首页，展示项目简介入口，引导用户进入赞助页面。
  - `sponsors/+page.svelte` — 赞助页核心页面，展示赞助者列表（名称、头像、金额、日期），并提供微信/支付宝 Tabs 切换显示收款二维码。
- **主题系统**: 基于 CSS 自定义属性 (`:root` + `[data-theme="dark"]`)，支持 light/dark 双模式，记忆用户偏好至 `localStorage`。
- **UI 组件库** (`src/lib/components/ui/`): 自建轻量 UI 组件，包括 Button、Card（含 Header/Content/Title/Description）、Tabs。
- **CI/CD 自动化**: GitHub Actions 工作流监听带 `sponsor` 标签的 Issue 关闭事件，自动提取 Issue Body 中的赞助数据，写入 `sponsors.json` 并提交到仓库。

## 5. 启动与构建

- **安装依赖**: `npm install`
- **本地运行**: `npm run dev`
- **构建打包**: `npm run build`
- **本地预览**: `npm run preview`
- **类型检查**: `npm run check`
