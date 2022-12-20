import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Black, Colors } from '../../utils/colors';
import { updateBio } from '~/src/utils/services/user-profile_service/updateBio.service';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import { Input } from '~/src/components/theme/Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import Button from '~/src/components/theme/Button';
import { useNavigation } from '@react-navigation/native';
import { IRoot_ScreenProps } from '~/src/types/navigation/root';

function BioScreen() {
  const navigation = useNavigation<IRoot_ScreenProps['navigation']>();

  async function submitUserBio({ bio }) {
    try {
      const result = await updateBio({ bio });
      if (result.data.success) {
        navigation.replace('main');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: { bio: '' },
    validationSchema: object({
      bio: string().trim().required('Bio is required')
    }),
    onSubmit: submitUserBio
  });

  return (
    <>
      <OptionalStackHeader
        onProceed={formik.handleSubmit}
        onSkip={() => navigation.replace('main')}
        formStage={OptionalFormStage.ADD_BIO}
        disableProceed={formik.isSubmitting}
        disableSkip={formik.isSubmitting}
        proceedLabel="DONE"
      />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Add Your Bio</Text>
        <Input
          style={styles.bioInput}
          inputProp={{
            value: formik.values.bio,
            style: { textAlignVertical: 'top' },
            maxLength: 150,
            multiline: true,
            numberOfLines: 10,
            placeholder: 'Write about yourself',
            onChangeText: formik.handleChange('bio')
          }}
          error={formik.touched.bio && (formik.errors.bio as string)}
        />
        <Text style={styles.maxChar1}>
          Max Characters: {formik.values.bio?.length ?? 0}/150
        </Text>
        <Button
          type="outlined"
          fullWidth
          btnStyle={styles.updateImgBtn}
          processing={formik.isSubmitting}
          disabled={formik.isSubmitting}
          onPress={formik.handleSubmit}
          text="Add Bio"
        />
      </View>
    </>
  );
}

export default BioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20
  },
  titleTxt: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    textAlign: 'center'
  },
  bioInput: {
    marginTop: '8%',
    width: '100%'
  },
  maxChar1: {
    marginTop: 10,
    color: Black[500],
    // fontFamily: 'Roboto-Medium',
    alignSelf: 'flex-start'
  },
  updateImgBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: '100%'
  },
  updateImgTxt: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    padding: 10
  },
  disableBtn: {
    paddingVertical: 12,
    borderColor: Colors.Gray200
  }
});
