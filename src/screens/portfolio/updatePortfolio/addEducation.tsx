import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import { addPortforlioEducation } from '~/src/utils/services/user-portfolio_services/education/addPortforlioEducation.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Input, RadioButton } from '~/src/components/theme/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '~/src/components/theme/Button';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { PortfolioSubScreen_ScreenProps } from '~/src/types/navigation/portfolio';
import { IEducation } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { updatePortforlioEducation } from '~/src/utils/services/user-portfolio_services/education/updatePortforlioEducation.service';

interface AddEducationForm {
  institute: IEducation['institute'];
  status: IEducation['status'];
  passYear: Date;
  course: IEducation['course'];
  level: IEducation['level'];
}

export default function AddEducation() {
  const navigation =
    useNavigation<
      PortfolioSubScreen_ScreenProps<'Addeducation'>['navigation']
    >();
  const route =
    useRoute<PortfolioSubScreen_ScreenProps<'Addeducation'>['route']>();
  const isEdit = useMemo(() => !!route.params?.data, [route.params?.data]);

  const { portfolio, setPortfolio } = usePortfolioData();

  function openDatePicker(
    currValue: Date,
    onChange: (event: DateTimePickerEvent, date?: Date) => void
  ) {
    DateTimePickerAndroid.open({
      value: currValue ?? new Date(),
      mode: 'date',
      is24Hour: true,
      onChange
    });
  }

  async function sumbitSkill(values: AddEducationForm) {
    const result = await (() => {
      if (isEdit) {
        return updatePortforlioEducation({
          education: values,
          indexID: route.params.data._id
        });
      } else {
        return addPortforlioEducation({ education: values });
      }
    })();

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          if (isEdit) {
            const index = draft.education.findIndex(
              ed => ed._id === route.params.data._id
            );

            // updating only the changed keys
            for (const key in result.data.education) {
              draft.education[index][key] = result.data.education[key];
            }

            return;
          }

          draft.education.push(result.data.education);
        })
      );
      navigation.goBack();
    }
  }

  const formik = useFormik<AddEducationForm>({
    initialValues: {
      institute: '',
      status: 'completed',
      passYear: null,
      course: '',
      level: null
    },
    validationSchema: object({
      institute: string().required('Institute name is required'),
      status: string().required('Status is required'),
      passYear: string().when('status', {
        is: 'completed',
        then: string().trim().nullable().required('Passout year is required'),
        otherwise: string().trim().nullable()
      }),
      course: string().required('Course is required'),
      level: string().required('Education level is required')
    }),
    onSubmit: sumbitSkill
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params?.data) {
        const education = route.params.data;
        formik.setValues({
          course: education.course,
          institute: education.institute,
          level: education.level,
          passYear: education.passYear,
          status: education.status
        });
      }
    }, [route.params?.data])
  );

  return (
    <ScrollView contentContainerStyle={styles.formCt}>
      <Input
        inputProp={{
          placeholder: 'Name of your institute',
          onChangeText: formik.handleChange('institute'),
          value: formik.values.institute,
          onBlur: formik.handleBlur('institute')
        }}
        label="Institute Name"
        error={formik.touched.institute && formik.errors.institute}
      />

      <Input
        style={styles.MT}
        inputProp={{
          placeholder: 'Eg. 10th, 12th, B.Tech',
          onChangeText: formik.handleChange('course'),
          value: formik.values.course,
          onBlur: formik.handleBlur('course')
        }}
        label="Course"
        error={formik.touched.course && formik.errors.course}
      />

      <Input
        label="Education Level"
        style={styles.MT}
        error={formik.touched.level && formik.errors.level}
      >
        {({ style }) => (
          <View style={[style, { paddingHorizontal: 20 }]}>
            <RadioButton
              selected={formik.values.level === 'school'}
              buttonProps={{
                fullWidth: true,
                text: 'Schooling',
                onPress: () => {
                  formik.setFieldValue('level', 'school');
                }
              }}
            />
            <RadioButton
              selected={formik.values.level === 'graduation'}
              buttonProps={{
                fullWidth: true,
                btnStyle: { marginTop: 10 },
                text: 'Graducation',
                onPress: () => {
                  formik.setFieldValue('level', 'graduation');
                }
              }}
            />
            <RadioButton
              selected={formik.values.level === 'postGraduation'}
              buttonProps={{
                fullWidth: true,
                text: 'Post Graduation',
                btnStyle: { marginTop: 10 },
                onPress: () => {
                  formik.setFieldValue('level', 'postGraduation');
                }
              }}
            />
          </View>
        )}
      </Input>

      <Input
        label="Status"
        style={styles.MT}
        error={formik.touched.status && formik.errors.status}
      >
        {({ style }) => (
          <View
            style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
          >
            <RadioButton
              selected={formik.values.status === 'completed'}
              buttonProps={{
                fullWidth: true,
                text: 'Completed',
                btnStyle: { marginRight: 20 },
                onPress: () => {
                  formik.setFieldValue('status', 'completed');
                }
              }}
            />
            <RadioButton
              selected={formik.values.status === 'pursuing'}
              buttonProps={{
                fullWidth: true,
                text: 'Graducation',
                btnStyle: { flexGrow: 1 },
                onPress: () => {
                  formik.setFieldValue('status', 'pursuing');
                }
              }}
            />
          </View>
        )}
      </Input>

      {formik.values.status === 'completed' && (
        <Input
          label="Passout Year"
          style={styles.MT}
          onPress={() => {
            openDatePicker(
              formik.values.passYear as Date,
              async (event, selectedDate) => {
                await formik.setFieldValue('passYear', selectedDate);
                formik.setFieldTouched('passYear');
              }
            );
          }}
          inputProp={{
            placeholder: 'dd/mm/yyyy',
            value:
              formik.values.passYear &&
              dayjs(formik.values.passYear).format('DD/MM/YYYY'),
            editable: false,
            onChangeText: formik.handleChange('passYear'),
            onBlur: formik.handleBlur('passYear')
          }}
          error={formik.touched.passYear && (formik.errors.passYear as string)}
          suffix={
            <Button
              size="sm"
              btnStyle={{ alignSelf: 'center', marginRight: -15 }}
              onPress={() => {
                formik.setFieldTouched('passYear');
                openDatePicker(
                  formik.values.passYear as Date,
                  async (event, selectedDate) => {
                    await formik.setFieldValue('passYear', selectedDate);
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formCt: {
    padding: 20
  },
  MT: {
    marginTop: 27
  },
  submitBtn: {
    marginTop: 30
  }
});
