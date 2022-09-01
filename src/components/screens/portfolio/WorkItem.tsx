import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { staticFileSrc } from '~/src/utils/methods';
import { Post, PresentationPost, SharedPost } from '~/src/utils/typings/post';
import { PortfolioTabStackScreenProps } from '~/src/utils/typings/stack';
import Modal1 from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';

export default function WorkItem({
  item
}: {
  item: Exclude<Post, SharedPost>;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation =
    useNavigation<PortfolioTabStackScreenProps['navigation']>();

  function onClickPost() {
    let postScreenKey;
    switch (item.postType) {
      case 'artwork':
        postScreenKey = 'Post_Artwork';
        break;
      case 'presentation':
        postScreenKey = 'Post_Presentation';
        break;
      case 'skill':
        postScreenKey = 'Post_Skill';
        break;

      default:
        return;
    }
    navigation.navigate(postScreenKey, { post_id: item._id });
  }

  return (
    <>
      <Modal1
        isVisible={modalVisible}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible(false)}
      >
        <>
          <View style={styles.optionview}>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <MaterialCommunityIcons name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <TouchableHighlight
        onLongPress={() => setModalVisible(true)}
        onPress={onClickPost}
        underlayColor={Black[100]}
        style={styles.item}
      >
        <>
          <View
            style={[
              styles.thumbnailCt,
              item.postType === 'artwork' && styles.artworkImage
            ]}
          >
            <Image
              source={{ uri: staticFileSrc(item.featureImage) }}
              style={styles.itemPhoto}
              resizeMode="cover"
            />
            {item.postType === 'skill' && (
              <MaterialCommunityIcons
                style={styles.playbtn}
                name="play-circle"
                size={44}
                color="#FFFFFF"
              />
            )}
            {item.postType === 'presentation' && (
              <View style={styles.pptSlideCountCt}>
                <MaterialIcons name="collections" color="white" size={16} />
                <Text style={styles.pptSlideCountText}>
                  {(item as PresentationPost).totalSlides}
                </Text>
              </View>
            )}
          </View>
          {item.postType !== 'artwork' && (
            <Text
              style={styles.itemText}
              ellipsizeMode="clip"
              numberOfLines={2}
            >
              {item.title}
            </Text>
          )}
        </>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    // paddingLeft: 15,
    // marginTop: 5,
    borderRadius: 8,
    marginRight: 10
  },
  itemPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: Black[200]
  },
  itemText: {
    color: 'black',
    marginTop: 10,
    flexShrink: 1,
    flexGrow: 0,
    width: 170,
    flexWrap: 'wrap'
    // marginBottom: 5
  },
  thumbnailCt: {
    width: 170,
    height: 170 / (16 / 9),
    justifyContent: 'center',
    alignItems: 'center'
  },
  artworkImage: { height: 170 },
  //   image: {
  //     height: '100%',
  //     width: '100%',
  //     borderRadius: 8
  //   },
  detailtext: {
    color: 'black',
    //width: '40%',
    marginTop: '2%',
    marginLeft: '1%',
    lineHeight: 19
  },
  playbtn: {
    position: 'absolute',
    zIndex: 9999,
    opacity: 0.7
    // marginTop: 40,
    // marginLeft: 77
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
  //   artphoto: {
  //     height: 200,
  //     width: 200,
  //     borderRadius: 7,
  //     marginBottom: 10
  //   },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  //   modalrow: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginTop: '2%',
  //     marginLeft: '4%',
  //     marginBottom: '2%',
  //     padding: '2%'
  //   },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '4%',
    padding: '2%',
    marginTop: '4%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  }
});
