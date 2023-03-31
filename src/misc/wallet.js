import { ethers } from './ethers.js';

const { ethereum } = typeof window !== 'undefined' && window;

import { CURRENT_RPC, maskWalletAddress } from './globals.js';

import { log } from './logger.js';

let provider;

let blockNumber;
let balance;

async function initialize() {
  if (isMetaMaskInstalled()) {
    provider = new ethers.providers.Web3Provider(ethereum, 'any');

    log('[WALLET]: Wallet is initialized');

    ethereum.on('accountsChanged', (accounts) => {
      // Time to reload your interface with accounts[0]!
      if (accounts) {
        log(`[WALLET]: Accounts changed ${accounts}`);
        loadPage();
      }
    });

    ethereum.on('chainChanged', (chainId) => {
      if (chainId) {
        log(`[WALLET]: Chain changed ${chainId}`);
        dispatchProviderResetEvent();
        if (CURRENT_RPC.chainId === chainId) {
          log('[WALLET]: Connection requested');
          connect();
        }
      }
    });

    if (isConnected()) {
      await connect();
    }
  } else {
    log('MetaMask is not installed.');
  }
}

async function addNetworkToMetamask() {
  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CURRENT_RPC],
    });
    return true;
  } catch (error) {
    log(`[WALLET]: [addNetworkToMetamask]: ${error}`);
    return false;
  }
}

function block() {
  return blockNumber;
}

function isConnected() {
  return ethereum.selectedAddress !== null && ethereum.chainId === CURRENT_RPC.chainId;
}

function walletAddress(mask = true) {
  const account = ethereum.selectedAddress;
  if (account) {
    return mask ? maskWalletAddress(account) : account;
  }
}

async function queryBalance() {
  const account = ethereum.selectedAddress;
  if (account) {
    const accountBalance = await provider.getBalance(account);
    balance = ethers.utils.formatEther(accountBalance);
    log(`[WALLET]: Balance is ${balance}`);
  }
  return balance;
}

async function connect(resetProvider) {
  if (!ethereum) {
    alert('MetaMask is not installed.');
    return;
  }

  if (ethereum.chainId !== CURRENT_RPC.chainId) {
    log('[WALLET]: Wrong network!');
    await addNetworkToMetamask();
    return;
  }

  if (!provider || resetProvider) {
    log('[WALLET]: Provider is reset');
    provider = new ethers.providers.Web3Provider(ethereum);
    dispatchProviderResetEvent();
  }

  // blockNumber = await provider.getBlockNumber()

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
  }).catch((error) => {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      loadPage();
    } else {
      log(`[WALLET]: [connect]: ${error}`);
    }
  });

  if (accounts) {
    // selectedAccount = accounts[0];

    // log("[WALLET]: Block number is " + blockNumber);

    log('[WALLET]: Wallet connected');

    log(`[WALLET]: Current account is ${ethereum.selectedAddress}`);

    dispatchAccountUpdateEvent();

    await queryBalance();
  }
}

async function disconnect() {
  clearWalletData();
  dispatchAccountUpdateEvent();
  log('[WALLET]: Wallet disconnected');
}

async function faucet() {
  window.open('https://faucet.avax-test.network/', '_blank');
}

function loadPage() {
  // instead reload, dispatch event
  // window.location.reload();
  clearWalletData();
  dispatchAccountUpdateEvent();
}

function clearWalletData() {
  blockNumber = undefined;
  // selectedAccount = undefined;
  balance = undefined;
}

function dispatchAccountUpdateEvent() {
  const event = new Event('onAccountUpdate');
  document.dispatchEvent(event);
}

function dispatchProviderResetEvent() {
  const event = new Event('onProviderReset');
  document.dispatchEvent(event);
}

const isMetaMaskInstalled = () =>
// Have to check the ethereum binding on the window object to see if it's installed
  Boolean(ethereum && ethereum.isMetaMask);
const signer = () => {
  if (provider) {
    return provider.getSigner();
  }
};

export {
  initialize,
  block,
  isConnected,
  walletAddress,
  balance,
  connect,
  disconnect,
  faucet,
  signer,
  queryBalance,
};
