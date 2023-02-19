import { BackHandler, Linking, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { PostViewScreenProps } from '~/src/types/navigation/main';
import Loading from '~/src/components/theme/Loading';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { LinkPost } from '~/src/utils/typings/post';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Bottomsheet, {
  DropdownOption
} from '~/src/components/bottomsheet/Bottomsheet';
import Toast from 'react-native-toast-message';
import Button from '~/src/components/theme/Button';
import { Black, Blue } from '~/src/utils/colors';
import { LinearProgress } from '@rneui/themed';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import * as Sentry from '@sentry/react-native';

type PostScreenData = GetPostResponse<
  Pick<
    LinkPost,
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
    | 'voted'
    | 'isFavorited'
    | 'shares'
    | 'link'
    | '_id'
  >
>['post'];

function HeaderTitle(props: { title: string; url: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.HeaderTitle_Title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.HeaderTitle_URL} numberOfLines={1}>
        {props.url}
      </Text>
    </View>
  );
}

export default function BlogDetail() {
  const webViewRef = useRef<WebView>();
  const navigation = useNavigation<PostViewScreenProps['navigation']>();
  const route = useRoute<PostViewScreenProps['route']>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostScreenData>();
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const onBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  const openLinkInDefaultBrowser = () => {
    Linking.canOpenURL(post.link).then(supported => {
      if (supported) {
        Linking.openURL(post.link);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cannot open the link in browser'
        });
      }
    });
    setShowMoreOptions(false);
  };

  const copySharedLink = () => {
    setShowMoreOptions(false);
    Clipboard.setString(post.link);
    Toast.show({ text1: 'Link Copied' });
  };

  const shareLink = async () => {
    try {
      await Share.open({
        title: post.title,
        url: post.link,
        message: post.description ?? 'Have a look to this socialcomment post'
      });
    } catch (error) {
      Sentry.captureException(error);
      Toast.show({ type: 'error', text1: 'Cannot open this link' });
    }
    setShowMoreOptions(false);
  };

  async function fetchData() {
    setLoading(true);

    const result = await getPost<PostScreenData>({
      postID: route.params.post_id,
      postType: 'link',
      projection:
        'postedOn postedBy title tags featureImage link views comments upvotes downvotes shares'
    });

    if (result.data.success) {
      setPost(result.data.post);
      navigation.setOptions({
        headerTitle: () => (
          <HeaderTitle
            title={result.data.post.title}
            url={result.data.post.link}
          />
        )
      });
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: true,
        title: null,
        headerRight: () => {
          return (
            <Button
              size="sm"
              onPress={() => setShowMoreOptions(true)}
              btnStyle={{ marginRight: -10 }}
            >
              <MaterialCommunityIcons name="dots-vertical" size={24} />
            </Button>
          );
        }
      });
    }, [navigation])
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    fetchData();
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Bottomsheet
        visible={showMoreOptions}
        onClose={() => setShowMoreOptions(false)}
      >
        <DropdownOption label="Share" icon="share" onOptionPress={shareLink} />
        <DropdownOption
          label="Copy Link"
          icon="content-copy"
          onOptionPress={copySharedLink}
        />
        <DropdownOption
          label="Open in Browser"
          icon="web"
          onOptionPress={openLinkInDefaultBrowser}
        />
      </Bottomsheet>
      <WebView
        ref={webViewRef}
        source={{ uri: post.link }}
        startInLoadingState
        renderLoading={() => (
          <LinearProgress
            variant="indeterminate"
            color={Blue.primary}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  HeaderTitle_Title: { color: 'black', fontSize: 16, width: '70%' },
  HeaderTitle_URL: { fontSize: 12, color: Black[600], width: '70%' }
});
