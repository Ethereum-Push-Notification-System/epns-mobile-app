import {
  APP_VERSION,
  MAINNET_INFURA_API,
  TESTNET_INFURA_API,
  YOUTUBE_API_KEY,
} from '@env';
import GLOBALS from 'src/Globals';

const IS_PROD_ENV = 0; // 1 is Production, 0 is testnet / development, 1 or socket server doesnt work
const SHOW_CONSOLE = 1; // Show or disable console

const {
  DEV_EPNS_SERVER,
  PROD_EPNS_SERVER,
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
  ENDPOINT_FETCH_SUBSCRIPTION,
  ENDPOINT_SUBSCRIBE_OFFCHAIN,
  ENDPOINT_UNSUBSCRIBE_OFFCHAIN,
} = GLOBALS.LINKS;

export default {
  PROD_ENV: IS_PROD_ENV,
  SHOW_CONSOLE: SHOW_CONSOLE,

  INFURA_API: IS_PROD_ENV ? MAINNET_INFURA_API : TESTNET_INFURA_API,

  // All Server related endpoints
  EPNS_SERVER: IS_PROD_ENV ? PROD_EPNS_SERVER : DEV_EPNS_SERVER,
  METAMASK_LINK: IS_PROD_ENV ? METAMASK_LINK_PROD : METAMASK_LINK_STAGING,

  // all the server endponts
  ENDPOINT_AUTHTOKEN,
  ENDPOINT_REGISTER_NO_AUTH,
  ENDPOINT_REGISTER,
  ENDPOINT_GET_FEEDS,
  ENDPOINT_GET_SPAM_FEEDS,
  ENDPOINT_FETCH_CHANNELS,
  ENDPOINT_FETCH_SUBSCRIPTION,
  ENDPOINT_SUBSCRIBE_OFFCHAIN,
  ENDPOINT_UNSUBSCRIBE_OFFCHAIN,
  ENDPOINT_SUBSCRIBE_OFFCHAIN,
  ENDPOINT_UNSUBSCRIBE_OFFCHAIN,

  DEEPLINK_URL: DEEPLINK_URL,

  YOUTUBE_API_KEY: YOUTUBE_API_KEY,

  // Third-party services endpoints
  CNS_ENDPOINT: CNS_ENDPOINT,

  // App Version
  APP_VERSION: APP_VERSION,
};
