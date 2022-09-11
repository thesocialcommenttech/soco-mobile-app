import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from '~/src/components/theme/Button';
import { useFormik } from 'formik';
import { bool, date, lazy, object, string } from 'yup';
import { produce } from 'immer';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { addPortforlioCertification } from '~/src/utils/services/user-portfolio_services/certifications/addPortforlioCertification.service';
import { AddPortforlioCertificationRequest } from '~/src/utils/typings/user-portfolio_interface/certifications/addPortforlioCertification.interface';
import dayjs from 'dayjs';
import { Input, RadioButton } from '~/src/components/theme/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import { updatePortforlioCertification } from '~/src/utils/services/user-portfolio_services/certifications/updatePortforlioCertification.service';
import { PortfolioSubScreen_ScreenProps } from '~/src/types/navigation/portfolio';
import { file } from '~/src/lib/yup-custom-schemas';
import { staticFileSrc } from '~/src/utils/methods';

export default function AddCertificate() {
  const navigation = useNavigation();
  const route =
    useRoute<PortfolioSubScreen_ScreenProps<'Addcertificate'>['route']>();

  const isEdit = useMemo(() => !!route.params?.data, [route.params?.data]);
  const { portfolio, setPortfolio } = usePortfolioData();

  const addCertificationFormSchema = object({
    title: string().trim().required('Title is required'),
    issue_date: string().nullable().required('Issue date is required'),
    credential_id: string().trim(),
    issuer_organization: string().trim().required('Issuer is required'),
    credential_url: string().url('Invalid Url').trim(),
    do_expire: bool()
      .default(true)
      .oneOf([true, false])
      .required('Is Expiry is required'),
    expiration_date: string()
      .nullable()
      .when('do_expire', {
        is: true,
        then: string()
          .nullable()
          .required('Expiration date is required')
          .test({
            test: (value, ctx) => {
              return dayjs(value).isAfter(ctx.parent.issue_date);
            },
            message: 'Expiration date cannot be before issue date'
          }),
        otherwise: string().nullable().default(null)
      }),
    certimage: lazy(value =>
      (() => {
        if (typeof value === 'string') {
          return string().trim();
        } else {
          return file(
            ['image/png', 'image/jpeg', 'image/jpg'],
            'Only PNG, JPEG, JPG are allowed'
          ).nullable();
        }
      })().required('Certificate Image is required')
    )
  });

  function openDatePicker(
    currValue: string,
    onChange: (event: DateTimePickerEvent, date?: Date) => void
  ) {
    DateTimePickerAndroid.open({
      value: currValue ? new Date(currValue) : new Date(),
      mode: 'date',
      is24Hour: true,
      onChange
    });
  }

  async function chooseFile() {
    try {
      const imageAsset = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      });

      if (imageAsset.assets.length > 0) {
        formik.setFieldValue('certimage', {
          name: imageAsset.assets[0].fileName,
          type: imageAsset.assets[0].type,
          uri: imageAsset.assets[0].uri
        });
      }
    } catch (error) {}
  }

  async function submitCertification(
    values: AddPortforlioCertificationRequest
  ) {
    const result = await (() => {
      if (isEdit) {
        return updatePortforlioCertification({
          certification: produce(values, draft => {
            if (typeof draft.certimage === 'string') {
              delete draft.certimage;
            }
          }),
          indexID: route.params.data._id
        });
      } else {
        return addPortforlioCertification(values);
      }
    })();

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          if (isEdit) {
            const index = draft.certifications.findIndex(
              ed => ed._id === route.params.data._id
            );

            // updating only the changed keys
            for (const key in result.data.certification) {
              draft.certifications[index][key] = result.data.certification[key];
            }

            return;
          }

          draft.certifications.push(result.data.certification);
        })
      );

      navigation.goBack();
    }
  }

  const formik = useFormik<AddPortforlioCertificationRequest>({
    initialValues: {
      title: '',
      issue_date: null,
      credential_id: '',
      issuer_organization: '',
      credential_url: '',
      do_expire: true,
      expiration_date: '',
      certimage: null
    },
    validationSchema: addCertificationFormSchema,
    onSubmit: submitCertification
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params?.data) {
        const certifciate = route.params.data;
        formik.setValues({
          certimage: certifciate.certification_image_url,
          credential_id: certifciate.credential_id,
          credential_url: certifciate.credential_url,
          do_expire: certifciate.do_expire,
          expiration_date: certifciate.expire_date as string,
          issue_date: certifciate.issue_date as string,
          issuer_organization: certifciate.issuer_organization,
          title: certifciate.title
        });
      }
    }, [route.params?.data])
  );

  return (
    <View>
      <ScrollView>
        <View style={styles.formCt}>
          <Input
            label="Thumbnail"
            error={
              formik.touched.certimage && (formik.errors.certimage as string)
            }
          >
            {({ style }) => (
              <View
                style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
              >
                {formik.values.certimage && (
                  <Image
                    style={{
                      width: 170,
                      height: 170 / (16 / 9),
                      borderRadius: 8
                    }}
                    source={{
                      uri:
                        typeof formik.values.certimage === 'string'
                          ? staticFileSrc(formik.values.certimage)
                          : formik.values.certimage.uri
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
                    formik.values.certimage ? 'Change Image' : 'Select Image'
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
              placeholder: 'Give Suitable Title',
              onChangeText: formik.handleChange('title'),
              value: formik.values.title,
              onBlur: formik.handleBlur('title')
            }}
            style={styles.MT}
            label="Title"
            error={formik.touched.title && formik.errors.title}
          />

          <Input
            inputProp={{
              placeholder: 'Give issuer institute name',
              onChangeText: formik.handleChange('issuer_organization'),
              value: formik.values.issuer_organization,
              onBlur: formik.handleBlur('issuer_organization')
            }}
            style={styles.MT}
            label="Issuer Name"
            error={
              formik.touched.issuer_organization &&
              formik.errors.issuer_organization
            }
          />

          <Input
            inputProp={{
              placeholder: 'Give certificate ID eg. ABCD123',
              onChangeText: formik.handleChange('credential_id'),
              value: formik.values.credential_id,
              onBlur: formik.handleBlur('credential_id')
            }}
            style={styles.MT}
            label="Certification ID"
            error={formik.touched.credential_id && formik.errors.credential_id}
          />

          <Input
            inputProp={{
              placeholder: 'Give certification URL',
              onChangeText: formik.handleChange('credential_url'),
              value: formik.values.credential_url,
              onBlur: formik.handleBlur('credential_url')
            }}
            style={styles.MT}
            label="Certificat URL"
            error={
              formik.touched.credential_url && formik.errors.credential_url
            }
          />

          <Input
            label="Issue Date"
            style={styles.MT}
            onPress={() => {
              formik.setFieldTouched('issue_date');
              openDatePicker(
                formik.values.issue_date,
                async (event, selectedDate) => {
                  if (event.type === 'set') {
                    await formik.setFieldValue(
                      'issue_date',
                      selectedDate.toISOString()
                    );
                  }
                }
              );
            }}
            inputProp={{
              placeholder: 'dd/mm/yyyy',
              value:
                formik.values.issue_date &&
                dayjs(formik.values.issue_date).format('DD/MM/YYYY'),
              editable: false,
              onChangeText: formik.handleChange('issue_date'),
              onBlur: formik.handleBlur('issue_date')
            }}
            error={
              formik.touched.issue_date && (formik.errors.issue_date as string)
            }
            suffix={
              <Button
                size="sm"
                btnStyle={{ alignSelf: 'center', marginRight: -15 }}
                onPress={e => {
                  formik.setFieldTouched('issue_date');
                  openDatePicker(
                    formik.values.issue_date,
                    async (event, selectedDate) => {
                      if (event.type === 'set') {
                        await formik.setFieldValue(
                          'issue_date',
                          selectedDate.toISOString()
                        );
                      }
                    }
                  );
                }}
              >
                <MaterialCommunityIcons name="calendar" size={24} />
              </Button>
            }
          />

          <Input
            label="Expiration"
            style={styles.MT}
            error={formik.touched.do_expire && formik.errors.do_expire}
          >
            {({ style }) => (
              <View
                style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
              >
                <RadioButton
                  selected={formik.values.do_expire}
                  buttonProps={{
                    fullWidth: true,
                    text: 'Yes',
                    btnStyle: { marginRight: 20 },
                    onPress: () => {
                      formik.setFieldValue('do_expire', true);
                    }
                  }}
                />
                <RadioButton
                  selected={!formik.values.do_expire}
                  buttonProps={{
                    fullWidth: true,
                    text: 'No',
                    btnStyle: { flexGrow: 1 },
                    onPress: () => {
                      formik.setFieldValue('do_expire', false);
                    }
                  }}
                />
              </View>
            )}
          </Input>

          {formik.values.do_expire && (
            <Input
              label="Expiry Date"
              style={styles.MT}
              onPress={() => {
                formik.setFieldTouched('expiration_date');
                openDatePicker(
                  formik.values.expiration_date,
                  async (event, selectedDate) => {
                    if (event.type === 'set') {
                      await formik.setFieldValue(
                        'expiration_date',
                        selectedDate.toISOString()
                      );
                    }
                  }
                );
              }}
              inputProp={{
                placeholder: 'dd/mm/yyyy',
                value:
                  formik.values.expiration_date &&
                  dayjs(formik.values.expiration_date).format('DD/MM/YYYY'),
                editable: false,
                onChangeText: formik.handleChange('expiration_date'),
                onBlur: formik.handleBlur('expiration_date')
              }}
              error={
                formik.touched.expiration_date &&
                (formik.errors.expiration_date as string)
              }
              suffix={
                <Button
                  size="sm"
                  btnStyle={{ alignSelf: 'center', marginRight: -15 }}
                  onPress={e => {
                    formik.setFieldTouched('expiration_date');
                    openDatePicker(
                      formik.values.expiration_date,
                      async (event, selectedDate) => {
                        if (event.type === 'set') {
                          await formik.setFieldValue(
                            'expiration_date',
                            selectedDate.toISOString()
                          );
                        }
                      }
                    );
                  }}
                >
                  <MaterialCommunityIcons name="calendar" size={24} />
                </Button>
              }
            />
          )}
          <Button
            type="filled"
            fullWidth
            text={isEdit ? 'Update' : 'Add'}
            processing={formik.isSubmitting}
            disabled={formik.isSubmitting}
            onPress={formik.handleSubmit}
            btnStyle={styles.submitBtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formCt: {
    flex: 1,
    padding: 20
  },
  MT: {
    marginTop: 27
  },
  submitBtn: {
    marginTop: 30
  }
});
