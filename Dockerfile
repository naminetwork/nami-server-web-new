# ベースイメージにNode.js (Lightweight) を使用
FROM node:lts-alpine

# 作業ディレクトリを設定
WORKDIR /app

# Mintlify CLIをインストール
RUN npm install -g mintlify

# プロジェクトのファイルをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# コンテナ起動時に開発サーバーを実行
# 外部からのアクセスを許可するために意図的に0.0.0.0でリッスンさせる必要がありますが
# mintlify devコマンドがデフォルトでlocalhostのみの場合、プロキシが必要になる可能性があります。
# 通常のコンテナ環境ではこれで動作することを想定しています。
CMD ["mintlify", "dev", "--port", "3000"]
