import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import Button from '~/src/components/theme/Button';
import { Input, RadioButton } from '~/src/components/theme/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFormik } from 'formik';
import { object, string, date, boolean } from 'yup';
import dayjs from 'dayjs';
import { addPortforlioExperience } from '~/src/utils/services/user-portfolio_services/experience/addPortforlioExperience.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import produce from 'immer';

const addExperienceFormSchema = object({
  title: string().trim().required('Title is required'),
  company: string().trim().required('Company name is required'),
  ongoing: boolean()
    .default(true)
    .oneOf([true, false])
    .required('Currently working is required'),
  from: date().nullable().required('Start date is required'),
  to: date()
    .nullable()
    .when('ongoing', {
      is: false,
      then: date()
        .nullable()
        .required('End date to is required')
        .test({
          test: (value, ctx) => {
            return dayjs(value).isAfter(ctx.parent.from);
          },
          message: 'End date cannot be before start date'
        }),
      otherwise: date().default(null).nullable()
    }),
  description: string().trim().required('Description is required')
});

interface PortfolioExperienceForm {
  title: string;
  company: string;
  ongoing: boolean;
  from: Date | string;
  to: Date | string;
  description: string;
}

export default function AddExperience() {
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

  async function sumbitExperience(values) {
    const result = await addPortforlioExperience({ experience: values });
    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          draft.experience.push(result.data.experience);
        })
      );
      navigation.goBack();
    }
  }

  const formik = useFormik<PortfolioExperienceForm>({
    initialValues: {
      title: '',
      company: '',
      ongoing: true,
      from: null,
      to: null,
      description: ''
    },
    validationSchema: addExperienceFormSchema,
    onSubmit: sumbitExperience
  });

  return (
    <ScrollView>
      <View style={styles.formCt}>
        <Input
          inputProp={{
            placeholder: 'Give Suitable Title',
            onChangeText: formik.handleChange('title'),
            value: formik.values.title,
            onBlur: formik.handleBlur('title')
          }}
          label="Position"
          error={formik.touched.title && formik.errors.title}
        />
        <Input
          label="Company"
          style={styles.MT}
          inputProp={{
            placeholder: 'Company Name',
            onChangeText: formik.handleChange('company'),
            value: formik.values.company,
            onBlur: formik.handleBlur('company')
          }}
          error={formik.touched.company && formik.errors.company}
        />

        <Input
          label="Currently Working"
          style={styles.MT}
          error={formik.touched.ongoing && formik.errors.ongoing}
        >
          {({ style }) => (
            <View
              style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
            >
              <RadioButton
                selected={formik.values.ongoing}
                buttonProps={{
                  fullWidth: true,
                  text: 'Yes',
                  btnStyle: { marginRight: 20 },
                  onPress: () => {
                    formik.setFieldValue('ongoing', true);
                  }
                }}
              />
              <RadioButton
                selected={!formik.values.ongoing}
                buttonProps={{
                  fullWidth: true,
                  text: 'No',
                  btnStyle: { flexGrow: 1 },
                  onPress: () => {
                    formik.setFieldValue('ongoing', false);
                  }
                }}
              />
            </View>
          )}
        </Input>

        <Input
          label="Start Date"
          style={styles.MT}
          onPress={() => {
            formik.setFieldTouched('from');
            openDatePicker(
              formik.values.from as Date,
              async (event, selectedDate) => {
                await formik.setFieldValue('from', selectedDate);
              }
            );
          }}
          inputProp={{
            placeholder: 'dd/mm/yyyy',
            value:
              formik.values.from &&
              dayjs(formik.values.from).format('DD/MM/YYYY'),
            editable: false,
            onChangeText: formik.handleChange('from'),
            onBlur: formik.handleBlur('from')
          }}
          error={formik.touched.from && (formik.errors.from as string)}
          suffix={
            <Button
              size="sm"
              btnStyle={{ alignSelf: 'center', marginRight: -15 }}
              onPress={e => {
                formik.setFieldTouched('from');
                openDatePicker(
                  formik.values.from as Date,
                  async (event, selectedDate) => {
                    await formik.setFieldValue('from', selectedDate);
                  }
                );
              }}
            >
              <MaterialCommunityIcons name="calendar" size={24} />
            </Button>
          }
        />
        {!formik.values.ongoing && (
          <Input
            label="End Date"
            style={styles.MT}
            onPress={() => {
              formik.setFieldTouched('to');
              openDatePicker(
                formik.values.to as Date,
                async (event, selectedDate) => {
                  await formik.setFieldValue('to', selectedDate);
                }
              );
            }}
            inputProp={{
              placeholder: 'dd/mm/yyyy',
              value:
                formik.values.to &&
                dayjs(formik.values.to).format('DD/MM/YYYY'),
              editable: false,
              onChangeText: formik.handleChange('to'),
              onBlur: formik.handleBlur('to')
            }}
            error={formik.touched.to && (formik.errors.to as string)}
            suffix={
              <Button
                size="sm"
                btnStyle={{ alignSelf: 'center', marginRight: -15 }}
                onPress={() => {
                  formik.setFieldTouched('to');
                  openDatePicker(
                    formik.values.to as Date,
                    async (event, selectedDate) => {
                      await formik.setFieldValue('to', selectedDate);
                    }
                  );
                }}
              >
                <MaterialCommunityIcons name="calendar" size={24} />
              </Button>
            }
          />
        )}
        <Input
          label="Description"
          inputProp={{
            placeholder:
              'Write about your Job, description should be short and up to the point',
            multiline: true,
            numberOfLines: 7,
            maxLength: 500,
            style: { textAlignVertical: 'top' },
            onChangeText: formik.handleChange('description'),
            value: formik.values.description,
            onBlur: formik.handleBlur('top')
          }}
          style={styles.MT}
          error={formik.touched.description && formik.errors.description}
        />
        <Button
          type="filled"
          fullWidth
          text="Add"
          processing={formik.isSubmitting}
          disabled={formik.isSubmitting}
          onPress={formik.handleSubmit}
          btnStyle={styles.submitBtn}
        />
      </View>
    </ScrollView>
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
  descriptionInput: {},
  submitBtn: {
    marginTop: 30
  }
});
