import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Experiencelist from '../../components/portfolio/experiencelist';
import Modal1 from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const Data = [
  {
    id: 1,
    title: 'Internship in CVision.ai',
    date: 'Aug, 2019 — Sep, 2019',
    detail:
      'I am hired as a developer intern, my task is to build there web appwhich is GUI to run there AI model. Full web app is designed anddeveloped by me in react.'
  },
  {
    id: 2,
    title: 'Internship in CVision.ai',
    date: 'Aug, 2019 — Sep, 2019',
    detail:
      'I am hired as a developer intern, my task is to build there web appwhich is GUI to run there AI model. Full web app is designed anddeveloped by me in react.'
  },
  {
    id: 3,
    title: 'Tech Lead in shopoasis',
    date: 'Aug, 2019 — Sep, 2019',
    detail:
      'My work is to design and develop their e-commerce website. Also has the responsibility to create a scaleable architecture. Also to maintain the seller tools. And make sure it is easy to use for their sellers.'
  },
  {
    id: 4,
    title: 'Tech Lead in shopoasis',
    date: 'Aug, 2019 — Sep, 2019',
    detail:
      'My work is to design and develop their e-commerce website. Also has the responsibility to create a scaleable architecture. Also to maintain the seller tools. And make sure it is easy to use for their sellers.'
  }
];

export default function Experiences({ ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      //Alert.alert('Screen was focused');
      props.extraData('Experience');
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
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Experiencelist
            title={item.title}
            date={item.date}
            detail={item.detail}
            toggleModal={toggleModal}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5.5%',
    marginRight: '7%',
    marginTop: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
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
  }
});
