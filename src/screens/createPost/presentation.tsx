import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  ImageLibraryOptions,
  launchImageLibrary
} from 'react-native-image-picker';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Button from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Green, Red } from '~/src/utils/colors';
import { useFormik } from 'formik';
import { postPresentation } from '~/src/utils/services/post/postPresentation';
import { FileObject } from '~/src/utils/typings/file';
import { object, string, array, lazy } from 'yup';
import { Input } from '~/src/components/theme/Input';
import { file } from '~/src/lib/yup-custom-schemas';
import { PostCategoryModal } from '~/src/components/createPost/CategorySelectionModal';
import produce from 'immer';
import Bottomsheet, {
  DropdownOption
} from '~/src/components/bottomsheet/Bottomsheet';
import { UploadPostScreenProps } from '~/src/types/navigation/main';
import { Post, PresentationPost } from '~/src/utils/typings/post';
import { updatePresentation } from '~/src/utils/services/works_services/presentation/updatePresentation.service';
import { PostPresentationRequest } from '~/src/utils/typings/works_interface/presentation/updatePresentation.interface';
import Loading from '~/src/components/theme/Loading';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { staticFileSrc } from '~/src/utils/methods';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import * as Sentry from '@sentry/react-native';

interface UploadPresentationForm {
  title: string;
  tags: string;
  description: string;
  featureImage: FileObject | string;
  slides: (FileObject | string)[];
}

type PostData = GetPostResponse<
  Pick<
    PresentationPost,
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | 'slides'
    | '_id'
    | 'postedBy'
  >
>['post'];

