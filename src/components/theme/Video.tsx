import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
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
  calculateWidth?: (winWidth: number) => number;
  aspectRatio?: number;
} & VideoPlayerProps;

function Video(props: VideoProps) {
  const windowDim = Dimensions.get('window');

  const width = useMemo(
    () =>
      'calculateWidth' in props
        ? props.calculateWidth(windowDim.width)
        : windowDim.width,
    [props?.calculateWidth, windowDim.width]
  );

  if (props.loading) {
    return (
      <Skeleton
        style={ratio16_9Size({
          winW: width,
          winH: width / (props?.aspectRatio ?? 16 / 9)
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
        { width, height: width / (props?.aspectRatio ?? 16 / 9) },
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
