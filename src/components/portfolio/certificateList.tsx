import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

export default function CertificateList({ ...props }) {
  return (
    <View style={styles.list}>
      <View style={styles.imageview}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: props.uri
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.certificate}>
          <View style={styles.row}>
            <Text style={styles.certificatetext}>Certificate</Text>
            <TouchableWithoutFeedback>
              <Icon name="external-link" size={24} color="#0063FF" />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={props.toggleModal}>
            <Icon1 name="ellipsis-v" size={17} color="#BDBDBD" />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.imf}>{props.company}</Text>
        <Text style={styles.imf}>Issued on {props.date}</Text>
        <Text style={styles.imf}># {props.code}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 90
  },
  list: {
    flexDirection: 'row',
    marginTop: '4%',
    marginLeft: '2%'
  },
  imageview: {},
  content: {
    flex: 1,
    marginRight: '3%',
    marginLeft: '3%'
  },
  imf: {
    color: '#7D7987',
    lineHeight: 18,
    marginTop: 5,
    fontSize: 15.5
  },
  certificate: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  certificatetext: {
    color: 'black'
  }
});
