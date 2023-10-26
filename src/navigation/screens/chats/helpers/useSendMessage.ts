import {send} from '@kalashshah/react-native-sdk';
import {useEffect, useRef, useState} from 'react';
import {ConnectedUser} from 'src/apis';
import * as PushNodeClient from 'src/apis';
import {ToasterOptions} from 'src/components/indicators/Toaster';
import {caip10ToWallet, getCAIPAddress} from 'src/helpers/CAIPHelper';
import {encryptAndSign, pgpSign} from 'src/helpers/w2w/pgp';

import {ChatMessage} from './chatResolver';
import {pgpSignBody} from './signatureHelper';

export interface MessageFormat {
  message: string;
  messageType: 'GIF' | 'Text';
  combinedDID: string;
}

type sendIntentFunc = (message: MessageFormat) => Promise<void>;
type sendMessageFunc = (
  message: MessageFormat,
) => Promise<[string, ChatMessage]>;

type useSendMessageReturnType = [
  boolean,
  sendMessageFunc | sendIntentFunc,
  boolean,
  ChatMessage,
];

const getEncryptedMessage = async (
  connectedUser: ConnectedUser,
  messageReceiver: PushNodeClient.MessageReciver,
  message: string,
) => {
  // TODO: update to support pgpv2
  let fromPublicKeyArmored = connectedUser.publicKey;
  try {
    // @ts-ignore
    if (JSON.parse(fromPublicKeyArmored).key) {
      // @ts-ignore
      fromPublicKeyArmored = JSON.parse(fromPublicKeyArmored).key;
    }
  } catch {
    console.log('pgp_v1 sender');
  }

  // if pgpAddress null then no need to encrypt
  if (messageReceiver.pgpAddress === '') {
    const signature = await pgpSign(
      message,
      fromPublicKeyArmored,
      connectedUser.privateKey,
    );

    return {
      cipherText: message,
      encryptedSecret: '',
      signature: signature,
      sigType: 'pgp',
      encType: 'PlainText',
    };
  }

  const encryptedMessage = await encryptAndSign({
    plainText: message,
    fromPublicKeyArmored,
    toPublicKeyArmored: messageReceiver.pgpAddress,
    privateKeyArmored: connectedUser.privateKey,
  });

  return encryptedMessage;
};

const generateNullRespose = (): [string, ChatMessage] => {
  return [
    '',
    {to: '', from: '', messageType: '', message: '', time: Date.now()},
  ];
};

const generateNullChatMessage = (): ChatMessage => {
  return {
    from: '',
    message: '',
    messageType: '',
    time: Date.now(),
    to: '',
  };
};

