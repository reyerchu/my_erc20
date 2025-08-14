const hre = require("hardhat");

async function main() {
  console.log("🚀 開始部署 RYC Token 到 Sepolia 測試鏈...");
  
  const [deployer] = await ethers.getSigners();
  
  console.log("部署者地址:", deployer.address);
  console.log("部署者餘額:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
  
  // 檢查餘額
  const balance = await deployer.provider.getBalance(deployer.address);
  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ 餘額不足！請確保錢包中有至少 0.01 ETH");
    console.log("💡 您可以從以下地方獲取 Sepolia 測試 ETH:");
    console.log("   - https://sepoliafaucet.com/");
    console.log("   - https://faucet.sepolia.dev/");
    process.exit(1);
  }

  try {
    console.log("📦 部署合約中...");
    
    const RYCToken = await hre.ethers.getContractFactory("RYCToken");
    const rycToken = await RYCToken.deploy(deployer.address);

    console.log("⏳ 等待交易確認...");
    await rycToken.waitForDeployment();

    const contractAddress = await rycToken.getAddress();
    
    console.log("✅ 部署成功！");
    console.log("=".repeat(50));
    console.log("📋 合約信息:");
    console.log("合約地址:", contractAddress);
    console.log("Token 名稱:", await rycToken.name());
    console.log("Token 符號:", await rycToken.symbol());
    console.log("小數位數:", await rycToken.decimals());
    console.log("擁有者:", await rycToken.owner());
    console.log("總供應量:", ethers.formatEther(await rycToken.totalSupply()));
    console.log("=".repeat(50));
    
    console.log("🔗 在 Etherscan 上查看:");
    console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
    
    console.log("\n💡 下一步:");
    console.log("1. 將合約地址添加到 MetaMask 自訂代幣");
    console.log("2. 使用 scripts/mint.js 鑄造代幣");
    console.log("3. 在 .env 文件中設置 CONTRACT_ADDRESS=" + contractAddress);
    
  } catch (error) {
    console.error("❌ 部署失敗:", error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.log("💡 解決方案: 請確保錢包中有足夠的 Sepolia ETH");
    } else if (error.message.includes("network")) {
      console.log("💡 解決方案: 請檢查網路連接和 RPC URL");
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
