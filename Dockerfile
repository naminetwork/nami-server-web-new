# ベースイメージにNode.js (Lightweight) を使用
FROM node:lts-alpine

# 作業ディレクトリを設定
WORKDIR /app

# Mintlify CLIとPM2をインストール
RUN npm install -g mintlify pm2

# プロジェクトのファイルをコピー
COPY . .

# 環境変数を本番用に設定
ENV NODE_ENV=production

# ポート3000を公開
EXPOSE 3000

# PM2を使用して管理（本番環境での安定性向上のため）
CMD ["pm2-runtime", "ecosystem.config.js"]
