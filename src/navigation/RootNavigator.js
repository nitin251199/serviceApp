import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {toastConfig} from '../components/Toasts';
import {Color} from '../theme';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootNavigator = () => {
  const isDarkTheme = useSelector(state => state.isDarkTheme);
  const isLoggedIn = useSelector(state => state.isLoggedIn) || false;

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
      subtext: Color.gray,
      card: Color.white,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: 'rgb(45, 45, 45)',
      text: '#ffffff',
      subtext: '#999',
      card: '#000',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </PaperProvider>
  );
};

export default RootNavigator;
