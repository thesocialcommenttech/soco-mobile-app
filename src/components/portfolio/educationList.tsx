import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal1 from 'react-native-modal';

export default function EducationList({ ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
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
                <Icon2 name="pencil-outline" size={22} color="black" />
                <Text style={styles.optiontext}>Edit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <Icon2 name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <View style={styles.degreeview}>
        <View style={styles.row}>
          <Text style={styles.degree}>{props.degree}</Text>
          {props.present
            ? [
                <View style={styles.presentview}>
                  <Text style={styles.presenttext}>Present</Text>
                </View>
              ]
            : [<Text style={styles.date}>{props.date}</Text>]}
        </View>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <Icon1 name="ellipsis-v" size={17} color="#BDBDBD" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.details}>{props.information}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  degreeview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8%'
  },
  row: {
    flexDirection: 'row'
  },
  degree: {
    color: '#0063FF',
    marginTop: 1,
    fontSize: 16
  },
  presenttext: {
    color: '#B88F00',
    marginTop: 2,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 2
  },
  details: {
    color: 'black',
    marginTop: 8,
    lineHeight: 17,
    fontSize: 16
  },
  date: {
    color: '#7D7987',
    marginLeft: 9,
    marginTop: 2.3
  },
  presentview: {
    backgroundColor: '#FFF7DB',
    borderRadius: 10,
    marginLeft: 9
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
