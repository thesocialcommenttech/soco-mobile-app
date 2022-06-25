import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { getNotifications } from '../../utils/services/notification_services/getNotifications.service';

const UNREAD = [
  {
    id: 1,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 2,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 3,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 4,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 5,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 6,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 7,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  }
];
const READ = [
  {
    id: 1,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 2,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 3,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 4,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 5,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 6,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  },
  {
    id: 7,
    username: '@akshay',
    title: 'How to Minimize Fatigue During Virtual Meetings?',
    time: '1 hour ago'
  }
];

const NotificationsScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('User');

  useEffect(() => {
    const fetchData = async () => {
      const gn = await getNotifications();
      return { gn: gn };
    };
    fetchData()
      .then(res => {
        console.log('gn', res);
      })
      .catch(err => {
        console.log('Notifs', err.response);
      });
  }, [clicked]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name="arrow-left"
          size={25}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}
        />
        <View style={styles.head}>
          <Text style={styles.headerText}>Notifications</Text>
          <TouchableOpacity
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            <MaterialCommunityIcon name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.util}>
          <Text style={styles.utilText}>Unread</Text>
        </View>
        <View style={styles.unread}>
          {UNREAD.map(item => {
            return (
              <View style={styles.notification} key={item.id}>
                <View style={styles.notificationTime}>
                  <Text style={styles.notificationTimeText}>{item.time}</Text>
                </View>
                <View style={styles.notificationTitle}>
                  <Text style={styles.notificationUserText}>
                    {item.username}
                    <Text style={styles.notificationText}>
                      {' posted a new blog '}
                    </Text>
                    <Text style={styles.notificationTitleText}>
                      {item.title}
                    </Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.util}>
          <Text style={styles.utilText}>Read</Text>
        </View>
        <View style={styles.read}>
          {UNREAD.map(item => {
            return (
              <View style={styles.notification} key={item.id}>
                <View style={styles.notificationTime}>
                  <Text style={styles.notificationTimeText}>{item.time}</Text>
                </View>
                <View style={styles.notificationTitle}>
                  <Text style={styles.notificationUserText}>
                    {item.username}
                    <Text style={styles.notificationText}>
                      {' posted a new blog '}
                    </Text>
                    <Text style={styles.notificationTitleText}>
                      {item.title}
                    </Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: '5%'
    paddingVertical: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '5%'
  },
  backIcon: {
    marginLeft: '5%'
    // backgroundColor: '#000'
  },
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  },
  util: {
    marginLeft: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5%'
  },
  utilText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: '#000'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '78%',
    // backgroundColor: 'gray',
    marginLeft: '5%'
  },
  notification: {
    paddingVertical: '3%',
    paddingHorizontal: '5%'
  },
  unread: {
    // maxHeight: '50%',
    backgroundColor: '#fff7db'
  },
  read: {
    // maxHeight: '50%',
    backgroundColor: 'white'
  },
  notificationTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  notificationTimeText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  notificationTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap'
  },
  notificationUserText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.Secondary,
    lineHeight: 20
  },

  notificationText: {
    color: Colors.Black
  },
  notificationTitleText: {
    color: Colors.Gray600
  }
});