export default function Presentation() {
  const navigation = useNavigation<UploadPostScreenProps['navigation']>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const scrollRef = React.useRef(null);
  const [currIndex, setCurrIndex] = useState(0);
  let postStatus = useRef<Post['postStatus']>('published').current;
  const route = useRoute<UploadPostScreenProps['route']>();
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  const isEdit = useMemo(() => !!route.params?.postId, [route.params?.postId]);

  async function submitPresentation(values: UploadPresentationForm) {
    const currentTimestamp = new Date().toString();
    const postData: PostPresentationRequest = {
      ...values,
      featureImage:
        typeof values.featureImage === 'string'
          ? undefined
          : values.featureImage,
      tags: values.tags.split(',').map(tag => tag.trim()),
      totalSlides: formik.values.slides.length,
      updatedOn: currentTimestamp,
      postedOn: currentTimestamp,
      postStatus: 'published'
    };

    const result = await (() => {
      if (isEdit) {
        return updatePresentation(postData, route.params.postId);
      }

      return postPresentation(postData);
    })();

    if (result.data.success) {
      navigation.pop();
    }
  }

  const formik = useFormik({
    initialValues: {
      description: '',
      featureImage: null,
      slides: [],
      tags: '',
      title: ''
    },
    validationSchema: object({
      title: string().trim().required('Title is required'),
      description: string()
        .trim()
        .max(120, 'Cannot have more than 120 characters'),
      tags: string()
        .trim()
        .when([], {
          is: () => postStatus === 'published',
          then: schema => schema.required('Tags is required')
        }),
      featureImage: lazy(value =>
        (() => {
          if (typeof value === 'string') {
            return string().trim();
          } else {
            return file(
              ['image/png', 'image/jpeg', 'image/jpg'],
              'Only PNG, JPEG, JPG images are allowed'
            ).nullable();
          }
          // @ts-ignore
        })().when([], {
          is: () => postStatus === 'published',
          then: schema => schema.required('Thumbnail is required')
        })
      ),
      slides: array(
        lazy(value => {
          if (typeof value === 'string') {
            return string().trim();
          } else {
            return file(
              ['image/png', 'image/jpeg', 'image/jpg'],
              'Only PNG, JPEG, JPG images are allowed'
            )
              .nullable()
              .required('Image is required');
          }
        })
      ).when([], {
        is: () => postStatus === 'published',
        then: schema =>
          schema
            .min(1, 'At least one slide is required')
            .required('Slides is required')
      })
    }),
    onSubmit: submitPresentation
  });

  const moreThanOneSlide = useMemo(
    () => formik.values.slides.length > 0,
    [formik.values.slides]
  );

  const slideWithError = useMemo(
    () =>
      formik.errors.slides instanceof Array
        ? formik.errors.slides.findIndex(slide => slide)
        : -1,
    [formik.errors.slides]
  );

  const fetchData = async () => {
    setLoading(true);

    const result = await getPost<PostData>({
      postID: route.params.postId,
      postType: 'presentation',
      projection: 'title description tags featureImage slides'
    });

    if (result.data.success) {
      if (result.data.post.postedBy._id !== authUser._id) {
        navigation.pop();
        return;
      }

      formik.setValues({
        description: result.data.post.description,
        slides: result.data.post.slides.map(slide => slide.slideUrl),
        tags: result.data.post.tags.join(', '),
        title: result.data.post.title,
        featureImage: result.data.post.featureImage
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

  async function chooseFile(options?: Partial<ImageLibraryOptions>) {
    try {
      const imageAsset = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        ...options
      });

      if (!imageAsset.didCancel && imageAsset.assets.length > 0) {
        return imageAsset;
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  const insertSlidesAtLast = async () => {
    const images = await chooseFile({ selectionLimit: 0 });
    await formik.setFieldValue(
      'slides',
      produce(formik.values.slides, draft => {
        images.assets.forEach(image => {
          draft.push({
            name: image.fileName,
            type: image.type,
            uri: image.uri
          });
        });
      })
    );
    formik.setFieldTouched('slides');
  };

  const atPosition = async () => {
    const images = await chooseFile({ selectionLimit: 0 });
    formik.setFieldValue(
      'slides',
      produce(formik.values.slides, draft => {
        draft.splice(
          currIndex,
          0,
          ...images.assets.map(image => ({
            name: image.fileName,
            type: image.type,
            uri: image.uri
          }))
        );
      })
    );
    formik.setFieldTouched('slides');
  };

  const goToIndex = index => {
    scrollRef.current?.scrollToIndex({ index: index });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PostCategoryModal
        show={modalVisible}
        onChange={newSelection =>
          formik.setFieldValue('category', newSelection)
        }
        onClose={() => setModalVisible(false)}
      />

      <Bottomsheet
        visible={modalVisible1}
        onClose={() => setModalVisible1(false)}
      >
        <DropdownOption
          label="Append At Last"
          optionKey="at_last"
          onOptionPress={() => {
            setModalVisible1(false);
            insertSlidesAtLast();
          }}
        />
        <DropdownOption
          label="Insert Here"
          optionKey="curr_pos"
          onOptionPress={() => {
            atPosition();
            setModalVisible1(false);
          }}
        />
      </Bottomsheet>
      <View style={styles.container}>
        <ScrollView>
          <Input
            inputContainer={{
              borderWidth: 0,
              borderRadius: 0,
              flexDirection: 'column'
            }}
            error={
              formik.touched.slides &&
              typeof formik.errors.slides === 'string' &&
              formik.errors.slides
            }
          >
            {() => (
              <View>
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width / (16 / 9)
                  }}
                >
                  <SwiperFlatList
                    data={formik.values.slides}
                    style={{
                      backgroundColor: Black[200]
                    }}
                    renderItem={({ item, index }) => (
                      <View>
                        <Image
                          source={{
                            uri:
                              typeof item === 'string'
                                ? staticFileSrc(item)
                                : item.uri
                          }}
                          style={styles.imageComponent}
                        />
                        {formik.touched.slides &&
                          formik.errors.slides instanceof Array &&
                          formik.errors.slides[index] && (
                            <Text
                              style={{
                                padding: 8,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                backgroundColor: Red.primary,
                                color: 'white',
                                fontFamily: 'Roboto-Medium'
                              }}
                            >
                              {typeof formik.errors.slides[index] === 'string'
                                ? formik.errors.slides[index]
                                : // @ts-ignore : not getting correct type
                                  formik.errors.slides[index]?.type}
                            </Text>
                          )}
                      </View>
                    )}
                    onChangeIndex={({ index }) => {
                      setCurrIndex(index);
                    }}
                    ref={scrollRef}
                  />

                  {!moreThanOneSlide && (
                    <View
                      style={[
                        { position: 'absolute', width: '100%', height: '100%' }
                      ]}
                    >
                      <Button
                        type="filled"
                        size="sm"
                        btnStyle={StyleSheet.flatten({
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'auto',
                          flexGrow: 1,
                          borderRadius: 0,
                          backgroundColor: Black[300],
                          width: '100%',
                          height: '100%'
                        })}
                        onPress={insertSlidesAtLast}
                      >
                        <View style={{ alignItems: 'center' }}>
                          <MaterialCommunityIcons
                            name="presentation"
                            size={34}
                            color={Black[500]}
                          />
                          <Text
                            style={{
                              color: Black[500],
                              fontFamily: 'Roboto-Medium',
                              textTransform: 'uppercase'
                            }}
                          >
                            Add Slide
                          </Text>
                        </View>
                      </Button>
                    </View>
                  )}
                </View>
                {formik.values.slides.length > 0 && (
                  <View
                    style={[
                      styles.pptControlsCt,
                      formik.touched.slides &&
                        formik.errors.slides && { backgroundColor: Red[100] }
                    ]}
                  >
                    <Button
                      size="sm"
                      onPress={() => {
                        if (currIndex === 0) {
                          goToIndex(formik.values.slides.length - 1);
                        } else {
                          goToIndex(currIndex - 1);
                        }
                      }}
                    >
                      <Icon1 name="chevron-left" size={26} color={Black[500]} />
                    </Button>
                    {slideWithError !== -1 && (
                      <Button
                        size="sm"
                        onPress={() => goToIndex(slideWithError)}
                        btnStyle={{ position: 'absolute', left: 50 }}
                      >
                        <MaterialCommunityIcons
                          name="alert-outline"
                          size={24}
                          color={Red.primary}
                        />
                      </Button>
                    )}
                    <View style={styles.numview}>
                      <Text style={styles.number}>
                        {currIndex + 1} / {formik.values.slides.length}
                      </Text>
                      <Button
                        size="sm"
                        btnStyle={{ alignSelf: 'center' }}
                        onPress={() => setModalVisible1(true)}
                        text="Add Slide"
                      />
                      <Button
                        size="sm"
                        btnStyle={{ alignSelf: 'center' }}
                        onPress={() =>
                          formik.setFieldValue(
                            'slides',
                            produce(formik.values.slides, draft => {
                              draft.splice(currIndex, 1);
                            })
                          )
                        }
                      >
                        <Icon1
                          name="delete-outline"
                          size={16}
                          color={Red[300]}
                        />
                      </Button>
                    </View>
                    <Button
                      size="sm"
                      onPress={() => {
                        goToIndex(
                          (currIndex + 1) % formik.values.slides.length
                        );
                      }}
                    >
                      <Icon1
                        name="chevron-right"
                        size={26}
                        color={Black[500]}
                      />
                    </Button>
                  </View>
                )}
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
              label="Thumbnail"
              style={styles.MT}
              error={
                formik.touched.featureImage &&
                typeof formik.errors.featureImage === 'string'
                  ? formik.errors.featureImage
                  : // @ts-ignore : not getting correct type
                    formik.errors.featureImage?.type
              }
            >
              {({ style }) => (
                <View
                  style={[
                    style,
                    { flexDirection: 'row', paddingHorizontal: 20 }
                  ]}
                >
                  {formik.values.featureImage && (
                    <Image
                      style={{
                        width: 170,
                        height: 170 / (16 / 9),
                        borderRadius: 8
                      }}
                      source={{
                        uri:
                          typeof formik.values.featureImage === 'string'
                            ? staticFileSrc(formik.values.featureImage)
                            : formik.values.featureImage.uri
                      }}
                    />
                  )}
                  <Button
                    btnStyle={{
                      alignSelf: 'stretch',
                      marginLeft: 20,
                      flexGrow: 1,
                      justifyContent: 'center'
                    }}
                    textStyle={{ color: Black[600] }}
                    text={
                      formik.values.featureImage
                        ? 'Change Image'
                        : 'Select Image'
                    }
                    onPress={async () => {
                      const image = await chooseFile();
                      formik.setFieldValue('featureImage', {
                        name: image.assets[0].fileName,
                        type: image.assets[0].type,
                        uri: image.assets[0].uri
                      });
                    }}
                  />
                </View>
              )}
            </Input>

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
    height: '40%',
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
  addslide: {
    color: Blue.primary,
    marginRight: 5
    // fontSize: 15,
    // alignSelf: 'center',
    // marginTop: '8%',
    // fontWeight: '600'
  },
  fullscreen: {
    zIndex: 9999,
    marginBottom: '-7.5%',
    marginLeft: '1%'
  },
  pptControlsCt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    marginTop: '2%',
    marginLeft: '1.8%',
    marginRight: '1.8%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdown: {
    marginTop: '10%',
    marginLeft: '2%'
  },
  number: { color: Black[500], marginRight: 20 },
  numview: { flexDirection: 'row', alignItems: 'center' },
  optionview: {
    height: '14%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%',
    marginTop: '5%'
  },
  imageComponent: {
    height: Dimensions.get('window').width / (16 / 9),
    width: Dimensions.get('window').width
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  noimageview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
