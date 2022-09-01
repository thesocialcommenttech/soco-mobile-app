import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import React, { useState } from 'react';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal1 from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Yellow } from '~/src/utils/colors';
import Button from '../theme/Button';
import { IEducation } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import dayjs from 'dayjs';

export default function Education(props: {
  data: IEducation;
  style?: StyleProp<ViewStyle>;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={props.style}>
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
      <View style={styles.educationInfo}>
        <View style={styles.courseCt}>
          <Text style={styles.degree}>{props.data.course}</Text>
          {props.data.status === 'completed' ? (
            <Text style={styles.passYear}>
              {dayjs(props.data.passYear).format('MMM YYYY')}
            </Text>
          ) : (
            <Text style={styles.pursuingTag}>Pursuing</Text>
          )}
        </View>
        <Text style={styles.instituteName}>{props.data.institute}</Text>
      </View>
      <Button
        size="sm"
        onPress={() => {
          // props.toggleModal();
        }}
        btnStyle={styles.dropdownBtn}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={17}
          color={Black[600]}
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  educationInfo: {
    marginRight: 45
  },
  courseCt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  degree: {
    color: Blue.primary,
    // marginTop: 1,
    fontSize: 16
  },
  pursuingTag: {
    color: Yellow[700],
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: Yellow[100],
    marginLeft: 5
  },
  instituteName: {
    color: 'black',
    marginTop: 3
  },
  passYear: {
    color: Black[600],
    marginLeft: 5
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
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
