import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Black, Green } from '~/src/utils/colors';
import Button from '~/src/components/theme/Button';
import { useFormik } from 'formik';
import { array, lazy, object, string } from 'yup';
import { Input } from '~/src/components/theme/Input';
import { postArtwork } from '~/src/utils/services/works_services/artwork/postArtwork.service';
import { FileObject } from '~/src/utils/typings/file';
import { file } from '~/src/lib/yup-custom-schemas';
import { PostCategoryModal } from '~/src/components/createPost/CategorySelectionModal';
import { UploadPostScreenProps } from '~/src/types/navigation/main';
import { updateArtwork } from '~/src/utils/services/works_services/artwork/updateArtwork.service';
import { ArtworkPost, Post } from '~/src/utils/typings/post';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { staticFileSrc } from '~/src/utils/methods';
import Loading from '~/src/components/theme/Loading';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import * as Sentry from '@sentry/react-native';

interface UploadArtworkForm {
  title: string;
  description: string;
  tags: string;
  category: string[];
  artwork: FileObject | string;
}

type PostData = GetPostResponse<
  Pick<
    ArtworkPost,
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | '_id'
    | 'category'
    | 'postedBy'
  >
>['post'];

export default function ArtWork() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);
  const navigation = useNavigation<UploadPostScreenProps['navigation']>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const route = useRoute<UploadPostScreenProps['route']>();
  let postStatus = useRef<Post['postStatus']>('published').current;
  const isEdit = useMemo(() => !!route.params?.postId, [route.params?.postId]);
  const [loading, setLoading] = useState(false);

  async function submitArtwork(values: UploadArtworkForm) {
    const postData = {
      ...values,
      artwork: typeof values.artwork === 'string' ? undefined : values.artwork,
      tags: values.tags.split(',').map(tag => tag),
      postedOn: new Date().toString(),
      postStatus
    };

    const result = await (() => {
      if (isEdit) {
        return updateArtwork(postData, route.params.postId);
      }
      return postArtwork(postData);
    })();

    if (result.data.success) {
      navigation.pop();
    }
  }

  const formik = useFormik<UploadArtworkForm>({
    initialValues: {
      title: '',
      description: '',
      tags: '',
      category: [],
      artwork: null
    },
    validationSchema: object({
      title: string().trim().required('Title is required'),
      description: string()
        .trim()
        .max(120, 'Cannot have more than 120 characters')
        .when([], {
          is: () => postStatus === 'published',
          then: schema => schema.required('Description is required')
        }),
      tags: string()
        .trim()
        .when([], {
          is: () => postStatus === 'published',
          then: schema => schema.required('Tags is required')
        }),
      category: array(string().trim().required()).when([], {
        is: () => postStatus === 'published',
        then: schema =>
          schema.min(1, 'Category is required').required('Category is required')
      }),
      artwork: lazy(value =>
        (() => {
          if (typeof value === 'string') {
            return string().trim();
          } else {
            return file(
              ['image/png', 'image/jpeg', 'image/jpg'],
              'Only PNG, JPEG, JPG images are allowed'
            ).nullable();
          }
        })().required('Artwork is required')
      )
    }),
    onSubmit: submitArtwork
  });

  const fetchData = async () => {
    setLoading(true);

    const result = await getPost<PostData>({
      postID: route.params.postId,
      postType: 'artwork',
      projection: 'title description tags featureImage category'
    });

    if (result.data.success) {
      if (result.data.post.postedBy._id !== authUser._id) {
        navigation.pop();
        return;
      }

      formik.setValues({
        category: result.data.post.category,
        description: result.data.post.description,
        artwork: result.data.post.featureImage,
        tags: result.data.post.tags.join(', '),
        title: result.data.post.title
      });
    }

    setLoading(false);
  };

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

  useFocusEffect(
    useCallback(() => {
      if (route.params?.postId) {
        fetchData();
      }
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Button
            size="sm"
            processing={formik.isSubmitting && postStatus === 'draft'}
            disabled={formik.isSubmitting}
            btnStyle={{ marginRight: 10 }}
            textStyle={{ letterSpacing: 0.2 }}
            text="Save As Draft"
            onPress={() => {
              postStatus = 'draft';
              formik.handleSubmit();
            }}
          />
          <Button
            size="sm"
            type="filled"
            processing={formik.isSubmitting && postStatus === 'published'}
            disabled={formik.isSubmitting}
            btnStyle={{ backgroundColor: Green.primary }}
            text="Publish"
            onPress={() => {
              postStatus = 'published';
              formik.handleSubmit();
            }}
          />
        </>
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
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  if (loading) {
    return <Loading />;
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

      <ScrollView>
        <Input
          inputContainer={{
            borderWidth: 0,
            borderRadius: 0,
            flexDirection: 'column'
          }}
          error={
            formik.touched.artwork && typeof formik.errors.artwork === 'string'
              ? formik.errors.artwork
              : // @ts-ignore : not getting correct type
                formik.errors.artwork?.type
          }
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
                source={{
                  uri:
                    typeof formik.values.artwork === 'string'
                      ? staticFileSrc(formik.values.artwork)
                      : formik.values.artwork?.uri
                }}
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
            error={
              formik.touched.category && (formik.errors.category as string)
            }
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
