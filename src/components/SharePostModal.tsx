import { Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Input } from './theme/Input';
import Button from './theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '../utils/colors';
import { Post } from '../utils/typings/post';
import { postTitleSlug } from '../utils/methods';
import Clipboard from '@react-native-clipboard/clipboard';
import { postShared } from '../utils/services/user-posts_service/postShared.service';
import Toast from 'react-native-toast-message';
import { capitalize } from 'lodash';

function _SharePostModal_(props: {
  post: {
    title: string;
    type: Post['postType'];
    _id: Post['_id'];
  };
  onClose: () => void;
}) {
  const [sharingOnTimeline, setSharingOnTimeline] = useState(false);
  const [message, setMessage] = useState('');
  const postURL = useRef(
    `https://soco.co.in/${props.post.type}/${postTitleSlug(
      props.post.title
    )}?pid=${props.post._id}`
  ).current;

  const shareOnTimeline = async () => {
    setSharingOnTimeline(true);
    await postShared({
      description: message,
      postedOn: new Date().toString(),
      sharedPostType: props.post.type,
      sharedPostID: props.post._id
    });
    props.onClose?.();
    Toast.show({
      text1: `${capitalize(props.post.type)} is shared on your timeline`
    });
  };

  const share = async (
    appName: 'facebook' | 'twitter' | 'copy' | 'linkedin' | 'whatsapp'
  ) => {
    let url: string;

    switch (appName) {
      case 'twitter':
        url = `https://twitter.com/share?url=${postURL}&text=${message}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${postURL}&title=${message}&summary=${message}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${postURL}&t=${message}`;
        break;
      case 'whatsapp':
        url = `whatsapp://send?text=${message}\n\n${postURL}`;
        break;
      default:
        url = postURL;
        break;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.mobdalBody}>
      <View
        style={{
          width: 100,
          height: 5,
          borderRadius: 5,
          backgroundColor: Black[300],
          alignSelf: 'center',
          marginBottom: 15,
          marginTop: -5
        }}
      />
      <Text style={styles.header}>Repost on your timeline</Text>
      <Input
        style={{ marginBottom: 10 }}
        inputProp={{
          placeholder: 'Write your views',
          value: message,
          onChangeText: setMessage
        }}
      />
      <Button
        text="Post"
        type="filled"
        fullWidth
        disabled={sharingOnTimeline}
        processing={sharingOnTimeline}
        size="sm"
        onPress={shareOnTimeline}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.header}>Share</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -10
          }}
        >
          <Button onPress={() => share('facebook')} size="sm">
            <MaterialCommunityIcons name="facebook" size={28} color="#1877F2" />
          </Button>
          <Button onPress={() => share('twitter')} size="sm">
            <MaterialCommunityIcons name="twitter" size={28} color="#1DA1F2" />
          </Button>
          <Button onPress={() => share('linkedin')} size="sm">
            <MaterialCommunityIcons name="linkedin" size={28} color="#0077B5" />
          </Button>
          <Button onPress={() => share('whatsapp')} size="sm">
            <MaterialCommunityIcons name="whatsapp" size={28} color="#25D366" />
          </Button>
          <Button
            onPress={() => {
              Clipboard.setString(postURL);
              ToastAndroid.show('Link Copied', ToastAndroid.LONG);
              props.onClose?.();
            }}
            size="sm"
          >
            <MaterialCommunityIcons
              name="link-variant"
              size={28}
              color={Black[600]}
            />
          </Button>
        </View>
      </View>
    </View>
  );
}

export default function SharePostModal(props: {
  showModal: boolean;
  post: {
    title: string;
    type: Post['postType'];
    _id: Post['_id'];
  };
  onClose?: () => void;
}) {
  return (
    <ReactNativeModal
      isVisible={props.showModal}
      onDismiss={props.onClose}
      onBackdropPress={props.onClose}
      onBackButtonPress={props.onClose}
      onSwipeComplete={() => props.onClose?.()}
      swipeDirection="down"
      useNativeDriverForBackdrop
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <_SharePostModal_ post={props.post} onClose={props.onClose} />
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  mobdalBody: {
    padding: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },
  header: {
    marginBottom: 15,
    fontFamily: 'Roboto-Medium',
    color: 'black',
    fontSize: 16
  }
});
