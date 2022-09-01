import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { staticFileSrc } from '~/src/utils/methods';
import Skeleton from './Skeleton';
import VideoPlayer from 'react-native-video-controls';

type VideoProps = {
  videoUrl: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

function Video(props: VideoProps) {
  const windowDim = Dimensions.get('window');

  if (props.loading) {
    return (
      <Skeleton
        style={ratio16_9Size({
          winW: windowDim.width,
          winH: windowDim.height
        })}
      />
    );
  }

  return (
    <VideoPlayer
      source={{ uri: staticFileSrc(props.videoUrl) }}
      style={[
        {
          width: windowDim.width,
          height: windowDim.width / (16 / 9)
        },
        props.style
      ]}
      disableBack={true}
      disableFullscreen={true}
      disableTimer={true}
      paused={true}
    />
  );
}

const ratio16_9Size = ({ winW, winH }) => ({
  width: winW,
  height: winW / (16 / 9)
});

export default Video;
