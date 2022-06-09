import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/base';
import { Colors } from '../../utils/colors';

const BioScreen = () => {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [background] = useState(
    'https://images.unsplash.com/photo-1651006450901-9f487bafe481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  );
  const [bio, setBio] = useState('');
  const [finBio, setFinBio] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.'
  );
  const [curLen1, setCurLen1] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Add Your Bio</Text>
      <TextInput
        style={styles.bioInput}
        onChangeText={text => {
          setBio(text);
          setCurLen1(text.length);
        }}
        value={bio}
        maxLength={150}
        multiline={true}
        placeholder={'Write about yourself'}
        placeholderTextColor={'#99969F'}
        spellCheck={false}
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />
      <Text style={styles.maxChar1}>Max Characters: {curLen1}/150</Text>
      <TouchableOpacity
        style={styles.updateImgBtn}
        onPress={() => {
          setFinBio(bio);
        }}
      >
        <Text style={styles.updateImgTxt}>Add Bio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '6%'
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.Black,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '2%'
  },
  bgImage: {
    width: '100%',
    height: '30%',
    marginTop: '8%',
    resizeMode: 'cover'
  },
  selTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '6%'
  },
  bioInput: {
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: Colors.GrayBorder,
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '22%',
    width: '100%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Medium',
    lineHeight: 21
  },
  maxChar1: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'flex-start'
  },
  updateImgBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: '4%',
    width: '100%',
    bottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Secondary
  },
  updateImgTxt: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  }
});
