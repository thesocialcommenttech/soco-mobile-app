import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/colors';
import { getUserFeeds } from '../../utils/services/user-posts_service/getUserFeeds.service';
import { getUserFeedsResponse } from '~/src/utils/typings/user-posts_interface/getUserFeeds.interface';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import Post from '~/src/components/Post';
import Loading from '~/src/components/theme/Loading';

function HomeScreen({ navigation }) {
  // feed state
  const [feed, setFeed] = useState<getUserFeedsResponse['feeds']>([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({
    pageNo: 0,
    pageSize: 20
  });

  const fetchNextPage = async () => {
    if (loading) {
      return;
    }

    await fetchData(pageState.pageNo + 1);
  };

  // fetching feeds data at page mount
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(pageNo = 0, pageSize = 20) {
    const proj =
      'shares views description postedOn postType featureImage title comments upvotes totalSlides';

    setLoading(true);
    const response = await getUserFeeds(proj, pageNo, pageSize);

    if (response.data.success) {
      setPageState({ ...pageState, pageNo, pageSize });
      setFeed([...feed, ...response.data.feeds]);
    }
    setLoading(false);
  }

  return (
    <ScreenWithTopBar navigation={navigation}>
      <FlatList
        data={feed}
        keyExtractor={item => item._id}
        onEndReachedThreshold={0.33}
        ListFooterComponent={loading && <Loading />}
        onEndReached={fetchNextPage}
        renderItem={({ item }) => (
          <Post
            data={item}
            postWrapperStyle={{
              borderTopWidth: 1,
              borderTopColor: Colors.GrayLine
            }}
          />
        )}
      />
    </ScreenWithTopBar>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.White
  },
  padd: {
    padding: 5
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});

export default HomeScreen;
