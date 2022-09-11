import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { PortfolioSubScreen_ScreenProps } from '../types/navigation/portfolio';
import Loading from '../components/theme/Loading';

export default function PortfolioThemeView() {
  const [loading, setLoading] = useState(true);
  const route =
    useRoute<PortfolioSubScreen_ScreenProps<'PortfolioTheme'>['route']>();

  return (
    <>
      {loading && <Loading style={{ alignItems: 'center' }} />}
      <WebView
        source={{ uri: route.params.uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
