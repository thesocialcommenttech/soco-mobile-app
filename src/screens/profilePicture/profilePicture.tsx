import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/base';
import { Colors } from '../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { updateDP } from '../../utils/services/user-profile_service/updateDP.service';
import { useNavigation } from '@react-navigation/native';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';

function ProfilePictureScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<ImagePicker.Asset>();
  const [loading, setLoading] = useState(false);

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
            titleStyle={styles.avatarTitle}
            source={{
              uri: image?.uri
            }}
            containerStyle={styles.avatar}
          />
        </View>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onImageSelect}>
              <Text style={styles.selTxt}>SELECT IMAGE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.updateImgBtn, loading && styles.disableBtn]}
          onPress={() => {
            if (!loading) {
              updateProfileImage();
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.Gray200} size={25} />
          ) : (
            <Text style={styles.updateImgTxt}>Add Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ProfilePictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '6%'
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.Black,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '2%'
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal'
  },
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: Colors.Gray100
  },
  avatarTitle: {
    color: 'black'
  },
  updateImgBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%',
    bottom: '4%',
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    padding: 10
  },
  disableBtn: {
    paddingVertical: 12,
    borderColor: Colors.Gray200
  },
  image: {
    marginVertical: 24,
    alignItems: 'center'
  }
});
