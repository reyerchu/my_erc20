# RYC Token - ERC20 Smart Contract

這是一個基於 ERC20 標準的智能合約，名為 "RYC Token"。

## 功能特色

### 🪙 智能合約
- **Token 名稱**: RYC Token
- **Token 符號**: RYC
- **小數位數**: 18 (標準 ERC20)
- **初始總供應量**: 1 億個代幣
- **鑄幣功能**: 只有合約擁有者可以鑄造新代幣
- **標準 ERC20 功能**: 轉帳、餘額查詢等

### 🌐 DApp 網站
- **React + Web3.js**: 現代化前端界面
- **MetaMask 集成**: 無縫錢包連接
- **自動網路切換**: 智能檢測並切換到 Sepolia 測試網
- **完整 ERC20 操作**: Transfer, Mint, Approve, TransferFrom
- **實時數據顯示**: 餘額、總供應量、網路狀態
- **響應式設計**: 適配桌面和移動設備

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

### 🌐 啟動 DApp 網站

1. **安裝依賴**
```bash
npm install
```

2. **啟動開發服務器**
```bash
npm run dev
```

3. **訪問網站**
打開瀏覽器訪問 http://localhost:3000

4. **連接錢包**
- 確保已安裝 MetaMask
- 點擊 "連接 MetaMask" 按鈕
- 系統會自動切換到 Sepolia 測試網

詳細使用說明請參考 [WEBSITE_README.md](./WEBSITE_README.md)

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

### 智能合約操作

#### 鑄造代幣 (只有擁有者)
```javascript
// 鑄造 1000 個代幣給指定地址
await rycToken.mint("0x...", ethers.parseEther("1000"));
```

#### 轉帳代幣
```javascript
// 轉帳 100 個代幣
await rycToken.transfer("0x...", ethers.parseEther("100"));
```

#### 查詢餘額
```javascript
// 查詢指定地址的餘額
const balance = await rycToken.balanceOf("0x...");
console.log("餘額:", ethers.formatEther(balance));
```

### DApp 網站操作

#### 連接錢包
1. 打開網站 http://localhost:3000
2. 點擊 "連接 MetaMask" 按鈕
3. 授權連接請求

#### 轉帳操作
1. 選擇 "轉帳" 標籤
2. 輸入接收地址和數量
3. 點擊 "轉帳" 按鈕
4. 在 MetaMask 中確認交易

#### 鑄造操作 (僅擁有者)
1. 選擇 "鑄造" 標籤
2. 輸入接收地址和數量
3. 點擊 "鑄造" 按鈕
4. 在 MetaMask 中確認交易

## 安全注意事項

### 智能合約安全
- 合約擁有者擁有鑄幣權限，請妥善保管私鑰
- 部署前請仔細檢查合約代碼
- 建議在測試網路上先進行測試

### DApp 網站安全
- 僅連接 MetaMask 錢包
- 自動網路驗證 (Sepolia 測試網)
- 交易確認提示
- 輸入驗證和錯誤處理

## 項目結構

```
my_erc20/
├── contracts/
│   └── RYCToken.sol          # ERC20 智能合約
├── scripts/
│   ├── deploy-sepolia.js     # Sepolia 部署腳本
│   ├── mint-simple.js        # 鑄造腳本
│   └── setup.js              # 設置腳本
├── src/
│   ├── App.jsx               # React 主組件
│   ├── App.css               # 組件樣式
│   ├── main.jsx              # 應用入口
│   └── index.css             # 全局樣式
├── test/
│   └── RYCToken.test.js      # 測試套件
├── index.html                # HTML 模板
├── vite.config.js            # Vite 配置
├── package.json              # 項目依賴
├── README.md                 # 項目文檔
├── DEPLOYMENT_GUIDE.md       # 部署指南
└── WEBSITE_README.md         # 網站使用指南
```

## 相關連結

- **GitHub 倉庫**: https://github.com/reyerchu/my_erc20
- **合約地址**: https://sepolia.etherscan.io/address/0x3F7944D4d485417331A03Bfce2C264c3CBF6F865
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **MetaMask**: https://metamask.io/

## 授權

MIT License 