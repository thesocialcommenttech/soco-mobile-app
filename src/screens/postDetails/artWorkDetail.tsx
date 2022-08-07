import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TextInput
} from 'react-native';
import React, { useState } from 'react';
import TopBar from '../../components/topBar';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ArtWorkDetail() {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isPremium] = useState(true);
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [percentProfile] = useState(75);
  const [like, setLike] = useState(false);
  const [dislike, setDisLike] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <View>
      <TopBar
        uri={profile}
        username={name}
        premium={isPremium}
        percentProfile={percentProfile}
        navigation={navigation}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Chat App UI Desgin</Text>
          <View style={styles.userview}>
            <View style={styles.userphotoandname}>
              <Image
                style={styles.userimg}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
              />
              <Text style={styles.usrname}>Robert Fox</Text>
            </View>
            <Text style={styles.postdate}>04 Jan, 2020</Text>
          </View>
          <View style={styles.likeandshare}>
            <View>
              {like
                ? [
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setLike(false);
                      }}
                    >
                      <Icon1 name="thumb-up" size={18} color="black" />
                    </TouchableWithoutFeedback>
                  ]
                : [
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setLike(true);
                      }}
                    >
                      <Icon1 name="thumb-up-outline" size={18} color="black" />
                    </TouchableWithoutFeedback>
                  ]}
            </View>
            <Text style={styles.likenumber}>3</Text>
            <View style={styles.icon}>
              {dislike
                ? [
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setDisLike(false);
                      }}
                    >
                      <Icon1 name="thumb-down" size={18} color="black" />
                    </TouchableWithoutFeedback>
                  ]
                : [
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setDisLike(true);
                      }}
                    >
                      <Icon1
                        name="thumb-down-outline"
                        size={18}
                        color="black"
                      />
                    </TouchableWithoutFeedback>
                  ]}
            </View>
            <Text style={styles.likenumber}>0</Text>
            <View style={styles.icon}>
              {heart
                ? [
                  <TouchableWithoutFeedback onPress={() => {setHeart(false);}}>
                      <Icon1 name="heart" size={18} color="black" />
                    </TouchableWithoutFeedback>
                  ]
                : [
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setHeart(true);
                      }}
                    >
                      <Icon1 name="heart-outline" size={18} color="black" />
                    </TouchableWithoutFeedback>
                  ]}
            </View>
            <View style={styles.shareview}>
              <Icon1 name="share" size={20} color="#0063FF" />
              <Text style={styles.share}>Share</Text>
            </View>
          </View>
          <Image
            style={styles.artwork}
            source={{
              uri: 'https://picsum.photos/id/1048/200'
            }}
          />
          <Text style={styles.detailstext}>
            This is a chat application login screen. This is designed in figma,
            which is a designing tool very popular now days among the desgners.
            There are some alternatives as well most popular alternative is
            Adobe Desgin XD
          </Text>
          <View style={styles.categoryview}>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>Design</Text>
            </View>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>Chat App</Text>
            </View>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>UI/UX</Text>
            </View>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>Mobile Design</Text>
            </View>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>Figma</Text>
            </View>
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>Design</Text>
            </View>
          </View>
          <View style={styles.authorview}>
            <View style={styles.mTab}>
              <View style={styles.information}>
                <View style={styles.imageCon}>
                  <Image
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png'
                    }}
                    style={styles.img}
                  />
                </View>
                <View style={styles.followtext}>
                  <Text style={styles.name}>Robert Fox</Text>
                  <Text style={styles.userid}>@ robert_Fox</Text>
                </View>
              </View>
            </View>
            <Text style={styles.authorimf}>
              My timeline is a blank canvas. But anywhere you look on this
              screen or whatever you do with this screen you will always praise
              my work.
            </Text>
            <TouchableWithoutFeedback>
              <Text style={styles.editpost}>EDIT THIS POST</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.numcomment}>1 Comment</Text>
          <View style={styles.commentbox}>
            <TextInput
              placeholder="Write Your Comment"
              placeholderTextColor="#99969F"
              style={styles.textinput}
              onChangeText={txt => {
                setText(txt);
              }}
            />
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.posttextview}>
              <Text style={styles.posttext}>POST</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.commentTab}>
            <View style={styles.information}>
              <View style={styles.imageCon}>
                <Image
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                  style={styles.userimgincomment}
                />
              </View>
              <View style={styles.commenttextview}>
                <Text style={styles.commentname}>Robert Fox</Text>
                <Text style={styles.commenttext}>robert_Fox</Text>
              </View>
            </View>
          </View>
          <View style={styles.commentTab}>
            <View style={styles.information}>
              <View style={styles.imageCon}>
                <Image
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                  style={styles.userimgincomment}
                />
              </View>
              <View style={styles.commenttextview}>
                <Text style={styles.commentname}>Robert Fox</Text>
                <Text style={styles.commenttext}>robert_Fox</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: '2%',
    paddingBottom: '20%',
    backgroundColor: 'white'
  },
  heading: {
    color: 'black',
    fontSize: 21,
    fontWeight: 'bold'
  },
  userview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%'
  },
  userphotoandname: {
    flexDirection: 'row',
    marginTop: '3%',
    flex: 1
  },
  userimg: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  postdate: {
    color: '#7D7987',
    marginTop: '5%'
  },
  usrname: {
    color: 'black',
    marginTop: '2%',
    marginLeft: '5%',
    fontSize: 16
  },
  likeandshare: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '1.5%',
    marginBottom: '3%'
  },
  share: {
    color: '#0063FF',
    marginLeft: '2%',
    fontSize: 15
  },
  icon: {
    marginLeft: '5%'
  },
  likenumber: {
    color: 'black',
    marginLeft: '2%',
    fontSize: 15,
    marginTop: '-0.5%'
  },
  shareview: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '-0.30%'
  },
  artwork: {
    height: 550,
    width: Dimensions.get('window').width - 30,
    borderRadius: 7
  },
  detailstext: {
    color: 'black',
    marginTop: '3%',
    fontSize: 15,
    lineHeight: 21
  },
  categoryview: {
    flexDirection: 'row',
    marginTop: '3%',
    flexWrap: 'wrap'
  },
  categorybox: {
    backgroundColor: '#F2F2F2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    marginTop: '3%',
    marginRight: '3.5%'
  },
  categorytext: {
    color: 'black'
  },
  mTab: {
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageCon: {
    marginLeft: '4%'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  followtext: {
    marginLeft: '8%',
    marginTop: '1%'
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: 'black',
    fontSize: 16
  },
  userid: {
    color: '#7D7987',
    fontSize: 15.5
  },
  information: {
    flexDirection: 'row'
  },
  authorview: {
    backgroundColor: '#F5F9FF',
    marginTop: '4%',
    borderRadius: 6
  },
  authorimf: {
    color: '#7D7987',
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: '2%',
    lineHeight: 19.5,
    fontSize: 15.5,
    marginTop: '1%'
  },
  editpost: {
    color: '#0063FF',
    marginLeft: '4%',
    marginBottom: '4%',
    fontWeight: '600',
    marginTop: '2%'
  },
  numcomment: {
    color: 'black',
    marginTop: '3%',
    marginLeft: '1%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentbox: {
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: '#99969F',
    marginTop: '3%'
  },
  textinput: {
    padding: 10,
    color: 'black'
  },
  posttext: {
    color: '#0063FF',
    marginTop: '3%',
    marginRight: '1%',
    fontWeight: 'bold',
    fontSize: 16
  },
  posttextview: {
    alignItems: 'flex-end'
  },
  userimgincomment: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  commentname: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: 'black',
    fontSize: 15
  },
  commenttext: {
    color: '#7D7987',
    fontSize: 16
  },
  commenttextview: {
    marginLeft: '8%'
    //marginTop: '1%'
  },
  commentTab: {
    paddingTop: '3%',
    paddingBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
