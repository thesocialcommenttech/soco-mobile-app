import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import { Avatar } from '@rneui/base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Card } from '@rneui/base';
import DropdownBottombutton from '../../components/dropdownBottombutton';
import { TextInput } from 'react-native';
import DropdownMore from '../../components/dropdownMore';
import { Colors } from '../../utils/colors';
import { getUserData } from '../../utils/services/user-profile_service/getUserData.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../store/reducers';
import { getUserData2 } from '../../utils/services/user-profile_service/getUserData2.service';
import { getUserProfileData } from '../../utils/services/user-profile_service/getUserProfileData.service';
import { getUserProfileCompletion } from '../../utils/services/user-profile_service/getUserProfileCompletion.service';
import { getPosts } from '../../utils/services/user-posts_service/getPosts.service';
import { getUserFeeds } from '../../utils/services/user-posts_service/getUserFeeds.service';
import { updateCaption } from '../../utils/services/user-profile_service/updateCaption.service';
import { updateDP } from '../../utils/services/user-profile_service/updateDP.service';
import { updateCover } from '../../utils/services/user-profile_service/updateCover.service';
import { movePostToTrash } from '../../utils/services/trash/movePostToTrash.service';

const ItemRender = ({ actName, count }: { actName: string; count: number }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.itemText}>{actName}</Text>
    <View style={styles.circle}>
      <Text style={styles.itemCount}>{count}</Text>
    </View>
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const [background] = useState(
    'https://images.unsplash.com/photo-1651006450901-9f487bafe481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  );
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name, setName] = useState('John Doe');
  const [userName, setUserName] = useState('@johndoe');
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
  const [followers, setFollowers] = useState(32);
  const [following, setFollowing] = useState(9);
  const [views, setViews] = useState(245);
  const [activities, setActivities] = useState({
    All: 0,
    Blogs: 0,
    Artworks: 500,
    Videos: 0,
    Projects: 0,
    Presentations: 0,
    Articles: 0,
    Links: 0
  });

  const getAll = (work: any) => {
    return (
      work.article.length +
      work.blog.length +
      work.artwork.length +
      work.project.length +
      work.presentation.length +
      work.link.length
    );
  };
  const [curLen, setCurLen] = useState(0);
  const [curLen1, setCurLen1] = useState(0);
  const [isPremium, setIsPremium] = useState(true);
  const [percentProfile] = useState(75);

  const [profilePicResponse, setProfilePicResponse] = useState(null);
  const [coverPicResponse, setCoverPicResponse] = useState(null);

  const basicData = useSelector((state: IRootReducer) => state.auth.user);

  useEffect(() => {
    // console.log('YO', basicData);
    const fetchData = async () => {
      const gud = await getUserData(basicData.username.toString());
      const userD2 = await getUserData2(basicData.username.toString());
      const gupd = await getUserProfileData();
      const gupc = await getUserProfileCompletion();
      const gp = await getPosts(basicData._id.toString());
      const gufs = await getUserFeeds();
      return {
        gud: gud.data,
        gupd: gupd.data,
        gupc: gupc.data,
        gp: gp.data,
        gufs: gufs.data,
        userD2: userD2.data
      };
    };
    fetchData()
      .then(res => {
        console.log('gupc', res.gud);
        console.log('id', res.gud.user._id);
        console.log('gp', res.gp.posts);
        console.log('gufs', res.gufs);
        console.log('userD2', res.userD2);
        setName(res.gud.user.name);
        setUserName(res.gud.user.username);
        setFollowers(res.gud.user.followers);
        setFollowing(res.gud.user.following);
        setViews(res.gud.user.totalViews);
        setActivities({
          ...activities,
          All: getAll(res.gud.user.portfolio.work),
          Articles: res.gud.user.portfolio.work.article.length,
          Blogs: res.gud.user.portfolio.work.blog.length,
          Artworks: res.gud.user.portfolio.work.artwork.length,
          Projects: res.gud.user.portfolio.work.project.length,
          Presentations: res.gud.user.portfolio.work.presentation.length,
          Links: res.gud.user.portfolio.work.link.length,
          Videos: 0
        });
        setLocked(res.gud.user.portfolioLock !== 'PUBLIC');
        setIsPremium(res.gud.user.premium);
        // console.log(res.gupd.userData.notification);
      })

      .catch(err => {
        console.log(err.response.data);
      });
    // console.log('YO', userData);
  });

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

  const onDeletePost = async (id: string) => {
    // try {
    //   const res = await movePostToTrash();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error.response);
    // }
    console.log('delete', id);
  };

  const onEditPost = (id: string) => {
    console.log('edit', id);
  };

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
                  <MaterialCommunityIcon
                    name="close"
                    size={24}
                    color={Colors.Gray400}
                  />
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
                  onPress={async () => {
                    setFinCaption(caption);
                    try {
                      const res = await updateCaption({
                        caption: caption
                      });
                      console.log(res);
                    } catch (error) {
                      console.log(error);
                    }
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
            >
              <MaterialCommunityIcon
                name="pencil-outline"
                size={20}
                color={Colors.White}
              />
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
                  <MaterialCommunityIcon
                    name="close"
                    size={24}
                    color={Colors.Gray400}
                  />
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
                    try {
                      // const res = await updateDP({
                      //   dp: profilePicResponse
                      // });
                    } catch (error) {
                      console.log(error);
                    }
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
                    try {
                      // const res = await updateCover({
                      //   dp: coverPicResponse
                      // });
                    } catch (error) {
                      console.log(error);
                    }
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
            >
              <MaterialCommunityIcon
                name="camera-outline"
                size={20}
                color={Colors.White}
              />
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
              <MaterialCommunityIcon
                name="lock-outline"
                size={20}
                color={Colors.White}
              />
            ) : (
              <MaterialCommunityIcon
                name="lock-off-outline"
                size={20}
                color={Colors.White}
              />
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
                <MaterialCommunityIcon
                  name="close"
                  size={24}
                  color={Colors.Gray400}
                />
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
                  try {
                  } catch (error) {
                    console.log(error);
                  }
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
              <MaterialCommunityIcon
                name="pencil-outline"
                size={18}
                color={Colors.Secondary}
              />
              <Text style={styles.updateBioText}>Update Bio</Text>
            </TouchableOpacity>
          </View>
        </>

        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Text style={styles.statsText}>{followers}</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsText}>{following}</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </View>
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
                    <MaterialCommunityIcon
                      name="share-variant-outline"
                      size={20}
                      color={Colors.Gray600}
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
                  <DropdownMore
                    onDelete={onDeletePost}
                    onEdit={onEditPost}
                    id={u.id}
                  />
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
                    <Ionicon
                      name="eye-outline"
                      size={19}
                      color={Colors.Gray600}
                    />
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
          <Ionicon name="plus" size={25} color={Colors.Black} style={styles.plus} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.White
  },
  statusBar: {
    backgroundColor: 'white',
    height: '25%'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White
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
    fontFamily: 'Roboto-Medium',
    color: 'black'
  },
  userName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  portfolioContainer: {
    flexDirection: 'row',
    marginTop: '5%'
  },
  portfolio: {
    backgroundColor: Colors.Secondary,
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.White,
    textAlign: 'center'
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  portfolioLock: {
    backgroundColor: Colors.Secondary,
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 18.2,
    color: Colors.Gray600,
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.Secondary,
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: 'black',
    textAlign: 'center'
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.Gray600,
    marginTop: '2%',
    textAlign: 'center'
  },
  list: {
    marginTop: '8%',
    paddingHorizontal: '8%',
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.Secondary
  },
  listLabel: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.Gray600
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 14,
    color: Colors.Gray600,
    textAlign: 'center'
  },
  circle: {
    width: 26,
    height: 24,
    borderRadius: 100,
    backgroundColor: Colors.LightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    padding: 5
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    lineHeight: 14,
    color: Colors.YellowTxt,
    textAlign: 'center'
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
    alignItems: 'center'
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    marginLeft: '10%',
    color: 'black'
  },
  avatar2: {
    borderWidth: 1,
    borderColor: Colors.White
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
    fontFamily: 'Roboto-Medium',
    lineHeight: 18.75,
    color: Colors.Black
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '7%'
  },
  cardFooterText2: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  tag: {
    backgroundColor: Colors.Gray100,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black
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
    color: Colors.Gray400,
    alignSelf: 'flex-end'
  },
  capTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    marginTop: '2%'
  },
  captionInput: {
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: Colors.GrayBorder,
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: '22%',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Medium',
    lineHeight: 21
  },
  maxChar: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  updateBtn: {
    backgroundColor: Colors.Secondary,
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
    fontFamily: 'Roboto-Medium'
  },
  maxChar1: {
    marginTop: '5%',
    color: Colors.Gray200,
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  updateBtn1: {
    backgroundColor: Colors.Secondary,
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
    fontFamily: 'Roboto-Medium'
  },
  closeBtn1: {
    color: Colors.Gray400,
    alignSelf: 'flex-end'
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    marginTop: '2%'
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
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Medium',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  captionOnImgTxt: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    lineHeight: 21,
    textAlign: 'center',
    padding: 4
  },
  proTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
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
    borderColor: Colors.Secondary
  },
  updateImgTxt: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  covTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
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
    borderColor: Colors.Secondary
  },
  updateImgTxt1: {
    color: Colors.Secondary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  horizontalLine: {
    borderBottomColor: Colors.GrayLine,
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
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
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
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
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
    fontFamily: 'Roboto-Medium'
  }
});
