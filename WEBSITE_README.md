# 🪙 RYC Token DApp 網站

這是一個基於 React 和 Web3.js 的 DApp 網站，用於與 RYC Token ERC20 智能合約進行互動。

## 🌟 功能特色

### 🔗 錢包連接
- MetaMask 錢包集成
- 自動檢測和切換網路 (Sepolia 測試網)
- 自動添加 Sepolia 網路 (如果不存在)
- 實時網路狀態監控
- 帳戶切換支援

### 💰 代幣操作
- **轉帳 (Transfer)**: 直接轉帳 RYC 代幣給其他地址
- **鑄造 (Mint)**: 只有合約擁有者可以鑄造新代幣
- **授權 (Approve)**: 授權其他地址使用您的代幣
- **授權轉帳 (TransferFrom)**: 使用授權的代幣進行轉帳

### 📊 實時數據
- 顯示當前錢包餘額
- 顯示總供應量
- 實時更新交易狀態

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發服務器
```bash
npm run dev
```

### 3. 打開瀏覽器
訪問 http://localhost:3000

## 📱 使用指南

### 連接錢包
1. 確保已安裝 MetaMask 擴展
2. 點擊 "連接 MetaMask" 按鈕
3. 系統會自動檢測並切換到 Sepolia 測試網路
4. 如果 Sepolia 網路不存在，會自動添加
5. 授權連接請求

**注意**: 如果自動切換失敗，可以點擊 "手動切換到 Sepolia" 按鈕

### 轉帳代幣
1. 選擇 "轉帳" 標籤
2. 輸入接收地址 (0x...)
3. 輸入轉帳數量
4. 點擊 "轉帳" 按鈕
5. 在 MetaMask 中確認交易

### 鑄造代幣 (僅擁有者)
1. 選擇 "鑄造" 標籤
2. 輸入接收地址
3. 輸入鑄造數量
4. 點擊 "鑄造" 按鈕
5. 在 MetaMask 中確認交易

### 授權代幣使用
1. 選擇 "授權" 標籤
2. 輸入要授權的地址
3. 輸入授權數量
4. 點擊 "授權" 按鈕
5. 在 MetaMask 中確認交易

### 使用授權轉帳
1. 選擇 "授權轉帳" 標籤
2. 輸入代幣擁有者地址
3. 輸入接收地址
4. 輸入轉帳數量
5. 點擊 "轉帳" 按鈕
6. 在 MetaMask 中確認交易

## 🔧 技術架構

### 前端技術
- **React 18**: 用戶界面框架
- **Vite**: 構建工具
- **Ethers.js**: Web3 庫
- **CSS3**: 樣式和動畫

### 智能合約
- **合約地址**: `0x3F7944D4d485417331A03Bfce2C264c3CBF6F865`
- **網路**: Sepolia 測試網
- **標準**: ERC20

### 主要組件
- `App.jsx`: 主要應用組件
- `index.css`: 全局樣式
- `App.css`: 組件特定樣式

## 🎨 設計特色

### 現代化 UI
- 漸變背景設計
- 玻璃態卡片效果
- 流暢的動畫過渡
- 響應式設計

### 用戶體驗
- 直觀的標籤頁導航
- 實時狀態反饋
- 載入動畫
- 錯誤處理

## 🔒 安全特性

### 錢包安全
- 僅連接 MetaMask
- 網路驗證 (Sepolia)
- 交易確認提示

### 合約安全
- 使用標準 ERC20 接口
- 權限控制 (onlyOwner)
- 輸入驗證

## 📁 項目結構

```
src/
├── App.jsx          # 主要應用組件
├── App.css          # 組件樣式
├── main.jsx         # 應用入口
└── index.css        # 全局樣式

public/
└── index.html       # HTML 模板

contracts/
└── RYCToken.sol     # 智能合約
```

## 🚀 部署

### 開發環境
```bash
npm run dev
```

### 生產構建
```bash
npm run build
```

### 預覽構建
```bash
npm run preview
```

## 🔗 相關連結

- **合約地址**: https://sepolia.etherscan.io/address/0x3F7944D4d485417331A03Bfce2C264c3CBF6F865
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **MetaMask**: https://metamask.io/

## 🐛 故障排除

### 常見問題

1. **"請安裝 MetaMask"**
   - 解決方案: 安裝 MetaMask 瀏覽器擴展

2. **"請切換到 Sepolia 測試網路"**
   - 解決方案: 點擊 "手動切換到 Sepolia" 按鈕
   - 或者: 在 MetaMask 中手動切換到 Sepolia 網路

3. **"交易失敗"**
   - 檢查餘額是否足夠
   - 確認 gas 費用設置
   - 檢查網路連接

4. **"鑄造失敗"**
   - 確認您是否為合約擁有者
   - 檢查合約權限設置

## 📝 開發者說明

### 添加新功能
1. 在 `App.jsx` 中添加新的狀態和函數
2. 在 UI 中添加相應的表單和按鈕
3. 更新樣式文件
4. 測試功能

### 修改合約地址
在 `App.jsx` 中修改 `CONTRACT_ADDRESS` 常量：
```javascript
const CONTRACT_ADDRESS = "YOUR_NEW_CONTRACT_ADDRESS";
```

### 自定義樣式
- 修改 `src/index.css` 更改全局樣式
- 修改 `src/App.css` 更改組件樣式

## 📄 授權

MIT License
