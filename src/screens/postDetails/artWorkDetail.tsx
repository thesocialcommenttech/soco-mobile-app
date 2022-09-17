import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TextInput,
  StyleProp,
  ImageStyle
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthorCard from '~/src/components/screens/post-view/AuthorCard';
import PostAuthorNTimestamp from '~/src/components/screens/post-view/PostAuthorNTimestamp';
import PostComments from '~/src/components/screens/post-view/PostComments';
import PostDescription from '~/src/components/screens/post-view/PostDescription';
import PostInteractions from '~/src/components/screens/post-view/PostInteractions';
import PostTags from '~/src/components/screens/post-view/PostTags';
import PostTitle from '~/src/components/screens/post-view/PostTitle';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { ArtworkPost } from '~/src/utils/typings/post';
import { staticFileSrc } from '~/src/utils/methods';
import Skeleton from '~/src/components/theme/Skeleton';
import { ImageProps } from 'react-native';
import { Black } from '~/src/utils/colors';
import { PostViewScreenProps } from '~/src/types/navigation/main';
import { useViewIncrementor } from '~/src/lib/view-incrementor';

type ArtworkPostScreenData = GetPostResponse<
  Pick<
    ArtworkPost,
    | 'postedOn'
    | 'postedBy'
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | 'views'
    | 'comments'
    | 'upvotes'
    | 'downvotes'
    | 'shares'
    | 'voted'
    | 'isFavorited'
    | '_id'
  >
>['post'];

export function PostImage(props: {
  imageUrl: string;
  style?: StyleProp<ImageStyle>;
  loading?: boolean;
  imageProps?: Omit<ImageProps, 'style' | 'source'>;
}) {
  const [height, setHeight] = useState<number>(300);
  const [width, setWidth] = useState<number>();

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (width) {
      Image.getSize(staticFileSrc(props.imageUrl), (_width, _height) => {
        const scaleFactor = _width / width;
        const imageHeight = _height / scaleFactor;

        setHeight(
          imageHeight > windowHeight / 2 ? windowHeight / 2 : imageHeight
        );
      });
    }
  }, [width]);

  if (props.loading) {
    return (
      <Skeleton
        style={[
          props.style,
          {
            width: (props.style as ImageStyle)?.width ?? undefined,
            height: height ?? 300
          }
        ]}
      />
    );
  }

  return (
    <Image
      resizeMode="cover"
      {...props.imageProps}
      style={[styles.postImage, props.style, height && { height }]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
      source={{ uri: staticFileSrc(props.imageUrl) }}
    />
  );
}

export default function ArtWorkDetail() {
  const navigation = useNavigation<PostViewScreenProps['navigation']>();
  const route = useRoute<PostViewScreenProps['route']>();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<ArtworkPostScreenData>();
  useViewIncrementor(post?._id);

  async function fetchData() {
    setLoading(true);

    const result = await getPost<ArtworkPostScreenData>({
      postID: route.params.post_id,
      postType: 'skill',
      projection:
        'postedOn postedBy title description tags featureImage views comments upvotes downvotes shares'
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
          <PostImage
            imageUrl={post?.featureImage}
            imageProps={{ resizeMode: 'contain' }}
            loading={loading}
            style={[styles.artworkImage, styles.MT]}
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

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  MT: { marginTop: 10 },
  postImage: {
    backgroundColor: Black[200]
  },
  artworkImage: {
    borderRadius: 8
  }
});
