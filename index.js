import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, AppRegistry, AppState, Platform} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import 'react-native-crypto';
import 'react-native-get-random-values';
import CallKeepHelper from 'src/helpers/CallkeepHelper';
import {NotifeClearBadge} from 'src/notifee';
import {getUUID} from 'src/push_video/payloads/helpers';
import MetaStorage from 'src/singletons/MetaStorage';
import 'text-encoding';

import App from './App';
import {name as appName} from './app.json';
import './shim';

/***************************************************/
/** Uncomment below commented code if video call  **/
/**       feature is enabled in the app           **/
/***************************************************/
let isCallAccepted = false;

// this is supposed to be called wiz
// if (AppState.currentState !== 'active' && Platform.OS === 'android') {
//   RNCallKeep.addEventListener('answerCall', async ({callUUID}) => {
//     CallKeepHelper.backToForeground();
//     CallKeepHelper.endAllCall();
//     isCallAccepted = true;
//     MetaStorage.instance.setBackgroundCallAccepted(false);
//   });
//   RNCallKeep.addEventListener('endCall', async ({callUUID}) => {
//     CallKeepHelper.endAllCall();
//   });
// }

function HeadlessCheck({isHeadless}) {
  useEffect(() => {
    NotifeClearBadge();
  }, []);

  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App isCallAccepted={isCallAccepted} />;
}

// if (Platform.OS === 'android') {
// CallKeepHelper.setupCallKeep();
// RNCallKeep.setAvailable(true);
// }

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// if (Platform.OS === 'android' && CallKeepHelper.isVideoCall(remoteMessage)) {
//   const caller = CallKeepHelper.getCaller(remoteMessage);
//   const addressTrimmed = CallKeepHelper.formatEthAddress(caller);
//   const uuid = getUUID();
//   RNCallKeep.displayIncomingCall(
//     uuid,
//     addressTrimmed,
//     addressTrimmed,
//     'generic',
//     true,
//   );
// }
// });

if (isCallAccepted) {
  AppRegistry.registerComponent(appName, () => HeadlessCheck);
} else {
  AppRegistry.registerComponent(appName, () => HeadlessCheck);
}

AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () => bgCalling,
);
