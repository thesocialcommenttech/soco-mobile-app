import { BackHandler, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { PortfolioSubScreen_ScreenProps } from '../types/navigation/portfolio';
import Loading from '../components/theme/Loading';

export default function PortfolioThemeView() {
  const webViewRef = useRef<WebView>();
  const route =
    useRoute<PortfolioSubScreen_ScreenProps<'PortfolioTheme'>['route']>();

  const onBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: route.params.uri }}
      startInLoadingState
      renderLoading={() => (
        <Loading
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
