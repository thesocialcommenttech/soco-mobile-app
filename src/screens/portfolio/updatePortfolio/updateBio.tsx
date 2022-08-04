import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function UpdateBio() {
  const navigation = useNavigation();
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.updatebioview}>
          <View style={styles.updatebioheader}>
            <Text style={styles.updatebiotxt}>Update Bio</Text>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <Icon1 name="close" size={25} color="#C9D1D8" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.textinputview}>
            <TextInput
              style={styles.textinput}
              placeholder={'Write about yourself'}
              numberOfLines={8}
              multiline={true}
              placeholderTextColor="#99969F"
            />
          </View>
          <View style={styles.button}>
            <TouchableWithoutFeedback>
              <Text style={styles.btnText}>Save</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  updatebioview: {
    backgroundColor: 'white',
    flex: 1
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
    borderWidth: 1,
    borderColor: '#99969F',
    borderRadius: 5,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 25
  },
  button: {
    marginTop: '7%',
    marginBottom: '7%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  }
});
