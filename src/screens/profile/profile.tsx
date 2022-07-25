import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from '@rneui/base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownBottombutton from '../../components/dropdownBottombutton';
import { Colors } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../store/reducers';
import { getUserData2 } from '../../utils/services/user-profile_service/getUserData2.service';
import { getPosts } from '../../utils/services/user-posts_service/getPosts.service';
import { GetPostsResponse } from '~/src/utils/typings/user-posts_interface/getPosts.interface';
import Post from '~/src/components/Post';
import { staticFileSrc } from '~/src/utils/methods';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { ActivityIndicator } from 'react-native-paper';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { PostType } from '~/src/utils/typings/post';
import UpdateCaptionModal from '~/src/components/modals/profile/UpdateCaption';
import UpdateProfileCoverImageModal from '~/src/components/modals/profile/UpdateProfileCoverImage';
import UpdateBioModal from '~/src/components/modals/profile/UpdateBio';
import { useProfileData } from '~/src/state/profileScreenState';
import Color from 'color';

function PostState({ title, count }: { title: string; count: number }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
      <View style={styles.circle}>
        <Text style={styles.itemCount}>{count ?? 0}</Text>
      </View>
    </View>
  );
}

const ProfileScreen = ({ navigation }) => {
  const auth = useSelector((state: IRootReducer) => state.auth);
  const [pageState, setPageState] = useState({
    pageNo: 0,
    pageSize: 20
  });

  const { setUserProfile, userProfile } = useProfileData();

  // const [userProfile, setUserProfile] = useState<
  //   { postTypes: Record<PostType, User['postTypes'][0]> } & Omit<
  //     GetUserData2Response['user'],
  //     'postTypes'
  //   >
  // >(null);
  const [posts, setPosts] = useState<GetPostsResponse['posts']>(null);

  const [profileLoading, setProfileLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

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

  async function fetchUserProfile() {
    setProfileLoading(true);
    const profileProjection =
      'name email email_verified coverImage onboard isFollowing totalViews totalPosts postTypes.postType postTypes.totalPosts favouritePostsCount followerUsersCount followingUsersCount profileImage caption timelineTextureImage username bio portfolioLock premium';

    const result = await getUserData2(
      auth.user.username,
      profileProjection,
      auth.user?._id ?? null
    );

    if (result.data.success) {
      setUserProfile({
        ...result.data.user,
        postTypes: result.data.user.postTypes.reduce(
          (a, c) => Object.assign(a, { [c.postType]: c }),
          {}
        ) as Record<PostType, User['postTypes'][0]>
      });
    }
    setProfileLoading(false);
  }

  async function fetchPosts() {
    setPostsLoading(true);
    const postProjection =
      'shares views postedOn link postedBy postType featureImage totalSlides description sharedPost title comments upvotes downvotes aim';

    const result = await getPosts(
      auth.user._id,
      pageState.pageNo,
      postProjection,
      pageState.pageSize
    );

    if (result.data.success) {
      setPosts(result.data.posts);
    }
    setPostsLoading(false);
  }

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, []);

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
    <ScreenWithTopBar navigation={navigation}>
      {profileLoading || postsLoading ? (
        <View style={styles.loadingCt}>
          <ActivityIndicator color={'#0063ff'} size={32} />
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.coverCt}>
              <Image
                source={{
                  uri: staticFileSrc(userProfile?.coverImage)
                }}
                style={styles.bgImage}
              />
              <View style={styles.avatarContainer}>
                <Avatar
                  size={100}
                  rounded
                  title={userProfile.name}
                  titleStyle={styles.avatarTitle}
                  source={{
                    uri: staticFileSrc(userProfile?.profileImage)
                  }}
                  activeOpacity={0.7}
                  containerStyle={styles.avatar}
                />
              </View>
              <View style={styles.captionOnImg}>
                <Text style={styles.captionOnImgTxt}>
                  {userProfile.caption}
                </Text>
              </View>
              <>
                <UpdateCaptionModal
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  setFinCaption={setFinCaption}
                />
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
                <UpdateProfileCoverImageModal
                  show={modalVisible2}
                  onClose={() => setModalVisible2(false)}
                />
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
              <Text style={styles.name}>{userProfile.name}</Text>
              <Text style={styles.userName}>{userProfile.username}</Text>
            </View>
            <View style={styles.portfolioContainer}>
              <TouchableOpacity style={styles.portfolio}>
                <Text style={styles.portfolioText}>Portfolio</Text>
              </TouchableOpacity>
              {/* <View style={styles.verticleLine} /> */}
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
              <Text style={styles.bioText}>{userProfile.bio}</Text>
            </View>
            <>
              <UpdateBioModal
                modalVisible1={modalVisible1}
                setModalVisible1={setModalVisible1}
              />
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

            <ScrollView horizontal={true} style={styles.stats}>
              <ProfileState
                title="Followers"
                value={userProfile.followerUsersCount}
              />
              <ProfileState
                title="Following"
                value={userProfile.followingUsersCount}
              />
              <ProfileState
                title="Favourites"
                value={userProfile.favouritePostsCount}
              />
              <ProfileState title="Views" value={userProfile.totalViews} />
              <ProfileState title="Posts" value={userProfile.totalPosts} />
            </ScrollView>

            <ScrollView horizontal={true} style={styles.activity}>
              <PostState title="All" count={userProfile.totalPosts} />
              <PostState
                title="All"
                count={userProfile.postTypes.blog?.totalPosts}
              />
              <PostState
                title="Artworks"
                count={userProfile.postTypes.artwork?.totalPosts}
              />
              <PostState
                title="Videos"
                count={userProfile.postTypes.skill?.totalPosts}
              />
              <PostState
                title="Projects"
                count={userProfile.postTypes.project?.totalPosts}
              />
              <PostState
                title="Articles"
                count={userProfile.postTypes.article?.totalPosts}
              />
              <PostState
                title="Presentations"
                count={userProfile.postTypes.presentation?.totalPosts}
              />
              <PostState
                title="Links"
                count={userProfile.postTypes.link?.totalPosts}
              />
            </ScrollView>

            {posts.map(post => (
              <Post key={post._id} data={post} />
            ))}
          </ScrollView>
          <DropdownBottombutton label={undefined} />
        </>
      )}
      {/* <View style={styles.stickyButton}>
        <TouchableOpacity>
          <Ionicon name="plus" size={25} color={Colors.Black} style={styles.plus} />
        </TouchableOpacity>
      </View> */}
    </ScreenWithTopBar>
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
    // position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    // marginTop: '42%',
    bottom: 0,
    transform: [{ translateY: 50 }],
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
  coverCt: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('screen').width * 0.35,
    width: '100%',
    marginBottom: 50
  },
  editCaption: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(15, 23, 36, 0.47)',
    borderRadius: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editCover: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600,
    marginTop: 5
  },
  portfolioContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20
  },
  portfolio: {
    backgroundColor: Colors.Secondary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 15,
    // height: 46,
    // justifyContent: 'center',
    // marginLeft: '8%',
    // width: '71%'
    flexGrow: 1
  },
  portfolioText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    // lineHeight: 16.41,
    color: Colors.White,
    textAlign: 'center',
    marginLeft: 20
  },
  verticleLine: {
    height: '100%',
    width: 1
    // backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  portfolioLock: {
    backgroundColor: Colors.Secondary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftColor: Color(Colors.Secondary).lightness(55).hex().toString(),
    borderLeftWidth: 1,
    padding: 15,
    // height: 46,
    justifyContent: 'center',
    // marginRight: '8%',
    // width: '13%',
    alignItems: 'center'
  },
  bio: {
    marginTop: 20,
    marginHorizontal: 20
    // marginLeft: '8%',
    // marginRight: '8%'
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
    // flexDirection: 'row',
    marginTop: '8%'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  statsItem: {
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  statsText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    // lineHeight: 16.41,
    color: 'black',
    textAlign: 'center'
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    lineHeight: 16.41,
    color: Colors.Gray600,
    marginTop: 5,
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
    marginVertical: 15,
    paddingLeft: 20
    // marginHorizontal: '4%'
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 20,
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
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});

function ProfileState(props: { title: string; value: string | number }) {
  return (
    <View style={styles.statsItem}>
      <Text style={styles.statsText}>{props.value}</Text>
      <Text style={styles.statsLabel}>{props.title}</Text>
    </View>
  );
}
