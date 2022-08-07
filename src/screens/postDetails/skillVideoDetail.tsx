import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../components/topBar';
import VideoPlayer from 'react-native-video-controls';
import MainComponent from '../../components/postDetails/mainComponent';

const Data1 = [
  {
    title: 'Chat App UI Desgin',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    author: 'Robert Fox',
    postDate: '04 Jan, 2020',
    like: 3,
    dislike: 0,
    detailText:
      'Yves, Coco and Christian not another blogger Ed Hardy was never fashionblog post just another Vogue fashion night out fashion royalty.Backstage pass behind the scenes wild and lethal I’m Hugo’s boss I dont do fashion I am fashion the new look long live the queen - long live Kate Moss.',
    authorNotename: 'Robert Fox',
    tags: [
      {
        key: 1,
        text: 'Design'
      },
      {
        key: 2,
        text: 'Chat App'
      },
      {
        key: 3,
        text: 'UI/UX'
      },
      {
        key: 4,
        text: 'Mobile Design'
      },
      {
        key: 5,
        text: 'Figma'
      },
      {
        key: 6,
        text: 'Design'
      }
    ],
    authorID: '@ robert_Fox',
    authorimf:
      'My timeline is a blank canvas. But anywhere you look on this screen orwhatever you do with this screen you will always praise my work.'
  }
];

export default function SkillVideoDetail() {
  const navigation = useNavigation();
  const [isPremium] = useState(true);
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [percentProfile] = useState(75);
  return (
    <View>
      <ScrollView>
        <TopBar
          uri={profile}
          username={name}
          premium={isPremium}
          percentProfile={percentProfile}
          navigation={navigation}
        />

        <View style={styles.video}>
          <VideoPlayer
            source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
            //style={styles.video}
            disableBack={true}
            disableFullscreen={true}
            disableTimer={true}
            paused={true}
          />
        </View>
        <View style={styles.maincomponentview}>
          <MainComponent data={Data1} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '20%'
  },
  maincomponentview: {
    marginBottom: '40%'
  }
});
