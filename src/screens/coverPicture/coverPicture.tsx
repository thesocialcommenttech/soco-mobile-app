import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../utils/colors';
import { updateCover } from '../../utils/services/user-profile_service/updateCover.service';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';

function CoverPictureScreen() {
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

  async function submitCoverImage() {
    try {
      setLoading(true);
      const result = await updateCover({
        coverImage: { name: image.fileName, type: image.type, uri: image.uri }
      });

      if (result.data.success) {
        navigation.navigate('BioScreen');
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <OptionalStackHeader
        onProceed={() => submitCoverImage()}
        onSkip={() => navigation.navigate('BioScreen')}
        disableProceed={loading}
        disableSkip={loading}
        formStage={OptionalFormStage.ADD_COVER_IMAGE}
      />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Add Your Cover Picture</Text>
        <Image source={{ uri: image?.uri }} style={styles.bgImage} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onImageSelect}>
            <Text style={styles.selTxt}>SELECT IMAGE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.updateImgBtn, loading && styles.disableBtn]}
          onPress={() => {
            if (!loading) {
              submitCoverImage();
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.Gray200} size={25} />
          ) : (
            <Text style={styles.updateImgTxt}>Add Cover Picture</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

export default CoverPictureScreen;

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
  bgImage: {
    width: '100%',
    height: '30%',
    marginTop: 20,
    marginBottom: 10,
    resizeMode: 'cover',
    backgroundColor: Colors.Gray100,
    borderRadius: 10
  },
  selTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal'
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
  }
});
