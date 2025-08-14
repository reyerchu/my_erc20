import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import './App.css';

// 合約 ABI (簡化版，包含我們需要的函數)
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 合約地址 (Sepolia 測試網)
const CONTRACT_ADDRESS = "0x3F7944D4d485417331A03Bfce2C264c3CBF6F865";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('transfer');
  const [networkInfo, setNetworkInfo] = useState(null);
  
  // 表單狀態
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [mintTo, setMintTo] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [approveSpender, setApproveSpender] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [transferFromFrom, setTransferFromFrom] = useState('');
  const [transferFromTo, setTransferFromTo] = useState('');
  const [transferFromAmount, setTransferFromAmount] = useState('');

  // 切換到 Sepolia 網路
  const switchToSepolia = async () => {
    try {
      setLoading(true);
      setStatus('正在切換到 Sepolia 測試網路...');

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
      });

      setStatus('已切換到 Sepolia 測試網路!', 'success');
      
      // 重新連接錢包
      setTimeout(() => {
        connectWallet();
      }, 1000);
    } catch (switchError) {
      // 如果 Sepolia 網路不存在，則添加它
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'SEP',
                decimals: 18
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/']
            }]
          });
          
          setStatus('已添加 Sepolia 測試網路!', 'success');
          
          // 重新連接錢包
          setTimeout(() => {
            connectWallet();
          }, 1000);
        } catch (addError) {
          console.error('添加網路錯誤:', addError);
          setStatus(`添加網路失敗: ${addError.message}`, 'error');
        }
      } else {
        console.error('切換網路錯誤:', switchError);
        setStatus(`切換網路失敗: ${switchError.message}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // 連接 MetaMask
  const connectWallet = async () => {
    try {
      setLoading(true);
      setStatus('正在連接 MetaMask...');

      if (!window.ethereum) {
        throw new Error('請安裝 MetaMask!');
      }

      // 請求帳戶連接
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const account = accounts[0];
      setAccount(account);

      // 檢查網路
      const networkResult = await getNetworkInfo();
      if (!networkResult || !networkResult.isCorrect) {
        setStatus('檢測到錯誤網路，正在切換到 Sepolia 測試網路...', 'info');
        await switchToSepolia();
        return;
      }

      // 設置 provider 和 contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contract);

      // 載入初始數據
      await loadContractData(contract, account);

      setStatus('錢包連接成功!', 'success');
    } catch (error) {
      console.error('連接錯誤:', error);
      setStatus(`連接失敗: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 獲取網路信息
  const getNetworkInfo = async () => {
    try {
      if (!window.ethereum) return;

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkName = getNetworkName(chainId);
      const isCorrectNetwork = chainId === '0xaa36a7';

      setNetworkInfo({
        chainId,
        name: networkName,
        isCorrect: isCorrectNetwork
      });

      return { chainId, isCorrect: isCorrectNetwork };
    } catch (error) {
      console.error('獲取網路信息錯誤:', error);
      return null;
    }
  };

  // 根據 chainId 獲取網路名稱
  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
      '0xa': 'Optimism',
      '0xa4b1': 'Arbitrum One'
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  // 載入合約數據
  const loadContractData = async (contractInstance, userAccount) => {
    try {
      const [balance, totalSupply] = await Promise.all([
        contractInstance.balanceOf(userAccount),
        contractInstance.totalSupply()
      ]);

      setBalance(ethers.formatEther(balance));
      setTotalSupply(ethers.formatEther(totalSupply));
    } catch (error) {
      console.error('載入數據錯誤:', error);
      setStatus(`載入數據失敗: ${error.message}`, 'error');
    }
  };

  // 轉帳
  const handleTransfer = async () => {
    if (!contract || !transferTo || !transferAmount) {
      setStatus('請填寫完整信息', 'error');
      return;
    }

    try {
      setLoading(true);
      setStatus('正在轉帳...');

      const amount = ethers.parseEther(transferAmount);
      const tx = await contract.transfer(transferTo, amount);
      await tx.wait();

      setStatus('轉帳成功!', 'success');
      setTransferTo('');
      setTransferAmount('');
      await loadContractData(contract, account);
    } catch (error) {
      console.error('轉帳錯誤:', error);
      setStatus(`轉帳失敗: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 鑄造代幣
  const handleMint = async () => {
    if (!contract || !mintTo || !mintAmount) {
      setStatus('請填寫完整信息', 'error');
      return;
    }

    try {
      setLoading(true);
      setStatus('正在鑄造代幣...');

      const amount = ethers.parseEther(mintAmount);
      const tx = await contract.mint(mintTo, amount);
      await tx.wait();

      setStatus('鑄造成功!', 'success');
      setMintTo('');
      setMintAmount('');
      await loadContractData(contract, account);
    } catch (error) {
      console.error('鑄造錯誤:', error);
      setStatus(`鑄造失敗: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 授權
  const handleApprove = async () => {
    if (!contract || !approveSpender || !approveAmount) {
      setStatus('請填寫完整信息', 'error');
      return;
    }

    try {
      setLoading(true);
      setStatus('正在授權...');

      const amount = ethers.parseEther(approveAmount);
      const tx = await contract.approve(approveSpender, amount);
      await tx.wait();

      setStatus('授權成功!', 'success');
      setApproveSpender('');
      setApproveAmount('');
    } catch (error) {
      console.error('授權錯誤:', error);
      setStatus(`授權失敗: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 從授權轉帳
  const handleTransferFrom = async () => {
    if (!contract || !transferFromFrom || !transferFromTo || !transferFromAmount) {
      setStatus('請填寫完整信息', 'error');
      return;
    }

    try {
      setLoading(true);
      setStatus('正在轉帳...');

      const amount = ethers.parseEther(transferFromAmount);
      const tx = await contract.transferFrom(transferFromFrom, transferFromTo, amount);
      await tx.wait();

      setStatus('轉帳成功!', 'success');
      setTransferFromFrom('');
      setTransferFromTo('');
      setTransferFromAmount('');
      await loadContractData(contract, account);
    } catch (error) {
      console.error('轉帳錯誤:', error);
      setStatus(`轉帳失敗: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 監聽帳戶和網路變化
  useEffect(() => {
    if (window.ethereum) {
      // 監聽帳戶變化
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          if (contract) {
            loadContractData(contract, accounts[0]);
          }
        } else {
          setAccount(null);
          setContract(null);
          setProvider(null);
        }
      });

      // 監聽網路變化
      window.ethereum.on('chainChanged', async (chainId) => {
        console.log('網路已切換到:', chainId);
        await getNetworkInfo();
        
        // 如果切換到錯誤網路，顯示警告
        if (chainId !== '0xaa36a7') {
          setStatus('檢測到網路切換，請確保使用 Sepolia 測試網路', 'error');
        } else {
          setStatus('已切換到 Sepolia 測試網路', 'success');
        }
      });

      // 初始獲取網路信息
      getNetworkInfo();
    }
  }, [contract]);

  return (
    <div className="container">
      <div className="header">
        <h1>🪙 RYC Token DApp</h1>
        <p>ERC20 智能合約互動界面 - Sepolia 測試網</p>
        <p>合約地址: {CONTRACT_ADDRESS}</p>
      </div>

      {!account ? (
        <div className="card">
          <h2>連接錢包</h2>
          <p>請連接您的 MetaMask 錢包以開始使用</p>
          <p>本 DApp 需要 Sepolia 測試網路</p>
          <button 
            className="button" 
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? <span className="loading"></span> : '連接 MetaMask'}
          </button>
          <button 
            className="button" 
            onClick={switchToSepolia}
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' }}
          >
            {loading ? <span className="loading"></span> : '手動切換到 Sepolia'}
          </button>
        </div>
      ) : (
        <>
          <div className="card">
            <h2>錢包信息</h2>
            <div className="address-display">
              地址: {account}
            </div>
            {networkInfo && (
              <div className={`network-status ${networkInfo.isCorrect ? 'correct' : 'incorrect'}`}>
                <h3>網路狀態</h3>
                <div className="network-info">
                  <span className="network-name">{networkInfo.name}</span>
                  <span className={`network-indicator ${networkInfo.isCorrect ? 'correct' : 'incorrect'}`}>
                    {networkInfo.isCorrect ? '✅' : '❌'}
                  </span>
                </div>
                {!networkInfo.isCorrect && (
                  <button 
                    className="button" 
                    onClick={switchToSepolia}
                    style={{ 
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      marginTop: '10px'
                    }}
                  >
                    切換到 Sepolia
                  </button>
                )}
              </div>
            )}
            <div className="balance-display">
              <h3>您的 RYC 餘額</h3>
              <div className="amount">{parseFloat(balance).toLocaleString()} RYC</div>
            </div>
            <div className="balance-display">
              <h3>總供應量</h3>
              <div className="amount">{parseFloat(totalSupply).toLocaleString()} RYC</div>
            </div>
          </div>

          {status && (
            <div className={`status ${status.includes('成功') ? 'success' : status.includes('失敗') ? 'error' : 'info'}`}>
              {status}
            </div>
          )}

          <div className="card">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'transfer' ? 'active' : ''}`}
                onClick={() => setActiveTab('transfer')}
              >
                轉帳
              </button>
              <button 
                className={`tab ${activeTab === 'mint' ? 'active' : ''}`}
                onClick={() => setActiveTab('mint')}
              >
                鑄造
              </button>
              <button 
                className={`tab ${activeTab === 'approve' ? 'active' : ''}`}
                onClick={() => setActiveTab('approve')}
              >
                授權
              </button>
              <button 
                className={`tab ${activeTab === 'transferFrom' ? 'active' : ''}`}
                onClick={() => setActiveTab('transferFrom')}
              >
                授權轉帳
              </button>
            </div>

            {activeTab === 'transfer' && (
              <div>
                <h3>轉帳 RYC 代幣</h3>
                <div className="form-group">
                  <label className="label">接收地址:</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="0x..."
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">數量:</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="1000"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
                <button 
                  className="button" 
                  onClick={handleTransfer}
                  disabled={loading || !transferTo || !transferAmount}
                >
                  {loading ? <span className="loading"></span> : '轉帳'}
                </button>
              </div>
            )}

            {activeTab === 'mint' && (
              <div>
                <h3>鑄造 RYC 代幣</h3>
                <p>只有合約擁有者可以鑄造新代幣</p>
                <div className="form-group">
                  <label className="label">接收地址:</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="0x..."
                    value={mintTo}
                    onChange={(e) => setMintTo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">數量:</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="1000"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                  />
                </div>
                <button 
                  className="button" 
                  onClick={handleMint}
                  disabled={loading || !mintTo || !mintAmount}
                >
                  {loading ? <span className="loading"></span> : '鑄造'}
                </button>
              </div>
            )}

            {activeTab === 'approve' && (
              <div>
                <h3>授權代幣使用</h3>
                <p>授權其他地址使用您的代幣</p>
                <div className="form-group">
                  <label className="label">授權地址:</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="0x..."
                    value={approveSpender}
                    onChange={(e) => setApproveSpender(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">授權數量:</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="1000"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                  />
                </div>
                <button 
                  className="button" 
                  onClick={handleApprove}
                  disabled={loading || !approveSpender || !approveAmount}
                >
                  {loading ? <span className="loading"></span> : '授權'}
                </button>
              </div>
            )}

            {activeTab === 'transferFrom' && (
              <div>
                <h3>從授權轉帳</h3>
                <p>使用授權的代幣進行轉帳</p>
                <div className="form-group">
                  <label className="label">從地址:</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="0x..."
                    value={transferFromFrom}
                    onChange={(e) => setTransferFromFrom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">到地址:</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="0x..."
                    value={transferFromTo}
                    onChange={(e) => setTransferFromTo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">數量:</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="1000"
                    value={transferFromAmount}
                    onChange={(e) => setTransferFromAmount(e.target.value)}
                  />
                </div>
                <button 
                  className="button" 
                  onClick={handleTransferFrom}
                  disabled={loading || !transferFromFrom || !transferFromTo || !transferFromAmount}
                >
                  {loading ? <span className="loading"></span> : '轉帳'}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
