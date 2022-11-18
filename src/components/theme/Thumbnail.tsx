import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleProp,
  ImageStyle,
  Dimensions,
  Image,
  ImageProps,
  ImageURISource
} from 'react-native';
import { Black } from '~/src/utils/colors';
import Skeleton from './Skeleton';

export default function Thumbnail(props: {
  imageProps: ImageProps & { source: ImageURISource };
  loading?: boolean;
  calculateWidth?: (winWidth: number) => number;
  aspectRatio?: number;
}) {
  const [featureImageSize, setFeatureImageSize] = useState<{
    width: number;
    height: number;
  }>();
  const screenWidth = Dimensions.get('screen').width;

  const width = useMemo(
    () =>
      'calculateWidth' in props
        ? props.calculateWidth(screenWidth)
        : screenWidth,
    [props?.calculateWidth, screenWidth]
  );

  const imageStyle = useMemo(() => {
    return [featureImageSize];
  }, [featureImageSize]);

  useEffect(() => {
    setFeatureImageSize({
      width,
      height: props?.aspectRatio ? width * props.aspectRatio : 300
    });

    if (typeof props.aspectRatio === 'undefined') {
      Image.getSize(props.imageProps.source.uri, (_width, _height) => {
        const scaleFactor = _width / width;
        const height = _height / scaleFactor;
        setFeatureImageSize({ width, height });
      });
    }
  }, []);

  if (props.loading) {
    return <Skeleton style={[imageStyle, props.imageProps.style]} />;
  }

  return (
    <Image
      resizeMode="cover"
      {...props.imageProps}
      style={[
        {
          backgroundColor: Black[100],
          borderRadius: 10
        },
        imageStyle,
        props.imageProps.style
      ]}
    />
  );
}
