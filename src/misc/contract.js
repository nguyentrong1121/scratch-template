import { ethers } from './ethers.js';

import { CURRENT_RPC, showNotification } from './globals.js';

import { log } from './logger.js';

import { isConnected, signer } from './wallet.js';

import { nftContractAddress, nftContractAbi } from './contractAbi.js';

const provider = new ethers.providers.JsonRpcProvider(CURRENT_RPC.rpcUrls[0]);

let contract;

let isContractInitialized;

let isOwner;

let currentItemCount;
let maxItemCount;

let balance;

let itemFee;
let mintPaused;
let mintAmount;
let mintTx;

const defaultDecimals = 18; // 18 for Fungibles

async function initialize() {
  constructContracts();

  if (contract) {
    log('[CONTRACT]: Contract is initialized');
    isContractInitialized = true;
    document.addEventListener('onProviderReset', () => {
      log('[CONTRACT]: onProviderReset event raised!');
      constructContracts();
    });
    document.addEventListener('onAccountUpdate', () => {
      if (isConnected()) {
        hookMintEvents();
        dispatchContractInitializedEvent();
      }
    });
  } else {
    log('[CONTRACT]: Contract could not be initialized');
  }
}

function constructContracts() {
  if (signer() && isConnected()) {
    contract = new ethers.Contract(nftContractAddress, nftContractAbi, signer() ?? provider);
  } else {
    contract = new ethers.Contract(nftContractAddress, nftContractAbi, provider);
  }
}

async function getCurrentItemCount() {
  return await contract.totalSupply();
}

async function getMaxItemCount() {
  return await contract.maxSupply();
}

async function queryMintStats() {
  if (!contract) {
    return;
  }

  if (!signer()) {
    return;
  }

  [itemFee, mintPaused, maxItemCount, currentItemCount] = await Promise.all([getItemPrice(), isPaused(), getMaxItemCount(), getCurrentItemCount()]);

  log(`[CONTRACT]: Current item fee is ${itemFee}`);

  log(`[CONTRACT]: Mint is paused ? ${mintPaused}`);

  log(`[CONTRACT]: Maximum supply is ? ${maxItemCount}`);

  log(`[CONTRACT]: Minted NFT count is ? ${currentItemCount}`);

  dispatchMintStatsFetched();
}

async function getBalance(address) {
  return await contract.balanceOf(address);
}

async function isPaused() {
  return await contract.paused();
}

async function getItemPrice() {
  const amount = await contract.itemFee();
  return ethers.utils.formatUnits(amount, defaultDecimals);
}

async function mint(amount) {
  if (!signer()) {
    return;
  }

  if (amount < 1 && amount > 20) {
    return;
  }

  const address = await signer().getAddress();
  log(`ADDRESS => ${address}`);

  const itemPrice = itemFee ?? await getItemPrice();

  const overrides = {
    value: ethers.utils.parseEther((itemPrice * amount).toString()),
  };

  contract.mint(amount, overrides).then((e) => {
    log('[MINT]: Transaction submitted');
    // showNotification("Processing", "Transaction submitted.");
    dispatchMintSubmitEvent();
    mintAmount = amount;
    mintTx = e;
    console.log(mintTx);
  }, (error) => {
    log('[MINT]: Transaction rejected');
    showErrorNotification(error);
  });
}

async function withdraw() {
  if (!isOwner) {
    return;
  }

  if (!signer()) {
    return;
  }

  contract.withdraw().then(() => {
    log('[WITHDRAW]: Transaction submitted');
    // showNotification("Processing", "Transaction submitted.");
  }, (error) => {
    log('[WITHDRAW]: Transaction rejected');
    showErrorNotification(error);
  });
}

async function hookMintEvents() {
  if (!signer()) {
    return;
  }

  const address = await signer().getAddress();

  const filterTo = contract.filters.Transfer(null, address);

  contract.on(filterTo, (from, to, amount) => {
    // The `to` will always be the signer address
    // log("[MINT]: Transaction completed, " + from + " => " + to + ", amount " + ethers.utils.formatUnits(amount, defaultDecimals));
    dispatchMintEvent(mintAmount, mintTx.hash);
    // showNotification("Success", "You've just mint an el33t!", "success");
    setTimeout(() => {
      refreshMintStats();
    }, 1024);
  });
}

async function checkOwnership() {
  if (!signer()) {
    return;
  }

  const address = await signer().getAddress();
  log(`ADDRESS => ${address}`);

  const owner = await contract.owner();
  log(`Contract owner is ${owner}`);

  isOwner = address === owner;
}

async function refreshMintStats() {
  await queryMintStats();
}

function dispatchContractInitializedEvent() {
  const event = new Event('onContractInitialized');
  document.dispatchEvent(event);
}

function dispatchMintStatsFetched() {
  const event = new Event('onMintStatsFetched');
  document.dispatchEvent(event);
}

function dispatchMintSubmitEvent() {
  const event = new Event('onMintSubmitted');
  document.dispatchEvent(event);
}

function dispatchMintEvent(amount, tx) {
  const event = new Event('onMintSucceed');
  event.amount = amount;
  event.tx = tx;
  document.dispatchEvent(event);
}

function showErrorNotification(error) {
  let message = 'Your transaction is rejected.';
  if (error) {
    if (error.data) {
      if (error.data.message) {
        message = error.data.message;
      } else if (error.message) {
        message = error.message;
      }
    } else if (error.message) {
      message = error.message;
    }
  }
  if (message.includes('insufficient funds')) {
    message = 'Insufficient AVAX Balance';
  } else if (message.includes('Invalid mint amount')) {
    message = 'You can mint up to 20 NFTs in one transaction. For more, you will need to do more than one transaction.';
  }
  showNotification('Failure', message, 'danger');
}

export {
  initialize,
  isContractInitialized,
  isOwner,
  mintPaused,
  currentItemCount,
  maxItemCount,
  itemFee,
  balance,
  queryMintStats,
  mint,
};
