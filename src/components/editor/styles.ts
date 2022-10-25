import { StyleSheet } from 'react-native';
import { Black, Blue } from '~/src/utils/colors';

export default {
  heading1: {
    color: 'black',
    fontSize: 23,
    fontFamily: 'Roboto-Medium',
    marginTop: 16,
    marginBottom: 10
    // lineHeight: 30,
  },
  heading2: {
    color: 'black',
    fontSize: 21,
    marginTop: 16,
    marginBottom: 10
  },
  text: {
    color: Black[800],
    fontSize: 16,
    lineHeight: 24
    // flexWrap: 'wrap'
  },
  textgroup: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    // alignItems: 'flex-start'
  },
  paragraph: { marginBottom: 10, marginTop: 0 },
  paragraph_before_paragaraph: { marginTop: 20 },
  link: { color: Blue.primary },
  ordered_list: { marginBottom: 10 },
  bullet_list: { marginBottom: 10 },
  bullet_list_icon: {
    width: 5,
    height: 5,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 100
  },
  ordered_list_icon: {
    // marginTop: 2,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: Black[500]
  },
  image: {
    // marginVertical: 10,
    flex: 0
  },
  fence: {
    backgroundColor: Black.primary,
    borderWidth: null,
    color: 'white'
  },
  sup: {
    fontSize: 11,
    // marginTop: -5
    // lineHeight: 16
    transform: [{ translateY: 0 }]
  },
  sub: {
    fontSize: 11,
    // marginTop: 5
    // lineHeight: 30
    transform: [{ translateY: 10 }]
  },
  strong: {
    fontWeight: 'normal',
    fontFamily: 'Roboto-Medium'
  },
  insert: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  }
} as StyleSheet.NamedStyles<any>;