const useSendMessage = (
  connectedUser: ConnectedUser,
  receiverAddress: string,
  _isIntentSendPage: boolean,
  showToast: any,
): useSendMessageReturnType => {
  const [isSending, setIsSending] = useState(false);
  const [isIntentSendPage, setIsIntentSendPage] = useState(_isIntentSendPage);
  const [isSendingReady, setIsSendingReady] = useState(false);
  const [tempChatMessage, setTempChatMessage] = useState<ChatMessage>(
    generateNullChatMessage(),
  );

  const messageReceiver = useRef<PushNodeClient.MessageReciver>({
    ethAddress: getCAIPAddress(receiverAddress),
    pgpAddress: '',
  });

  useEffect(() => {
    // getting receivers infos
    (async () => {
      console.log('Quering the receiver');
      const res = await PushNodeClient.getUser(
        messageReceiver.current.ethAddress,
      );

      if (res && res !== null) {
        // TODO: support pgpv2
        let pubKey = res.publicKey;
        try {
          pubKey = JSON.parse(pubKey).key;
        } catch {
          console.log('pgpv1 receiver');
        }
        messageReceiver.current.pgpAddress = pubKey;
        console.log('Receiver addrs found');
      } else {
        console.log('Receiver not found');
      }
      setIsSendingReady(true);
    })();
  }, []);

  const sendMessage = async ({
    message,
    messageType,
    combinedDID,
  }: MessageFormat): Promise<[string, ChatMessage]> => {
    // if (messageReceiver.current.pgpAddress === '') {
    //   try {
    //     let user = await PushNodeClient.getUser(connectedUser.wallets);
    //     if (!user?.publicKey) {
    //       user = await PushNodeClient.createEmptyUser(messageReceiver.current);
    //       console.log('**** empty user created');
    //     }
    //   } catch (error) {
    //     console.log('error while creating user', error);
    //   }
    // }

    setIsSending(true);
    console.log('**** send message to', combinedDID);
    const msg = await getEncryptedMessage(
      connectedUser,
      messageReceiver.current,
      message,
    );

    const postBody = {
      fromCAIP10: connectedUser.wallets,
      fromDID: connectedUser.wallets,
      toDID: messageReceiver.current.ethAddress,
      toCAIP10: messageReceiver.current.ethAddress,
      messageContent: msg.cipherText,
      messageType: messageType,
      signature: msg.signature,
      encType: msg.encType,
      sigType: msg.sigType,
      encryptedSecret: msg.encryptedSecret,
      verificationProof: '',
    };

    const bodyToBeHashed = {
      fromDID: postBody.fromDID,
      toDID: postBody.fromDID,
      fromCAIP10: postBody.fromCAIP10,
      toCAIP10: postBody.toCAIP10,
      messageType: postBody.messageType,
      encType: postBody.encType,
      encryptedSecret: postBody.encryptedSecret,
    };

    const signature = await pgpSignBody({
      bodyToBeHashed,
    });
    postBody.verificationProof = `pgpv2:${signature}`;

    const chatMessage: ChatMessage = {
      to: caip10ToWallet(postBody.toCAIP10),
      from: caip10ToWallet(postBody.fromCAIP10),
      messageType: postBody.messageType,
      message: message,
      time: Date.now(),
    };

    try {
      // temporarily display temp message
      setTempChatMessage(chatMessage);

      const res = await PushNodeClient.postMessage(postBody);
      if (typeof res === 'string') {
        // show error toast
        showToast(res, '', ToasterOptions.TYPE.GRADIENT_PRIMARY);
        setIsSending(false);
        return generateNullRespose();
      }
      // add to cache
      const cid = res.cid;
      // await storeConversationData(combinedDID, cid, [chatMessage]);
      console.log('**** message successfully sent');
      return [cid, chatMessage];
    } catch (error: any) {
      console.log('error', error);
      showToast(error.message, '', ToasterOptions.TYPE.GRADIENT_PRIMARY);
    } finally {
      setIsSending(false);
    }
    return generateNullRespose();
  };

  const checkIsUserNew = (rec: PushNodeClient.MessageReciver) => {
    return rec.pgpAddress === '';
  };

  const sendIntent = async ({
    message,
    messageType,
  }: MessageFormat): Promise<[string, ChatMessage]> => {
    if (!isSendingReady) {
      return generateNullRespose();
    }

    const receiver = messageReceiver.current;
    const isUserNew = checkIsUserNew(receiver);
    if (isUserNew) {
      await PushNodeClient.createEmptyUser(receiver);
    }

    // if (messageReceiver.current.pgpAddress === '') {
    //   showToast(
    //     'PGP address of the user not available',
    //     '',
    //     ToasterOptions.TYPE.GRADIENT_PRIMARY,
    //   );

    //   return;
    // }

    setIsSending(true);
    console.log('**** send intent');
    const postBody = {
      fromCAIP10: connectedUser.wallets,
      toDID: messageReceiver.current.ethAddress,
      toCAIP10: messageReceiver.current.ethAddress,
      messageContent: message,
      messageType: messageType,
      sigType: 'pgp',
      connectedUser: connectedUser,
    };

    const res = await PushNodeClient.postIntent(postBody);
    if (typeof res === 'string') {
      console.log('error posting intent');
      showToast(res, '', ToasterOptions.TYPE.GRADIENT_PRIMARY);
      setIsSending(false);
      return generateNullRespose();
    }
    console.log('**** intent successfully sent');
    showToast(
      'Intent sent succesfully',
      '',
      ToasterOptions.TYPE.GRADIENT_SECONDARY,
    );

    const chatMessage: ChatMessage = {
      to: caip10ToWallet(postBody.toCAIP10),
      from: caip10ToWallet(postBody.fromCAIP10),
      messageType: postBody.messageType,
      message: message,
      time: res.timestamp!,
    };

    setIsIntentSendPage(false);
    setIsSending(false);

    return [res.cid, chatMessage];
  };

  if (isIntentSendPage) {
    return [isSending, sendIntent, isSendingReady, tempChatMessage];
  } else {
    return [isSending, sendMessage, isSendingReady, tempChatMessage];
  }
};

export {useSendMessage};
