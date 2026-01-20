#!/bin/bash

# アプリのディレクトリに移動 (パスは実際の環境に合わせて修正してください)
# 例: /root/nami-network または /home/user/nami-network
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$APP_DIR"

echo "Checking for updates..."

# Gitから最新情報を取得
git fetch origin

# ローカルとリモートの差分をチェック
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u})

if [ $LOCAL != $REMOTE ]; then
    echo "Update found! Pulling changes..."
    
    # 最新コードを取得
    git pull origin main
    
    # 依存関係の更新（新しいプラグインなどが追加された場合のため）
    npm install
    
    # PM2でアプリを再起動
    pm2 restart nami-website
    
    echo "Update completed and server restarted."
else
    echo "No updates found."
fi
