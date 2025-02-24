import {ImageSourcePropType} from 'react-native';
import {DropdownOption} from 'src/components/dropdown';

export type chainNameType =
  | 'ETH_TEST_SEPOLIA'
  | 'POLYGON_TEST_MUMBAI'
  | 'POLYGON_AMOY'
  | 'ETH_MAINNET'
  | 'POLYGON_MAINNET'
  | 'BSC_MAINNET'
  | 'BSC_TESTNET'
  | 'OPTIMISM_MAINNET'
  | 'OPTIMISM_TESTNET'
  | 'OPTIMISM_SEPOLIA'
  | 'POLYGON_ZK_EVM_TESTNET'
  | 'POLYGON_ZK_EVM_MAINNET'
  | 'ARBITRUMONE_MAINNET'
  | 'ARBITRUM_TESTNET'
  | 'FUSE_MAINNET'
  | 'FUSE_TESTNET'
  | 'CYBER_TESTNET'
  | 'CYBER_MAINNET'
  | 'BASE_MAINNET'
  | 'BASE_SEPOLIA'
  | 'LINEA_MAINNET'
  | 'LINEA_SEPOLIA'
  | 'FUSE_TESTNET'
  | undefined;

export const ChainHelper = {
  chainIdToName: (chainId: number): chainNameType => {
    switch (chainId) {
      case 1:
        return 'ETH_MAINNET';
      case 11155111:
        return 'ETH_TEST_SEPOLIA';
      case 137:
        return 'POLYGON_MAINNET';
      case 80001:
        return 'POLYGON_TEST_MUMBAI';
      case 80002:
        return 'POLYGON_AMOY';
      case 2442:
        return 'POLYGON_ZK_EVM_TESTNET';
      case 1101:
        return 'POLYGON_ZK_EVM_MAINNET';
      case 56:
        return 'BSC_MAINNET';
      case 97:
        return 'BSC_TESTNET';
      case 10:
        return 'OPTIMISM_MAINNET';
      case 69:
        return 'OPTIMISM_TESTNET';
      case 11155420:
        return 'OPTIMISM_SEPOLIA';
      case 42161:
        return 'ARBITRUMONE_MAINNET';
      case 421614:
        return 'ARBITRUM_TESTNET';
      case 122:
        return 'FUSE_MAINNET';
      case 123:
        return 'FUSE_TESTNET';
      case 7560:
        return 'CYBER_MAINNET';
      case 111557560:
        return 'CYBER_TESTNET';
      case 8453:
        return 'BASE_MAINNET';
      case 84532:
        return 'BASE_SEPOLIA';
      case 59144:
        return 'LINEA_MAINNET';
      case 59141:
        return 'LINEA_SEPOLIA';
      default:
        return undefined;
    }
  },

  chainNameToLogo: (name: chainNameType): ImageSourcePropType | null => {
    switch (name) {
      case 'ETH_MAINNET':
      case 'ETH_TEST_SEPOLIA':
        return require('assets/ui/ethereum.png');
      case 'POLYGON_MAINNET':
      case 'POLYGON_TEST_MUMBAI':
      case 'POLYGON_AMOY':
        return require('assets/ui/polygon.png');
      case 'POLYGON_ZK_EVM_TESTNET':
      case 'POLYGON_ZK_EVM_MAINNET':
        return require('assets/ui/polygonZkEVM.png');
      case 'BSC_MAINNET':
      case 'BSC_TESTNET':
        return require('assets/ui/bnb.png');
      case 'OPTIMISM_MAINNET':
      case 'OPTIMISM_TESTNET':
      case 'OPTIMISM_SEPOLIA':
        return require('assets/ui/optimism.png');
      case 'ARBITRUMONE_MAINNET':
      case 'ARBITRUM_TESTNET':
        return require('assets/ui/arbitrum.png');
      case 'FUSE_MAINNET':
      case 'FUSE_TESTNET':
        return require('assets/ui/fuse.png');
      case 'CYBER_MAINNET':
      case 'CYBER_TESTNET':
        return require('assets/ui/cyber.png');
      case 'BASE_MAINNET':
      case 'BASE_SEPOLIA':
        return require('assets/ui/base.png');
      case 'LINEA_MAINNET':
      case 'LINEA_SEPOLIA':
        return require('assets/ui/linea.png');

      default:
        return null;
    }
  },

  chainIdToLogo: (chainId: number) => {
    const chainName = ChainHelper.chainIdToName(chainId);
    if (chainName) {
      return ChainHelper.chainNameToLogo(chainName);
    }
    return null;
  },

  networkName: {
    42: 'Ethereum Kovan',
    5: 'Ethereum Goerli',
    11155111: 'Ethereum Sepolia',
    1: 'Ethereum Mainnet',
    137: 'Polygon Mainnet',
    80002: 'Polygon Amoy',
    97: 'BNB Testnet',
    56: 'BNB Mainnet',
    11155420: 'Optimism Sepolia',
    10: 'Optimism Mainnet',
    2442: 'Polygon zkEVM Testnet',
    1101: 'Polygon zkEVM Mainnet',
    42161: 'ArbitrumOne Mainnet',
    421614: 'Arbitrum Testnet',
    122: 'Fuse Mainnet',
    123: 'Fuse Testnet',
    111557560: 'Cyber Testnet',
    7560: 'Cyber Mainnet',
    8453: 'Base Mainnet',
    84532: 'Base Sepolia',
    59141: 'Linea Sepolia',
    59144: 'Linea Mainnet',
  },

  getSelectChains: (chainIdList: Array<number>): DropdownOption[] => {
    return chainIdList?.map((key: number) => {
      return {
        value: key.toString(),
        label:
          ChainHelper.networkName?.[
            key as keyof typeof ChainHelper.networkName
          ] ?? '',
        icon: ChainHelper.chainIdToLogo(key),
      };
    });
  },
};
