# Task Board — Next.js × Azure Static Web Apps Demo

シンプルなタスク管理ボードのデモアプリケーションです。

## Tech Stack

| 技術 | バージョン |
|------|-----------|
| Next.js | 15 (App Router) |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| デプロイ先 | Azure Static Web Apps |

## 機能

- タスク一覧表示（タイトル、担当者、優先度、ステータス）
- タスク追加（タスク名、担当者、優先度を入力）
- ステータス変更（クリックで Todo → In Progress → Done をサイクル）
- タスク削除
- ステータス別フィルタリング（件数表示付き）

## ローカル開発

```bash
pnpm install
pnpm dev
```

http://localhost:3000 でアプリが起動します。

## ビルド

```bash
pnpm build
```
