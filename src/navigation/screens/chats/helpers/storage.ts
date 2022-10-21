import EncryptedStorage from 'react-native-encrypted-storage';

import {CACHE_LIMIT, STORAGE_CONSTANTS} from '../constants';
import {ChatData} from './useChatLoader';

export const persistChatData = async (payload: ChatData): Promise<void> => {
  try {
    await EncryptedStorage.setItem(
      STORAGE_CONSTANTS.CHAT_DATA,
      JSON.stringify(payload),
    );
  } catch (error) {
    console.error(error);
  }
};

export const getPersistedChatData = async (): Promise<ChatData | null> => {
  try {
    const data = await EncryptedStorage.getItem(STORAGE_CONSTANTS.CHAT_DATA);

    if (data == null) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getStoredConversationData = async (
  userAddress: string,
): Promise<any | null> => {
  try {
    const cachedData = await EncryptedStorage.getItem(
      `${STORAGE_CONSTANTS.PRIVATE_CHAT}-${userAddress}`,
    );

    if (cachedData == null) {
      return null;
    }

    return JSON.parse(cachedData);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const storeConversationData = async (
  userAddress: string,
  payload: any | any[],
): Promise<void> => {
  try {
    const cachedData = await getStoredConversationData(userAddress);

    if (cachedData == null) {
      if (Array.isArray(payload)) {
        await EncryptedStorage.setItem(
          `${STORAGE_CONSTANTS.PRIVATE_CHAT}-${userAddress}`,
          JSON.stringify(payload),
        );
      } else {
        await EncryptedStorage.setItem(
          `${STORAGE_CONSTANTS.PRIVATE_CHAT}-${userAddress}`,
          JSON.stringify([payload]),
        );
      }

      return;
    }

    let parsedData = JSON.parse(cachedData);

    if (Array.isArray(payload)) {
      parsedData = parsedData.concat(payload);
    } else {
      parsedData.push(payload);
    }

    await EncryptedStorage.setItem(
      `${STORAGE_CONSTANTS.PRIVATE_CHAT}-${userAddress}`,
      JSON.stringify(parsedData.slice(-CACHE_LIMIT)),
    );
  } catch (error) {
    console.error(error);
  }
};

export const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const storeLastMessageHash = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const getLastMessageHash = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
