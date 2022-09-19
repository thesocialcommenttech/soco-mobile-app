import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Avatar } from '@rneui/base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreatePostFAB from '../../components/CreatePostFAB';
import { Black, Blue, Colors, Yellow } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../store/reducers';
import { getUserData2 } from '../../utils/services/user-profile_service/getUserData2.service';
import { getPosts } from '../../utils/services/user-posts_service/getPosts.service';
import { GetPostsResponse } from '~/src/utils/typings/user-posts_interface/getPosts.interface';
import Post from '~/src/components/Post';
import { staticFileSrc } from '~/src/utils/methods';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { PostType } from '~/src/utils/typings/post';
import {
  ProfileDataProvider,
  ProfileContext,
  useProfile
} from '~/src/state/profileScreenState';
import Loading from '~/src/components/theme/Loading';
import Button from '~/src/components/theme/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { FollowUserResponse } from '~/src/utils/typings/follow-user_interface/followUser.interface';
import { unfollowUser } from '~/src/utils/services/follow-user_service/unfollowUser.service';
import { followUser } from '~/src/utils/services/follow-user_service/followUser.service';
import { ProfileScreenProps } from '~/src/types/navigation/profile';
import { useStore } from 'zustand';
import UpdateBioModal from '~/src/components/modals/profile/UpdateBio';
import UpdateProfileCoverImageModal from '~/src/components/modals/profile/UpdateProfileCoverImage';
import UpdateCaptionModal from '~/src/components/modals/profile/UpdateCaption';
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

