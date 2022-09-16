import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useMemo, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { launchImageLibrary } from 'react-native-image-picker';
import { useProfile } from '~/src/state/profileScreenState';
import { updateDP } from '~/src/utils/services/user-profile_service/updateDP.service';
import { UpdateDPRequest } from '~/src/utils/typings/user-profile_interface/updateDP.interface';
import { useDispatch } from 'react-redux';
import {
  AuthActionTypes,
  updateUserProfileImageGlobalState
} from '~/src/store/actions/auth';
import { IRootReducer } from '~/src/store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { UpdateCoverRequest } from '~/src/utils/typings/user-profile_interface/updateCover.interface';
import { updateCover } from '~/src/utils/services/user-profile_service/updateCover.service';

export default function UpdateProfileCoverImageModal({
  show,
  onClose
}: {
  show: boolean;
  onClose: () => void;
}) {
  const { updateProfileImage, updateCoverImage, userProfile } = useProfile();
  const [updatingProfileImage, setUpdatingProfileImage] = useState(false);
  const [updatingCoverImage, setUpdatingCoverImage] = useState(false);
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const [profileImage, setProfileImage] =
    useState<UpdateDPRequest['profileImage']>(null);

  const [coverImage, setCoverImage] =
    useState<UpdateCoverRequest['coverImage']>(null);

  const profileImageDisplay = useMemo(
    () => profileImage?.uri ?? staticFileSrc(userProfile.profileImage),
    [profileImage?.uri, userProfile.profileImage]
  );

  const coverImageDisplay = useMemo(
    () => coverImage?.uri ?? staticFileSrc(userProfile.coverImage),
    [coverImage?.uri, userProfile.coverImage]
  );

  async function submitProfileImage() {
    try {
      setUpdatingProfileImage(true);
      const result = await updateDP({ profileImage });

      if (result.data.success) {
        updateProfileImage(result.data.DPImageURL);
        dispatch(updateUserProfileImageGlobalState(result.data.DPImageURL));
      }
    } catch (error) {
      console.error(error);
    }
    setUpdatingProfileImage(false);
  }

  async function submitCoverImage() {
    try {
      setUpdatingCoverImage(true);
      const result = await updateCover({ coverImage });

      if (result.data.success) {
        updateCoverImage(result.data.coverImageURL);
      }
    } catch (error) {
      console.error(error);
    }
    setUpdatingCoverImage(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onClose?.();
      }}
    >
      <ScrollView>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => onClose?.()} style={styles.closeBtn}>
            <MaterialCommunityIcon
              name="close"
              size={24}
              color={Colors.Gray400}
            />
          </TouchableOpacity>
          <Text style={styles.proTitle}>Profile Picture</Text>
          <View style={styles.profView}>
            <Image
              style={styles.profUpdatePic}
              resizeMode="cover"
              source={{ uri: profileImageDisplay }}
            />
            <TouchableOpacity
              style={styles.selProImg}
              onPress={async () => {
                const image = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1
                });

                if (image.assets.length > 0) {
                  setProfileImage({
                    name: image.assets[0].fileName,
                    type: image.assets[0].type,
                    uri: image.assets[0].uri
                  });
                }
              }}
            >
              <Text style={styles.selProTxt}>SELECT IMAGE</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.updateImgBtn,
              updatingProfileImage && styles.disabledBtn
            ]}
            disabled={updatingProfileImage || !profileImage}
            onPress={() => submitProfileImage()}
          >
            {updatingProfileImage ? (
              <ActivityIndicator size="small" color={Colors.Gray600} />
            ) : (
              <Text style={styles.updateImgTxt}>Update Profile Picture</Text>
            )}
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <Text style={styles.covTitle}>Cover Picture</Text>
          <View style={styles.covView}>
            <Image
              style={styles.covUpdatePic}
              resizeMode="cover"
              source={{ uri: coverImageDisplay }}
            />
            <TouchableOpacity
              style={styles.selCovImg}
              onPress={async () => {
                const image = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1
                });

                if (image.assets.length > 0) {
                  setCoverImage({
                    name: image.assets[0].fileName,
                    type: image.assets[0].type,
                    uri: image.assets[0].uri
                  });
                }
              }}
            >
              <Text style={styles.selCovTxt}>SELECT IMAGE</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.updateImgBtn1}
            onPress={() => submitCoverImage()}
          >
            {updatingCoverImage ? (
              <ActivityIndicator size="small" color={Colors.Gray600} />
            ) : (
              <Text style={styles.updateImgTxt1}>Update Cover Picture</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 20
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  closeBtn: {
    color: Colors.Gray400,
    alignSelf: 'flex-end',
    padding: 5
  },
  updateBtn: {
    backgroundColor: Colors.Secondary,
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: Colors.Gray200
  },
  proTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    marginTop: '2%'
  },
  updateImgBtn: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Secondary
  },
  updateImgTxt: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  covTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    marginTop: '2%'
  },
  updateImgBtn1: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: '9%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Secondary
  },
  updateImgTxt1: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  horizontalLine: {
    borderBottomColor: Colors.GrayLine,
    borderBottomWidth: 1,
    marginTop: '8%',
    marginBottom: '8%'
  },
  profView: {
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profUpdatePic: {
    height: 90,
    width: 90,
    borderRadius: 100
  },
  selProImg: {
    marginLeft: '8%'
  },
  selProTxt: {
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 16
  },
  covView: {
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center'
    // paddingHorizontal: 20
    // backgroundColor: 'red'
  },
  covUpdatePic: {
    height: (Dimensions.get('screen').width - 40) * 0.5,
    width: '100%',
    // marginLeft: '4%',
    // marginRight: '4%',
    borderRadius: 8
  },
  selCovImg: {
    marginTop: '6%'
  },
  selCovTxt: {
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 16
  }
});
