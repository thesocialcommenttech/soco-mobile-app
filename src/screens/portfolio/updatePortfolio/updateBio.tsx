import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

  return (
    <>
      {/* <View style={styles.updatebioheader}>
        <Text style={styles.updatebiotxt}>Update Bio</Text>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon1 name="close" size={25} color="#C9D1D8" />
        </TouchableWithoutFeedback>
      </View> */}
      {/* <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      ></TouchableWithoutFeedback> */}
      <View style={styles.updatebioview}>
        {/* <View style={}></View> */}
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
        {/* <View style={styles.button}>
            <TouchableWithoutFeedback>
              <Text style={styles.btnText}>Save</Text>
            </TouchableWithoutFeedback>
          </View> */}
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
    </>
  );
}

const styles = StyleSheet.create({
  updatebioview: {
    flex: 1,
    padding: 20
    // backgroundColor: 'white',
    // height: '100%'
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
  textinputview: {
    // borderWidth: 1,
    // borderColor: '#99969F',
    // borderRadius: 5,
    // marginLeft: '5%',
    // marginRight: '5%',
    // marginTop: 25
  },
  button: {
    marginTop: 30
    // marginBottom: '7%',
    // marginLeft: '5%',
    // marginRight: '5%',
    // paddingTop: 15,
    // paddingBottom: 15,
    // backgroundColor: '#0063FF',
    // borderRadius: 5,
    // alignItems: 'center'
  }
  // btnText: {
  //   color: '#FFFFFF',
  //   fontWeight: '500'
  // }
});
