import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFormik } from 'formik';
import { Input } from '~/src/components/theme/Input';
import { lazy, object, string } from 'yup';
import { FileObject } from '~/src/utils/typings/file';
import Button from '~/src/components/theme/Button';
import { Black, Green } from '~/src/utils/colors';
import { postLink } from '~/src/utils/services/user-portfolio_services/link/postLink.service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { file } from '~/src/lib/yup-custom-schemas';
import { UploadPostScreenProps } from '~/src/types/navigation/main';
import { updateLink } from '~/src/utils/services/user-portfolio_services/link/updatelink.service';
import { PostLinkRequest } from '~/src/utils/typings/user-portfolio_interface/link/postLink.interface';
import { LinkPost } from '~/src/utils/typings/post';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import Loading from '~/src/components/theme/Loading';
import { staticFileSrc } from '~/src/utils/methods';
interface LinkPostForm {
  title: string;
  description: string;
  featureImage: FileObject | string;
  tags: string;
  link: string;
}

type PostData = GetPostResponse<
  Pick<
    LinkPost,
    'title' | 'description' | 'tags' | 'featureImage' | '_id' | 'link'
  >
>['post'];

export default function UploadLink() {
  const navigation = useNavigation<UploadPostScreenProps['navigation']>();
  const route = useRoute<UploadPostScreenProps['route']>();
  const isEdit = useMemo(() => !!route.params?.postId, [route.params?.postId]);
  const [loading, setLoading] = useState(false);

  async function chooseFile() {
    try {
      const imageAsset = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      });

      if (imageAsset.assets.length > 0) {
        formik.setFieldValue('featureImage', {
          name: imageAsset.assets[0].fileName,
          type: imageAsset.assets[0].type,
          uri: imageAsset.assets[0].uri
        });
      }
    } catch (error) {}
  }

  async function submitLink(values: LinkPostForm) {
    const postData: PostLinkRequest = {
      ...values,
      featureImage:
        typeof values.featureImage === 'string'
          ? undefined
          : values.featureImage,
      tags: values.tags.split(',').map(tag => tag.trim()),
      postedOn: new Date().toString(),
      postStatus: 'published'
    };

    const result = await (() => {
      if (isEdit) {
        return updateLink(postData, route.params.postId);
      }
      return postLink(postData);
    })();

    if (result.data.success) {
      navigation.pop();
    }
  }

  const formik = useFormik<LinkPostForm>({
    initialValues: {
      title: '',
      description: '',
      featureImage: null,
      tags: '',
      link: ''
    },
    validationSchema: object({
      title: string().trim().required('Title is required'),
      description: string()
        .trim()
        .max(120, 'Cannot have more than 120 characters'),
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
        })().required('Thumbnail is required')
      ),
      tags: string()
        .matches(/^([a-zA-Z0-9, ]+)$/)
        .trim()
        .required('At least one tags is required'),
      link: string().trim().url('Invalid link').required('Link is required')
    }),
    onSubmit: submitLink
  });

  const fetchData = async () => {
    setLoading(true);

    const result = await getPost<PostData>({
      postID: route.params.postId,
      postType: 'artwork',
      projection: 'title description tags featureImage link'
    });

    if (result.data.success) {
      formik.setValues({
        description: result.data.post.description,
        featureImage: result.data.post.featureImage,
        tags: result.data.post.tags.join(', '),
        title: result.data.post.title,
        link: result.data.post.link
      });
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.postId) {
        fetchData();
      }
    }, [])
  );

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

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Thumbnail"
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
            style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
          >
            {formik.values.featureImage && (
              <Image
                style={{
                  width: 170,
                  height: 170 / (16 / 9),
                  marginRight: 20,
                  borderRadius: 8
                }}
                source={{
                  uri:
                    typeof formik.values.featureImage === 'string'
                      ? staticFileSrc(formik.values.featureImage)
                      : formik.values.featureImage?.uri
                }}
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
              onPress={() => {
                chooseFile();
              }}
            />
          </View>
        )}
      </Input>

      <Input
        inputProp={{
          placeholder: 'Title for the link',
          onChangeText: formik.handleChange('title'),
          value: formik.values.title,
          onBlur: formik.handleBlur('title')
        }}
        label="Title"
        style={styles.MT}
        error={formik.touched.title && formik.errors.title}
      />
      <Input
        label="Link"
        inputProp={{
          placeholder: 'https://example.com/post',
          onChangeText: formik.handleChange('link'),
          value: formik.values.link,
          onBlur: formik.handleBlur('link')
        }}
        style={styles.MT}
        error={formik.touched.link && formik.errors.link}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  MT: {
    marginTop: 27
  }
});
