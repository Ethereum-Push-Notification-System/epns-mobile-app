import Config from 'react-native-config';
import GLOBALS from 'src/Globals';

const {
  APP_VERSION,
  SOCKET_KEY_PROD,
  SOCKET_KEY_STAGING,
  YOUTUBE_API_KEY,
  INFURA_PROJECT_ID,
  PROD_ENV,
  WALLET_CONNECT_PROJECT_ID,
} = Config;

const IS_PROD_ENV = PROD_ENV === 'true' ? true : false;
const SHOW_CONSOLE = 1; // Show or disable console

const {
  DEV_EPNS_SERVER,
  PROD_EPNS_SERVER,
  W2W_EPNS_SERVER,
  METAMASK_LINK_STAGING,
  METAMASK_LINK_PROD,
  DEEPLINK_URL,
  CNS_ENDPOINT,
  ENDPOINT_AUTHTOKEN,
  ENDPOINT_REGISTER_NO_AUTH,
  ENDPOINT_REGISTER,
  ENDPOINT_GET_FEEDS,
  ENDPOINT_GET_SPAM_FEEDS,
  ENDPOINT_FETCH_CHANNELS,
  ENDPOINT_FETCH_CHANNEL_CATEGORIES,
  ENDPOINT_FETCH_SUBSCRIPTION,
  ENDPOINT_SUBSCRIBE_OFFCHAIN,
  ENDPOINT_UNSUBSCRIBE_OFFCHAIN,
  ENDPOINT_SEARCH_CHANNELS,
  ENDPOINT_ICE_SERVERS,
  DAPP_LINK,
  DELIVERY_NODE_STAGING,
  DELIVERY_NODE_PROD,
} = GLOBALS.LINKS;

const {STAGING: STAGING_CONTRACTS, PROD: PROD_CONTRACTS} = GLOBALS.CONTRACTS;

export default {
  PROD_ENV: IS_PROD_ENV,
  SHOW_CONSOLE: SHOW_CONSOLE,
  INFURA_API: IS_PROD_ENV
    ? `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
    : `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,

  // All Server related endpoints
  EPNS_SERVER: IS_PROD_ENV ? PROD_EPNS_SERVER : DEV_EPNS_SERVER,
  METAMASK_LINK: IS_PROD_ENV ? METAMASK_LINK_PROD : METAMASK_LINK_STAGING,
  W2W_EPNS_SERVER: W2W_EPNS_SERVER,
  DELIVERY_NODE: IS_PROD_ENV ? DELIVERY_NODE_PROD : DELIVERY_NODE_STAGING,

  // all the server endponts
  ENDPOINT_AUTHTOKEN,
  ENDPOINT_REGISTER_NO_AUTH,
  ENDPOINT_REGISTER,
  ENDPOINT_GET_FEEDS,
  ENDPOINT_GET_SPAM_FEEDS,
  ENDPOINT_FETCH_CHANNELS,
  ENDPOINT_FETCH_CHANNEL_CATEGORIES,
  ENDPOINT_FETCH_SUBSCRIPTION,
  ENDPOINT_SUBSCRIBE_OFFCHAIN,
  ENDPOINT_UNSUBSCRIBE_OFFCHAIN,
  ENDPOINT_SEARCH_CHANNELS,
  ENDPOINT_ICE_SERVERS,

  DEEPLINK_URL: DEEPLINK_URL,

  YOUTUBE_API_KEY: YOUTUBE_API_KEY,

  // Third-party services endpoints
  CNS_ENDPOINT: CNS_ENDPOINT,

  // App Version
  APP_VERSION: APP_VERSION,

  SOCKET_KEY: IS_PROD_ENV ? SOCKET_KEY_PROD : SOCKET_KEY_STAGING,

  DAPP_URL: IS_PROD_ENV ? DAPP_LINK.PROD : DAPP_LINK.STAGING,
  CHAIN_ID: IS_PROD_ENV ? 1 : 11155111,
  WC_RPC: IS_PROD_ENV
    ? `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
    : `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
  ENV: IS_PROD_ENV ? 'prod' : 'staging',
  INFURA_PROJECT_ID: INFURA_PROJECT_ID,
  WALLET_CONNECT_PROJECT_ID: WALLET_CONNECT_PROJECT_ID,

  // Contract Addresses
  CONTRACTS: IS_PROD_ENV ? {...PROD_CONTRACTS} : {...STAGING_CONTRACTS},

  // Allowed networks
  ALLOWED_NETWORKS: IS_PROD_ENV
    ? [
        1, //for ethereum mainnet
        137, //for polygon mainnet
        56, // for bnb mainnet
        // 10, // for optimism mainnet
        42161, // arbitrum mainnet
        1101, // polygon zkevm mainnet
        122, // fuse mainnet
        7560, // Cyber mainnet
        8453, //base mainnet
        59144, // Linea mainnet
      ]
    : [
        // 42, //for kovan
        // 5, // for goerli
        11155111, // for eth sepolia
        80002, //for amoy polygon
        97, // bnb testnet
        11155420, // optimism sepolia testnet
        2442, // polygon zkevm cardona testnet
        421614, // arbitrum testnet
        123, // fuse testnet
        111557560, // Cyber testnet
        84532, //base sepolia
        59141, // Linea testnet
      ],
};
