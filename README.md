# procon32 Let's AIdea React

## 使い方

```
git clone https://github.com/NIT-Anan-Procon/procon32_Lets_AIdea_react.git
npm install
npm run dev
```

## .env ファイルについて

このプロジェクトでの API URL は`.env`ファイルに記述します

```dotenv:.env
VITE_API_HOST=API URL
```

## コマンドについて

- `npm run dev`
  - 開発サーバーを起動します。
- `npm run fix`
  - `format` と `lint` を 1 つのコマンドで行います
- `npm run format`
  - Prettier を適用します。
- `npm run lint`
  - ES Lint を適用します。
- `npm run build`
  - ビルドファイルを作成します。
- `npm run serve`
  - serve を使ってサーバーを起動します。

## 命名規則

- コンポーネントとそれに関連するファイルの名前はアッパーキャメルケース
  - アッパーキャメルケースとは先頭の文字を大文字にするキャメルケースである。
  - 例. `HogeHoge.jsx` , `FugaFugaFuga.css`
- それ以外のファイル名や変数名、id 名などはローワーキャメルケース
  - ローワーキャメルケースとは先頭の文字を小文字にするキャメルケースである。
  - 例. `hogeHoge.jpg` , `let fugaFuga;` , `<div id=piyoPiyo>`
