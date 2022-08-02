import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MainComponent({ ...props }) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  const [like, setLike] = useState(false);
  const [dislike, setDisLike] = useState(false);
  const [heart, setHeart] = useState(false);
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.data[0].title}</Text>
      <View style={styles.userview}>
        <View style={styles.userphotoandname}>
          <Image
            style={styles.userimg}
            source={{
              uri: props.data[0].uri
            }}
          />
          <Text style={styles.usrname}>{props.data[0].author}</Text>
        </View>
        <Text style={styles.postdate}>{props.data[0].date}</Text>
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
        <Text style={styles.likenumber}>{props.data[0].like}</Text>
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
                  <Icon1 name="thumb-down-outline" size={18} color="black" />
                </TouchableWithoutFeedback>
              ]}
        </View>
        <Text style={styles.likenumber}>{props.data[0].dislike}</Text>
        <View style={styles.icon}>
          {heart
            ? [
                //eslint-disable-next-line prettier/prettier
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
      <Text style={styles.detailstext}>{props.data[0].detailText}</Text>
      <View style={styles.categoryview}>
        {props.data[0].tags.map(item => {
          return (
            <View style={styles.categorybox}>
              <Text style={styles.categorytext}>{item.text}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.authorview}>
        <View style={styles.mTab}>
          <View style={styles.information}>
            <View style={styles.imageCon}>
              <Image
                source={{
                  uri: props.data[0].uri
                }}
                style={styles.img}
              />
            </View>
            <View style={styles.followtext}>
              <Text style={styles.name}>{props.data[0].authorNotename}</Text>
              <Text style={styles.userid}>{props.data[0].authorID}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.authorimf}>{props.data[0].authorimf}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: '2%',
    marginBottom: '5%'
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
