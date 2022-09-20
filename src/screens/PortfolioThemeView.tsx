import { StyleSheet } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { PortfolioSubScreen_ScreenProps } from '../types/navigation/portfolio';
import Loading from '../components/theme/Loading';

export default function PortfolioThemeView() {
  const route =
    useRoute<PortfolioSubScreen_ScreenProps<'PortfolioTheme'>['route']>();

  return (
    <WebView
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
