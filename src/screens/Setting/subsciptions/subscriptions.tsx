import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList
} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../utils/colors';

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
  return (
    <>
      <View style={styles.container}>
        {Data.length
          ? [
              <View style={styles.message}>
                <View style={styles.exclamationmark}>
                  <AntDesignIcon
                    name="exclamationcircleo"
                    size={22}
                    color="black"
                  />
                </View>

                <View style={styles.subtext}>
                  <Text style={styles.activesub}>
                    You have an active premium subscription valid till
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
                  <AntDesignIcon
                    name="exclamationcircleo"
                    size={22}
                    color="black"
                  />
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
        <View style={styles.bottomruler} />
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
                    <Text>₹{item.amt}/- </Text>
                    <Text> @{item.date}</Text>
                    <Text> {item.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.downloadbtn}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log('Download Clicked!');
                  }}
                >
                  <AntDesignIcon name="download" size={18} color="blue" />
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%'
  },
  mainmessage: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Colors.BottomRulerColor,
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
    marginTop: '3%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  substext: {
    marginTop: '1%'
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1.5,
    marginTop: '3%'
  },
  subdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%'
  },
  downloadbtn: {
    marginTop: '3%',
    marginRight: '2%'
  },
  message: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Colors.LightPrimary,
    marginTop: '2%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  activesub: {
    fontSize: 14,
    color: 'black'
  },
  activesubtext: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row'
  },
  subscriptiontitle: {
    color: 'black',
    fontWeight: 'bold'
  }
});
