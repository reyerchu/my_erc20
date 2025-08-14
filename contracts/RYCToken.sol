// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RYC Token
 * @dev ERC20 token with minting capability restricted to owner
 */
contract RYCToken is ERC20, Ownable {
    
    /**
     * @dev Constructor that sets the token name and symbol
     * @param initialOwner The address that will be the initial owner
     */
    constructor(address initialOwner) 
        ERC20("RYC Token", "RYC") 
        Ownable(initialOwner)
    {
        // 鑄造 1 億個代幣給擁有者
        uint256 initialSupply = 100_000_000 * 10**18; // 1億個代幣 (18位小數)
        _mint(initialOwner, initialSupply);
    }
    
    /**
     * @dev Mint new tokens. Only the owner can call this function.
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Override decimals to use 18 decimals (standard for ERC20)
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
} 