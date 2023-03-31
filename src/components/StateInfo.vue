<template>
  <div class="absolute-right shadow-1 q-pa-md bg-grey-10">
    <p>Basılan NFT adedi : {{ currentItemCount }} / {{ maxItemCount }}</p>
    <p>1 NFT : {{ itemFee }} Avax</p>
    <p>Benim NFT lerim: {{myTokens || ""}}</p>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import { nftContractAddress, nftContractAbi } from 'src/misc/contractAbi.js';
import { CURRENT_RPC } from 'src/misc/globals';

const { log, warn, error } = console;
const { ethereum } = typeof window !== 'undefined' && window;
const defaultDecimals = 18;

async function getItemPrice(contract) {
  const amount = await contract.itemFee();
  return ethers.utils.formatUnits(amount, defaultDecimals);
}

async function getCurrentItemCount(contract) {
  return await contract.totalSupply();
}

async function getMaxItemCount(contract) {
  return await contract.maxSupply();
}

async function getBalance(contract, address) {
  return await contract.balanceOf(address);
}

async function getMyTokens(contract, address) {
  const tokens = await contract.tokensOfOwner(address);
  // log(tokens);
  return tokens.map((e) => parseInt(ethers.utils.formatUnits(e, 0), 10));
}

async function isPaused(contract) {
  return await contract.paused();
}

export default {
  name: 'StateInfo',
  data() {
    return {
      selectedAddress: null,
      provider: null,
      signer: null,
      contract: null,

      itemFee: 0,
      mintPaused: 0,
      maxItemCount: 0,
      currentItemCount: 0,
      myTokens: null,
    };
  },

  async mounted() {
    this.provider = new ethers.providers.JsonRpcProvider(
      CURRENT_RPC.rpcUrls[0],
    );
    this.contract = new ethers.Contract(
      nftContractAddress,
      nftContractAbi,
      this.provider,
    );

    log('[CONNECT]: Contract', this.contract);

    setInterval(() => {
      this.selectedAddress = ethereum.selectedAddress;
    }, 100);

    await this.getContractInfo();

    setInterval(async () => {
      await this.getContractInfo();
    }, 10000);
  },

  watch: {
    selectedAddress: {
      async handler(n) {
        log('[CONNECT]: Selected Address', n);
        this.myTokens = null;
        await this.getContractInfo();
      },
    },
  },

  // watch: {
  //   selectedAddress: {
  //     handler(n) {
  //       log('[CONNECT]: Selected Address', n);
  //       if (n) {
  //         this.provider = new ethers.providers.JsonRpcProvider(CURRENT_RPC.rpcUrls[0]);
  //       }
  //     },
  //   },
  //   provider: {
  //     handler(n) {
  //       log('[CONNECT]: Provider', n);
  //       this.signer = n.getSigner();
  //     },
  //   },
  //   signer: {
  //     handler(n) {
  //       log('[CONNECT]: Signer', n);
  //       // this.contract = new ethers.Contract(nftContractAddress, nftContractAbi, n ?? this.provider);
  //       this.contract = new ethers.Contract(nftContractAddress, nftContractAbi, this.provider);
  //       this.$nextTick(async () => {
  //         this.CurrentItemCount = await this.getCurrentItemCount();
  //       });
  //     },
  //   },
  //   contract: {
  //     handler(n) {
  //       log('[CONNECT]: Contract', n);
  //     },
  //   },

  // },

  methods: {
    async getContractInfo() {
      const { contract: c } = this;
      try {
        const [itemFee, mintPaused, maxItemCount, currentItemCount] = await Promise.all([
          getItemPrice(c),
          isPaused(c),
          getMaxItemCount(c),
          getCurrentItemCount(c),
        ]);
        this.itemFee = itemFee;
        this.mintPaused = mintPaused;
        this.maxItemCount = maxItemCount;
        this.currentItemCount = currentItemCount;
      } catch (err) {
        error(err);
      }

      if (this.selectedAddress) {
        try {
          this.myTokens = await getMyTokens(c, this.selectedAddress);
        } catch (err) {
          this.myTokens = null;
          error(err);
        }
      }
    },
  },
};
</script>