function _ProfileScreen_() {
  const navigation = useNavigation<ProfileScreenProps['navigation']>();
  const route = useRoute<ProfileScreenProps['route']>();
  const auth = useSelector((state: IRootReducer) => state.auth);
  const [pageState, setPageState] = useState({
    pageNo: 0,
    pageSize: 20
  });

  const { setUserProfile, userProfile } = useProfile();

  const mine = useMemo(
    () => auth.user?.username === route.params?.username,
    [auth.user, route.params]
  );

  const [posts, setPosts] = useState<GetPostsResponse['posts']>(null);

  const [profileLoading, setProfileLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  const [locked, setLocked] = useState(true);

  async function fetchUserProfile() {
    setProfileLoading(true);
    const profileProjection =
      'name email email_verified coverImage onboard isFollowing totalViews totalPosts postTypes.postType postTypes.totalPosts favouritePostsCount followerUsersCount followingUsersCount profileImage caption timelineTextureImage username bio portfolioLock premium';

    const result = await getUserData2(
      route.params?.username ?? auth.user.username,
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
      route.params?.user_id ?? auth.user._id,
      pageState.pageNo,
      postProjection,
      pageState.pageSize
    );

    if (result.data.success) {
      setPosts(result.data.posts);
    }
    setPostsLoading(false);
  }

  function fetchScreenData() {
    fetchUserProfile();
    fetchPosts();
  }

  useEffect(() => {
    fetchScreenData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  if (profileLoading || postsLoading) {
    return <Loading />;
  }

  return (
    <>
      <UpdateCaptionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <UpdateProfileCoverImageModal
        show={modalVisible2}
        onClose={() => setModalVisible2(false)}
      />
      <UpdateBioModal
        modalVisible1={modalVisible1}
        setModalVisible1={setModalVisible1}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={profileLoading || postsLoading}
            onRefresh={fetchScreenData}
          />
        }
      >
        <View style={styles.coverCt}>
          <Image
            source={{
              uri: staticFileSrc(userProfile.coverImage)
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
                uri: staticFileSrc(userProfile.profileImage)
              }}
              activeOpacity={0.7}
              containerStyle={styles.avatar}
            />
          </View>
          {userProfile.caption && (
            <View style={styles.captionOnImg}>
              <Text style={styles.captionOnImgTxt}>{userProfile.caption}</Text>
            </View>
          )}
          {mine && (
            <>
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
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.userName}>{userProfile.username}</Text>
        </View>

        <View style={styles.portfolioContainer}>
          <Button
            text="Portfolio"
            fullWidth
            type="filled"
            // disabled={!userProfile.premium}
            onPress={() => {
              if (mine) {
                navigation.navigate('PortfolioTab');
              } else {
                navigation.navigate('PortfolioStack', {
                  username: userProfile.username
                });
              }
            }}
            textStyle={{ color: 'white', marginLeft: 20 }}
            btnStyle={[
              styles.portfolio,
              mine && styles.portfolio_Mine
              // !userProfile.premium && styles.portfolioLocked
            ]}
          />
          {mine ? (
            <Button
              type="filled"
              onPress={() => {}}
              // disabled={!userProfile.premium}
              btnStyle={[
                styles.portfolioLock
                // !userProfile.premium && styles.portfolioLockDisabled
              ]}
            >
              <MaterialCommunityIcon
                name={locked ? 'lock-outline' : 'lock-off-outline'}
                size={20}
                color={Colors.White}
              />
            </Button>
          ) : (
            <FollowToggleBtn />
          )}
        </View>

        <View style={styles.bio}>
          <Text style={styles.bioText}>{userProfile.bio}</Text>
        </View>

        {mine && (
          <Button
            type="text"
            size="xs"
            btnStyle={styles.updateBio}
            onPress={() => setModalVisible1(!modalVisible1)}
          >
            <View style={styles.updateBioLink}>
              <MaterialCommunityIcon
                name="pencil-outline"
                size={16}
                color={Blue.primary}
              />
              <Text style={styles.updateBioText}>Update Bio</Text>
            </View>
          </Button>
        )}

        <ScrollView horizontal={true} style={styles.stats}>
          <Button
            btnStyle={{ padding: 0 }}
            onPress={() => {
              navigation.navigate('Connections', {
                screen: 'Followers',
                params: { userId: userProfile._id }
              });
            }}
          >
            <ProfileState
              title="Followers"
              value={userProfile.followerUsersCount}
            />
          </Button>
          <Button
            btnStyle={{ padding: 0 }}
            onPress={() => {
              navigation.navigate('Connections', {
                screen: 'Followings',
                params: { userId: userProfile._id }
              });
            }}
          >
            <ProfileState
              title="Following"
              value={userProfile.followingUsersCount}
            />
          </Button>
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

        {posts?.map(post => (
          <Post
            key={post._id}
            updatable={mine}
            data={{
              ...post,
              postedBy: {
                _id: userProfile._id,
                name: userProfile.name,
                profileImage: userProfile.profileImage,
                username: userProfile.username
              }
            }}
            postWrapperStyle={{
              borderTopWidth: 1,
              borderTopColor: Colors.GrayLine
            }}
          />
        ))}
      </ScrollView>
      {mine && <CreatePostFAB />}
    </>
  );
}

function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProps['navigation']>();

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ProfileDataProvider>
        <_ProfileScreen_ />
      </ProfileDataProvider>
    </ScreenWithTopBar>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: Black[200]
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
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
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 23,
    fontFamily: 'Roboto-Medium',
    color: 'black'
  },
  userName: {
    fontSize: 16,
    color: Black[600],
    marginTop: 5
  },
  portfolioContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20
  },
  portfolio: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 20
  },
  portfolio_Mine: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0
  },
  portfolioLocked: {
    backgroundColor: Blue[200]
  },
  followBtn: {
    flexGrow: 1,
    flexShrink: 0
  },
  followBtnText: {
    textTransform: 'capitalize'
  },
  unFollowBtn: { borderColor: Black[600] },
  unFollowBtnText: { color: Black[600] },
  portfolioLock: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftColor: Blue[400],
    borderLeftWidth: 1
  },
  portfolioLockDisabled: {
    backgroundColor: Blue[200],
    borderLeftColor: Color(Blue[300]).lighten(0.08).rgb().toString()
  },
  bio: {
    marginTop: 20,
    marginHorizontal: 20
  },
  bioText: {
    fontSize: 14,
    lineHeight: 18.2,
    color: Black[600],
    textAlign: 'center'
  },
  updateBio: {
    marginTop: 5,
    alignSelf: 'center'
  },
  updateBioLink: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  updateBioText: {
    fontSize: 14,
    color: Blue.primary,
    textAlign: 'center',
    marginLeft: 3
  },
  stats: {
    marginTop: 20
  },
  statsItem: {
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  statsText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'black',
    textAlign: 'center'
  },
  statsLabel: {
    fontSize: 14,
    color: Black[600],
    marginTop: 5,
    textAlign: 'center'
  },
  activity: {
    flexGrow: 0,
    marginVertical: 15,
    paddingLeft: 20,
    paddingRight: 20
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
    color: Black[600],
    textAlign: 'center'
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 100,
    backgroundColor: Yellow[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Yellow[700],
    textAlign: 'center'
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
  }
});

function FollowToggleBtn() {
  const store = useContext(ProfileContext);
  const { setUserProfile, userProfile } = useStore(store);
  const [loading, setLoading] = useState(false);

  async function toggleFollow() {
    try {
      setLoading(true);
      let result: AxiosResponse<FollowUserResponse>;
      if (userProfile.isFollowing) {
        result = await unfollowUser(userProfile._id);
      } else {
        result = await followUser(userProfile._id);
      }

      if (result.data.success) {
        setUserProfile({
          ...userProfile,
          isFollowing: !userProfile.isFollowing
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button
      text={userProfile.isFollowing ? 'Following' : 'Follow'}
      fullWidth
      type="outlined"
      onPress={toggleFollow}
      disabled={loading}
      processing={loading}
      btnStyle={[
        styles.followBtn,
        userProfile.isFollowing && styles.unFollowBtn
      ]}
      textStyle={[
        styles.followBtnText,
        userProfile.isFollowing && styles.unFollowBtnText
      ]}
    />
  );
}

function ProfileState(props: { title: string; value: string | number }) {
  return (
    <View style={styles.statsItem}>
      <Text style={styles.statsText}>{props.value}</Text>
      <Text style={styles.statsLabel}>{props.title}</Text>
    </View>
  );
}
