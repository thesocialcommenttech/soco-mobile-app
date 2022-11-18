import axios from 'axios';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import Routes from './src/navigation/routes';
import store from './src/store';
import SOCOToast from '~/src/components/theme/Toast';
import './src/utils/ignoreWarnings';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { useDeviceId } from './src/state/deviceIdState';
import { BACKEND_URL } from '@env';
import * as Sentry from '@sentry/react-native';

// initializing sentry
import '~/src/utils/monitoring/sentry';

axios.defaults.baseURL = BACKEND_URL;

const App = () => {
  const { setDeviceId } = useDeviceId();

  const checkDeviceId = async () => {
    let deviceId = await SecureStore.getItemAsync('deviceId');
    if (!deviceId) {
      // created new deviceId
      deviceId = 'mobile-' + nanoid(10);
      await SecureStore.setItemAsync('deviceId', deviceId);
    }
    // setting deviceId as global state variable
    setDeviceId(deviceId);
  };

  useEffect(() => {
    checkDeviceId();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
        <Toast
          position="bottom"
          bottomOffset={10}
          visibilityTime={6000}
          type="info"
          config={{ info: props => <SOCOToast {...props} />, error: SOCOToast }}
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

export default Sentry.wrap(App);
