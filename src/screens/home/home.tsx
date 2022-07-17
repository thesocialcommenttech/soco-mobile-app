import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../utils/colors';
import { getUserFeeds } from '../../utils/services/user-posts_service/getUserFeeds.service';
import { getUserFeedsResponse } from '~/src/utils/typings/user-posts_interface/getUserFeeds.interface';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import Post from '~/src/components/Post';

function HomeScreen({ navigation }) {
  // feed state
  const [feed, setFeed] = useState<getUserFeedsResponse['feeds']>([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({
    pageno: 0,
    size: 20
  });

  // fetching feeds data at page mount
  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  async function fetchData() {
    const proj =
      'shares views description postedOn postType featureImage title comments upvotes totalSlides';
    const response = await getUserFeeds(proj, pageState.pageno, pageState.size);

    if (response.data.success) {
      setFeed([...feed, ...response.data.feeds]);
    }
  }

  return (
    <ScreenWithTopBar navigation={navigation}>
      {loading ? (
        <View style={styles.loadingCt}>
          <ActivityIndicator color={'#0063ff'} size={32} />
        </View>
      ) : (
        <ScrollView>
          {feed.map((post, i) => (
            <Post key={i} data={post} />
          ))}
        </ScrollView>
      )}
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
