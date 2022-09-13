import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { staticFileSrc } from '~/src/utils/methods';
import { Post, PresentationPost, SharedPost } from '~/src/utils/typings/post';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { removePortforlioWork } from '~/src/utils/services/user-portfolio_services/work/removePortforlioWork.service';
import Bottomsheet, { DropdownOption } from '../../bottomsheet/Bottomsheet';
import produce from 'immer';

export default function WorkItem({
  item,
  editOptions
}: {
  item: Exclude<Post, SharedPost>;
  editOptions?: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();
  const [isRemoving, setIsRemoving] = useState(false);
  const { portfolio, setPortfolio } = usePortfolioData();

  const remove = async () => {
    setIsRemoving(true);
    const result = await removePortforlioWork({
      postId: item._id,
      postType: item.postType
    });

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          const index = draft.work[item.postType].findIndex(
            ed => ed._id === item._id
          );
          draft.work[item.postType].splice(index, 1);
        })
      );
    }
  };

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
      <Bottomsheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <DropdownOption
          optionKey="delete"
          label="Delete"
          onOptionPress={option => {
            setModalVisible(false);
            remove();
          }}
        />
      </Bottomsheet>
      <TouchableHighlight
        onLongPress={() => (editOptions ? setModalVisible(true) : undefined)}
        onPress={onClickPost}
        underlayColor={Black[100]}
        style={styles.item}
      >
        <>
          <View
            style={[
              styles.thumbnailCt,
              item.postType === 'artwork' && styles.artworkImage,
              isRemoving && styles.removing
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
  removing: {
    opacity: 0.3
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
