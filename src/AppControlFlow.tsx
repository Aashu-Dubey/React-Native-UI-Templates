import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import Toast from './components/Toast';
import { toastRef } from './util/action';

const AppControlFlow: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast {...{ ref: toastRef }} />
    </SafeAreaProvider>
  );
};

export default AppControlFlow;
