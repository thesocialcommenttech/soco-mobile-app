import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextProps,
  ViewStyle,
  StyleProp,
  LayoutRectangle
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { date, mixed, object, string } from 'yup';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Black, Colors, Green, Red, Yellow } from '../../../utils/colors';
import Button from '~/src/components/theme/Button';
import { Input } from '~/src/components/theme/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import dayjs from 'dayjs';
import { uploadUserKYC } from '~/src/utils/services/wallet_services/uploadUserKYC.service';
import { UploadUserKYCRequest } from '~/src/utils/typings/wallet_interfaces/uploadUserKYC.interface';
import { getUserKYC } from '~/src/utils/services/wallet_services/getUserKYC.service';
import { FileObject } from '~/src/utils/typings/file';
import Loading from '~/src/components/theme/Loading';
import { staticFileSrc } from '~/src/utils/methods';
import { Kyc } from '~/src/utils/typings/wallet_interfaces/getUserKYC.interface';
import Color from 'color';

function B(props: TextProps) {
  return (
    <Text {...props} style={[styles.bold, props.style]}>
      {props.children}
    </Text>
  );
}

interface UserKycFormData extends Omit<UploadUserKYCRequest, 'dob'> {
  dob: Date;
}

export default function KycScreen() {
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [disableForm, setDisableForm] = useState(false);
  const [kycDetails, setKycDetails] = useState<Kyc>();

  const imageRowWidth = useMemo(() => layout?.width / 2 - 10, [layout?.width]);

  async function submitKyc(values: UserKycFormData) {
    const result = await uploadUserKYC({
      ...values,
      dob: values.dob.toString()
    });

    if (result.data.success) {
      setKycDetails(result.data.kyc);
      setDisableForm(true);
    }

    formik.setSubmitting(false);
  }

  const panRegExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

  const formik = useFormik<UserKycFormData>({
    initialValues: {
      name: '',
      pan_number: '',
      pan_back_image: null,
      pan_front_image: null,
      dob: new Date()
    },
    validationSchema: object({
      name: string().trim().required('Name is Required'),
      pan_number: string()
        .trim()
        .matches(panRegExp, 'Pan number is not valid')
        .uppercase()
        .required('Pan number is Required'),
      dob: date().default(new Date()).required('Date of Birth is Required'),
      pan_front_image: mixed()
        .when({
          is: val => typeof val === 'string',
          then: string(),
          otherwise: object()
        })
        .required('Pan Front image is required'),
      pan_back_image: mixed()
        .when({
          is: val => typeof val === 'string',
          then: string(),
          otherwise: object()
        })
        .required('Pan Back image is required')
    }),
    onSubmit: submitKyc
  });

  async function fetchData() {
    setLoading(true);
    const result = await getUserKYC();

    if (result.data.success) {
      const kyc = result.data.kyc;

      if (kyc) {
        setKycDetails(kyc);
        setDisableForm(true);
        await formik.setValues(
          {
            name: kyc.data.name,
            pan_number: kyc.data.pan_number,
            dob: new Date(kyc.data.dob),
            pan_front_image: kyc.data.pan_front_image,
            pan_back_image: kyc.data.pan_back_image
          },
          true
        );
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SettingScreenHeader title="KYC" />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.yellowbox}>
              <MaterialCommunityIcons
                name="information-variant"
                size={24}
                color="black"
                style={styles.yellowicon}
              />
              <Text style={styles.text}>
                Complete your KYC to activate your wallet and recieve referral
                credits.
              </Text>
            </View>
            <View style={styles.whitebox}>
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                style={styles.yellowicon}
                color="black"
              />
              <Text style={styles.text}>
                All the information you provide will be used to verify your
                identity and should be as per mentioned on your <B>PAN</B>.
              </Text>
            </View>

            {kycDetails?.status && (
              <View
                style={kycDetails.status === 'rejected' && styles.kycStatusCt}
              >
                <Text
                  style={[
                    styles.kycStatus,
                    kycDetails.status === 'rejected' && { color: Red.primary },
                    kycDetails.status === 'pending' && {
                      color: Yellow[600],
                      marginTop: 20
                    },
                    kycDetails.status === 'accepted' && {
                      color: Green.primary,
                      marginVertical: 20
                    }
                  ]}
                >
                  Status: {kycDetails.status}
                </Text>
                {kycDetails?.status === 'rejected' && (
                  <>
                    <Text style={styles.kycHelpingText}>
                      Update your KYC detail based on the reason of rejection
                      mentioned below and re-submit your KYC.
                    </Text>

                    <Text style={{ lineHeight: 20 }}>
                      <B>Reason</B> - {kycDetails.message}
                    </Text>
                  </>
                )}
              </View>
            )}

            {disableForm && kycDetails?.status !== 'accepted' && (
              <Button
                text="Edit"
                type="outlined"
                fullWidth
                btnStyle={styles.editBtn}
                onPress={() => setDisableForm(false)}
              />
            )}

            <Input
              label="Name"
              style={[styles.passTB, disableForm && styles.disableInput]}
              inputProp={{
                placeholder: 'Name on PAN Card',
                value: formik.values.name,
                editable: !disableForm,
                onChangeText: formik.handleChange('name'),
                onBlur: formik.handleBlur('name')
              }}
              error={formik.touched.name && (formik.errors.name as string)}
            />
            <Input
              label="PAN Number"
              style={[styles.passTB, disableForm && styles.disableInput]}
              inputProp={{
                placeholder: 'PAN Number',
                value: formik.values.pan_number,
                editable: !disableForm,
                onChangeText: formik.handleChange('pan_number'),
                onBlur: formik.handleBlur('pan_number')
              }}
              error={
                formik.touched.pan_number &&
                (formik.errors.pan_number as string)
              }
            />
            <Input
              label="Date of Birth"
              style={[styles.passTB, disableForm && styles.disableInput]}
              inputProp={{
                placeholder: 'dd/mm/yyyy',
                value: dayjs(formik.values.dob).format('DD/MM/YYYY'),
                editable: false,
                onChangeText: formik.handleChange('dob'),
                onBlur: formik.handleBlur('dob')
              }}
              error={formik.touched.dob && (formik.errors.dob as string)}
              suffix={
                <Button
                  size="sm"
                  btnStyle={{ alignSelf: 'center', marginRight: -15 }}
                  disabled={disableForm}
                  onPress={() => {
                    DateTimePickerAndroid.open({
                      value: (formik.values.dob as Date) ?? new Date(),
                      onChange: async (event, selectedDate) => {
                        await formik.setFieldValue('dob', selectedDate);
                      },
                      mode: 'date',
                      is24Hour: true
                    });
                  }}
                >
                  <MaterialCommunityIcons name="calendar" size={24} />
                </Button>
              }
            />
            <View
              style={styles.photo}
              onLayout={e => {
                setLayout(e.nativeEvent.layout);
              }}
            >
              <Input
                style={[
                  styles.passTB,
                  { flexGrow: 1 },
                  layout && { width: imageRowWidth },
                  disableForm && styles.disableInput
                ]}
                label="PAN Front Image"
                error={
                  formik.touched.pan_front_image &&
                  (formik.errors.pan_front_image as string)
                }
              >
                {props => (
                  <ImageInput
                    style={props.style}
                    disabled={disableForm}
                    width={imageRowWidth - 2}
                    image={formik.values.pan_front_image}
                    onChange={image => {
                      formik.setFieldValue('pan_front_image', image);
                    }}
                  />
                )}
              </Input>
              <View style={{ width: 20 }} />
              <Input
                style={[
                  styles.passTB,
                  { flexGrow: 1 },
                  layout && { width: imageRowWidth },
                  disableForm && styles.disableInput
                ]}
                label="PAN Back Image"
                error={
                  formik.touched.pan_back_image &&
                  (formik.errors.pan_back_image as string)
                }
              >
                {props => (
                  <ImageInput
                    style={props.style}
                    width={imageRowWidth - 2}
                    disabled={disableForm}
                    image={formik.values.pan_back_image}
                    onChange={image => {
                      formik.setFieldValue('pan_back_image', image);
                    }}
                  />
                )}
              </Input>
            </View>
            <Button
              btnStyle={styles.button}
              type="filled"
              fullWidth
              processing={formik.isSubmitting}
              disabled={formik.isSubmitting}
              onPress={formik.handleSubmit}
              text="Upload KYC"
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  yellowbox: {
    backgroundColor: Colors.LightPrimary,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8
  },
  yellowins: {},
  yellowicon: {
    // alignSelf: 'center',
    marginRight: 10
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    // fontWeight: '900',
    flexShrink: 1,
    color: 'black',
    fontSize: 17
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  whitebox: {
    flexDirection: 'row',
    padding: 8,
    marginTop: 10
  },
  whiteins: {
    flex: 1,
    marginLeft: '5%'
  },
  whiteicon: {
    alignSelf: 'center',
    marginLeft: '2%'
  },
  bold: {
    fontWeight: 'bold'
    // color: 'black'
  },
  text: {
    color: 'black',
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 20
  },
  passTB: {
    marginTop: 27
  },
  disableInput: {
    backgroundColor: Black[100]
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  photo: {
    flexDirection: 'row'
  },
  panview: {
    marginBottom: '-6%',
    alignSelf: 'center',
    zIndex: 9999,
    marginTop: '3%',
    backgroundColor: 'white'
  },
  uploadBox: {
    alignItems: 'center',
    padding: '2%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10
  },
  grayBox: {
    backgroundColor: 'lightgray',
    padding: '16.5%',
    borderRadius: 10,
    marginTop: '4%',
    marginLeft: '-7%',
    marginRight: '-7%',
    marginBottom: '3%'
  },
  pantext: {
    color: 'black',
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20
  },
  image: {
    height: 0.14 * Dimensions.get('window').height,
    width: 0.38 * Dimensions.get('window').width
  },
  imageview: {
    marginTop: '1%',
    padding: 6
  },
  editBtn: {
    marginTop: 20
  },
  kycStatusCt: {
    backgroundColor: Red[100],
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  kycStatus: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  kycHelpingText: {
    color: Color('black').alpha(0.7).rgb().string(),
    marginVertical: 10,
    lineHeight: 20
  }
});

function ImageInput(props: {
  style: StyleProp<ViewStyle>;
  width: number;
  image?: FileObject | string;
  disabled?: boolean;
  onChange?: (image: FileObject) => void;
}) {
  async function chooseFile() {
    try {
      const imageAsset = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      });

      if (imageAsset.assets.length > 0) {
        props.onChange?.({
          name: imageAsset.assets[0].fileName,
          type: imageAsset.assets[0].type,
          uri: imageAsset.assets[0].uri
        });
      }
    } catch (error) {}
  }

  return (
    <View style={[props.style, { paddingHorizontal: 15 }]}>
      <Button
        text="Upload Image"
        onPress={() => chooseFile()}
        fullWidth
        type="filled"
        disabled={props.disabled}
        textStyle={{
          color: Black[600],
          textTransform: 'uppercase'
        }}
        btnStyle={{
          height: 100,
          borderRadius: 8,
          padding: 0,
          paddingHorizontal: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Black[200],
          overflow: 'hidden'
        }}
      >
        {props.image && (
          <Image
            resizeMode="cover"
            style={{
              flex: 1,
              height: 100,
              ...(props.width && { width: props.width - 30 })
            }}
            source={{
              uri:
                typeof props.image === 'string'
                  ? staticFileSrc(props.image)
                  : props.image.uri
            }}
          />
        )}
      </Button>
    </View>
  );
}
