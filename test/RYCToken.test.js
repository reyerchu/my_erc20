const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RYC Token", function () {
  let RYCToken;
  let rycToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    RYCToken = await ethers.getContractFactory("RYCToken");
    rycToken = await RYCToken.deploy(owner.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await rycToken.owner()).to.equal(owner.address);
    });

    it("Should assign the correct name and symbol", async function () {
      expect(await rycToken.name()).to.equal("RYC Token");
      expect(await rycToken.symbol()).to.equal("RYC");
    });

    it("Should have 18 decimals", async function () {
      expect(await rycToken.decimals()).to.equal(18);
    });

    it("Should start with 100 million total supply", async function () {
      expect(await rycToken.totalSupply()).to.equal(ethers.parseEther("100000000"));
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      const initialSupply = ethers.parseEther("100000000");
      
      await rycToken.mint(addr1.address, mintAmount);
      
      expect(await rycToken.balanceOf(addr1.address)).to.equal(mintAmount);
      expect(await rycToken.totalSupply()).to.equal(initialSupply + mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      
      await expect(
        rycToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWithCustomError(rycToken, "OwnableUnauthorizedAccount");
    });

    it("Should allow multiple mints", async function () {
      const mintAmount1 = ethers.parseEther("500");
      const mintAmount2 = ethers.parseEther("300");
      const initialSupply = ethers.parseEther("100000000");
      
      await rycToken.mint(addr1.address, mintAmount1);
      await rycToken.mint(addr2.address, mintAmount2);
      
      expect(await rycToken.balanceOf(addr1.address)).to.equal(mintAmount1);
      expect(await rycToken.balanceOf(addr2.address)).to.equal(mintAmount2);
      expect(await rycToken.totalSupply()).to.equal(initialSupply + mintAmount1 + mintAmount2);
    });
  });

  describe("ERC20 Standard Functions", function () {
    beforeEach(async function () {
      await rycToken.mint(addr1.address, ethers.parseEther("1000"));
    });

    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await rycToken.connect(addr1).transfer(addr2.address, transferAmount);
      
      expect(await rycToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("900"));
      expect(await rycToken.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialBalance = await rycToken.balanceOf(addr1.address);
      
      await expect(
        rycToken.connect(addr1).transfer(addr2.address, initialBalance + 1n)
      ).to.be.revertedWithCustomError(rycToken, "ERC20InsufficientBalance");
    });
  });
}); 