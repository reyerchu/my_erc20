# RYC Token - ERC20 Smart Contract

這是一個基於 ERC20 標準的智能合約，名為 "RYC Token"。

## 功能特色

- **Token 名稱**: RYC Token
- **Token 符號**: RYC
- **小數位數**: 18 (標準 ERC20)
- **初始總供應量**: 1 億個代幣
- **鑄幣功能**: 只有合約擁有者可以鑄造新代幣
- **標準 ERC20 功能**: 轉帳、餘額查詢等

## 合約功能

### 主要函數

1. **mint(address to, uint256 amount)** - 鑄造新代幣
   - 只有合約擁有者可以調用
   - 參數:
     - `to`: 接收代幣的地址
     - `amount`: 鑄造的代幣數量

2. **標準 ERC20 函數**:
   - `transfer(address to, uint256 amount)` - 轉帳
   - `balanceOf(address account)` - 查詢餘額
   - `totalSupply()` - 查詢總供應量
   - `name()` - 查詢代幣名稱
   - `symbol()` - 查詢代幣符號
   - `decimals()` - 查詢小數位數

## 安裝與部署

### 前置需求

- Node.js (版本 16 或以上)
- npm 或 yarn
- MetaMask 錢包
- Sepolia 測試 ETH

### 快速部署到 Sepolia

1. **安裝依賴**
```bash
npm install
```

2. **設置環境變數**
創建 `.env` 文件：
```env
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
PRIVATE_KEY=your_metamask_private_key
```

3. **編譯合約**
```bash
npx hardhat compile
```

4. **部署到 Sepolia**
```bash
npx hardhat run scripts/deploy-sepolia.js --network sepolia
```

### 詳細部署指南

請參考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 獲取完整的部署說明。

### 執行測試

```bash
npx hardhat test
```

### 本地開發

啟動本地 Hardhat 節點：

```bash
npx hardhat node
```

在另一個終端部署到本地網路：

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 合約地址

部署後會顯示合約地址，請記錄下來以便後續使用。

## 使用範例

### 鑄造代幣 (只有擁有者)

```javascript
// 鑄造 1000 個代幣給指定地址
await rycToken.mint("0x...", ethers.parseEther("1000"));
```

### 轉帳代幣

```javascript
// 轉帳 100 個代幣
await rycToken.transfer("0x...", ethers.parseEther("100"));
```

### 查詢餘額

```javascript
// 查詢指定地址的餘額
const balance = await rycToken.balanceOf("0x...");
console.log("餘額:", ethers.formatEther(balance));
```

## 安全注意事項

- 合約擁有者擁有鑄幣權限，請妥善保管私鑰
- 部署前請仔細檢查合約代碼
- 建議在測試網路上先進行測試

## 授權

MIT License 