# Sepolia 測試鏈部署指南

## 前置準備

### 1. 安裝依賴
```bash
npm install
```

### 2. 獲取 Sepolia 測試 ETH
- 訪問 [Sepolia Faucet](https://sepoliafaucet.com/)
- 或使用 [Alchemy Faucet](https://sepoliafaucet.com/)
- 確保您的 MetaMask 錢包有足夠的 Sepolia ETH 用於部署

### 3. 設置環境變數

創建 `.env` 文件並添加以下內容：

```env
# Sepolia RPC URL
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID

# 您的 MetaMask 私鑰
PRIVATE_KEY=your_private_key_here

# Etherscan API Key (可選，用於驗證合約)
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

#### 如何獲取 Sepolia RPC URL：
1. 註冊 [Infura](https://infura.io/) 帳戶
2. 創建新項目
3. 選擇 Sepolia 網路
4. 複製 RPC URL

#### 如何獲取 MetaMask 私鑰：
1. 打開 MetaMask
2. 點擊帳戶圖示 → 帳戶詳情
3. 點擊 "匯出私鑰"
4. 輸入密碼並複製私鑰

⚠️ **重要安全提醒**：
- 永遠不要分享您的私鑰
- 不要將私鑰提交到 Git 倉庫
- 確保 `.env` 文件已加入 `.gitignore`

### 4. 編譯合約
```bash
npx hardhat compile
```

### 5. 部署到 Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

部署成功後，您會看到類似以下的輸出：
```
Deploying contracts with the account: 0x...
RYC Token deployed to: 0x...
Token Name: RYC Token
Token Symbol: RYC
Token Decimals: 18
Owner: 0x...
```

### 6. 驗證合約 (可選)
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "OWNER_ADDRESS"
```

## 部署後操作

### 1. 在 MetaMask 中添加代幣
1. 打開 MetaMask
2. 點擊 "匯入代幣"
3. 選擇 "自訂代幣"
4. 輸入合約地址
5. 代幣符號和 decimals 會自動填入

### 2. 鑄造代幣
使用以下腳本鑄造代幣：

```javascript
// 在 scripts/mint.js 中
const hre = require("hardhat");

async function main() {
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const RYCToken = await hre.ethers.getContractFactory("RYCToken");
  const rycToken = RYCToken.attach(contractAddress);
  
  const [owner] = await ethers.getSigners();
  const recipient = "RECIPIENT_ADDRESS";
  const amount = ethers.parseEther("1000"); // 鑄造 1000 個代幣
  
  const tx = await rycToken.mint(recipient, amount);
  await tx.wait();
  
  console.log(`鑄造了 ${ethers.formatEther(amount)} 個代幣給 ${recipient}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

執行鑄造：
```bash
npx hardhat run scripts/mint.js --network sepolia
```

## 故障排除

### 常見問題：

1. **餘額不足**
   - 確保錢包中有足夠的 Sepolia ETH

2. **網路錯誤**
   - 檢查 RPC URL 是否正確
   - 確保 MetaMask 連接到 Sepolia 網路

3. **私鑰錯誤**
   - 檢查私鑰格式是否正確
   - 確保私鑰對應的帳戶有足夠餘額

4. **合約部署失敗**
   - 檢查 Solidity 版本兼容性
   - 查看錯誤訊息並修正

## 合約互動

部署完成後，您可以在 [Sepolia Etherscan](https://sepolia.etherscan.io/) 上查看您的合約，並使用以下功能：

- 查看合約代碼
- 查看交易歷史
- 與合約互動（讀取/寫入）
- 驗證合約源碼
