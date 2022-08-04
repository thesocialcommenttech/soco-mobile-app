import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AddWork from '../../../components/portfolio/addWork';

const Data = [
  {
    key: 1,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Wear a mask bonk ban workout walk negronis bumping elbows and tapping feet fine dining ready made meals close contact.'
  },
  {
    key: 2,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Aged 60 dressing 30 conservative in your old age playing bridge RV roadtrips just call it weed still paying in cash lifestyle villages so whats the damage? semi-retired.'
  },
  {
    key: 3,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Wellness holotropic breathwork colon hydrotherapy what is wellness anyway? Im gluten free infrared sauna blanket super elixer.'
  },
  {
    key: 4,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Perplexed retail investor discount window lending wall street liquidity all about the Benjamins.'
  },
  {
    key: 5,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'High vis vest backyard builder safety first scissor lift coffee break.'
  },
  {
    key: 6,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Tequilla and lime chicken three hat restaurant artisnal anything flame grilled campers duck pancakes a la carte.'
  },
  {
    key: 7,
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    text: 'Crystal waters cruise insider shore tours romance at sea whale shark diving back packers Vanuatu not quite Fiji the scenic route.'
  }
  // {
  //   key: 8,
  //   uri: 'https://reactnative.dev/img/tiny_logo.png',
  //   text: 'Cinnamon wine tasting old world favorite French chardonnay quit hating on Merlot ask the sommelier I never drink anything with a screw cap new world wines the wine maker.'
  // }
];

export default function AddBlog() {
  const navigation = useNavigation();
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.blogview}>
            <View style={styles.updatebioheader}>
              <Text style={styles.updatebiotxt}>Add Blog</Text>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon1 name="close" size={25} color="#C9D1D8" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.addblogview}>
              <ScrollView>
                <FlatList
                  data={Data}
                  keyExtractor={item => item.key.toString()}
                  renderItem={({ item }) => (
                    <AddWork uri={item.uri} text={item.text} />
                  )}
                />
              </ScrollView>
            </View>
            <View style={styles.addblogbutton}>
              <TouchableWithoutFeedback>
                <Text style={styles.btnText}>Add</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  updatebioheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updatebiotxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  addblogbutton: {
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  },
  addblogview: {
    flexDirection: 'row',
    marginTop: '3%',
    marginLeft: '1%',
    marginRight: '1%',
    justifyContent: 'space-between',
    flex: 1
  },
  blogview: {
    backgroundColor: 'white',
    flex: 1
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  }
});
