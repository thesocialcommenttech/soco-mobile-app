import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { addPortforlioSocialAccounts } from '~/src/utils/services/user-portfolio_services/social-links/addPortforlioSocialAccounts.service';

interface AddSocialAccountForm {
  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export default function AddSocialAccounts() {
  const navigation = useNavigation();
  const { portfolio, setPortfolio } = usePortfolioData();

  const hasSocialAccounts = useMemo(
    () =>
      Object.values(portfolio.social_accounts ?? {}).reduce(
        (p, c) => p || !!c,
        false
      ),
    [portfolio?.social_accounts]
  );

  async function sumbitSocialAccounts(values: AddSocialAccountForm) {
    const result = await addPortforlioSocialAccounts(values);
    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          draft.social_accounts = result.data.social_accounts;
        })
      );
      navigation.goBack();
    }
  }

  const formik = useFormik<AddSocialAccountForm>({
    initialValues: {
      facebook: portfolio.social_accounts?.facebook,
      twitter: portfolio.social_accounts?.twitter,
      linkedin: portfolio.social_accounts?.linkedin,
      github: portfolio.social_accounts?.github,
      instagram: portfolio.social_accounts?.instagram
    },
    validationSchema: object({
      facebook: string().url().trim().nullable(),
      twitter: string().url().trim().nullable(),
      linkedin: string().url().trim().nullable(),
      github: string().url().trim().nullable(),
      instagram: string().url().trim().nullable()
    }),
    onSubmit: sumbitSocialAccounts
  });

  useFocusEffect(
    useCallback(() => {
      if (hasSocialAccounts) {
        navigation.setOptions({
          title: 'Update Social Accounts'
        });
      }
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.formCt}>
      <Input
        inputProp={{
          placeholder: 'https://facebook.com/...',
          onChangeText: formik.handleChange('facebook'),
          value: formik.values.facebook,
          onBlur: formik.handleBlur('facebook')
        }}
        prefix={
          <MaterialCommunityIcons
            style={styles.socialAccIcon}
            name="facebook"
            size={24}
            color="#1877F2"
          />
        }
        label="Facebook"
        error={formik.touched.facebook && formik.errors.facebook}
      />
      <Input
        style={styles.MT}
        inputProp={{
          placeholder: 'https://twitter.com/...',
          onChangeText: formik.handleChange('twitter'),
          value: formik.values.twitter,
          onBlur: formik.handleBlur('twitter')
        }}
        prefix={
          <MaterialCommunityIcons
            style={styles.socialAccIcon}
            name="twitter"
            size={24}
            color="#1DA1F2"
          />
        }
        label="Twitter"
        error={formik.touched.twitter && formik.errors.twitter}
      />
      <Input
        style={styles.MT}
        inputProp={{
          placeholder: 'https://www.linkedin.com/in/...',
          onChangeText: formik.handleChange('linkedin'),
          value: formik.values.linkedin,
          onBlur: formik.handleBlur('linkedin')
        }}
        prefix={
          <MaterialCommunityIcons
            style={styles.socialAccIcon}
            name="linkedin"
            size={24}
            color="#0077B5"
          />
        }
        label="Linkdein"
        error={formik.touched.linkedin && formik.errors.linkedin}
      />
      <Input
        style={styles.MT}
        inputProp={{
          placeholder: 'https://www.instagram.com/...',
          onChangeText: formik.handleChange('instagram'),
          value: formik.values.instagram,
          onBlur: formik.handleBlur('instagram')
        }}
        prefix={
          <MaterialCommunityIcons
            style={styles.socialAccIcon}
            name="instagram"
            size={24}
            color="#C13584"
          />
        }
        label="Instagram"
        error={formik.touched.instagram && formik.errors.instagram}
      />
      <Input
        style={styles.MT}
        inputProp={{
          placeholder: 'https://github.com/...',
          onChangeText: formik.handleChange('github'),
          value: formik.values.github,
          onBlur: formik.handleBlur('github')
        }}
        prefix={
          <MaterialCommunityIcons
            style={styles.socialAccIcon}
            name="github"
            size={24}
            color="#333333"
          />
        }
        label="Github"
        error={formik.touched.github && formik.errors.github}
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
  },
  socialAccIcon: {
    marginLeft: -10,
    marginRight: -10
  }
});
