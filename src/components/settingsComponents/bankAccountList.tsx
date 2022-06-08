import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BankAccountList({ ...props }) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        {props.information === 'bank'
          ? [<Icon name="bank" size={26} color="gray" />]
          : [
              <Image
                style={styles.image}
                source={require('../../assets/images/icons/UPI.png')}
              />
            ]}
        <View>
          <Text
            style={
              props.information === 'bank'
                ? styles.detailtextbank
                : styles.detailtext
            }
          >
            {props.detail}
          </Text>
        </View>
      </View>
      <View>
        <TouchableWithoutFeedback>
          <Icon name="dots-vertical" size={22} color="gray" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    marginTop: '1%'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailtext: {
    fontSize: 15.5,
    color: 'black',
    marginLeft: '5%'
  },
  detailtextbank: {
    fontSize: 15.5,
    color: 'black',
    marginLeft: '16.7%',
    marginTop: '0.5%'
  },
  image: {
    marginLeft: '2%',
    marginTop: '4%'
  }
});
