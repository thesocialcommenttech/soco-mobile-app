import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

interface AddEducationForm {
  institute: string;
  status: 'completed' | 'pursuing';
  passYear: Date;
  course: string;
  level: 'school' | 'graduation' | 'postGraduation';
}

export default function AddEducation() {
  const navigation = useNavigation();
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
    const result = await addPortforlioEducation({ education: values });
    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          draft.education.push(result.data.education);
        })
      );
      navigation.goBack();
    }
  }

  const formik = useFormik<AddEducationForm>({
    initialValues: {
      institute: 'college engiing 2',
      status: 'completed',
      passYear: null,
      course: 'B.tech',
      level: 'graduation'
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
        text="Add"
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
