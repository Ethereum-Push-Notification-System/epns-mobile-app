export default {
  LINKS: {
    APPBOT_NAME: 'App Bot',
    APP_WEBSITE: 'https://push.org',
    DEV_EPNS_SERVER: 'https://backend-staging.epns.io/apis',
    PROD_EPNS_SERVER: 'https://backend.epns.io/apis',
    METAMASK_LINK_STAGING: 'https://metamask.app.link/dapp/staging.epns.io',
    METAMASK_LINK_PROD: 'https://metamask.app.link/dapp/epns.io',
    DEEPLINK_URL: 'https://metamask.app.link/dapp/staging.epns.io',
    CNS_ENDPOINT:
      'https://unstoppabledomains.com/api/v1/resellers/udtesting/domains',

    ENDPOINT_AUTHTOKEN: '/pushtokens/authtoken',
    ENDPOINT_REGISTER_NO_AUTH: '/pushtokens/register_no_auth',
    ENDPOINT_REGISTER: '/v1/pushtokens/register',
    ENDPOINT_GET_FEEDS: '/feeds/get_feeds',
    ENDPOINT_GET_SPAM_FEEDS: '/feeds/get_spam_feeds',
    ENDPOINT_FETCH_CHANNELS: '/v1/channels',
    ENDPOINT_FETCH_CHANNEL_CATEGORIES: '/v1/channels/tags/all',
    ENDPOINT_SEARCH_CHANNELS: '/v1/channels/search',
    ENDPOINT_FETCH_SUBSCRIPTION: '/channels/_is_user_subscribed',
    ENDPOINT_SUBSCRIBE_OFFCHAIN: '/channels/subscribe_offchain',
    ENDPOINT_UNSUBSCRIBE_OFFCHAIN: '/channels/unsubscribe_offchain',
    ENDPOINT_ICE_SERVERS: '/v1/turnserver/iceconfig',

    DELIVERY_NODE_STAGING: 'https://delivery-staging.epns.io/apis',
    DELIVERY_NODE_PROD: 'https://delivery-prod.epns.io/apis',

    DAPP_LINK: {
      PROD: 'app.push.org',
      STAGING: 'staging.push.org',
    },
  },

  SOCKETS: {
    USE_SOCKETS: true,
  },

  // For Async Storage --> Represents Key and some Constants
  STORAGE: {
    IS_SIGNED_IN: 'IsUserSignedIn',
    SIGNED_IN_TYPE: 'SignedInType',
    IS_FROM_DAPP: 'IsFromDapp',
    FIRST_SIGN_IN: 'FirstSignInByUser',
    USER_LOCKED: 'UserLocked',
    PASSCODE_ATTEMPTS: 'MaxPasscodeAttempts',

    STORED_WALLET_OBJ: 'StoredWalletObject',
    ENCRYPTED_PKEY: 'EncryptedPrivateKey',

    HASHED_PASSCODE: 'HashedPasscode',

    PUSH_TOKEN: 'PushToken',
    APNS_VOIP_TOKEN: 'ApnsVOIPToken',
    PUSH_TOKEN_TO_REMOVE: 'PushTokenToRemove',
    PUSH_TOKEN_SERVER_SYNCED: 'PushTokenServerSynced',
    PUSH_BADGE_COUNT: 'PushBadgeCount',
    PUSH_BADGE_COUNT_PREVIOUS: 'PreviousPushBadgeCount',

    // W2W chat
    USER_CHAT_DATA: 'UserChatData',

    IS_BACKGROUND_CALL_ACCEPTED: 'IsBackgroundCallAccepted',

    RECENT_NOTIFICATIONS: 'RecentNotification',
  },

  CONSTANTS: {
    CRED_TYPE_WALLET: 'TypeWallet',
    CRED_TYPE_PRIVATE_KEY: 'TypePrivateKey',

    NULL_EXCEPTION: 'NULL',

    MAX_PASSCODE_ATTEMPTS: 5,

    PUSH_TYPE_NORMAL_MSG: 1,
    PUSH_TYPE_ENCRYPTED_MSG: 2,

    FEED_ITEMS_TO_PULL: 20,

    STATUS_BAR_HEIGHT: 60,
    DEFAULT_PROFILE_PICTURE:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==',

    PASSCODE_LENGTH: 6,
    ALL_CATEGORIES: 'All',
  },

  ADJUSTMENTS: {
    SCREEN_GAP_HORIZONTAL: 10,
    SCREEN_GAP_VERTICAL: 10,

    DEFAULT_BIG_RADIUS: 10,
    DEFAULT_MID_RADIUS: 8,
    FEED_ITEM_RADIUS: 8,
  },

  COLORS: {
    PRIMARY: 'rgba(27.0, 150.0, 227.0, 1.0)',

    LINKS: 'rgba(20.0, 126.0, 251.0, 1.0)',

    GRADIENT_PRIMARY: 'rgba(226.0, 8.0, 128.0, 1.0)',
    GRADIENT_SECONDARY: 'rgba(53.0, 197.0, 243.0, 1.0)',
    GRADIENT_THIRD: 'rgba(103.0, 76.0, 159.0, 1.0)',
    QR_SCAN_COLOR: '#D53893',

    TRANSPARENT: 'transparent',

    WHITE: 'rgba(255.0, 255.0, 255.0, 1.0)',
    DARK_WHITE: 'rgba(255.0, 255.0, 255.0, 0.75)',
    MID_WHITE: 'rgba(255.0, 255.0, 255.0, 0.5)',
    LIGHT_WHITE: 'rgba(255.0, 255.0, 255.0, 0.25)',

    SLIGHTER_GRAY: 'rgba(250.0, 250.0, 250.0, 1)',
    SLIGHT_GRAY: 'rgba(231.0, 231.0, 231.0, 1)',
    LIGHT_GRAY: 'rgba(225.0, 225.0, 225.0, 1)',
    MID_GRAY: '#C8C8C8',
    DARK_GRAY: 'rgba(160.0, 160.0, 160.0, 1)',
    DARKER_GRAY: 'rgba(100.0, 100.0, 100.0, 1)',

    LIGHT_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.1)',
    SEMI_MID_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.25)',
    MID_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.5)',
    DARK_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.75)',
    BLACK: '#000000',

    CONFIRM_GREEN: 'rgba(50.0, 205.0, 50.0, 1.0)',
    CONFIRM_GREEN_LIGHT: 'rgba(48.0, 204.0, 139.0, 1.0)',

    CONFIRM: 'rgba(34.0, 139.0, 34.0, 1.0)',
    WARNING: 'rgba(255.0, 153.0, 0.0, 1.0)',

    SUBLIME_RED: 'rgba(237.0, 59.0, 72.0, 1.0)',
    BADGE_RED: 'rgba(208.0, 44.0, 30.0, 1.0)',
    LIGHT_MAROON: 'rgba(159.0, 0.0, 0.0, 1.0)',
    LIGHTER_MAROON: 'rgba(129.0, 0.0, 0.0, 1.0)',

    // Chats
    PINK: '#D53A94',
    LIGHT_BLUE: '#F4F5FA',
    CHAT_BLACK: '#1E1E1E',
    CHAT_LIGHT_DARK: '#657795',
    REPLY_LIGHT_PINK: '#facfe8',
    REPLY_DARK_PINK: '#e164ad',
    REACTION_BORDER: '#C4CBD5',
    REACTION_TEXT: '#313338',

    // Group Chat
    CHAT_LIGHT_PINK: '#F3D7FA',
    CHAT_LIGHT_GRAY: '#BAC4D6',
    CHAT_BORDER_COLOR: '#A0A3B1',

    // Status
    STATUS_YELLOW: '#F2CB65',
    STATUS_GREEN: '#5DD177',
    STATUS_YELLOW_BG: '#FDF7EE',

    // Backgrounds
    BG_WELCOME: '#F6EDFF',
    BG_SIGNIN: '#DBE1FF',
    BG_SETUPCOMPLETE: '#DFF9FF',
    BG_BIOMETRIC: '#F9F9F9',
    BG_PUSHNOTIFY: '#FCF2E3',
    BG_ALLSET: '#F8ECFF',
    BG_OBSLIDER: '#F8ECFF',
    BG_SEARCH_BAR: '#EFEFEF',

    // Notification
    IC_NOTIFICATION: '#e20880',

    // Pill
    PILL_BG_DEFAULT: '#F5F6F8',
    PILL_TEXT_DEFAULT: '#17181B',

    // Border
    BORDER_DEFAULT: '#C4CBD5',
    BORDER_SEPARATOR: '#E5E5E5',
    BORDER_DROPDOWN: '#EAEBF2',
  },
  SCREENS: {
    WELCOME: 'Welcome',
    SIGNIN: 'SignIn',
    SIGNINADVANCE: 'SignInAdvance',
    SIGNINWALLET: 'SignInWallet',
    BIOMETRIC: 'Biometric',
    PUSHNOTIFY: 'PushNotify',
    GETSTARTED: 'GetStarted',
    SETUPCOMPLETE: 'SetupComplete',
    TABS: 'Tabs',
    NOTIF_TABS: 'NotificationTabs',
    SETTINGS: 'Settings',
    SPLASH: 'Splash',
    FEED: 'Feed',
    CHANNELS: 'Channels',
    SPAM: 'Spam',
    SAMPLEFEED: 'SampleFeed',
    CHATS: 'Chats',
    SINGLE_CHAT: 'SingleChat',
    PGP_FROM_PK_SCREEN: 'PgpFromPkScreen',
    CHATPROFILESCREEN: 'ChatProfileScreen',
    LOG_IN_DAPP_INFO: 'LOG_IN_DAPP_INFO',
    QRScanScreen: 'QRScanScreen',
    QRScanScreenFromLogin: 'QRScanScreenFromLogin',
    NewChatScreen: 'NewChatScreen',
    VIDEOCALL: 'VideoCall',
    CREATE_GROUP: 'CreateGroup',
    GROUP_INFO: 'GroupInfo',
  },
  AUTH_STATE: {
    INITIALIZING: 'INITIALIZING',
    ONBOARDING: 'ONBOARDING',
    ONBOARDED: 'ONBOARDED',
    AUTHENTICATED: 'AUTHENTICATED',
  },
  AUTH_TYPE: {
    WALLET: 'AuthTypeWallet',
    PRIVATE_KEY: 'AuthTypePrivateKey',
    WALLET_CONNECT: 'AuthTypeWalletConnect',
    NONE: 'AuthTypeNone',
  },
  CONTRACTS: {
    STAGING: {
      COMM_CONTRACT: '0x9dDCD7ed7151afab43044E4D694FA064742C428c',
    },
    PROD: {
      COMM_CONTRACT: '0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa',
    },
  },
};
