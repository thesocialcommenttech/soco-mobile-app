import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import ReferalList from '../../../components/settingsComponents/referalsList';
import Clipboard from '@react-native-clipboard/clipboard';

const Data = [
  {
    id: 101,
    title: 'Hello',
    userId: 'HelloWorld',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    prime: false
  },
  {
    id: 102,
    title: 'Jay',
    userId: 'Jaymistry',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    prime: true
  },
  {
    id: 103,
    title: 'Nishith',
    userId: 'Nishith119',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    prime: true
  },
  {
    id: 104,
    title: 'Ramu',
    userId: 'ramchandra',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    prime: false
  }
];

export default function Referals() {
  const [code] = useState('5UYRCH');

  const copyToClipboard = text => {
    Clipboard.setString(text);
  };

  const showToast = () => {
    ToastAndroid.show('Code copied to Clipboard', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.label}>
          <Text style={styles.heading}>Your Refferal Code</Text>
        </View>
        <View style={styles.codebox}>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard(code);
              showToast();
            }}
          >
            <Text style={styles.code}>{code}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.incentiveview}>
        <Text style={styles.share}>
          Share this code with your Friends.If anybody uses this code at the
          time of registration to socialcomment you will receive exciting
          incentives.
        </Text>
      </View>
      <View style={styles.codeused}>
        <Text style={styles.instruction}>Refferal Code used </Text>
        <Text style={styles.Code}>6YUOED</Text>
      </View>
      <View style={styles.refferals}>
        <Text style={styles.boldtext}>Your Refferals</Text>
      </View>
      <View style={styles.bottomruler} />
      <View>
        <FlatList
          data={Data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ReferalList
              title={item.title}
              userId={item.userId}
              image={item.image}
              prime={item.prime}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%'
  },
  box: {
    borderWidth: 1,
    borderColor: '#1563E2',
    margin: '2.5%',
    borderRadius: 10
  },
  label: {
    marginTop: '-5%',
    marginLeft: '2.5%',
    marginRight: '1%',
    zIndex: 999,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 9,
    paddingBottom: 3
  },
  heading: {
    color: 'black',
    fontSize: 15
  },
  code: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 3
  },
  codebox: {
    marginTop: '0%',
    marginBottom: '3%',
    padding: '1%'
  },
  incentiveview: {
    margin: '2.7%'
  },
  share: {
    color: 'black',
    lineHeight: 19
  },
  codeused: {
    marginLeft: '2.5%',
    flexDirection: 'row'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '900',
    color: 'black',
    fontSize: 17
  },
  refferals: {
    marginTop: '3%',
    marginLeft: '2.5%'
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1,
    marginTop: '2%',
    marginLeft: '2.5%',
    marginRight: '2.5%'
  },
  Code: {
    color: '#1563E2'
  },
  instruction: {
    color: 'black'
  }
});
