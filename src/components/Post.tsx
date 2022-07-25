import dayjs from 'dayjs';
import React, { ReactElement } from 'react';
import { staticFileSrc } from '../utils/methods';
import { Feed } from '../utils/typings/user-posts_interface/getUserFeeds.interface';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Avatar, Card } from '@rneui/base';
import { Colors } from '../utils/colors';
import { Post as IPost } from '../utils/typings/post';

export default function Post({ data }: { data: IPost }): ReactElement {
  if (data.postType === 'shared') {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View>
          <View style={styles.cardTitle}>
            <View style={styles.profileinfo}>
              <Avatar
                size={36}
                rounded
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
          <Post data={data.sharedPost} />
          <View style={styles.cardFooter2}>
            <Text style={styles.timestamp}>
              {dayjs(data.postedOn).format('DD MMM, YYYY')}
            </Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.postType}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.cardContainer}>
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
        {(data.postType === 'blog' || data.postType === 'article') &&
          data.description && (
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
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    width: '100%',
    marginLeft: '0%',
    marginTop: '0%',
    // borderTopColor: 'white'
    borderTopWidth: 1,
    borderTopColor: Colors.GrayLine
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
  }
});
