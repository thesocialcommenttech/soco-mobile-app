import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PostViewScreenProps } from '~/src/types/navigation/main';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { ProjectPost } from '~/src/utils/typings/post';
import PostTitle from '~/src/components/screens/post-view/PostTitle';
import AuthorCard from '~/src/components/screens/post-view/AuthorCard';
import PostAuthorNTimestamp from '~/src/components/screens/post-view/PostAuthorNTimestamp';
import PostComments from '~/src/components/screens/post-view/PostComments';
import PostInteractions from '~/src/components/screens/post-view/PostInteractions';
import PostTags from '~/src/components/screens/post-view/PostTags';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { Black } from '~/src/utils/colors';
import EditorView from '~/src/components/editor/EditorView';
import Thumbnail from '~/src/components/theme/Thumbnail';
import { staticFileSrc } from '~/src/utils/methods';
import { useViewIncrementor } from '~/src/lib/view-incrementor';
import editorStyles from '~/src/components/editor/styles';
import Video from '~/src/components/theme/Video';
import Button from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import ProjectMetaDetailButton from '~/src/components/screens/post-view/project/ProjectMetaDetailButton';

type PostScreenData = GetPostResponse<
  Pick<
    ProjectPost,
    | 'postedOn'
    | 'postedBy'
    | 'title'
    | 'team'
    | 'tags'
    | 'featureImage'
    | 'views'
    | 'comments'
    | 'upvotes'
    | 'downvotes'
    | 'voted'
    | 'isFavorited'
    | 'shares'
    | 'content'
    | 'introduction'
    | 'aim'
    | '_id'
  >
>['post'];

export default function ProjectView() {
  const navigation = useNavigation();
  const route = useRoute<PostViewScreenProps['route']>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostScreenData>();
  useViewIncrementor(post?._id);

  async function fetchData() {
    setLoading(true);

    const result = await getPost<PostScreenData>({
      postID: route.params.post_id,
      postType: 'project',
      projection:
        'postedOn postedBy title tags featureImage content team aim introduction views comments upvotes downvotes shares'
    });

    if (result.data.success) {
      setPost(result.data.post);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!post) {
      fetchData();
    }
  }, []);

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <PostTitle title={post?.title} loading={loading} />
        <PostAuthorNTimestamp
          style={styles.MT}
          user={post?.postedBy}
          timestamp={post?.postedOn}
          loading={loading}
        />
        <PostInteractions
          downVotesCount={post?.downvotes?.length}
          upvotesCount={post?.upvotes?.length}
          favourite={post?.isFavorited}
          downVoted={post?.voted === 'down'}
          upVoted={post?.voted === 'up'}
          postId={post?._id}
          postTitle={post?.title}
          postType="artwork"
          style={styles.MT}
          loading={loading}
        />
        <Thumbnail
          calculateWidth={winWidth => winWidth - 30}
          aspectRatio={0.5}
          imageProps={{
            resizeMode: 'cover',
            source: { uri: staticFileSrc(post?.featureImage) },
            style: [styles.thumbnail, styles.MT]
          }}
          loading={loading}
        />

        {!loading && (
          <View style={styles.metaDetailCt}>
            <ProjectMetaDetailButton
              title="Introduction"
              value={post?.introduction}
              buttonProps={{ onPress: () => {} }}
            />
            <ProjectMetaDetailButton
              title="Aim"
              value={post?.aim}
              buttonProps={{ onPress: () => {} }}
            />
            <ProjectMetaDetailButton
              title="Team"
              value={post?.team.map((name, i) => (
                <Text key={name + i}>{name}</Text>
              ))}
              buttonProps={{
                onPress: () => {},
                btnStyle: { borderBottomWidth: 0 }
              }}
            />
          </View>
        )}

        {!loading &&
          post?.content.map((block, i) => {
            switch (block.type) {
              case 'text':
                return (
                  <EditorView
                    key={block._id}
                    value={block.data.content.ops}
                    style={styles.project_TextBlock}
                    loading={loading}
                  />
                );

              case 'heading':
                return (
                  <Text
                    key={block._id}
                    style={[
                      styles.project_HeadingBlock,
                      i === 0 && styles.project_FirstHeadingBlock
                    ]}
                  >
                    {block.data.heading}
                  </Text>
                );
              case 'code':
                return (
                  <ScrollView
                    horizontal
                    key={block._id}
                    style={styles.project_CodeBlock}
                  >
                    <Text
                      style={{
                        color: 'white',
                        ...Platform.select({
                          ios: { fontFamily: 'Courier' },
                          android: { fontFamily: 'monospace' }
                        })
                      }}
                    >
                      {block.data.code}
                    </Text>
                  </ScrollView>
                );
              case 'pdf':
                return (
                  <View key={block._id} style={styles.project_PdfBlock}>
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={40}
                      color="orangered"
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {block.data.description && (
                        <Text
                          key={block._id}
                          style={{
                            color: 'black',
                            fontSize: 14
                            // marginTop: 10
                          }}
                        >
                          {block.data.description}
                        </Text>
                      )}
                      <Button
                        size="sm"
                        highlightColor={Color('orangered')
                          .lighten(0.9)
                          .string()}
                        btnStyle={{
                          borderColor: 'orangered',
                          paddingHorizontal: 0,
                          marginTop: 5
                        }}
                        textStyle={{ color: 'orangered' }}
                        onPress={() => {
                          if (Linking.canOpenURL(block.data.pdf)) {
                            Linking.openURL(block.data.pdf);
                          }
                        }}
                        text="View PDF"
                      />
                    </View>
                  </View>
                );
              case 'video':
                return (
                  <Video
                    key={block._id}
                    calculateWidth={winW => winW - 30}
                    style={styles.project_VideoBlock}
                    source={{ uri: block.data.video }}
                  />
                );
            }
          })}
        <PostTags tags={post?.tags} style={styles.MT} loading={loading} />
        {!loading && (
          <>
            <AuthorCard
              style={styles.MT}
              author={post?.postedBy}
              post={{ _id: post?._id, type: 'blog' }}
            />
            <PostComments
              commentCount={post?.comments?.length}
              comments={post?.comments}
              postId={post?._id}
              style={styles.MT}
            />
          </>
        )}
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
  thumbnail: {
    borderRadius: 8
  },
  metaDetailCt: {
    marginTop: 20,
    borderColor: Black[300],
    borderRadius: 8,
    overflow: 'hidden'
  },

  // PROJECT STYLES
  project_TextBlock: { marginBottom: -10 },
  project_HeadingBlock: StyleSheet.flatten([
    editorStyles.heading1,
    { marginTop: 30 }
  ]),
  project_FirstHeadingBlock: { marginTop: 20 },
  project_VideoBlock: { borderRadius: 10, flex: -1, marginTop: 20 },
  project_CodeBlock: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'black',
    padding: 10,
    paddingVertical: 15
  },
  project_PdfBlock: {
    backgroundColor: Color('orangered').lighten(0.95).string(),
    borderWidth: 1,
    borderColor: Color('orangered').lighten(0.8).string(),
    padding: 15,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row'
  }
});
