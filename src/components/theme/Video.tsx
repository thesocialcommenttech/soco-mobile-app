import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { staticFileSrc } from '~/src/utils/methods';
import Skeleton from './Skeleton';
import VideoPlayer from 'react-native-video-controls';
import { VideoProperties } from 'react-native-video';
interface VideoPlayerProps extends VideoProperties {
  // props
  toggleResizeModeOnFullscreen?: boolean;
  controlAnimationTiming?: number;
  doubleTapTime?: number;
  controlTimeout?: number;
  scrubbing?: number;
  showOnStart?: boolean;
  videoStyle?: VideoProperties['style'];
  navigator?: any;
  seekColor?: string;
  style?: StyleProp<ViewStyle>;
  tapAnywhereToPause?: boolean;
  // events
  onEnterFullscreen?: () => void;
  onExitFullscreen?: () => void;
  onHideControls?: () => void;
  onShowControls?: () => void;
  onError?: (err) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onBack?: () => void;
  onEnd?: () => void;
}

type VideoProps = {
  videoUrl?: string;
  loading?: boolean;
} & VideoPlayerProps;

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
      disableBack={true}
      disableFullscreen={true}
      disableTimer={true}
      paused={true}
      source={{ uri: staticFileSrc(props.videoUrl) }}
      {...props}
      style={[
        {
          width: windowDim.width,
          height: windowDim.width / (16 / 9)
        },
        props.style
      ]}
    />
  );
}

const ratio16_9Size = ({ winW, winH }) => ({
  width: winW,
  height: winW / (16 / 9)
});

export default Video;
