import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import TopBar from '../../components/topBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { Avatar, Card } from '@rneui/base';

const HomeScreen = ({ navigation }) => {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [isPremium] = useState(true);
  const [percentProfile] = useState(75);
  const cardContents = [
    {
      id: '1',
      name: 'John Doe',
      profilePic: profile,
      postImage: 'https://miro.medium.com/max/700/0*3-Nb4RXyrsq-nnXE',
      postTitle: 'Python - An Installation Guide',
      subTitle: '',
      postDate: '24 Feb, 2022',
      postTag: 'Artwork',
      views: 26
    },
    {
      id: '2',
      name: 'John Doe',
      profilePic: profile,
      postImage:
        'https://www.ucl.ac.uk/students/sites/students/files/plants.png',
      postTitle: 'Python - An Installation Guide',
      subTitle:
        "Trumpthechumps Mango Mussolini I'm with Her tangerine tornado The Clown Prince if Ivanka weren't my daughter...",
      postDate: '24 Feb, 2022',
      postTag: 'Blog',
      views: 26
    },
    {
      id: '3',
      name: 'John Doe',
      profilePic: profile,
      postImage: 'https://miro.medium.com/max/700/0*3-Nb4RXyrsq-nnXE',
      postTitle: 'Python - An Installation Guide',
      subTitle: '',
      postDate: '24 Feb, 2022',
      postTag: 'Artwork',
      views: 26
    }
  ];
  return (
    <View style={styles.outerContainer}>
      <TopBar
        uri={profile}
        username={name}
        premium={isPremium}
        percentProfile={percentProfile}
        navigation={navigation}
      />
      <ScrollView>
        {cardContents.map((u, i) => {
          return (
            <Card key={i} containerStyle={styles.cardContainer}>
              <View>
                <View style={styles.cardTitle}>
                  <View style={styles.profileinfo}>
                    <Avatar
                      size={36}
                      rounded
                      // title={name?.charAt(0)}
                      // titleStyle={styles.avatarTitle}
                      source={{
                        uri: u.profilePic
                      }}
                      activeOpacity={0.7}
                      containerStyle={styles.avatar2}
                    />
                    <Text style={styles.cardTitleText}>{u.name}</Text>
                  </View>
                  <TouchableOpacity>
                    <Icon
                      name="share-variant-outline"
                      size={20}
                      color="#7D7987"
                    />
                  </TouchableOpacity>
                </View>
                <View key={i} style={styles.mainContent}>
                  <Image
                    style={styles.postPic}
                    resizeMode="cover"
                    source={{ uri: u.postImage }}
                  />
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>{u.postTitle}</Text>
                </View>
                {u.subTitle !== '' && (
                  <Text style={styles.subTitle}>{u.subTitle}</Text>
                )}
                <View style={styles.cardFooter2}>
                  <Text style={styles.cardFooterText2}>{u.postDate}</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{u.postTag}</Text>
                  </View>
                  <View style={styles.eyeView}>
                    <Icon3 name="eye-outline" size={19} color="#7D7987" />
                    <Text style={styles.viewNum}>{u.views}</Text>
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  padd: {
    padding: 5
  },
  cardContainer: {
    padding: 20,
    width: '100%',
    marginLeft: '0%',
    marginTop: '0%',
    borderTopColor: 'white'
  },
  profileinfo: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    // backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar2: {
    borderWidth: 1,
    borderColor: '#fff'
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    marginLeft: '10%',
    color: 'black'
  },
  mainContent: {
    marginTop: '5%'
  },
  postPic: {
    width: '100%',
    minHeight: 300,
    borderRadius: 10
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '9%'
  },
  cardFooterText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    lineHeight: 18.75,
    color: '#000'
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '7%'
  },
  cardFooterText2: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: '#7D7987'
  },
  tag: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    color: '#000'
  },
  eyeView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewNum: {
    color: 'black',
    fontSize: 16,
    marginLeft: '2%',
    lineHeight: 18.75,
    fontFamily: 'Roboto'
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 14.52,
    color: 'black',
    marginTop: '4%'
  }
});
