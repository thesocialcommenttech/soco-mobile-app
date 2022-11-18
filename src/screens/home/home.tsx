import {
  Animated,
  Easing,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Black, Blue } from '../../utils/colors';
import { getUserFeeds } from '../../utils/services/user-posts_service/getUserFeeds.service';
import { getUserFeedsResponse } from '~/src/utils/typings/user-posts_interface/getUserFeeds.interface';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import Button from '~/src/components/theme/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomTabChild } from '~/src/types/navigation/bottomBar';
import AloneImage from '~/src/assets/images/bully.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '~/src/components/theme/Loading';
import Post from '~/src/components/Post';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen() {
  const navigation = useNavigation<BottomTabChild<'HomeTab'>['navigation']>();
  const verticalVal = useRef(new Animated.Value(-190)).current;
  // feed state
  const [feed, setFeed] = useState<getUserFeedsResponse['feeds']>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pageState, setPageState] = useState({ pageNo: 0, pageSize: 20 });

  async function fetchData(pageNo = 0, pageSize = 20) {
    const proj =
      'shares views description postedOn postType featureImage title comments upvotes totalSlides';

    const response = await getUserFeeds(proj, pageNo, pageSize);

    if (response.data.success) {
      setPageState({ ...pageState, pageNo, pageSize });
      if (pageNo === 0) {
        setFeed(response.data.feeds);
      } else {
        setFeed([...(feed ?? []), ...response.data.feeds]);
      }
    }
  }

  const fetchNextPage = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await fetchData(pageState.pageNo + 1);
    setLoading(false);
  };

  async function refreshPage() {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  // fetching feeds data at page mount
  useFocusEffect(
    useCallback(() => {
      if (!feed) {
        setLoading(true);
        fetchData().then(() => {
          setLoading(false);
        });
      }
    }, [])
  );

  // arrow animation
  useEffect(() => {
    if (!loading && feed.length === 0) {
      verticalVal.setValue(-190);
      // horization drop
      Animated.timing(verticalVal, {
        toValue: -5,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.in(Easing.bounce)
      }).start(({ finished }) => {
        if (finished) {
          // floating animation
          setTimeout(() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(verticalVal, {
                  toValue: -5,
                  duration: 0,
                  // delay: 4000,
                  useNativeDriver: true,
                  easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(verticalVal, {
                  toValue: -30,
                  duration: 700,
                  // delay: 4000,
                  useNativeDriver: true,
                  easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(verticalVal, {
                  toValue: -5,
                  duration: 700,
                  useNativeDriver: true,
                  easing: Easing.inOut(Easing.ease)
                })
              ])
            ).start();
          }, 500);
        }
      });
    }
  }, [loading, feed]);

  return (
    <ScreenWithTopBar navigation={navigation}>
      {feed?.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ padding: 20, alignItems: 'center', flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
        >
          <Image
            source={AloneImage}
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.aloneImg}
          />
          <Text
            style={[
              styles.message,
              { fontFamily: 'Roboto-Medium', fontSize: 18 }
            ]}
          >
            You are not following anyone.
          </Text>
          <Text style={[styles.message, { marginTop: 10 }]}>
            Browse content of your intrest and follow the author whose content
            you relate.
          </Text>
          {/* <Button
          type="outlined"
          text="Discover"
          size="sm"
          onPress={() => navigation.navigate('DiscoverTab')}
          btnStyle={{ marginTop: 40, width: '50%', alignSelf: 'center' }}
        >
          <View style={styles.Cta_btnContent}>
            <MaterialCommunityIcons
              name="compass-outline"
              size={18}
              color={Blue.primary}
            />
            <Text style={styles.Cta_btnText}>Discover</Text>
          </View>
        </Button> */}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -10,
              left: '41%',
              transform: [{ translateX: -35 }, { translateY: verticalVal }]
            }}
          >
            <MaterialCommunityIcons
              name="arrow-down-thin"
              size={70}
              color={Blue.primary}
            />
          </Animated.View>
        </ScrollView>
      ) : (
        <FlatList
          data={feed}
          keyExtractor={item => item._id}
          onEndReachedThreshold={0.33}
          onEndReached={fetchNextPage}
          ListFooterComponent={loading && <Loading />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
          }
          renderItem={({ item }) => (
            <Post
              data={item}
              postWrapperStyle={{
                borderTopWidth: 1,
                borderTopColor: Black[200]
              }}
            />
          )}
        />
      )}
    </ScreenWithTopBar>
  );
}

const styles = StyleSheet.create({
  message: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  aloneImg: {
    width: 150,
    height: 150,
    marginVertical: 50
  },
  Cta_btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  Cta_btnText: {
    marginLeft: 5,
    fontSize: 14,
    color: Blue.primary
  }
});

export default HomeScreen;
