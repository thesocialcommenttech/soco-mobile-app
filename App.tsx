import React from 'react';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import Routes from './src/navigation/routes';
//import { StyleSheet } from 'react-native';
import { store } from './src/store';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  // };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
});

export default App;
