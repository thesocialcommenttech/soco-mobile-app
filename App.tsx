import axios from 'axios';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import Routes from './src/navigation/routes';
//import { StyleSheet } from 'react-native';
import store from './src/store';
import SOCOToast from '~/src/components/theme/Toast';
import './src/utils/ignoreWarnings';

axios.defaults.baseURL = 'https://thesocialcomment-backend-test.herokuapp.com';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
        <Toast
          position="bottom"
          bottomOffset={70}
          visibilityTime={6000}
          type="info"
          config={{ info: SOCOToast }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
