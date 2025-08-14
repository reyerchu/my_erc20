# 🚀 RYC Token 快速部署指南

## 立即開始部署到 Sepolia

### 步驟 1: 運行設置腳本

首先運行我們的互動式設置腳本來獲取詳細的設置指南：

```bash
node scripts/setup.js
```

這個腳本會：
- 檢查您的項目配置狀態
- 提供詳細的設置步驟
- 顯示所有必要的命令

### 步驟 2: 準備 MetaMask 錢包

1. **確保 MetaMask 連接到 Sepolia 網路**
   - 網路名稱: Sepolia
   - RPC URL: `https://sepolia.infura.io/v3/YOUR-PROJECT-ID`
   - Chain ID: `11155111`
   - 貨幣符號: `ETH`

2. **獲取 Sepolia 測試 ETH**
   - 訪問: https://sepoliafaucet.com/
   - 或: https://faucet.sepolia.dev/
   - 確保錢包中有至少 0.01 ETH

### 步驟 3: 獲取 Infura RPC URL

1. 註冊 [Infura](https://infura.io/) 帳戶
2. 創建新項目
3. 選擇 Sepolia 網路
4. 複製 RPC URL

### 步驟 4: 設置項目

1. **安裝依賴**
```bash
npm install
```

2. **創建 .env 文件**
```bash
# 複製以下內容到 .env 文件
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
PRIVATE_KEY=your_metamask_private_key_here
```

3. **獲取 MetaMask 私鑰**
   - 打開 MetaMask
   - 點擊帳戶圖示 → 帳戶詳情
   - 點擊 "匯出私鑰"
   - 輸入密碼並複製私鑰

### 步驟 5: 部署合約

```bash
npx hardhat run scripts/deploy-sepolia.js --network sepolia
```

### 步驟 6: 鑄造代幣

部署完成後，修改 `scripts/mint-simple.js` 中的地址：

```javascript
// 修改這些變數
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const RECIPIENT_ADDRESS = "RECIPIENT_WALLET_ADDRESS";
const MINT_AMOUNT = "1000"; // 鑄造數量
```

然後鑄造代幣：

```bash
npx hardhat run scripts/mint-simple.js --network sepolia
```

### 步驟 7: 在 MetaMask 中添加代幣

1. 打開 MetaMask
2. 點擊 "匯入代幣"
3. 選擇 "自訂代幣"
4. 輸入合約地址
5. 代幣符號 (RYC) 和 decimals (18) 會自動填入

## 常用命令

```bash
# 運行設置指南
node scripts/setup.js

# 編譯合約
npx hardhat compile

# 運行測試
npx hardhat test

# 部署到 Sepolia
npx hardhat run scripts/deploy-sepolia.js --network sepolia

# 檢查部署狀態
npx hardhat run scripts/check-deployment.js --network sepolia

# 鑄造代幣 (簡化版)
npx hardhat run scripts/mint-simple.js --network sepolia

# 鑄造代幣 (完整版)
npx hardhat run scripts/mint.js --network sepolia
```

## 故障排除

### 常見錯誤及解決方案

1. **"insufficient funds"**
   - 解決方案: 獲取更多 Sepolia ETH

2. **"network error"**
   - 解決方案: 檢查 RPC URL 是否正確

3. **"private key error"**
   - 解決方案: 檢查私鑰格式是否正確

4. **"contract not found"**
   - 解決方案: 檢查合約地址是否正確

5. **"請在 .env 文件中設置..."**
   - 解決方案: 運行 `node scripts/setup.js` 獲取設置指南

### 需要幫助？

運行設置腳本獲取詳細幫助：

```bash
node scripts/setup.js
```

這個腳本會：
- 檢查您的配置狀態
- 提供詳細的設置步驟
- 顯示所有必要的命令和連結

## 安全提醒

⚠️ **重要安全注意事項**:
- 永遠不要分享您的私鑰
- 不要將 `.env` 文件提交到 Git
- 確保 `.env` 文件已加入 `.gitignore`
- 只在測試網路上使用測試私鑰

## 支援

如果遇到問題，請按順序檢查：

1. **運行設置腳本**: `node scripts/setup.js`
2. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 詳細部署指南
3. [README.md](./README.md) - 完整項目文檔
4. 測試文件 - 了解合約功能
