import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import StackNavigator from './src/navigators/stack/stack.navigator';
import { ONE_SIGNAL_APP_ID } from './src/config/onesignal';

export default function App() {
  useEffect(() => {
    OneSignal.init(ONE_SIGNAL_APP_ID);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  });

  const onReceived = (notification: any) => {
    console.log('onReceived', notification);
  };
  const onOpened = (openResult: any) => {
    console.log('onOpened', openResult);
  };
  const onIds = (device: any) => {
    console.log('onIds', device);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackNavigator />
    </NavigationContainer>
  );
}
