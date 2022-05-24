import { StyleSheet, Text, View, Switch } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function notification() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(isEnabled);
  };

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
          <Switch
            trackColor={{ false: '#767577', true: '#E0EBFF' }}
            thumbColor={isEnabled ? '#1563E2' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          {isEnabled ? [<Icon name="check" size={22} color="green" />] : []}
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
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  information: {
    marginTop: '2%'
  },
  switch: {
    marginTop: '2.5%',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  newsletter: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    lineHeight: 30
  },
  newsletterLine: {
    lineHeight: 18
  }
});
