import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import { useFormik } from 'formik';
import { addPortforlioSkill } from '~/src/utils/services/user-portfolio_services/skills/addPortforlioSkill.service';
import { number, object, string } from 'yup';
import produce from 'immer';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { Input } from '~/src/components/theme/Input';
import { Black, Blue, Yellow } from '~/src/utils/colors';
import { Slider } from '@rneui/themed';
import { PortfolioSubScreen_ScreenProps } from '~/src/types/navigation/portfolio';
import { updatePortforlioSkill } from '~/src/utils/services/user-portfolio_services/skills/updatePortforlioSkill.service';
// import Slider from 'react-native-slider';

interface addSkillForm {
  skill: string;
  level: number;
}

export default function AddSkill() {
  const navigation =
    useNavigation<PortfolioSubScreen_ScreenProps<'Addskill'>['navigation']>();
  const route = useRoute<PortfolioSubScreen_ScreenProps<'Addskill'>['route']>();
  const isEdit = useMemo(() => !!route.params?.data, [route.params?.data]);

  const { portfolio, setPortfolio } = usePortfolioData();

  async function sumbitSkill(values: addSkillForm) {
    const result = await (() => {
      if (isEdit) {
        return updatePortforlioSkill({
          skill: values,
          indexID: route.params.data._id
        });
      } else {
        return addPortforlioSkill({ skill: values });
      }
    })();
    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          if (isEdit) {
            const index = draft.skill.findIndex(
              ed => ed._id === route.params.data._id
            );

            // updating only the changed keys
            for (const key in result.data.skill) {
              draft.skill[index][key] = result.data.skill[key];
            }

            return;
          }

          draft.skill.push(result.data.skill);
        })
      );
      navigation.goBack();
    }
  }

  const formik = useFormik<addSkillForm>({
    initialValues: { skill: '', level: 0 },
    validationSchema: object({
      skill: string().trim().required('Skill is required'),
      level: number()
        .min(1, 'Skill level must be greater then 0')
        .required('Skill level is required')
    }),
    onSubmit: sumbitSkill
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params?.data) {
        const skill = route.params.data;
        formik.setValues({
          level: skill.level,
          skill: skill.skill
        });
      }
    }, [route.params?.data])
  );

  return (
    <View style={styles.formCt}>
      <Input
        inputProp={{
          placeholder: 'Skill title',
          onChangeText: formik.handleChange('skill'),
          value: formik.values.skill,
          onBlur: formik.handleBlur('skill')
        }}
        label="Skill"
        error={formik.touched.skill && formik.errors.skill}
      />

      <Input
        label="Skill Level"
        style={styles.MT}
        error={formik.touched.level && formik.errors.level}
      >
        {({ style }) => (
          <View style={[style, styles.sliderview]}>
            <Slider
              style={styles.sliderdesign}
              minimumValue={0}
              maximumValue={100}
              // value={formik.values.level}
              thumbStyle={styles.thumb}
              thumbProps={{
                children: (
                  <Text style={{ fontSize: 12, color: 'black' }}>
                    {(formik.values.level / 10).toFixed(1)}
                  </Text>
                )
              }}
              minimumTrackTintColor={Blue.primary}
              maximumTrackTintColor={Black[300]}
              thumbTintColor={'white'}
              onValueChange={value => formik.setFieldValue('level', value)}
              allowTouchTrack={true}
              animateTransitions={true}
              step={1}
            />
            <View style={styles.skillnumber}>
              <Text style={styles.skillnumtext}>0</Text>
              <Text style={styles.skillnumtext}>10</Text>
            </View>
          </View>
        )}
      </Input>
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
  );
}

const styles = StyleSheet.create({
  sliderview: {
    paddingTop: 20,
    paddingBottom: 15
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    elevation: 5
  },
  skillnumber: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skillnumtext: {
    color: Black[400],
    fontSize: 12
  },
  sliderdesign: {
    height: 25
  },
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
