import {
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import Modal1 from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const SECTIONS = [
  {
    title: 'Blogs',
    data: [
      {
        key: '1',
        text: 'Daily rituals for divine feminine energy healthy.',
        uri: 'https://picsum.photos/id/1/200',
        type: 'Blogs'
      },
      {
        key: '2',
        text: 'What a legend bowled Marsh - caught Lillee gambit armchair umpires.',
        uri: 'https://picsum.photos/id/10/200',
        type: 'Blogs'
      },

      {
        key: '3',
        text: 'What a legend bowled Marsh - caught Lillee gambit armchair umpires.',
        uri: 'https://picsum.photos/id/1002/200',
        type: 'Blogs'
      },
      {
        key: '4',
        text: 'Daily rituals for divine feminine energy healthy.',
        uri: 'https://picsum.photos/id/1006/200',
        type: 'Blogs'
      },
      {
        key: '5',
        text: 'Daily rituals for divine feminine energy healthy.',
        uri: 'https://picsum.photos/id/1008/200',
        type: 'Blogs'
      }
    ]
  },
  {
    title: 'Articles',
    data: [
      {
        key: '1',
        text: 'Home is where the anchor drops shore tours seas the day rusty dancemoves cruise eat sleep repeat crystal waters.',
        uri: 'https://picsum.photos/id/1011/200',
        type: 'Articles'
      },
      {
        key: '2',
        text: 'Support your microbiome inner beauty avoiding edocrine disruptors Im gluten free brain boosting mushroom infused coffee doing whole30 gummies powders and sprays glutem sensitivity melatonin infused gummies.',
        uri: 'https://picsum.photos/id/1012/200',
        type: 'Articles'
      },

      {
        key: '3',
        text: 'Curated wine list Tuscan lunches new world wines well I used to live in Napa ask the sommelier you can really taste the terroir cherry like overtones wine philistine cellar door.',
        uri: 'https://picsum.photos/id/1013/200',
        type: 'Articles'
      },
      {
        key: '4',
        text: 'Home is where the anchor drops shore tours seas the day rusty dancemoves cruise eat sleep repeat crystal waters.',
        uri: 'https://picsum.photos/id/1015/200',
        type: 'Articles'
      },
      {
        key: '5',
        text: 'Home is where the anchor drops shore tours seas the day rusty dancemoves cruise eat sleep repeat crystal waters.',
        uri: 'https://picsum.photos/id/1016/200',
        type: 'Articles'
      }
    ]
  },
  {
    title: 'Artwork',
    data: [
      {
        key: '1',
        uri: 'https://picsum.photos/id/1027/300',
        type: 'Artwork'
      },
      {
        key: '2',
        uri: 'https://picsum.photos/id/1028/300',
        type: 'Artwork'
      },

      {
        key: '3',
        uri: 'https://picsum.photos/id/1029/300',
        type: 'Artwork'
      },
      {
        key: '4',
        uri: 'https://picsum.photos/id/1032/300',
        type: 'Artwork'
      },
      {
        key: '5',
        uri: 'https://picsum.photos/id/1031/300',
        type: 'Artwork'
      }
    ]
  },
  {
    title: 'Skill Videos',
    data: [
      {
        key: '1',
        text: 'The World Cup eye on the ball Grand Slam pulled his hammy I’m gonna fade into Bolivian Superbowl allyoop our blood our sweat your tears.',
        uri: 'https://picsum.photos/id/1022/200',
        type: 'Skill Videos'
      },
      {
        key: '2',
        text: 'Beyonces ring JamesEdition Russian billionaires bachelor party international jetset super super super rich elegance AAirpass trustafarians Prada Gucci Chanel.',
        uri: 'https://picsum.photos/id/1023/200',
        type: 'Skill Videos'
      },

      {
        key: '3',
        text: 'Air kiss Anna who? closet classics more is more and less is a bore role models I cant concentrate in flats Victoria Bekham fashion passes - style remains Karl Lagerfelds cat Choupette.',
        uri: 'https://picsum.photos/id/1024/200',
        type: 'Skill Videos'
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1025/200',
        type: 'Skill Videos'
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1026/200',
        type: 'Skill Videos'
      }
    ]
  },
  {
    title: 'Projects',
    data: [
      {
        key: '1',
        text: 'Free wheeling free spirit Swedish denim your denim wear-and-tear story open air boyfriend jeans sexy denim spontaneous the true wanderer.',
        uri: 'https://picsum.photos/id/17/200',
        type: 'Projects'
      },
      {
        key: '2',
        text: 'Find your bliss back packers shore tours Vanuatu not quite Fiji seas the day romance at sea the love boat languid afternoons trip of a lifetime.',
        uri: 'https://picsum.photos/id/1018/200',
        type: 'Projects'
      },

      {
        key: '3',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1019/200',
        type: 'Projects'
      },
      {
        key: '4',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1020/200',
        type: 'Projects'
      },
      {
        key: '5',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1021/200',
        type: 'Projects'
      }
    ]
  },
  {
    title: 'Links',
    data: [
      {
        key: '1',
        text: 'Free wheeling free spirit Swedish denim your denim wear-and-tear story open air boyfriend jeans sexy denim spontaneous the true wanderer.',
        uri: 'https://picsum.photos/id/1045/200',
        type: 'Links'
      },
      {
        key: '2',
        text: 'Find your bliss back packers shore tours Vanuatu not quite Fiji seas the day romance at sea the love boat languid afternoons trip of a lifetime.',
        uri: 'https://picsum.photos/id/1050/200',
        type: 'Links'
      },

      {
        key: '3',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1047/200',
        type: 'Links'
      },
      {
        key: '4',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1048/200',
        type: 'Links'
      },
      {
        key: '5',
        text: 'Just another TikTok trend flight ban coronacast Amazon getting richer stay at home drinking bleach.',
        uri: 'https://picsum.photos/id/1049/200',
        type: 'Links'
      }
    ]
  }
];

export default function Works({ ...props }) {
  useFocusEffect(
    React.useCallback(() => {
      //Alert.alert('Screen was focused');
      props.extraData('Works');
      return () => {
        //Alert.alert('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [props])
  );
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => setModalVisible(true)}
        onPress={() => {
          if (item.type === 'Artwork') {
            navigation.navigate('Workdetail' as never, {} as never);
          } else if (item.type === 'Skill Videos') {
            navigation.navigate('SkillVideo' as never, {} as never);
          } else if (item.type === 'Projects') {
            navigation.navigate('Presentation' as never, {} as never);
          }
        }}
      >
        <View style={styles.item}>
          <Image
            source={{
              uri: item.uri
            }}
            style={[!item.text ? styles.artphoto : styles.itemPhoto]}
            resizeMode="cover"
          />
          {item.text
            ? [
                <Text style={styles.itemText} numberOfLines={2}>
                  {item.text}
                </Text>
              ]
            : []}
        </View>
      </TouchableOpacity>
    );
  };

  const VideoItem = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => setModalVisible(true)}
        onPress={() => navigation.navigate('SkillVideo' as never, {} as never)}
      >
        <View style={styles.item}>
          <View style={styles.playbtn}>
            <Icon1 name="play-circle" size={44} color="#FFFFFF" />
          </View>
          <Image
            source={{
              uri: item.uri
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
          <Text style={styles.itemText} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal1
        isVisible={modalVisible}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible(false)}
      >
        <>
          <View style={styles.optionview}>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <Icon1 name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <SectionList
        //contentContainerStyle={{ paddingHorizontal: 15 }}
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.heading}>{section.title}</Text>
            {section.title === 'Skill Videos'
              ? [
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <VideoItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ]
              : [
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ]}
          </>
        )}
        renderItem={({ item, section }) => {
          return null;
          // return <ListItem item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7D7987',
    marginLeft: '3.6%',
    marginTop: '8%',
    marginBottom: '5%'
  },
  item: {
    paddingLeft: 15,
    marginTop: 5,
    marginRight: 4
  },
  itemPhoto: {
    width: 170,
    height: 120,
    borderRadius: 7
  },
  itemText: {
    color: 'black',
    marginTop: 5,
    flexShrink: 1,
    width: 155,
    marginBottom: 5
  },
  image: {
    height: 100,
    width: 120,
    borderRadius: 8
  },
  detailtext: {
    color: 'black',
    //width: '40%',
    marginTop: '2%',
    marginLeft: '1%',
    lineHeight: 19
  },
  playbtn: {
    position: 'absolute',
    zIndex: 9999,
    opacity: 0.7,
    marginTop: 40,
    marginLeft: 77
  },
  artphoto: {
    height: 200,
    width: 200,
    borderRadius: 7,
    marginBottom: 10
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '4%',
    padding: '2%',
    marginTop: '4%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  }
});
