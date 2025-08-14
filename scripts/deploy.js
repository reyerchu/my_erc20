const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const RYCToken = await hre.ethers.getContractFactory("RYCToken");
  const rycToken = await RYCToken.deploy(deployer.address);

  await rycToken.waitForDeployment();

  console.log("RYC Token deployed to:", await rycToken.getAddress());
  console.log("Token Name:", await rycToken.name());
  console.log("Token Symbol:", await rycToken.symbol());
  console.log("Token Decimals:", await rycToken.decimals());
  console.log("Owner:", await rycToken.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 