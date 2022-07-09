import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Avatar, Card } from '@rneui/base';
import { Colors } from '../../utils/colors';
import { getUserFeeds } from '../../utils/services/user-posts_service/getUserFeeds.service';
import dayjs from 'dayjs';
import {
  Feed,
  getUserFeedsResponse
} from '~/src/utils/typings/user-posts_interface/getUserFeeds.interface';
import { staticFileSrc } from '~/src/utils/methods';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';

function Post({ data }: { data: Feed }): ReactElement {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View>
        <View style={styles.cardTitle}>
          <View style={styles.profileinfo}>
            <Avatar
              size={36}
              rounded
              // title={name?.charAt(0)}
              // titleStyle={styles.avatarTitle}
              source={{
                uri: staticFileSrc(data.postedBy.profileImage)
              }}
              activeOpacity={0.7}
              containerStyle={styles.avatar2}
            />
            <Text style={styles.cardTitleText}>{data.postedBy.name}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcon
              name="share-variant-outline"
              size={20}
              color={Colors.Gray600}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <Image
            style={styles.postPic}
            resizeMode="cover"
            source={{ uri: staticFileSrc(data.featureImage) }}
          />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>{data.title}</Text>
        </View>
        {data.description && (
          <Text style={styles.subTitle}>{data.description}</Text>
        )}
        <View style={styles.cardFooter2}>
          <Text style={styles.timestamp}>
            {dayjs(data.postedOn).format('DD MMM, YYYY')}
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{data.postType}</Text>
          </View>
          <View style={styles.eyeView}>
            <Ionicon name="eye-outline" size={19} color={Colors.Gray600} />
            <Text style={styles.viewNum}>{data.views}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

function HomeScreen({ navigation }) {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [isPremium] = useState(true);
  const [percentProfile] = useState(75);

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
  avatar2: {
    borderWidth: 1,
    borderColor: Colors.White
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    marginLeft: '10%',
    color: 'black'
  },
  mainContent: {
    marginTop: '5%'
  },
  postPic: {
    width: '100%',
    minHeight: 300,
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
  timestamp: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  tag: {
    backgroundColor: Colors.Gray100,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black,
    textTransform: 'capitalize'
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
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 14.52,
    color: 'black',
    marginTop: 10
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});

export default HomeScreen;
