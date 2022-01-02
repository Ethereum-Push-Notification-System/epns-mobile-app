import "./web3globals.js";
import './shim.js'
import crypto from 'crypto'

import "react-native-gesture-handler";

import React, { useState, useCallback } from "react";
import { StatusBar, Alert, View, Text, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";

import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from "src/components/ui/Header";
import Tabs from "src/components/ui/Tabs";

import SplashScreen from "src/screens/SplashScreen";
import HomeScreen from "src/screens/HomeScreen";
import SettingsScreen from "src/screens/SettingsScreen";

import WelcomeScreen from "src/screens/WelcomeScreen";
import SignInScreen from "src/screens/SignInScreen";
import SignInScreenAdvance from "src/screens/SignInScreenAdvance";
import BiometricScreen from "src/screens/BiometricScreen";
import PushNotifyScreen from "src/screens/PushNotifyScreen";
import SetupCompleteScreen from "src/screens/SetupCompleteScreen";
import OnboardingChannelScreen from "./src/screens/OnboardingChannelScreen";

import AppBadgeHelper from "src/helpers/AppBadgeHelper";
import MetaStorage from "src/singletons/MetaStorage";
import Notify from "src/singletons/Notify";

import AuthContext, { APP_AUTH_STATES } from "src/components/auth/AuthContext";
import ENV_CONFIG from "src/env.config";
import GLOBALS from "src/Globals";

// Assign console.log to nothing
if (!ENV_CONFIG.SHOW_CONSOLE) {
  console.log("Production Environment... disabling console!");
  console.log = () => {};
}

// Create Stack Navigator
const Stack = createStackNavigator();

export default function App({ navigation }) {
  // State Settings
  // VALID APP AUTH STATES
  const [appAuthState, setAppAuthState] = useState(
    APP_AUTH_STATES.INITIALIZING
  );
  const [userWallet, setUserWallet] = useState("");
  const [userPKey, setUserPKey] = useState("");

  // HANDLE ON APP START
  React.useEffect(() => {
    // PUSH NOTIFICATIONS HANDLING
    // Request Device Token and save it user is signed in
    Notify.instance.requestDeviceToken(true);

    // Listen to whether the token changes
    const onTokenRefresh = messaging().onTokenRefresh((token) => {
      Notify.instance.saveDeviceToken(token, true); // true means it's a refresh
    });

    // Listen for incoming messages
    const handleForegroundPush = messaging().onMessage(
      async (remoteMessage) => {
        Notify.instance.handleIncomingPushAppOpened(remoteMessage);
      }
    );

    messaging().onNotificationOpenedApp((remoteMessage) => {
      Notify.instance.triggerNotificationListenerCallback();
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Notify.instance.triggerNotificationListenerCallback();
        }
      });

    return () => {
      onTokenRefresh;
      handleForegroundPush;
      handleAppNotificationBadge();
    };
  }, []);

  React.useEffect(() => {
    //
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       Notify.instance.triggerNotificationListenerCallback();
    //     }
    //   });
  }, []);

  const handleAppNotificationBadge = async () => {
    await AppBadgeHelper.setAppBadgeCount(0);
  };

  // HANDLE AUTH FLOW
  const authContext = React.useMemo(
    () => ({
      handleAppAuthState: (newAuthState, wallet, pkey) => {
        setUserWallet(wallet);
        setUserPKey(pkey);
        setAppAuthState(newAuthState);
      },
    }),
    []
  );

  // RENDER ASSIST
  renderSelectiveScreens = () => {
    // User is Authenticated
    if (appAuthState == APP_AUTH_STATES.AUTHENTICATED) {
      return (
        <React.Fragment>
          {/* <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
            initialParams={{
              wallet: userWallet,
              pkey: userPKey,
            }}
          /> */}
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              statusBar: {
                backgroundColor: 'white',
                style: 'dark'
              },
              header: () => (
                <Header
                  wallet={userWallet}
                  navigation={navigation}
                />
              ),
            }}
            initialParams={{
              wallet: userWallet,
              pkey: userPKey,
            }}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: "Settings",
              headerStyle: {
                backgroundColor: GLOBALS.COLORS.WHITE,
                height: Constants.statusBarHeight + GLOBALS.CONSTANTS.STATUS_BAR_HEIGHT,
              },
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />
        </React.Fragment>
      );
    }
    // User is logging in
    else if (appAuthState == APP_AUTH_STATES.ONBOARDING) {
      return (
        <React.Fragment>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />

          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />

          <Stack.Screen
            name="SignInAdvance"
            component={SignInScreenAdvance}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />

          <Stack.Screen
            name="Biometric"
            component={BiometricScreen}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />

          <Stack.Screen
            name="PushNotify"
            component={PushNotifyScreen}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />

          {/* <Stack.Screen
            name="OnboardingChannelScreen"
            component={OnboardingChannelScreen}
            options={{
              headerShown: false,
            }}
            initialParams={{
              wallet: userWallet,
              pkey: userPKey,
            }}
          /> */}
          <Stack.Screen
            name="SetupComplete"
            component={SetupCompleteScreen}
            options={{
              headerShown: false,
              headerTintColor: GLOBALS.COLORS.MID_GRAY,
            }}
          />
        </React.Fragment>
      );
    }
    // App is loading or User is getting authenticated
    else if (
      appAuthState == APP_AUTH_STATES.INITIALIZING ||
      appAuthState == APP_AUTH_STATES.ONBOARDED
    ) {
      return (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerTransparent: true,
          }}
        />
      );
    }
  };

  // RENDER
  return (
      <AuthContext.Provider value={authContext}>
        <WalletConnectProvider
          redirectUrl={`${ENV_CONFIG.DEEPLINK_URL}://wcauth`}
          bridge="https://bridge.walletconnect.org"
          clientMeta={{
            description: 'Connect with WalletConnect',
            url: 'https://walletconnect.org',
            icons: ['https://walletconnect.org/walletconnect-logo.png'],
            name: 'WalletConnect',
          }}
          storageOptions= {{
            asyncStorage: AsyncStorage,
          }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                title: "",
                headerStyle: {
                  backgroundColor: GLOBALS.COLORS.WHITE,
                  shadowColor: "transparent",
                  shadowRadius: 0,
                  shadowOffset: {
                    height: 0,
                  },
                  elevation: 0,
                },
                headerTitleStyle: {
                  color: GLOBALS.COLORS.BLACK,
                },
                headerBackTitleStyle: {
                  color: GLOBALS.COLORS.PRIMARY,
                },
                headerTintColor: GLOBALS.COLORS.BLACK,
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
              }}
            >
              {renderSelectiveScreens()}
            </Stack.Navigator>
          </NavigationContainer>
        </WalletConnectProvider>
      </AuthContext.Provider>
  );
}
