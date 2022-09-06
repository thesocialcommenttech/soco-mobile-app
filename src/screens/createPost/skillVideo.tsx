import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { array, object, string } from 'yup';
import { useFormik } from 'formik';
import { file } from '~/src/lib/yup-custom-schemas';
import { Black, Green } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import { postSkill } from '~/src/utils/services/works_services/skill_video/postSkill.service';
import { Input } from '~/src/components/theme/Input';
import { FileObject } from '~/src/utils/typings/file';
import Video from '~/src/components/theme/Video';
import { PostCategoryModal } from '~/src/components/createPost/CategorySelectionModal';
import { UploadPostScreenProps } from '~/src/types/navigation/main';

interface UploadSkillForm {
  title: string;
  description: string;
  tags: string;
  category: string[];
  video: FileObject;
  featureImage: FileObject;
}

export default function SkillVideo() {
  const navigation = useNavigation<UploadPostScreenProps['navigation']>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const winDim = Dimensions.get('window');

  async function submitPresentation(values: UploadSkillForm) {
    const currentTimestamp = new Date().toString();
    const result = await postSkill({
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()),
      updatedOn: currentTimestamp,
      postedOn: currentTimestamp,
      postStatus: 'published'
    });
    if (result.data.success) {
      navigation.pop();
    }
  }

  const formik = useFormik({
    initialValues: {
      description: 'Video Description',
      featureImage: null,
      tags: 'video, test',
      title: 'Testing video of spongebob',
      video: null,
      category: []
    },
    validationSchema: object({
      title: string().trim().required('Title is required'),
      category: array(string().trim().required()).required(
        'Category is required'
      ),
      description: string()
        .trim()
        .max(120, 'Cannot have more than 120 characters'),
      tags: string().trim().required('Tags is required'),
      featureImage: file(
        ['image/png', 'image/jpeg', 'image/jpg'],
        'Only PNG, JPEG, JPG images are allowed'
      ).required('Feature image is required'),
      video: file(['video/mp4'], 'Only MP4 is allowed').required(
        'Video is required'
      )
    }),
    onSubmit: submitPresentation
  });

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerLeft: () => {
          return (
            <Button
              size="xs"
              onPress={() => navigation.goBack()}
              btnStyle={{ marginRight: 20 }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="black"
              />
            </Button>
          );
        }
      });
    }, [navigation])
  );

  const selectImage = async () => {
    const images = await chooseFile('photo');

    formik.setFieldValue('featureImage', {
      name: images.assets[0].fileName,
      type: images.assets[0].type,
      uri: images.assets[0].uri
    });
  };

  const selectVideo = async () => {
    const videos = await chooseFile('video');
    formik.setFieldValue('video', {
      name: videos.assets[0].fileName,
      type: videos.assets[0].type,
      uri: videos.assets[0].uri
    });
  };

  const chooseFile = async (mediaType: MediaType) => {
    try {
      const imageAsset = await launchImageLibrary({
        includeBase64: false,
        selectionLimit: 1,
        mediaType
      });

      if (!imageAsset.didCancel && imageAsset.assets.length > 0) {
        return imageAsset;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="sm"
          processing={formik.isSubmitting}
          disabled={formik.isSubmitting}
          textStyle={{
            color: Green.primary,
            fontSize: 14,
            letterSpacing: 0.2
          }}
          text="Publish"
          onPress={formik.handleSubmit}
        />
      )
    });
  }, [formik.isSubmitting]);

  return (
    <>
      <PostCategoryModal
        show={showCategoryModal}
        onChange={newSelection =>
          formik.setFieldValue('category', newSelection)
        }
        onClose={() => setShowCategoryModal(false)}
      />

      <ScrollView>
        <Input
          inputContainer={{
            borderWidth: 0,
            borderRadius: 0,
            flexDirection: 'column'
          }}
          error={formik.touched.video && (formik.errors.video?.type as string)}
        >
          {() => (
            <View
              style={[
                { width: '100%' },
                formik.values.video && { marginBottom: 40 }
              ]}
            >
              <Video
                source={{
                  uri: formik.values.video?.uri,
                  type: formik.values.video?.type
                }}
              />

              <View
                style={[
                  { position: 'absolute', width: '100%' },
                  formik.values.video && {
                    alignSelf: 'center',
                    transform: [{ translateY: winDim.width / (16 / 9) }]
                  }
                ]}
              >
                <Button
                  type={!formik.values.video ? 'filled' : 'text'}
                  size="sm"
                  btnStyle={StyleSheet.flatten([
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexGrow: 1,
                      borderRadius: 0
                    },
                    !formik.values.video && {
                      backgroundColor: Black[200],
                      width: '100%',
                      height: 250
                    }
                  ])}
                  onPress={selectVideo}
                >
                  <View style={{ alignItems: 'center' }}>
                    {!formik.values.video && (
                      <MaterialCommunityIcons
                        name="video-outline"
                        size={34}
                        color={Black[500]}
                      />
                    )}
                    <Text
                      style={{
                        color: Black[500],
                        fontFamily: 'Roboto-Medium',
                        textTransform: 'uppercase'
                      }}
                    >
                      {formik.values.video ? 'Change Video' : 'Select Video'}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          )}
        </Input>

        <View style={styles.details}>
          <Input
            inputProp={{
              placeholder: 'Title for the link',
              onChangeText: formik.handleChange('title'),
              value: formik.values.title,
              onBlur: formik.handleBlur('title')
            }}
            label="Title"
            // style={styles.MT}
            error={formik.touched.title && formik.errors.title}
          />

          <Input
            label="Description"
            inputProp={{
              placeholder: 'Description of link',
              onChangeText: formik.handleChange('description'),
              value: formik.values.description,
              onBlur: formik.handleBlur('description'),
              style: { textAlignVertical: 'top' },
              multiline: true,
              numberOfLines: 5,
              maxLength: 120
            }}
            style={styles.MT}
            error={formik.touched.description && formik.errors.description}
          />

          <Input
            label="Thumbnail"
            style={styles.MT}
            error={
              formik.touched.featureImage &&
              (formik.errors.featureImage?.type as string)
            }
          >
            {({ style }) => (
              <View
                style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
              >
                {formik.values.featureImage && (
                  <Image
                    style={{
                      width: 170,
                      height: 170 / (16 / 9),
                      borderRadius: 8,
                      marginRight: 20
                    }}
                    source={{ uri: formik.values.featureImage.uri }}
                  />
                )}
                <Button
                  btnStyle={{
                    alignSelf: 'stretch',
                    flexGrow: 1,
                    justifyContent: 'center'
                  }}
                  textStyle={{ color: Black[600] }}
                  text={
                    formik.values.featureImage ? 'Change Image' : 'Select Image'
                  }
                  onPress={selectImage}
                />
              </View>
            )}
          </Input>

          <Input
            label="Category"
            inputProp={{
              value: formik.values.category.join(', '),
              placeholder: 'Select category',
              editable: false
            }}
            onPress={() => setShowCategoryModal(true)}
            suffix={
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={Black[500]}
                style={{ alignSelf: 'center' }}
              />
            }
            style={styles.MT}
          />

          <Input
            label="Tags"
            inputProp={{
              placeholder: 'Comma (,) separated tags',
              onChangeText: formik.handleChange('tags'),
              value: formik.values.tags,
              onBlur: formik.handleBlur('tags')
            }}
            style={styles.MT}
            error={formik.touched.tags && formik.errors.tags}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  MT: {
    marginTop: 27
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '4.5%',
    justifyContent: 'space-between',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  mheader: {
    color: '#00A300',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600'
  },
  imageView: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    height: '42%',
    marginTop: '5%'
  },
  selecttext: {
    color: '#BDBDBD'
  },
  emailTB: {
    marginTop: '-6%',
    paddingLeft: 7
  },
  details: {
    padding: 20
  },
  descriptionTB: {
    marginTop: '-6%',
    paddingLeft: 7,
    paddingTop: 7
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    marginTop: '10%',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  videomodalView: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  },
  textStyle: {
    color: 'black',
    fontWeight: '400',
    marginLeft: '2%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modaltopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '2%'
  },
  searchbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7D7987',
    marginTop: '7%',
    flexDirection: 'row',
    marginLeft: '3%',
    marginRight: '2%'
  },
  searchIcon: {
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '1.5%'
  },
  textinput: {
    color: 'black',
    marginTop: '0.5%'
  },
  list: {
    marginTop: '6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '-70%'
  },
  image: {
    height: 0.27 * Dimensions.get('window').height,
    width: 0.46 * Dimensions.get('window').width
  },
  video: {
    width: Dimensions.get('window').width
  },
  changev: {
    color: '#7D7987',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '3%',
    fontWeight: '600'
  },
  fullscreen: {
    zIndex: 9999,
    marginBottom: '-7.5%',
    marginLeft: '1%'
  }
});
