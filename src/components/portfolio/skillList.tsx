import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import ProgressCircle from 'react-native-progress-circle';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal1 from 'react-native-modal';

export default function SkillList({ ...props }) {
  const percentage = (props.rating / 10) * 100;
  const [modalVisible, setModalVisible] = useState(false);

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
      <View style={styles.progresscont}>
        <View style={styles.progress}>
          <ProgressCircle
            percent={percentage}
            radius={25}
            borderWidth={4.5}
            color="#0063FF"
            shadowColor="#E0EBFF"
            bgColor="#fff"
          />
        </View>
        <View>
          <Text style={styles.skill}>{props.skill}</Text>
          <Text style={styles.rating}>{props.rating}/10</Text>
        </View>
      </View>
      <View style={styles.option}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <Icon1 name="ellipsis-v" size={17} color="#BDBDBD" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    marginBottom: '1%'
  },
  progress: {
    transform: [{ rotateY: '180deg' }],
    alignSelf: 'flex-start',
    marginTop: '2%'
  },
  progresscont: {
    flexDirection: 'row'
  },
  skill: {
    color: '#000000',
    fontSize: 16,
    marginTop: '3%',
    marginLeft: 18
  },
  rating: {
    color: '#7D7987',
    fontSize: 16,
    marginTop: '3%',
    marginLeft: 18
  },
  option: {
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
