const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ 請在 .env 文件中設置 CONTRACT_ADDRESS");
    console.log("💡 例如: CONTRACT_ADDRESS=0x1234...");
    process.exit(1);
  }

  try {
    console.log("🔍 檢查合約部署狀態...");
    console.log("合約地址:", contractAddress);
    
    const RYCToken = await hre.ethers.getContractFactory("RYCToken");
    const rycToken = RYCToken.attach(contractAddress);
    
    // 檢查合約是否存在
    const code = await hre.ethers.provider.getCode(contractAddress);
    if (code === "0x") {
      console.error("❌ 合約地址不存在或未部署");
      process.exit(1);
    }
    
    console.log("✅ 合約已部署");
    console.log("=".repeat(50));
    console.log("📋 合約信息:");
    console.log("Token 名稱:", await rycToken.name());
    console.log("Token 符號:", await rycToken.symbol());
    console.log("小數位數:", await rycToken.decimals());
    console.log("擁有者:", await rycToken.owner());
    console.log("總供應量:", ethers.formatEther(await rycToken.totalSupply()));
    console.log("=".repeat(50));
    
    // 檢查擁有者餘額
    const owner = await rycToken.owner();
    const ownerBalance = await rycToken.balanceOf(owner);
    console.log("擁有者餘額:", ethers.formatEther(ownerBalance), "RYC");
    
    console.log("\n🔗 相關連結:");
    console.log(`Etherscan: https://sepolia.etherscan.io/address/${contractAddress}`);
    console.log(`Contract Read: https://sepolia.etherscan.io/address/${contractAddress}#readContract`);
    console.log(`Contract Write: https://sepolia.etherscan.io/address/${contractAddress}#writeContract`);
    
  } catch (error) {
    console.error("❌ 檢查失敗:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
