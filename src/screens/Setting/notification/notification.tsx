import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors } from '../../../utils/colors';

export default function Notification() {
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  //   console.log(isEnabled);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldtext}>Email Preferences</Text>

        <View style={styles.bottomruler} />
        <View style={styles.information}>
          <Text style={styles.newsletter}>Newsletter</Text>
          <Text style={styles.newsletterLine}>
            Receive newsletters sent periodically containing best suggested post
            for you
          </Text>
        </View>
        <View style={styles.switch}>
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
          {isEnabled
            ? [<FeatherIcon name="check" size={22} color="green" />]
            : []}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '1%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '900',
    color: 'black',
    fontSize: 17
  },
  header: {
    margin: '1.5%'
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  information: {
    marginTop: '2%'
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
    fontSize: 16
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
  }
});
