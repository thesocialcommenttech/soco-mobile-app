import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import CertificateList from '../../components/portfolio/certificateList';
import Modal1 from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const Data = [
  {
    id: 1,
    company: 'Google',
    date: 'Jan 2022',
    code: 'ASCXC7899',
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 2,
    company: 'Google',
    date: 'Jan 2022',
    code: 'ASCXC7899',
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 3,
    company: 'Google',
    date: 'Jan 2022',
    code: 'ASCXC7899',
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 4,
    company: 'Google',
    date: 'Jan 2022',
    code: 'ASCXC7899',
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 5,
    company: 'Google',
    date: 'Jan 2022',
    code: 'ASCXC7899',
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  }
];

export default function Certifications({ ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useFocusEffect(
    React.useCallback(() => {
      //Alert.alert('Screen was focused');
      props.extraData('Certificates');
      return () => {
        //Alert.alert('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [props])
  );
  return (
    <View style={styles.container}>
      <Modal1
        isVisible={modalVisible}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible(false)}
      >
        <>
          <View style={styles.optionview}>
            <TouchableWithoutFeedback
            // onPress={() => {
            //   chooseFile('photo');
            //   setModalVisible1(false);
            // }}
            >
              <View style={styles.modalrow}>
                <Icon1 name="pencil-outline" size={22} color="black" />
                <Text style={styles.optiontext}>Edit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <Icon1 name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <View style={styles.list}>
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CertificateList
              company={item.company}
              date={item.date}
              code={item.code}
              uri={item.uri}
              toggleModal={toggleModal}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%'
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  }
});
