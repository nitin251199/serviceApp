import React, {useEffect} from 'react';
import {LogBox, StyleSheet, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import configureStore from './src/redux/store';

let {store, persistor} = configureStore();

const App = () => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: 'Poppins-Regular',
    },
  });

  const customProps = {style: styles.defaultFontFamily};

  // To set default font family, avoiding issues with specific android fonts like OnePlus Slate
  function setDefaultFontFamily() {
    const TextRender = Text.render;
    const initialDefaultProps = Text.defaultProps;
    Text.defaultProps = {
      ...initialDefaultProps,
      ...customProps,
    };
    Text.render = function render(props) {
      let oldProps = props;
      props = {...props, style: [customProps.style, props.style]};
      try {
        return TextRender.apply(this, arguments);
      } finally {
        props = oldProps;
      }
    };
  }

  useEffect(() => {
    SplashScreen.hide();
    setDefaultFontFamily();
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
