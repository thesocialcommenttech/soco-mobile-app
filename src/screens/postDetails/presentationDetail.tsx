import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { PresentationPost } from '~/src/utils/typings/post';
import { staticFileSrc } from '~/src/utils/methods';
import Skeleton from '~/src/components/theme/Skeleton';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import Color from 'color';
import PostTitle from '~/src/components/screens/post-view/PostTitle';
import PostComments from '~/src/components/screens/post-view/PostComments';
import AuthorCard from '~/src/components/screens/post-view/AuthorCard';
import PostAuthorNTimestamp from '~/src/components/screens/post-view/PostAuthorNTimestamp';
import PostInteractions from '~/src/components/screens/post-view/PostInteractions';
import PostTags from '~/src/components/screens/post-view/PostTags';
import PostDescription from '~/src/components/screens/post-view/PostDescription';
import { PostViewScreenProps } from '~/src/types/navigation/main';
import { useViewIncrementor } from '~/src/lib/view-incrementor';

type PresentationPostScreenData = GetPostResponse<
  Pick<
    PresentationPost,
    | 'postedOn'
    | 'postedBy'
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | 'slides'
    | 'views'
    | 'comments'
    | 'upvotes'
    | 'downvotes'
    | 'voted'
    | 'isFavorited'
    | 'shares'
    | '_id'
  >
>['post'];

const PPT_ACTIONBTN_UNDERLAY_COLOR = Color('white').alpha(0.07).rgb().string();

function Presentation(props: {
  slides: PresentationPost['slides'];
  loading?: boolean;
}) {
  const [currIndex, setCurrIndex] = useState(0);
  const scrollRef = React.useRef(null);
  const windowDim = Dimensions.get('window');

  const goToIndex = (index: number) => {
    scrollRef.current?.scrollToIndex({ index: index });
  };

  if (props.loading) {
    return (
      <Skeleton
        style={pptStyles({
          winW: windowDim.width,
          winH: windowDim.height
        })}
      />
    );
  }

  return (
    <View
      style={[
        pptStyles({
          winW: windowDim.width,
          winH: windowDim.height
        }),
        styles.presentationWidow
      ]}
    >
      <SwiperFlatList
        data={props.slides}
        renderItem={({ item }) => (
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            source={{ uri: staticFileSrc(item.slideUrl) }}
            style={pptStyles({
              winW: windowDim.width,
              winH: windowDim.height
            })}
          />
        )}
        onChangeIndex={({ index }) => {
          setCurrIndex(index);
        }}
        ref={scrollRef}
      />
      <View style={styles.presentationcontrol}>
        <View>
          <TouchableHighlight
            style={styles.pptActionBtn}
            underlayColor={PPT_ACTIONBTN_UNDERLAY_COLOR}
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="fullscreen" size={20} color="white" />
          </TouchableHighlight>
        </View>
        <View style={styles.imagenumberview}>
          <TouchableHighlight
            style={styles.pptActionBtn}
            underlayColor={PPT_ACTIONBTN_UNDERLAY_COLOR}
            onPress={() => {
              if (currIndex === 0) {
                goToIndex(props.slides.length - 1);
              } else {
                goToIndex(currIndex - 1);
              }
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color="white"
            />
          </TouchableHighlight>
          <Text style={styles.slideTracker}>
            {currIndex + 1} / {props.slides.length}
          </Text>
          <TouchableHighlight
            style={styles.pptActionBtn}
            underlayColor={PPT_ACTIONBTN_UNDERLAY_COLOR}
            onPress={() => {
              goToIndex((currIndex + 1) % props.slides.length);
            }}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="white"
            />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default function PresentationDetail() {
  const navigation = useNavigation<PostViewScreenProps['navigation']>();
  const route = useRoute<PostViewScreenProps['route']>();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PresentationPostScreenData>();
  useViewIncrementor(post?._id);

  async function fetchData() {
    setLoading(true);

    const result = await getPost<PresentationPostScreenData>({
      postID: route.params.post_id,
      postType: 'presentation',
      projection:
        'postedOn postedBy title description tags featureImage slides views comments upvotes downvotes shares'
    });

    if (result.data.success) {
      setPost(result.data.post);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ScrollView>
        <Presentation slides={post?.slides} loading={loading} />
        <View style={styles.container}>
          <PostTitle title={post?.title} loading={loading} />
          <PostAuthorNTimestamp
            style={styles.MT}
            user={post?.postedBy}
            timestamp={post?.postedOn}
            loading={loading}
          />
          <PostInteractions
            downVotesCount={post?.downvotes.length}
            upvotesCount={post?.upvotes.length}
            favourite={post?.isFavorited}
            downVoted={post?.voted === 'down'}
            upVoted={post?.voted === 'up'}
            postId={post?._id}
            style={styles.MT}
            loading={loading}
          />
          <PostDescription
            description={post?.description}
            style={styles.MT}
            loading={loading}
          />
          <PostTags tags={post?.tags} style={styles.MT} loading={loading} />
          <AuthorCard style={styles.MT} author={post?.postedBy} />
          <PostComments
            commentCount={post?.comments?.length}
            comments={post?.comments}
            postId={post?._id}
            style={styles.MT}
          />
        </View>
      </ScrollView>
    </ScreenWithTopBar>
  );
}

const pptStyles = ({ winW, winH }) => ({
  width: winW,
  height: winW / (16 / 9)
});

const styles = StyleSheet.create({
  presentationcontrol: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0
  },
  imagenumberview: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pptActionBtn: {
    padding: 10
  },
  slideTracker: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 5
  },
  presentationWidow: {},
  container: {
    padding: 15
  },
  MT: { marginTop: 10 }
});
