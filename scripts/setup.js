const fs = require('fs');
const path = require('path');

function main() {
  console.log("🔧 RYC Token 項目設置");
  console.log("=".repeat(50));
  
  // 檢查 .env 文件是否存在
  const envPath = path.join(__dirname, '..', '.env');
  const envExists = fs.existsSync(envPath);
  
  if (envExists) {
    console.log("📁 發現現有的 .env 文件");
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('SEPOLIA_URL') && envContent.includes('PRIVATE_KEY')) {
      console.log("✅ .env 文件已配置");
      console.log("您可以直接使用以下命令部署合約:");
      console.log("npx hardhat run scripts/deploy-sepolia.js --network sepolia");
      return;
    }
  }
  
  console.log("📝 請按照以下步驟配置您的項目:");
  console.log("");
  
  console.log("1️⃣ 獲取 Sepolia RPC URL:");
  console.log("   - 註冊 Infura: https://infura.io/");
  console.log("   - 創建新項目並選擇 Sepolia 網路");
  console.log("   - 複製 RPC URL");
  console.log("");
  
  console.log("2️⃣ 獲取 MetaMask 私鑰:");
  console.log("   - 打開 MetaMask");
  console.log("   - 點擊帳戶圖示 → 帳戶詳情");
  console.log("   - 點擊 '匯出私鑰'");
  console.log("   - 輸入密碼並複製私鑰");
  console.log("");
  
  console.log("3️⃣ 創建 .env 文件:");
  console.log("   在項目根目錄創建 .env 文件，內容如下:");
  console.log("");
  console.log("   SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID");
  console.log("   PRIVATE_KEY=your_metamask_private_key_here");
  console.log("");
  
  console.log("4️⃣ 獲取 Sepolia 測試 ETH:");
  console.log("   - https://sepoliafaucet.com/");
  console.log("   - https://faucet.sepolia.dev/");
  console.log("");
  
  console.log("5️⃣ 部署合約:");
  console.log("   npx hardhat run scripts/deploy-sepolia.js --network sepolia");
  console.log("");
  
  console.log("6️⃣ 鑄造代幣:");
  console.log("   - 修改 scripts/mint-simple.js 中的地址");
  console.log("   - 運行: npx hardhat run scripts/mint-simple.js --network sepolia");
  console.log("");
  
  console.log("⚠️  安全提醒:");
  console.log("   - 永遠不要分享您的私鑰");
  console.log("   - 不要將 .env 文件提交到 Git");
  console.log("   - 只在測試網路上使用測試私鑰");
  console.log("");
  
  console.log("📚 更多幫助:");
  console.log("   - 查看 QUICK_START.md 獲取快速指南");
  console.log("   - 查看 DEPLOYMENT_GUIDE.md 獲取詳細說明");
}

main();
