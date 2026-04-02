# Task Board — Next.js × Azure Static Web Apps Demo

> **English** | [日本語](#日本語)

A simple task management board demo built with **Next.js 15**, showcasing static export and deployment on Azure Static Web Apps — with zero external APIs or databases.

**Live Demo:** https://nice-water-088033c10.6.azurestaticapps.net/

---

## Features

- **Task list** — Title, assignee, priority, and status at a glance
- **Add tasks** — Input task name, assignee, and priority level
- **Status cycling** — Click to cycle through 未着手 → 対応中 → 完了
- **Delete tasks** — Remove tasks with a single click
- **Filter by status** — Filter with live count badges per status

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Rendering | Static Export (`output: "export"`) |
| Deploy | Azure Static Web Apps |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## License

[MIT](./LICENSE) © k-mawa

---

<a name="日本語"></a>

# Task Board — Next.js × Azure Static Web Apps デモ

> [English](#top) | **日本語**

**Next.js 15** で構築したシンプルなタスク管理ボードのデモアプリです。静的エクスポートと Azure Static Web Apps へのデプロイを外部 API・DB なしで実装しています。

**ライブデモ:** https://nice-water-088033c10.6.azurestaticapps.net/

---

## 機能一覧

- **タスク一覧** — タイトル・担当者・優先度・ステータスを一覧表示
- **タスク追加** — タスク名・担当者・優先度を入力して追加
- **ステータス切り替え** — クリックで 未着手 → 対応中 → 完了 をサイクル
- **タスク削除** — ワンクリックで削除
- **ステータスフィルター** — 件数バッジ付きでステータス別に絞り込み

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 15（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS 4 |
| レンダリング | 静的エクスポート（`output: "export"`） |
| デプロイ | Azure Static Web Apps |

## セットアップ

```bash
# 依存パッケージインストール
pnpm install

# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build
```

## ライセンス

[MIT](./LICENSE) © k-mawa
