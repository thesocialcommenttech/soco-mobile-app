import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import TopBar from '../../components/topBar';
import { Avatar } from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/reducers/info';
import { Card } from '@rneui/base';
import DropdownBottombutton from '../../components/dropdownBottombutton';
import DropdownCreatePost from '../../components/dropdownCreatePost';
import { TextInput } from 'react-native';
import DropdownMore from '../../components/dropdownMore';

const ProfileScreen = ({ navigation }) => {
  // get backround and profile picture from background
  const state = useSelector(selectUserInfo);

  const [background] = useState(
    'https://images.unsplash.com/photo-1651006450901-9f487bafe481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  );
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [userName] = useState('@johndoe');
  const [locked, setLocked] = useState(true);
  const [bio, setBio] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.'
  );
  const [caption, setCaption] = useState(
    'Round Robert parker montepulciano chianti oaked wine afficionado.'
  );
  const [finCaption, setFinCaption] = useState(
    'Round Robert parker montepulciano chianti oaked wine afficionado.'
  );
  const [finBio, setFinBio] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.'
  );
  const [followers] = useState(32);
  const [following] = useState(9);
  const [views] = useState(245);
  const [activities] = useState({
    All: 0,
    Blogs: 0,
    Artworks: 0,
    Videos: 0,
    Projects: 0,
    Presentations: 0,
    Articles: 0,
    Links: 0
  });
  const [curLen, setCurLen] = useState(0);
  const [curLen1, setCurLen1] = useState(0);
  const [isPremium] = useState(true);
  const [percentProfile] = useState(75);

  // const onEditCaption = () => {
  //   console.log('onEditCaption');
  // };

  // const onEditCover = () => {
  //   console.log('onEditProfile');
  // };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <HeaderRight />
  //   });
  // }, [navigation]);
  const ITEMS = [
    {
      id: '1',
      name: 'All',
      count: activities.All
    },
    {
      id: '2',
      name: 'Blogs',
      count: activities.Blogs
    },
    {
      id: '3',
      name: 'Artworks',
      count: activities.Artworks
    },
    {
      id: '4',
      name: 'Videos',
      count: activities.Videos
    },
    {
      id: '5',
      name: 'Projects',
      count: activities.Projects
    },
    {
      id: '6',
      name: 'Presentations',
      count: activities.Presentations
    },
    {
      id: '7',
      name: 'Articles',
      count: activities.Articles
    },
    {
      id: '8',
      name: 'Links',
      count: activities.Links
    }
  ];

  const cardContents = [
    {
      id: '1',
      name: 'John Doe',
      profilePic: profile,
      postImage: 'https://miro.medium.com/max/700/0*3-Nb4RXyrsq-nnXE',
      subTitle: '',
      postTitle: 'Python - An Installation Guide',
      postDate: '24 Feb, 2022',
      postTag: 'Artwork',
      views: 26
    },
    {
      id: '2',
      name: 'John Doe',
      profilePic: profile,
      postImage: 'https://miro.medium.com/max/700/0*3-Nb4RXyrsq-nnXE',
      postTitle: 'Python - An Installation Guide',
      subTitle:
        "Trumpthechumps Mango Mussolini I'm with Her tangerine tornado The Clown Prince if Ivanka weren't my daughter...",
      postDate: '24 Feb, 2022',
      postTag: 'Artwork',
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

  const ItemRender = ({ actName, count }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{actName}</Text>
      <View style={styles.circle}>
        <Text style={styles.itemCount}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <TopBar
          uri={profile}
          username={name}
          premium={isPremium}
          percentProfile={percentProfile}
          navigation={navigation}
        />
        <View style={styles.images}>
          <Image
            source={{
              uri: background
            }}
            style={styles.bgImage}
          />
          <View style={styles.avatarContainer}>
            <Avatar
              size={90}
              rounded
              title={name?.charAt(0)}
              titleStyle={styles.avatarTitle}
              source={{
                uri: profile
              }}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
          </View>
          <View style={styles.captionOnImg}>
            <Text style={styles.captionOnImgTxt}>{finCaption}</Text>
          </View>
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeBtn}
                >
                  <Icon name="close" size={24} color="#C9D1D8" />
                </TouchableOpacity>
                <Text style={styles.capTitle}>Caption</Text>
                <TextInput
                  style={styles.captionInput}
                  onChangeText={text => {
                    setCaption(text);
                    setCurLen(text.length);
                  }}
                  value={caption}
                  maxLength={150}
                  multiline={true}
                  placeholder={"Write what's in your mind"}
                  placeholderTextColor={'gray'}
                  spellCheck={false}
                  autoCorrect={false}
                  autoComplete="off"
                  autoCapitalize="none"
                />
                <Text style={styles.maxChar}>Max Characters: {curLen}/150</Text>
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => {
                    setFinCaption(caption);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.updateTxt}>Update</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.editCaption}
              onPress={() => setModalVisible(true)}
              // onPress={onEditCaption}
            >
              <Icon name="pencil-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </>
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible2}
              onRequestClose={() => {
                setModalVisible2(!modalVisible2);
              }}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => setModalVisible2(false)}
                  style={styles.closeBtn}
                >
                  <Icon name="close" size={24} color="#C9D1D8" />
                </TouchableOpacity>
                <Text style={styles.proTitle}>Profile Picture</Text>
                <View style={styles.profView}>
                  <Image
                    style={styles.profUpdatePic}
                    resizeMode="cover"
                    source={{ uri: profile }}
                  />
                  <TouchableOpacity style={styles.selProImg}>
                    <Text style={styles.selProTxt}>SELECT IMAGE</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.updateImgBtn}
                  onPress={() => {
                    setModalVisible2(false);
                  }}
                >
                  <Text style={styles.updateImgTxt}>
                    Update Profile Picture
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalLine} />
                <Text style={styles.covTitle}>Cover Picture</Text>
                <View style={styles.covView}>
                  <Image
                    style={styles.covUpdatePic}
                    resizeMode="cover"
                    source={{ uri: background }}
                  />
                  <TouchableOpacity style={styles.selCovImg}>
                    <Text style={styles.selCovTxt}>SELECT IMAGE</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.updateImgBtn1}
                  onPress={() => {
                    setModalVisible2(false);
                  }}
                >
                  <Text style={styles.updateImgTxt1}>Update Cover Picture</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => setModalVisible2(true)}
              style={styles.editCover}
              // onPress={onEditCover}
            >
              <Icon name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.portfolioContainer}>
          <TouchableOpacity style={styles.portfolio}>
            <Text style={styles.portfolioText}>Portfolio</Text>
          </TouchableOpacity>
          <View style={styles.verticleLine} />
          <TouchableOpacity
            style={styles.portfolioLock}
            onPress={() => setLocked(!locked)}
          >
            {locked ? (
              <Icon name="lock-outline" size={20} color="#fff" />
            ) : (
              <Icon name="lock-off-outline" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{bio}</Text>
        </View>
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.modalView1}>
              <TouchableOpacity
                onPress={() => setModalVisible1(false)}
                style={styles.closeBtn1}
              >
                <Icon name="close" size={24} color="#C9D1D8" />
              </TouchableOpacity>
              <Text style={styles.bioTitle}>Bio</Text>
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
                placeholderTextColor={'gray'}
                spellCheck={false}
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
              />
              <Text style={styles.maxChar1}>Max Characters: {curLen1}/150</Text>
              <TouchableOpacity
                style={styles.updateBtn1}
                onPress={() => {
                  setFinBio(bio);
                  setModalVisible1(false);
                }}
              >
                <Text style={styles.updateTxt1}>Update</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.updateBio}>
            <TouchableOpacity
              style={styles.updateBioLink}
              onPress={() => setModalVisible1(!modalVisible1)}
            >
              <Icon name="pencil-outline" size={18} color="#0063FF" />
              <Text style={styles.updateBioText}>Update Bio</Text>
            </TouchableOpacity>
          </View>
        </>

        <View style={styles.stats}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Follower' as never, {} as never);
            }}
          >
            <View style={styles.statsItem}>
              <Text style={styles.statsText}>{followers}</Text>
              <Text style={styles.statsLabel}>Followers</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(
                'Follower' as never,
                { screen: 'Following' } as never
              );
            }}
          >
            <View style={styles.statsItem}>
              <Text style={styles.statsText}>{following}</Text>
              <Text style={styles.statsLabel}>Following</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.statsItem}>
            <Text style={styles.statsText}>{views}</Text>
            <Text style={styles.statsLabel}>Views</Text>
          </View>
        </View>
        <FlatList
          data={ITEMS}
          style={styles.activity}
          renderItem={({ item }) => (
            <ItemRender actName={item.name} count={item.count} />
          )}
          keyExtractor={item => {
            return item.id.toString();
          }}
          horizontal={true}
        />
        <DropdownCreatePost label={'Create Post'} />
        <View style={styles.padd} />
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
                  <DropdownMore />
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
      <DropdownBottombutton label={undefined} />
      {/* <View style={styles.stickyButton}>
        <TouchableOpacity>
          <Icon3 name="plus" size={25} color="#000" style={styles.plus} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBar: {
    backgroundColor: 'white',
    height: '25%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: '42%',
    // top: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderColor: 'white',
    borderWidth: 4,
    backgroundColor: 'white'
  },
  avatarTitle: {
    color: 'black'
  },
  images: {
    flex: 1,
    flexDirection: 'column'
  },
  editCaption: {
    position: 'absolute',
    top: '65%',
    left: '2%',
    backgroundColor: 'rgba(15, 23, 36, 0.47)',
    borderRadius: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editCover: {
    position: 'absolute',
    top: '65%',
    right: '2%',
    backgroundColor: 'rgba(15, 23, 36, 0.47)',
    borderRadius: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    marginTop: '4%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'Roboto-Bold',
    color: 'black'
  },
  userName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    color: '#7D7987'
  },
  portfolioContainer: {
    flexDirection: 'row',
    marginTop: '5%'
  },
  portfolio: {
    backgroundColor: '#0063FF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 46,
    justifyContent: 'center',
    marginLeft: '8%',
    width: '71%'
  },
  portfolioText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: '#fff',
    marginLeft: '35%'
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  portfolioLock: {
    backgroundColor: '#0063FF',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 46,
    justifyContent: 'center',
    marginRight: '8%',
    width: '13%',
    alignItems: 'center'
  },
  bio: {
    marginTop: '5%',
    marginLeft: '8%',
    marginRight: '8%'
  },
  bioText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    lineHeight: 18.2,
    color: '#7D7987',
    textAlign: 'center'
  },
  updateBio: {
    marginTop: '3%',
    alignItems: 'center'
  },
  updateBioLink: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  updateBioText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: '#0063FF',
    textAlign: 'center',
    marginLeft: '1%'
  },
  stats: {
    flexDirection: 'row',
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsItem: {
    flexDirection: 'column',
    paddingHorizontal: '8%'
  },
  statsText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: 'black',
    textAlign: 'center'
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: '#7D7987',
    marginTop: '2%',
    textAlign: 'center'
  },
  list: {
    marginTop: '8%',
    paddingHorizontal: '8%',
    // justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '8%'
  },
  listText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: '#0063FF'
  },
  listLabel: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    lineHeight: 16.41,
    color: '#7D7987'
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: '8%',
    marginBottom: '8%'
  },
  activity: {
    flexGrow: 0,
    marginTop: '6%',
    marginHorizontal: '4%'
  },
  item: {
    flexDirection: 'row',
    // backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 14,
    color: '#7D7987',
    textAlign: 'center'
  },
  circle: {
    width: 26,
    height: 24,
    borderRadius: 100,
    backgroundColor: '#FFF4CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    padding: 5
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    lineHeight: 14,
    color: '#896A00',
    textAlign: 'center'
  },
  padd: {
    paddingVertical: '2%'
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
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    marginLeft: '10%',
    color: 'black'
  },
  avatar2: {
    borderWidth: 1,
    borderColor: '#fff'
  },
  mainContent: {
    marginTop: '7%'
  },
  postPic: {
    width: '100%',
    height: 300,
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
  plusPos: {
    position: 'absolute',
    bottom: '3%',
    right: '5%'
  },
  modalView: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  closeBtn: {
    color: '#C9D1D8',
    alignSelf: 'flex-end'
  },
  capTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: '2%'
  },
  captionInput: {
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: '#DCDCDC',
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '22%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto',
    lineHeight: 21
  },
  maxChar: {
    marginTop: '5%',
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  updateBtn: {
    backgroundColor: '#0063FF',
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  maxChar1: {
    marginTop: '5%',
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  updateBtn1: {
    backgroundColor: '#0063FF',
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateTxt1: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  closeBtn1: {
    color: '#C9D1D8',
    alignSelf: 'flex-end'
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: '2%'
  },
  bioInput: {
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: '#DCDCDC',
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '22%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto',
    lineHeight: 21
  },
  modalView1: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 20
  },
  captionOnImg: {
    position: 'absolute',
    top: '6%',
    marginLeft: '5%',
    backgroundColor: 'rrgba(0, 0, 0, 0.6)',
    borderRadius: 3,
    width: '90%',
    // height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  captionOnImgTxt: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 21,
    textAlign: 'center',
    padding: 4
  },
  proTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: '2%'
  },
  updateImgBtn: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: '6%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0063FF'
  },
  updateImgTxt: {
    color: '#0063FF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  covTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: '2%'
  },
  updateImgBtn1: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: '9%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0063FF'
  },
  updateImgTxt1: {
    color: '#0063FF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  horizontalLine: {
    borderBottomColor: '#E2E5E9',
    borderBottomWidth: 1,
    marginTop: '8%',
    marginBottom: '8%'
  },
  profView: {
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profUpdatePic: {
    height: 90,
    width: 90,
    borderRadius: 100
  },
  selProImg: {
    marginLeft: '8%'
  },
  selProTxt: {
    color: '#7D7987',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16
  },
  covView: {
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  covUpdatePic: {
    height: 200,
    width: 300,
    marginLeft: '4%',
    marginRight: '4%',
    borderRadius: 8
  },
  selCovImg: {
    marginTop: '6%'
  },
  selCovTxt: {
    color: '#7D7987',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 14.52,
    color: 'black',
    marginTop: '4%'
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
  }
});
