const hre = require("hardhat");

async function main() {
  // 請替換為您部署的合約地址
  const contractAddress = process.env.CONTRACT_ADDRESS || "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  
  if (contractAddress === "YOUR_DEPLOYED_CONTRACT_ADDRESS") {
    console.error("請在 .env 文件中設置 CONTRACT_ADDRESS 或直接修改此腳本");
    process.exit(1);
  }

  const RYCToken = await hre.ethers.getContractFactory("RYCToken");
  const rycToken = RYCToken.attach(contractAddress);
  
  const [owner] = await ethers.getSigners();
  
  // 請替換為接收代幣的地址
  const recipient = process.env.RECIPIENT_ADDRESS || "RECIPIENT_ADDRESS";
  const amount = ethers.parseEther("1000"); // 鑄造 1000 個代幣
  
  if (recipient === "RECIPIENT_ADDRESS") {
    console.error("請在 .env 文件中設置 RECIPIENT_ADDRESS 或直接修改此腳本");
    process.exit(1);
  }
  
  console.log(`準備鑄造 ${ethers.formatEther(amount)} 個 RYC 代幣`);
  console.log(`合約地址: ${contractAddress}`);
  console.log(`接收地址: ${recipient}`);
  console.log(`鑄造者: ${owner.address}`);
  
  try {
    const tx = await rycToken.mint(recipient, amount);
    console.log(`交易已提交，交易哈希: ${tx.hash}`);
    
    await tx.wait();
    console.log(`✅ 鑄造成功！`);
    console.log(`鑄造了 ${ethers.formatEther(amount)} 個代幣給 ${recipient}`);
    
    // 查詢餘額
    const balance = await rycToken.balanceOf(recipient);
    console.log(`接收地址當前餘額: ${ethers.formatEther(balance)} RYC`);
    
  } catch (error) {
    console.error("❌ 鑄造失敗:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
