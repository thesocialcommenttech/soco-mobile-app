import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import VideoPlayer1 from 'react-native-video-controls';
import { useNavigation } from '@react-navigation/native';

const VideoPlayer = ({ route }) => {
  const [uri] = useState(route.params.uri);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <VideoPlayer1
        source={{
          uri: uri
        }}
        disableFullscreen={true}
        style={styles.video}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    width: Dimensions.get('window').width,
    height: '95%'
  }
});

export default VideoPlayer;
