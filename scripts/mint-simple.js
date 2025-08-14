const hre = require("hardhat");

async function main() {
  // ===========================================
  // 🔧 請在這裡修改您的配置
  // ===========================================
  
  // 請替換為您部署的合約地址
  const CONTRACT_ADDRESS = "0x47dBc5Bce35DbCE1F1E110EBCd8762D2B0287df9";
  
  // 請替換為接收代幣的地址 (使用您的錢包地址)
  const RECIPIENT_ADDRESS = "0x59DCd8ADE37dfa476660D2fFC14a7eDFCf7fd2Aa";
  
  // 鑄造的代幣數量 (以 ETH 為單位，例如 "1000" = 1000 個代幣)
  const MINT_AMOUNT = "10000";
  
  // ===========================================
  // 檢查配置
  // ===========================================
  
  if (CONTRACT_ADDRESS === "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE") {
    console.error("❌ 請修改腳本中的 CONTRACT_ADDRESS");
    console.log("💡 請將 YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE 替換為您的實際合約地址");
    process.exit(1);
  }
  
  if (RECIPIENT_ADDRESS === "RECIPIENT_WALLET_ADDRESS_HERE") {
    console.error("❌ 請修改腳本中的 RECIPIENT_ADDRESS");
    console.log("💡 請將 RECIPIENT_WALLET_ADDRESS_HERE 替換為接收代幣的錢包地址");
    process.exit(1);
  }
  
  // ===========================================
  // 執行鑄造
  // ===========================================
  
  try {
    console.log("🚀 開始鑄造 RYC 代幣...");
    console.log("合約地址:", CONTRACT_ADDRESS);
    console.log("接收地址:", RECIPIENT_ADDRESS);
    console.log("鑄造數量:", MINT_AMOUNT, "RYC");
    
    const RYCToken = await hre.ethers.getContractFactory("RYCToken");
    const rycToken = RYCToken.attach(CONTRACT_ADDRESS);
    
    const [owner] = await ethers.getSigners();
    console.log("鑄造者:", owner.address);
    
    // 檢查是否為擁有者
    const contractOwner = await rycToken.owner();
    if (owner.address !== contractOwner) {
      console.error("❌ 錯誤：只有合約擁有者可以鑄造代幣");
      console.log("合約擁有者:", contractOwner);
      console.log("當前帳戶:", owner.address);
      process.exit(1);
    }
    
    const amount = ethers.parseEther(MINT_AMOUNT);
    
    console.log("⏳ 提交鑄造交易...");
    const tx = await rycToken.mint(RECIPIENT_ADDRESS, amount);
    console.log("交易哈希:", tx.hash);
    
    console.log("⏳ 等待交易確認...");
    await tx.wait();
    
    console.log("✅ 鑄造成功！");
    console.log("=".repeat(50));
    console.log("📊 鑄造結果:");
    console.log("接收地址:", RECIPIENT_ADDRESS);
    console.log("鑄造數量:", MINT_AMOUNT, "RYC");
    console.log("交易哈希:", tx.hash);
    
    // 查詢餘額
    const balance = await rycToken.balanceOf(RECIPIENT_ADDRESS);
    console.log("接收地址當前餘額:", ethers.formatEther(balance), "RYC");
    
    const totalSupply = await rycToken.totalSupply();
    console.log("總供應量:", ethers.formatEther(totalSupply), "RYC");
    console.log("=".repeat(50));
    
    console.log("🔗 在 Etherscan 上查看交易:");
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
    
  } catch (error) {
    console.error("❌ 鑄造失敗:", error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.log("💡 解決方案: 請確保錢包中有足夠的 Sepolia ETH 支付 gas 費用");
    } else if (error.message.includes("OwnableUnauthorizedAccount")) {
      console.log("💡 解決方案: 只有合約擁有者可以鑄造代幣");
    } else if (error.message.includes("network")) {
      console.log("💡 解決方案: 請檢查網路連接");
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
