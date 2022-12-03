import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { getUserData2 } from '~/src/utils/services/user-profile_service/getUserData2.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import Slide1 from '~/src/assets/images/onboard-slides/slide1.png';
import Slide2 from '~/src/assets/images/onboard-slides/slide2.png';
import Slide3 from '~/src/assets/images/onboard-slides/slide3.png';
import Slide4 from '~/src/assets/images/onboard-slides/slide4.png';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Black, Blue } from '~/src/utils/colors';
import { postOnboard } from '~/src/utils/services/user-profile_service/postOnboard.service';
import Button from '../theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OnboardModal = () => {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);
  const [isOnboard, setIsOnboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const windowDim = Dimensions.get('window');
  const sliderRef = useRef(null);
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getUserData2(authUser.username, 'onboard');
      if (result.data.success) {
        setIsOnboard(result.data.user.onboard);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClose = async () => {
    setShowModal(false);
    await postOnboard();
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.scrollToIndex({ index: index });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading || isOnboard) {
    return null;
  }

  return (
    <ReactNativeModal
      isVisible={showModal}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={() => onClose?.()}
      swipeDirection="down"
      backdropOpacity={0.8}
      propagateSwipe
      useNativeDriverForBackdrop
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      {/* swipe bar */}
      <View style={{ paddingVertical: 10, paddingTop: 20 }}>
        <View style={styles.modalDragHandle} />
      </View>

      {/* modal body */}
      <View style={styles.modal}>
        <SwiperFlatList
          horizontal
          showPagination
          data={[Slide1, Slide2, Slide3, Slide4]}
          removeClippedSubviews
          paginationStyle={styles.pagination}
          paginationStyleItemActive={styles.pageIndAcitve}
          paginationStyleItemInactive={styles.pageIndInAcitve}
          paginationStyleItem={styles.pageInd}
          onChangeIndex={({ index }) => setCurrentSliderIndex(index)}
          ref={sliderRef}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <Image
                source={item}
                style={[
                  styles.slide,
                  { width: windowDim.width, height: '100%' }
                ]}
                resizeMode="contain"
                resizeMethod="resize"
              />
            </TouchableWithoutFeedback>
          )}
        />
        <View style={styles.slideControlsCt}>
          <Button
            type="outlined"
            size="sm"
            onPress={onClose}
            text="Skip"
            btnStyle={styles.skipBtn}
            textStyle={{ color: Black[500] }}
          />
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            {currentSliderIndex !== 0 && (
              <Button
                type="filled"
                size="sm"
                highlightColor={Blue[100]}
                btnStyle={[styles.slideNavBtn, { marginRight: 10 }]}
                onPress={() => {
                  if (currentSliderIndex === 0) {
                    goToSlide(3);
                  } else {
                    goToSlide(currentSliderIndex - 1);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={20}
                  color={Blue.primary}
                />
              </Button>
            )}
            {currentSliderIndex >= 3 ? (
              <Button
                type="filled"
                size="sm"
                btnStyle={styles.onboardDoneBtn}
                onPress={onClose}
                text="Done"
              />
            ) : (
              <Button
                type="filled"
                size="sm"
                highlightColor={Blue[100]}
                disabled={currentSliderIndex >= 3}
                btnStyle={[styles.slideNavBtn]}
                onPress={() => {
                  goToSlide((currentSliderIndex + 1) % 4);
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={currentSliderIndex >= 3 ? Black[500] : Blue.primary}
                />
              </Button>
            )}
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default OnboardModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    width: '100%',
    height: '90%',
    alignItems: 'stretch',
    overflow: 'hidden'
  },
  modalDragHandle: {
    width: 100,
    height: 5,
    borderRadius: 5,
    backgroundColor: Black[300],
    alignSelf: 'center'
  },
  slide: {
    width: 500,
    height: 500
  },
  pagination: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 0
  },
  pageInd: {
    width: 10,
    height: 10,
    marginHorizontal: 5
  },
  pageIndAcitve: {
    backgroundColor: Blue.primary
  },
  pageIndInAcitve: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Blue[200]
  },
  slideControlsCt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  skipBtn: {
    borderColor: Black[200],
    paddingHorizontal: 25,
    borderRadius: 30
  },
  slideNavBtn: {
    backgroundColor: Blue[50],
    paddingHorizontal: 10,
    borderRadius: 30
  },
  onboardDoneBtn: {
    borderRadius: 30
  }
});
