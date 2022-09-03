import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Dimensions,
  FlatList,
  Animated,
  TouchableHighlight
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import CategoryItem from '../../components/createPost/categoryItem';
import { Black, Green } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import { Input } from '~/src/components/theme/Input';
import { postArtwork } from '~/src/utils/services/works_services/artwork/postArtwork.service';
import { UploadArtworkScreenProps } from '~/src/utils/typings/stack';
import { FileObject } from '~/src/utils/typings/file';
import { file } from '~/src/lib/yup-custom-schemas';
import { getCategories } from '~/src/utils/services/post/categories';
import { Category } from '~/src/utils/typings/postCategory';
import Loading from '~/src/components/theme/Loading';
import { PostCategoryModal } from '~/src/components/createPost/CategorySelectionModal';

interface UploadArtworkForm {
  title: string;
  description: string;
  tags: string;
  category: string[];
  artwork: FileObject;
}

export default function ArtWork() {
  const navigation = useNavigation<UploadArtworkScreenProps['navigation']>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [filePath, setFilePath] = useState<any>();
  const [selected, setSelected] = useState(false);

  async function submitArtwork(values: UploadArtworkForm) {
    const result = await postArtwork({
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()),
      postedOn: new Date().toString(),
      postStatus: 'published'
    });
    if (result.data.success) {
      navigation.pop();
    }
  }

  const formik = useFormik<UploadArtworkForm>({
    initialValues: {
      title: 'Mountain View',
      description: 'Beautiful sceneary',
      tags: 'mountain',
      category: [],
      artwork: null
    },
    validationSchema: object({
      title: string().trim().required('Title is required'),
      description: string()
        .trim()
        .max(120, 'Cannot have more than 120 characters'),
      tags: string().trim().required('Tags is required'),
      category: array(string().trim().required()).required(
        'Category is required'
      ),
      artwork: file(
        ['image/png', 'image/jpeg', 'image/jpg'],
        'Only PNG, JPEG, JPG images are allowed'
      ).required('Artwork is required')
    }),
    onSubmit: submitArtwork
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

  async function chooseFile() {
    try {
      const imageAsset = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      });

      if (imageAsset.assets.length > 0) {
        formik.setFieldValue('artwork', {
          name: imageAsset.assets[0].fileName,
          type: imageAsset.assets[0].type,
          uri: imageAsset.assets[0].uri
        });
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <PostCategoryModal
        show={showCategoryModal}
        onChange={newSelection =>
          formik.setFieldValue('category', newSelection)
        }
        onClose={() => setShowCategoryModal(false)}
      />
      {/* <View style={styles.imageView}>
        {filePath
          ? [
              <TouchableWithoutFeedback>
                <View style={styles.imageview}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: filePath.assets[0].uri
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ]
          : [
              <>
                <TouchableWithoutFeedback onPress={() => chooseFile('photo')}>
                  <Icon1 name="camera" size={38} color="#BDBDBD" />
                </TouchableWithoutFeedback>
                <Text style={styles.selecttext}>Select Image</Text>
              </>
            ]}
      </View> */}

      <ScrollView>
        <Input
          inputContainer={{
            borderWidth: 0,
            borderRadius: 0,
            flexDirection: 'column'
          }}
          error={formik.touched.artwork && (formik.errors.artwork?.type as string)}
        >
          {() => (
            <View
              style={[
                { width: '100%' },
                formik.values.artwork && { marginBottom: 40 }
              ]}
            >
              <Image
                style={{
                  width: '100%',
                  height: 250,
                  backgroundColor: Black[200]
                }}
                resizeMode="contain"
                source={{ uri: formik.values.artwork?.uri }}
              />

              <View
                style={[
                  { position: 'absolute', width: '100%' },
                  formik.values.artwork && {
                    alignSelf: 'center',
                    transform: [{ translateY: 250 }]
                  }
                ]}
              >
                <Button
                  type={!formik.values.artwork ? 'filled' : 'text'}
                  size="sm"
                  btnStyle={StyleSheet.flatten([
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexGrow: 1
                    },
                    !formik.values.artwork && {
                      backgroundColor: Black[200],
                      width: '100%',
                      height: 250
                    }
                  ])}
                  onPress={() => chooseFile()}
                >
                  <View style={{ alignItems: 'center' }}>
                    {!formik.values.artwork && (
                      <MaterialCommunityIcons
                        name="camera-outline"
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
                      {formik.values.artwork ? 'Change Image' : 'Select Image'}
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

          {/* <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View>
              <TextInputWithLabel
                placeholder="Select Category"
                label="Category"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('email')}
                // value={formik.values.email}
                // errorTxt={formik.touched.email && formik.errors.email}
                // onBlur={formik.handleBlur('email')}
                editable={false}
                right={
                  <Ti.Icon
                    color={'#BDBDBD'}
                    name={'chevron-down'}
                    style={styles.eye}
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback> */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  MT: {
    marginTop: 27
  },
  details: {
    padding: 20
  }
});
