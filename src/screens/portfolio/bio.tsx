import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-controls';
import Modal1 from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';

export default function Bio({ ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   props.extraData('Bio');
  // }, [props]);

  useFocusEffect(
    React.useCallback(() => {
      //Alert.alert('Screen was focused');
      props.extraData('Bio');
      return () => {
        //Alert.alert('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [props])
  );

  return (
    <ScrollView>
    <>
    <View style={styles.container}>
      <Modal1
        isVisible={modalVisible}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible(false)}
      >
        <>
          <View style={styles.optionview}>
            <TouchableWithoutFeedback
            // onPress={() => {
            //   chooseFile('photo');
            //   setModalVisible1(false);
            // }}
            >
              <View style={styles.modalrow}>
                <Icon1 name="pencil-outline" size={22} color="black" />
                <Text style={styles.optiontext}>Edit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <Icon1 name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <View style={styles.imageview}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
          }}
        />
        <Text style={styles.username}>Nischaya Sharma</Text>
        <Text style={styles.usermail}>nischaya01@mail.com</Text>
        <View style={styles.row}>
          <Icon1 name="facebook" size={28} color="#1877F2" />
          <Icon1 name="instagram" size={28} color="#C13584" />
          <Icon1 name="twitter" size={28} color="#1DA1F2" />
          <Icon1 name="github" size={28} color="#333333" />
          <Icon1 name="linkedin" size={28} color="#0077B5" />
        </View>
      </View>
      <View style={styles.video}>
        <VideoPlayer
          source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
          style={styles.video}
          disableBack={true}
          disableFullscreen={true}
          disableTimer={true}
          paused={true}
        />
      </View>
        <View style={styles.biography}>
          <Text style={styles.biographytext}>Biography</Text>
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <Icon1 name="pencil-outline" size={22} color="#BDBDBD" />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.bioimf}>
          A person who is proficient in handling large scale undertakings
          assuming great responsibility for work. I try to reflects the idealism
          of new life and future promises.{'\n'} {'\n'}
          Expertise:{'\n'}
          Ethical Hacking, Android Application Development, Web
          Development-Intro, Terminal based Chatting Platform, Encryption
        </Text>
    </View>
    </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '2%'
  },
  text: {
    color: 'black'
  },
  tinyLogo: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  imageview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '45%'
  },
  username: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
    marginTop: '3%'
  },
  usermail: {
    color: '#7D7987',
    marginTop: '1%',
    fontSize: 16,
    marginBottom: '7%'
  },
  video: {
    width: '100%',
    height: 200,
    marginTop: '4%',
  },
  biography: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5.5%',
    marginRight: '5.5%',
    marginTop: '7%'
  },
  biographytext: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600'
  },
  bioimf: {
    color: '#7D7987',
    fontSize: 14.5,
    marginLeft: '5.5%',
    marginRight: '5.5%',
    marginTop: '4%',
    lineHeight: 21
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  }
});
