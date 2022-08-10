import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  ScrollView
} from 'react-native';
import React, { useState, useRef } from 'react';
import Upi from './upi';
import Bank from './bank';

export default function AddAccount() {
  const translation = useRef(new Animated.Value(0)).current;
  const translation1 = useRef(new Animated.Value(500)).current;
  const [upi, setUpi] = useState(true);
  const [bank, setBank] = useState(false);
  const translateUpi = () => {
    Animated.timing(translation, {
      toValue: -500,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  const translateBank = () => {
    Animated.timing(translation1, {
      toValue: -280,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  const returnUpi = () => {
    Animated.timing(translation, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  const returnBank = () => {
    Animated.timing(translation1, {
      toValue: 500,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.typetext}>Account Type</Text>
      <View style={styles.accountview}>
        <TouchableWithoutFeedback
          onPress={() => {
            setUpi(true);
            setBank(false);
            returnUpi();
            returnBank();
          }}
        >
          <View style={[upi ? styles.selectactive : styles.select]}>
            <Text style={[upi ? styles.intextactive : styles.intextinactive]}>
              UPI
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setUpi(false);
            setBank(true);
            translateUpi();
            translateBank();
          }}
        >
          <View style={[bank ? styles.selectactive : styles.select]}>
            <Text style={[bank ? styles.intextactive : styles.intextinactive]}>
              Bank Account
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.detailtext}>Account detail</Text>
      <View>
        <Animated.View style={{ transform: [{ translateX: translation }] }}>
          <Upi />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translation1 }] }}>
          <Bank />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '4%',
    paddingLeft: '4%',
    paddingRight: '4%',
    backgroundColor: 'white'
  },
  typetext: {
    fontSize: 16,
    color: '#7D7987',
    marginLeft: '4%'
  },
  accountview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  select: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  intextinactive: {
    color: 'black'
  },
  intextactive: {
    color: 'black',
    fontWeight: 'bold'
  },
  selectactive: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: '#FFF4CC',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  detailtext: {
    marginTop: '6%',
    fontSize: 16,
    marginBottom: '-4%',
    marginLeft: '4%',
    color: '#7D7987'
  }
});
