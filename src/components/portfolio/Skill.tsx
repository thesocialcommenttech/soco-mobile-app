import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle
} from 'react-native';
import React, { useState } from 'react';
import ProgressCircle from 'react-native-progress-circle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal1 from 'react-native-modal';
import Button from '../theme/Button';
import { Black, Blue } from '~/src/utils/colors';
import { ISkill } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';

export default function Skill(props: {
  data: ISkill;
  style?: StyleProp<ViewStyle>;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, props.style]}>
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
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={22}
                  color="black"
                />
                <Text style={styles.optiontext}>Edit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <MaterialCommunityIcons name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <View style={styles.progresscont}>
        <View style={styles.progress}>
          <ProgressCircle
            percent={props.data.level}
            radius={20}
            borderWidth={4}
            color={Blue.primary}
            shadowColor={Blue[100]}
            bgColor="white"
          />
        </View>
        <View style={styles.skillInfo}>
          <Text style={styles.skill}>{props.data.skill}</Text>
          <Text style={styles.rating}>{props.data.level / 10} / 10</Text>
        </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progress: {
    transform: [{ rotateY: '180deg' }]
  },
  progresscont: {
    flexDirection: 'row',
    marginRight: 45
  },
  skillInfo: { marginLeft: 20 },
  skill: {
    color: 'black',
    fontSize: 16
  },
  rating: {
    color: Black[600],
    marginTop: 2
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
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
