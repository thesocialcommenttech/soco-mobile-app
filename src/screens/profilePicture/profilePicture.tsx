import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/base';
import { Colors } from '../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { updateDP } from '../../utils/services/user-profile_service/updateDP.service';

/* toggle includeExtra */
const includeExtra = true;
interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  // {
  //   title: 'Take Image',
  //   type: 'capture',
  //   options: {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     includeExtra
  //   }
  // },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra
    }
  }
  // {
  //   title: 'Take Video',
  //   type: 'capture',
  //   options: {
  //     saveToPhotos: true,
  //     mediaType: 'video',
  //     includeExtra
  //   }
  // },
  // {
  //   title: 'Select Video',
  //   type: 'library',
  //   options: {
  //     selectionLimit: 0,
  //     mediaType: 'video',
  //     includeExtra
  //   }
  // },
  // {
  //   title: 'Select Image or Video\n(mixed)',
  //   type: 'library',
  //   options: {
  //     selectionLimit: 0,
  //     mediaType: 'mixed',
  //     includeExtra
  //   }
  // }
];

const ProfilePictureScreen = () => {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback(
    (
      type: string,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions
    ) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    },
    []
  );

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const addPicture = () => {
    const data = new FormData();

    data.append('photo', {
      name: response.assets[0].fileName,
      type: response.assets[0].type,
      uri:
        Platform.OS === 'ios'
          ? response.assets[0].uri.replace('file://', '')
          : response.assets[0].uri
    });

    // console.log('img', response.assets[0]);
    // console.log('data', response.assets[0].type);

    // Object.keys(body).forEach(key => {
    //   data.append(key, body[key]);
    // });
    // console.log('data', data);
    updateDP({ dp: data })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('PROERR', err.response);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Add Your Profile Picture</Text>
      {response?.assets &&
        response?.assets.map(({ uri }) => (
          <View style={styles.avatarContainer}>
            <Avatar
              size={200}
              rounded
              title={name?.charAt(0)}
              titleStyle={styles.avatarTitle}
              source={{
                uri: uri
              }}
              containerStyle={styles.avatar}
            />
          </View>
        ))}
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({ title, type, options }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onButtonPress(type, options);
                }}
              >
                <Text style={styles.selTxt}>{title.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* <DemoResponse>{response}</DemoResponse> */}
      </ScrollView>
      <TouchableOpacity
        style={styles.updateImgBtn}
        onPress={() => {
          addPicture();
        }}
      >
        <Text style={styles.updateImgTxt}>Add Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePictureScreen;

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
  avatarContainer: {
    alignSelf: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '6%'
  },
  avatar: {
    borderColor: 'white',
    borderWidth: 4,
    backgroundColor: 'white'
  },
  avatarTitle: {
    color: 'black'
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
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8
  },

  image: {
    marginVertical: 24,
    alignItems: 'center'
  }
});
