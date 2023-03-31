<template>
    <div>
        Basılan NFT adedi : {{CurrentItemCount}}
    </div>
</template>

<script>
import { ethers } from 'ethers';
import { nftContractAddress, nftContractAbi } from 'src/misc/contractAbi.js';
import { CURRENT_RPC } from 'src/misc/globals';

const { log, warn, error } = console;
const { ethereum } = typeof window !== 'undefined' && window;

export default {
  name: 'StateInfo',
  data() {
    return {
      selectedAddress: null,
      provider: null,
      signer: null,
      contract: null,

      CurrentItemCount: 0,
    };
  },

  mounted() {
    setInterval(() => {
      this.selectedAddress = ethereum.selectedAddress;
    }, 100);
  },

  watch: {
    selectedAddress: {
      handler(n) {
        log('[CONNECT]: Selected Address', n);
        if (n) {
          this.provider = new ethers.providers.JsonRpcProvider(CURRENT_RPC.rpcUrls[0]);
        }
      },
    },
    provider: {
      handler(n) {
        log('[CONNECT]: Provider', n);
        this.signer = n.getSigner();
      },
    },
    signer: {
      handler(n) {
        log('[CONNECT]: Signer', n);
        // this.contract = new ethers.Contract(nftContractAddress, nftContractAbi, n ?? this.provider);
        this.contract = new ethers.Contract(nftContractAddress, nftContractAbi, this.provider);
        this.$nextTick(async () => {
          this.CurrentItemCount = await this.getCurrentItemCount();
        });
      },
    },
    contract: {
      handler(n) {
        log('[CONNECT]: Contract', n);
      },
    },

  },

  methods: {
    async getCurrentItemCount() {
      const ret = await this.contract.totalSupply();

      return ret;
    },
  },
};
</script>
