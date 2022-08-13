import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Data = [
  {
    id: 1,
    subsciption_title: 'Social Comment Premium Subsciption',
    amt: 2499,
    date: '25 Feb,2022',
    time: '11:58pm'
  },
  {
    id: 2,
    subsciption_title: 'Social Comment Premium Subsciption',
    amt: 2499,
    date: '25 Feb,2023',
    time: '11:58pm'
  }
];

export default function Subscriptions() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexrow}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon1 name="arrow-left" size={28} color="black" />
          </TouchableWithoutFeedback>
          <Text style={styles.mheader}>Subscriptions</Text>
        </View>
        {Data.length
          ? [
              <View style={styles.message}>
                <View style={styles.exclamationmark}>
                  <Icon name="exclamationcircleo" size={22} color="black" />
                </View>

                <View style={styles.subtext}>
                  <Text style={styles.activesub}>
                    You have an active premium subscription till
                    <Text style={styles.activesubtext}>
                      {' '}
                      {Data[Data.length - 1].date}
                    </Text>
                    <Text style={styles.activesubtext}>
                      {' '}
                      {Data[Data.length - 1].time}
                    </Text>
                  </Text>
                </View>
              </View>
            ]
          : [
              <View style={styles.mainmessage}>
                <View style={styles.exclamationmark}>
                  <Icon name="exclamationcircleo" size={22} color="black" />
                </View>

                <View style={styles.subtext}>
                  <Text style={styles.activesubtext}>
                    You have no active premium subscription
                  </Text>
                </View>
              </View>
            ]}

        <View style={styles.subsview}>
          <Text style={styles.substext}>Subscriptions history</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={Data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.subdetail}>
                <View>
                  <View>
                    <Text style={styles.subscriptiontitle}>
                      {item.subsciption_title}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.imf}>₹{item.amt}/- </Text>
                      <Text style={styles.imf}> @{item.date}</Text>
                      <Text style={styles.imf}> {item.time}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.downloadbtn}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      console.log('Download Clicked!');
                    }}
                  >
                    <Icon1 name="download-outline" size={24} color="#0063FF" />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '4%',
    paddingTop: '3%',
    backgroundColor: 'white'
  },
  mainmessage: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    marginTop: '2%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  subtext: {
    marginLeft: '2%',
    marginRight: '2.5%'
  },
  exclamationmark: {
    marginRight: '1.5%',
    marginTop: '0.2%'
  },
  subsview: {
    marginTop: '8%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  substext: {
    marginTop: '1%',
    color: '#7D7987',
    fontSize: 15.5
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1.5,
    marginTop: '3%'
  },
  subdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
  },
  downloadbtn: {
    marginTop: '3%',
    marginRight: '2%'
  },
  message: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#FFF4CC',
    marginTop: '2%',
    marginRight: '1%',
    marginLeft: '1%',
    borderRadius: 5
  },
  activesub: {
    fontSize: 14,
    color: 'black',
    marginRight: '1%'
  },
  activesubtext: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    lineHeight: 19
  },
  row: {
    flexDirection: 'row'
  },
  subscriptiontitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '4%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginTop: '0.5%'
  },
  imf: {
    color: '#7D7987',
    marginTop: '1%'
  },
  list: {
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '4%'
  }
});
