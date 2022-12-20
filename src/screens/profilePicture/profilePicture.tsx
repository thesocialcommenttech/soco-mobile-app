import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/base';
import { Black } from '../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { updateDP } from '../../utils/services/user-profile_service/updateDP.service';
import { useNavigation } from '@react-navigation/native';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import Button from '~/src/components/theme/Button';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  AuthActionTypes,
  updateUserProfileImageGlobalState
} from '~/src/store/actions/auth';
import { IRootReducer } from '~/src/store/reducers';
import { IPostRegisterPageScreenProps } from '~/src/types/navigation/post-register';

function ProfilePictureScreen() {
  const navigation =
    useNavigation<
      IPostRegisterPageScreenProps<'ProfilePicture'>['navigation']
    >();
  const [image, setImage] = useState<ImagePicker.Asset>();
  const [loading, setLoading] = useState(false);
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  async function onImageSelect() {
    try {
      const imageAsset = await ImagePicker.launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      });

      if (imageAsset.assets.length > 0) {
        setImage(imageAsset.assets[0]);
      }
    } catch (error) {}
  }

  async function updateProfileImage() {
    try {
      setLoading(true);
      const result = await updateDP({
        profileImage: { name: image.fileName, type: image.type, uri: image.uri }
      });

      if (result.data.success) {
        dispatch(updateUserProfileImageGlobalState(result.data.DPImageURL));
        navigation.navigate('CoverPicture');
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <OptionalStackHeader
        onProceed={() => updateProfileImage()}
        onSkip={() => navigation.navigate('CoverPicture')}
        disableProceed={loading}
        disableSkip={loading}
        formStage={OptionalFormStage.ADD_PROFILE_IMAGE}
      />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Add Your Profile Picture</Text>
        <View style={styles.avatarContainer}>
          <Avatar
            size={200}
            rounded
            source={{ uri: image?.uri }}
            containerStyle={styles.avatar}
          />
        </View>
        <ScrollView>
          <Button
            onPress={onImageSelect}
            text="SELECT IMAGE"
            textStyle={styles.selTxt}
          />
        </ScrollView>
        <Button
          type="outlined"
          fullWidth
          btnStyle={styles.updateImgBtn}
          processing={loading}
          disabled={loading}
          onPress={() => {
            if (!loading) {
              updateProfileImage();
            }
          }}
          text="Add Profile Picture"
        />
      </View>
    </>
  );
}

export default ProfilePictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  titleTxt: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Medium',
    marginTop: 10
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selTxt: {
    color: Black[600]
  },
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: Black[200]
  },
  avatarTitle: {
    color: 'black'
  },
  updateImgBtn: {
    width: '100%'
  }
});
