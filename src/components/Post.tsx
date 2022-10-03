import dayjs from 'dayjs';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import {
  navigateEditPostScreen,
  navigatePostScreen,
  staticFileSrc
} from '../utils/methods';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@rneui/base';
import { Black, Colors } from '../utils/colors';
import { Post as IPost } from '../utils/typings/post';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from './theme/Button';
import Bottomsheet, { DropdownOption } from './bottomsheet/Bottomsheet';
import { movePostToTrash } from '../utils/services/trash/movePostToTrash.service';
import SharePostModal from './SharePostModal';
import { removePostPermanently } from '../utils/services/delete-post_service/removePostPermanently.service';
import AskBeforeDelete from './modals/AskBeforeDelete';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('screen').width;

export function FeatureImage(props: {
  image: string;
  postType: IPost['postType'];
}) {
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

function PostFooter(props: {
  postType: IPost['postType'];
  viewsCount: number;
}) {
  return (
    <View style={styles.cardFooter2}>
      {/* <Text style={styles.timestamp}>
        {dayjs(timestamp).format('DD MMM, YYYY')}
      </Text> */}
      <View style={styles.tag}>
        <Text style={styles.tagText}>{props.postType}</Text>
      </View>

      {typeof props.viewsCount === 'number' && (
        <View style={styles.viewCountCt}>
          <MaterialCommunityIcon
            name="eye-outline"
            size={16}
            color={Black[600]}
          />
          <Text style={styles.viewNum}>{props.viewsCount}</Text>
        </View>
      )}
    </View>
  );
}

function PostHeader(props: {
  postId: IPost['_id'];
  postType: IPost['postType'];
  postTitle: string;
  user: IPost['postedBy'];
  timestamp: IPost['postedOn'];
  navigation: NavigationProp<any>;
  editOption?: boolean;
  onTrash: () => void;
  onPermanentDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteAckModal, setShowDeleteAckModal] = useState(false);

  const onEdit = () => {
    setShowMenu(false);
    navigateEditPostScreen(props.navigation, props.postId, props.postType);
  };

  const onTrash = () => {
    setShowMenu(false);
    props.onTrash?.();
  };

  const onPermanentDelete = () => {
    setShowMenu(false);
    props.onPermanentDelete?.();
  };

  return (
    <>
      <View style={styles.cardTitle}>
        <TouchableWithoutFeedback
          onPress={() =>
            props.navigation.navigate('ProfileStack', {
              screen: 'Profile',
              params: { username: props.user.username, user_id: props.user._id }
            })
          }
        >
          <View style={styles.profileinfo}>
            <Avatar
              size={30}
              rounded
              source={{
                uri: staticFileSrc(props.user.profileImage)
              }}
              activeOpacity={0.7}
              placeholderStyle={{ backgroundColor: Colors.Gray100 }}
              containerStyle={styles.avatar2}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.cardTitleText}>{props.user.name}</Text>
              <Text style={styles.timestamp}>
                {dayjs(props.timestamp).format('D MMM, YYYY')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {(props.postType !== 'shared' || props.editOption) && (
          <Button
            size="xs"
            onPress={() => setShowMenu(true)}
            btnStyle={{ marginRight: -10 }}
          >
            <MaterialCommunityIcon
              name="dots-vertical"
              size={20}
              color={Colors.Gray600}
            />
          </Button>
        )}
      </View>
      <AskBeforeDelete
        show={showDeleteAckModal}
        onClose={() => setShowDeleteAckModal(false)}
        onDelete={onPermanentDelete}
      />
      <SharePostModal
        showModal={showShareModal}
        post={{
          _id: props.postId,
          title: props.postTitle,
          type: props.postType
        }}
        onClose={() => setShowShareModal(false)}
      />
      <Bottomsheet visible={showMenu} onClose={() => setShowMenu(false)}>
        {props.postType !== 'shared' && (
          <DropdownOption
            label="Share"
            icon="share-variant-outline"
            onOptionPress={() => {
              setShowMenu(false);
              setShowShareModal(true);
            }}
          />
        )}
        {/* TODO: Add follow the author option
            From backend send the is following the author status
        */}
        {/* <DropdownOption
          label="Follow"
          icon="account-plus-outline"
          onOptionPress={() => {}}
        /> */}
        {props.postType === 'shared' && (
          <DropdownOption
            label="Delete"
            icon="trash-can-outline"
            onOptionPress={() => {
              setShowMenu(false);
              setShowDeleteAckModal(true);
            }}
          />
        )}
        {props.editOption && props.postType !== 'shared' && (
          <>
            {['artwork', 'skill', 'presentation', 'link'].includes(
              props.postType
            ) && (
              <DropdownOption
                label="Edit"
                icon="pencil-outline"
                onOptionPress={onEdit}
              />
            )}
            <DropdownOption
              label="Trash"
              icon="trash-can-outline"
              onOptionPress={onTrash}
            />
          </>
        )}
      </Bottomsheet>
    </>
  );
}

export default function Post({
  data,
  postWrapperStyle,
  updatable = false
}: {
  data: IPost & {
    upvotes?: any;
    downvotes?: any;
    favourites?: any;
  };
  postWrapperStyle?: StyleProp<ViewStyle>;
  updatable?: boolean;
}): ReactElement {
  const navigation = useNavigation();
  const [cardState, setCardState] = useState<'deleting' | 'deleted'>();

  const trashPost = async () => {
    setCardState('deleting');
    const result = await movePostToTrash(data._id, data.postType);
    if (result.data.success) {
      setCardState('deleted');
      Toast.show({
        text1: 'Post Trashed'
      });
    }
  };

  const deletePost = async () => {
    setCardState('deleting');
    const result = await removePostPermanently(data._id);
    if (result.data.success) {
      setCardState('deleted');
      Toast.show({
        text1: 'Post Deleted'
      });
    }
  };

  if (cardState === 'deleted') {
    return null;
  }

  return (
    <View
      style={[
        styles.cardContainer,
        cardState === 'deleting' && styles.deleting,
        postWrapperStyle
      ]}
    >
      <View>
        <PostHeader
          postId={data._id}
          postType={data.postType}
          postTitle={data.postType !== 'shared' && data.title}
          user={data.postedBy}
          timestamp={data.postedOn}
          navigation={navigation}
          onTrash={trashPost}
          onPermanentDelete={deletePost}
          editOption={updatable}
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
            <TouchableWithoutFeedback
              onPress={() => {
                navigatePostScreen(navigation, data._id, data.postType);
              }}
            >
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
            </TouchableWithoutFeedback>
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
        {data.postType !== 'shared' && (
          <PostFooter postType={data.postType} viewsCount={data.views} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20
  },
  deleting: {
    opacity: 0.5,
    backgroundColor: Black[500]
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
  avatar2: {},
  cardTitleText: {
    // fontFamily: 'Roboto-Medium',
    color: 'black'
  },
  mainContent: {
    marginTop: 15
  },
  postPic: {
    width: '100%',
    height: 300,
    backgroundColor: Black[100],
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
    fontFamily: 'Roboto-Medium',
    color: 'black'
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  timestamp: {
    fontSize: 14,
    // fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  tag: {
    backgroundColor: Colors.Gray100,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3
    // marginLeft: '5%'
  },
  tagText: {
    // fontFamily: 'Roboto-Medium',
    fontSize: 13,
    color: Black[600],
    textTransform: 'capitalize'
  },
  viewCountCt: {
    flexDirection: 'row',
    // marginLeft: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewNum: {
    color: 'black',
    // fontSize: 16,
    marginLeft: 5
    // fontFamily: 'Roboto-Medium'
  },
  postDescription: {
    // fontFamily: 'Roboto',
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
