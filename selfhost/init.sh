#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -ex

# 获取最新的发行版本
LATEST_VERSION=$(curl --retry 99 -s https://api.github.com/repos/cloudflare/workerd/releases/latest | jq -r .tag_name)

# 判断操作系统类型和架构
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

# 根据操作系统和架构拼接文件名
if [[ "$OS" == "linux" ]]; then
  if [[ "$ARCH" == "x86_64" ]]; then
    FILENAME="workerd-linux-64"
  else
    FILENAME="workerd-linux-arm64"
  fi
elif [[ "$OS" == "darwin" ]]; then
  if [[ "$ARCH" == "x86_64" ]]; then
    FILENAME="workerd-darwin-64"
  else
    FILENAME="workerd-darwin-arm64"
  fi
elif [[ "$OS" == "windows_nt" ]]; then
  FILENAME="workerd-windows-64"
else
  echo "Unsupported operating system: $OS"
  exit 1
fi

FILENAME=${FILENAME}.gz
DOWNLOAD_URL="https://github.com/cloudflare/workerd/releases/download/${LATEST_VERSION}/${FILENAME}"

echo "Downloading ${FILENAME} for ${OS} ${ARCH}..."

mkdir -p bin
cd bin
rm -rf workerd-*
wget --tries=99 --retry-connrefused -c -O $FILENAME "${DOWNLOAD_URL}"
gunzip $FILENAME
rm -rf $FILENAME
mv workerd-* workerd
chmod +x workerd
