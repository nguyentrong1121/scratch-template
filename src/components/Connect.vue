<template>
  <q-btn outline rounded @click="CONNECT" size="lg" no-caps>{{ connectStr }}</q-btn>
</template>

<script>
import { ethers } from 'ethers';
import { dialog } from 'src/misc/Dialog';

const { log, warn, error } = console;

import { CURRENT_RPC } from 'src/misc/globals';

const { ethereum } = typeof window !== 'undefined' && window;
const isMetaMaskInstalled = () => Boolean(ethereum && ethereum.isMetaMask);
const maskedWalletAddress = (address) => (address
  ? `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length,
  )}`
  : address);

export default {
  name: 'Connect',

  data() {
    return {
      provider: null,
      blockNumber: null,
      balance: null,
      selectedAddress: null,
    };
  },

  computed: {
    // selectedAddress() {
    //   return ethereum?.selectedAddress;
    // },
    connectStr() {
      return maskedWalletAddress(this.selectedAddress) || 'Connect';
    },
  },

  async mounted() {
    warn('MOUNTED');

    this.removeListeners();

    if (isMetaMaskInstalled()) {
      warn('[WALLET]: MetaMask found');

      setInterval(() => {
        this.selectedAddress = ethereum.selectedAddress;
      }, 100);

      this.provider = new ethers.providers.Web3Provider(ethereum, 'any');

      log('[WALLET]: Wallet is initialized');

      ethereum.on('connect', (connectInfo) => {
        log('[WALLET]: Connected', connectInfo);
      });

      ethereum.on('disconnect', () => {
        log('[WALLET]: Disconnected');
      });

      ethereum.on('accountsChanged', this.handleAccountsChanged);

      ethereum.on('chainChanged', this.handleChainChanged);

      this.$nextTick(() => {
        this.selectedAddress = ethereum.selectedAddress;
      });

    //   if (this.isConnected()) {
    //     log('[WALLET]: is connected', ethereum);
    //     await this.CONNECT();
    //   }
    } else {
      log('MetaMask is not installed.');
      // dialog({ message: 'MetaMask is not installed.' });
    }
  },

  destroyed() {
    log('UNMOUNTED');
    this.removeListeners();
  },

  methods: {
    async CONNECT() {
      if (!ethereum) {
        dialog({ message: 'MetaMask is not installed.' });
        return;
      }

      // log(window.ethereum);

      if (ethereum.chainId !== CURRENT_RPC.chainId) {
        warn('[WALLET]: Wrong network!');
        await this.addNetworkToMetamask();
        return;
      }

      if (!this.provider) {
        log('[WALLET]: No provider found');
        return;
      }

      const blockNumber = await this.provider.getBlockNumber();
      log(`[WALLET]: Block number is ${blockNumber}`);

      try {
        const accounts = await this.provider.send('eth_requestAccounts', []);

        if (accounts) {
          log(`[WALLET]: Accounts ${accounts}`);

          log('[WALLET]: Wallet connected');

          log(`[WALLET]: Current account is ${ethereum.selectedAddress}`);

          this.selectedAddress = ethereum.selectedAddress;

          // dispatchAccountUpdateEvent();

          // await queryBalance();
        }
      } catch (err) {
        error(err);
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          log('Please connect to MetaMask.');
          dialog({ message: 'Please connect to MetaMask.' });
        } else if (err.code === -32002) {
          log('Already processing eth_requestAccounts. Please wait.');
          // dialog({
          //   message: 'MetaMask is locked! Please unlock to continue!',
          //   type: 'warning',
          // });
        }
      }

      // // The MetaMask plugin also allows signing transactions to
      // // send ether and pay to change state within the blockchain.
      // // For this, you need the account signer...
      // const signer = this.provider.getSigner();

      // log(this.provider);
      // log(signer);
    },

    removeListeners() {
      if (this.provider?.removeListener) {
        log('[WALLET]: removing listeners');
        this.provider.removeListener(
          'accountsChanged',
          this.handleAccountsChanged,
        );
        this.provider.removeListener(
          'chainChanged',
          this.handleAccountsChanged,
        );
      }
    },

    handleAccountsChanged(accounts) {
      warn('AAAAAA:', accounts);
      if (accounts && accounts.length === 1) {
        log(`[WALLET]: Accounts changed ${accounts}`);
        this.selectedAddress = ethereum.selectedAddress;
        this.loadPage();
      } else {
        this.selectedAddress = null;
      }
    },

    handleChainChanged(chainId) {
      if (chainId) {
        log(`[WALLET]: Chain changed ${chainId}`);
        // dispatchProviderResetEvent();
        if (CURRENT_RPC.chainId === chainId) {
          log('[WALLET]: Connection requested');
          this.CONNECT();
        }
      }
    },

    loadPage() {
      // instead reload, dispatch event
      // window.location.reload();
      this.clearWalletData();
      // dispatchAccountUpdateEvent();
    },

    clearWalletData() {
      this.blockNumber = undefined;
      // selectedAccount = undefined;
      this.balance = undefined;
    },

    isConnected() {
      return (
        ethereum.selectedAddress !== null
        && ethereum.chainId === CURRENT_RPC.chainId
      );
    },

    async addNetworkToMetamask() {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CURRENT_RPC],
        });
        return true;
      } catch (err) {
        log(`[WALLET]: [addNetworkToMetamask]: ${err}`);
        return false;
      }
    },
  },
};
</script>
