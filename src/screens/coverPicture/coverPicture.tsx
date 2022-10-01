import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Black, Colors } from '../../utils/colors';
import { updateCover } from '../../utils/services/user-profile_service/updateCover.service';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import Button from '~/src/components/theme/Button';

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
        <Button
          fullWidth
          onPress={onImageSelect}
          text="SELECT IMAGE"
          btnStyle={styles.selectImageBtn}
          textStyle={styles.selTxt}
        />
        <Button
          type="outlined"
          fullWidth
          btnStyle={styles.updateImgBtn}
          processing={loading}
          disabled={loading}
          onPress={() => {
            if (!loading) {
              submitCoverImage();
            }
          }}
          text="Add Cover Picture"
        />
      </View>
    </>
  );
}

export default CoverPictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  titleTxt: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Medium',
    marginTop: 10
  },
  bgImage: {
    width: '100%',
    height: '30%',
    marginTop: 20,
    marginBottom: 10,
    resizeMode: 'cover',
    backgroundColor: Black[200],
    borderRadius: 8
  },
  selectImageBtn: {
    width: '100%'
  },
  selTxt: {
    // alignSelf: 'stretch',
    color: Black[600]
  },
  updateImgBtn: {
    width: '100%',
    position: 'absolute',
    bottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    padding: 10
  }
});
