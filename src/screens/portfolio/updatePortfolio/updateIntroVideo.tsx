import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import { Input } from '~/src/components/theme/Input';
import { useFormik } from 'formik';
import { lazy, object, string } from 'yup';
import { addPortforlioBio } from '~/src/utils/services/user-portfolio_services/bio/addPortforlioBio.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { FileObject } from '~/src/utils/typings/file';
import { file } from '~/src/lib/yup-custom-schemas';
import { addPortfolioIntroVideo } from '~/src/utils/services/user-portfolio_services/addPortfolioIntroVideo.service';
import produce from 'immer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { staticFileSrc } from '~/src/utils/methods';
import Video from '~/src/components/theme/Video';
import { removePortfolioIntroVideo } from '~/src/utils/services/user-portfolio_service/removePortfolioIntroVideo.service';
import * as Sentry from '@sentry/react-native';

interface IntroVideoForm {
  video: FileObject | string;
}

function RemoveIntroVideoBtn(props: { onVideoRemoved?: () => void }) {
  const [loading, setLoading] = useState(false);

  const removeVideo = async () => {
    setLoading(true);
    const result = await removePortfolioIntroVideo();
    if (result.data.success) {
      props?.onVideoRemoved?.();
    }
    setLoading(true);
  };

  return (
    <Button
      fullWidth
      processing={loading}
      disabled={loading}
      onPress={removeVideo}
      text="Or, Remove It"
      btnStyle={{ marginTop: 10 }}
      highlightColor={Black[100]}
      textStyle={{
        fontFamily: 'Roboto',
        textTransform: 'capitalize',
        color: Black[600]
      }}
    />
  );
}

export default function UpdateIntroVideo() {
  const navigation = useNavigation();
  const { portfolio, setPortfolio } = usePortfolioData();
  const winDim = Dimensions.get('window');

  const videoHeight = useMemo(
    () => (winDim.width - 40) / (16 / 9),
    [winDim.width]
  );

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
      Sentry.captureException(error);
      console.error(error);
    }
  };

  const submitIntroVideo = async values => {
    const result = await addPortfolioIntroVideo(values.video as FileObject);
    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          draft.intro_video_url = result.data.intro_video_url;
        })
      );
      navigation.goBack();
    }
  };

  const removeIntroVideo = () => {
    setPortfolio(
      produce(portfolio, draft => {
        draft.intro_video_url = null;
      })
    );
    navigation.goBack();
  };

  const formik = useFormik<IntroVideoForm>({
    initialValues: { video: portfolio.intro_video_url ?? null },
    validationSchema: object({
      video: lazy(value =>
        (() => {
          if (typeof value === 'string') {
            return string().trim();
          } else {
            return file(['video/mp4'], 'Only MP4 is allowed').nullable();
          }
        })().required('Video is required')
      )
    }),
    onSubmit: submitIntroVideo
  });

  useFocusEffect(
    useCallback(() => {
      if (!portfolio.intro_video_url) {
        navigation.setOptions({
          title: 'Add Intro Video'
        });
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <Input
        inputContainer={{
          borderWidth: 0,
          borderRadius: 0,
          flexDirection: 'column',
          overflow: 'visible'
        }}
        error={
          formik.touched.video && typeof formik.errors.video === 'string'
            ? formik.errors.video
            : // @ts-ignore
              formik.errors.video?.type
        }
      >
        {() => (
          <View
            style={[
              { width: '100%', height: videoHeight, overflow: 'visible' },
              formik.values.video && { marginBottom: 40 }
            ]}
          >
            <Video
              style={{
                width: '100%',
                flexGrow: 1,
                borderRadius: 8
              }}
              {...(formik.values.video && {
                source:
                  typeof formik.values.video === 'string'
                    ? { uri: staticFileSrc(formik.values.video) }
                    : {
                        uri: formik.values.video?.uri,
                        type: formik.values.video?.type
                      }
              })}
            />

            <View
              style={[
                {
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                },
                formik.values.video && {
                  alignSelf: 'center',
                  height: 'auto',
                  transform: [{ translateY: videoHeight }]
                }
              ]}
            >
              <Button
                type={!formik.values.video ? 'filled' : 'text'}
                size="sm"
                btnStyle={StyleSheet.flatten([
                  styles.selectFileBtn,
                  !formik.values.video && styles.selectFileBtn_noVideo
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
                  <Text style={styles.selectFileBtnLabel}>
                    {formik.values.video ? 'Change Video' : 'Select Video'}
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        )}
      </Input>

      <Button
        fullWidth
        type="filled"
        processing={formik.isSubmitting}
        disabled={formik.isSubmitting}
        onPress={formik.handleSubmit}
        text="Save"
        btnStyle={styles.button}
      />

      <RemoveIntroVideoBtn onVideoRemoved={removeIntroVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  selectFileBtnLabel: {
    color: Black[600],
    fontFamily: 'Roboto-Medium',
    textTransform: 'uppercase'
  },
  selectFileBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    flexGrow: 1,
    borderRadius: 0
  },
  selectFileBtn_noVideo: {
    backgroundColor: Black[200]
  },
  button: {
    marginTop: 30
  }
});
