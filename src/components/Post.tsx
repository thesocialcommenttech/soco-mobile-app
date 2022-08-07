import dayjs from 'dayjs';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { staticFileSrc } from '../utils/methods';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@rneui/base';
import { Colors } from '../utils/colors';
import { Post as IPost } from '../utils/typings/post';

const screenWidth = Dimensions.get('screen').width;

function FeatureImage(props: { image: string; postType: IPost['postType'] }) {
  const [featureImageSize, setFeatureImageSize] = useState<{
    width: number;
    height: number;
  }>();

  const imageStyle = useMemo(() => {
    switch (props.postType) {
      case 'artwork':
        return [
          styles.postPicArtwork,
          { height: featureImageSize?.height ?? 300 }
        ];
      default:
        return styles.postPicPresentation;
    }
  }, [props.postType, featureImageSize?.height]);

  useEffect(() => {
    if (props.postType === 'artwork') {
      Image.getSize(staticFileSrc(props.image), (width, height) => {
        const imageWidth = screenWidth - 40;
        const scaleFactor = width / imageWidth;
        const imageHeight = height / scaleFactor;
        console.log(imageHeight);

        setFeatureImageSize({ width: imageWidth, height: imageHeight });
      });
    }
  }, []);

  return (
    <Image
      style={[styles.postPic, imageStyle]}
      resizeMode="cover"
      source={{ uri: staticFileSrc(props.image) }}
    />
  );
}

function PostFooter({ timestamp, postType, viewsCount }) {
  return (
    <View style={styles.cardFooter2}>
      <Text style={styles.timestamp}>
        {dayjs(timestamp).format('DD MMM, YYYY')}
      </Text>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{postType}</Text>
      </View>
      {typeof viewsCount === 'number' && (
        <View style={styles.eyeView}>
          <MaterialCommunityIcon
            name="eye-outline"
            size={20}
            color={Colors.Gray600}
          />
          <Text style={styles.viewNum}>{viewsCount}</Text>
        </View>
      )}
    </View>
  );
}

function PostHeader({ profileImage, name }) {
  return (
    <View style={styles.cardTitle}>
      <View style={styles.profileinfo}>
        <Avatar
          size={36}
          rounded
          source={{
            uri: staticFileSrc(profileImage)
          }}
          activeOpacity={0.7}
          placeholderStyle={{ backgroundColor: Colors.Gray100 }}
          containerStyle={styles.avatar2}
        />
        <Text style={styles.cardTitleText}>{name}</Text>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcon
          name="share-variant-outline"
          size={20}
          color={Colors.Gray600}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function Post({
  data,
  postWrapperStyle,
  updatable = false
}: {
  data: IPost;
  postWrapperStyle?: StyleProp<ViewStyle>;
  updatable?: boolean;
}): ReactElement {
  return (
    <View style={[styles.cardContainer, postWrapperStyle]}>
      <View>
        <PostHeader
          profileImage={data.postedBy.profileImage}
          name={data.postedBy.name}
        />
        {data.postType === 'shared' ? (
          <>
            <Text style={styles.postDescription}>{data.description}</Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                marginTop: 20,
                borderWidth: 1,
                borderColor: Colors.Gray400
              }}
            >
              <Post data={data.sharedPost} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.mainContent}>
              <FeatureImage
                image={data.featureImage}
                postType={data.postType}
              />
              {data.postType === 'skill' && (
                <View style={styles.videoPlayIcon}>
                  <MaterialCommunityIcon
                    name="play"
                    size={32}
                    color={'white'}
                  />
                </View>
              )}
              {data.postType === 'presentation' && (
                <View style={styles.pptSlideCountCt}>
                  <MaterialIcon name="collections" color="white" size={16} />
                  <Text style={styles.pptSlideCountText}>
                    {data.totalSlides}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.postTitleCt}>
              <Text style={styles.postTitle}>{data.title}</Text>
            </View>
            {(data.postType === 'blog' ||
              data.postType === 'article' ||
              data.postType === 'artwork') &&
              data.description && (
                <Text
                  style={[styles.postDescription, { marginTop: 10 }]}
                  numberOfLines={3}
                >
                  {data.description}
                </Text>
              )}
          </>
        )}
        <PostFooter
          postType={data.postType}
          timestamp={data.postedOn}
          viewsCount={data.postType !== 'shared' ? data.views : false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20
    // width: '100%',
    // marginLeft: '0%',
    // marginTop: '0%',
    // borderTopColor: 'white'
    // borderTopWidth: 1,
    // borderTopColor: Colors.GrayLine
  },
  profileinfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar2: {
    // borderWidth: 1,
    // borderColor: Colors.White,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    marginLeft: '10%',
    color: 'black'
  },
  mainContent: {
    marginTop: 15
  },
  postPic: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.Gray100,
    // minHeight: 300,
    borderRadius: 10
  },
  postPicArtwork: {},
  postPicPresentation: {
    height: (screenWidth - 40) / (16 / 9)
  },
  postTitleCt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  timestamp: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  tag: {
    backgroundColor: Colors.Gray100,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    textTransform: 'capitalize'
  },
  eyeView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewNum: {
    color: 'black',
    fontSize: 16,
    marginLeft: '2%',
    fontWeight: '700',
    fontFamily: 'Roboto-Medium'
  },
  postDescription: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 20,
    lineHeight: 20,
    color: 'black'
  },
  pptSlideCountCt: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  pptSlideCountText: { color: 'white', fontSize: 16, marginLeft: 10 },
  videoPlayIcon: {
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }]
  }
});
