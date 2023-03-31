const ARBITRUM_MAINNET_PARAMS = {
  chainId: `0x${(42161).toString(16)}`,
  chainName: "Arbitrum One",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  blockExplorerUrls: ["https://arbiscan.io/"],
};

// const CURRENT_RPC = AVALANCHE_MAINNET_PARAMS;
export const CURRENT_RPC = ARBITRUM_MAINNET_PARAMS;

export const maskWalletAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

// function showNotification(title, message, type = 'info', dismissAfter = 6000) {
//   // console.log("globals.js: [showNotification]: " + title + "\n" + message);
//   const event = new Event('onGenericNotification');
//   event.message = message;
//   document.dispatchEvent(event);
// }

// async function copy(text, failure = () => { }) {
//   const { clipboard } = navigator;
//   if (clipboard) {
//     await clipboard.writeText(text);
//     // alert('Copied');
//     showNotification('Success', 'Copied!');
//   } else {
//     // alert('Cannot copy ' + error);
//     // showNotification("Cannot copy");
//     failure();
//   }
// }
