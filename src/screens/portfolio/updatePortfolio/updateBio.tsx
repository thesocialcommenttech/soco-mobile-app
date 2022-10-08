import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import { Input } from '~/src/components/theme/Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { addPortforlioBio } from '~/src/utils/services/user-portfolio_services/bio/addPortforlioBio.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';

export default function UpdateBio() {
  const navigation = useNavigation();
  const { portfolio, setPortfolio } = usePortfolioData();

  const formik = useFormik({
    initialValues: { bio: portfolio.bio ?? '' },
    validationSchema: object({
      bio: string().trim().required('Bio can left blank')
    }),
    onSubmit: async values => {
      const result = await addPortforlioBio(values.bio);
      if (result.data.success) {
        portfolio.bio = values.bio;
        setPortfolio({ ...portfolio });
        navigation.goBack();
      }
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (!portfolio.bio) {
        navigation.setOptions({
          title: 'Add Bio'
        });
      }
    }, [])
  );

  return (
    <View style={styles.updatebioview}>
      <Input
        style={styles.textinputview}
        inputProp={{
          style: styles.textinput,
          value: formik.values.bio,
          onChangeText: formik.handleChange('bio'),
          placeholder: 'Write about yourself',
          numberOfLines: 8,
          multiline: true
        }}
      />
      <Button
        fullWidth
        type="filled"
        processing={formik.isSubmitting}
        disabled={formik.isSubmitting}
        onPress={formik.handleSubmit}
        text="Save"
        btnStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  updatebioview: {
    flex: 1,
    padding: 20
  },
  updatebioheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updatebiotxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  textinput: {
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingLeft: 20,
    fontSize: 16,
    color: 'black'
  },
  textinputview: {},
  button: {
    marginTop: 30
  }
});
