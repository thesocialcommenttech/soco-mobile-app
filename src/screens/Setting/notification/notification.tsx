import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../utils/colors';

export default function Notification() {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  //   console.log(isEnabled);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.mheader}>Notification</Text>
      </View>
      <View style={styles.mainview}>
        <Text style={styles.boldtext}>Email Preferences</Text>
        <View style={styles.information}>
          <Text style={styles.newsletter}>Newsletter</Text>
          <ToggleSwitch
            isOn={isEnabled}
            onColor="blue"
            offColor="lightgray"
            size="small"
            onToggle={() => setIsEnabled(!isEnabled)}
            trackOffStyle={styles.offtrack}
            trackOnStyle={styles.ontrack}
            thumbOffStyle={styles.thumboff}
            thumbOnStyle={styles.thumbon}
          />
        </View>
        <Text style={styles.newsletterLine}>
          Receive newsletters sent periodically containing best suggested post
          for you
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '8%',
    paddingRight: '5%',
    paddingLeft: '5%',
    backgroundColor: 'white'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    color: '#7D7987',
    fontSize: 17
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  information: {
    marginTop: '4%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  switch: {
    marginTop: '3.5%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: '0.5%'
  },
  newsletter: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    lineHeight: 30
  },
  newsletterLine: {
    lineHeight: 18,
    fontSize: 16,
    marginTop: '4%',
    color: '#BDBDBD'
  },
  offtrack: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2
  },
  ontrack: {
    backgroundColor: Colors.LightSecondary,
    borderColor: 'blue',
    borderWidth: 2
  },
  thumbon: {
    backgroundColor: 'blue',
    marginLeft: '1%'
  },
  thumboff: {
    backgroundColor: 'black'
  },
  mainview: {
    marginTop: '6%'
  },
  row: {
    flexDirection: 'row'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginTop: '0.5%'
  }
});
