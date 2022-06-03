import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TopBar from '../../components/topBar';
import DropdownFilter from '../../components/dropdownFilter';
import DropdownDelete from '../../components/dropdownDelete';

const TrashScreen = ({ navigation }) => {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [isPremium] = useState(true);
  const [percentProfile] = useState(75);
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [TRASH, setTRASH] = useState([
    {
      id: 1,
      title: "Aesop handwash Paleo Pete's",
      label: 'Blogs'
    },
    {
      id: 2,
      title: 'Game over the gloves are off William',
      label: 'Articles'
    },
    {
      id: 3,
      title: 'Island time trip of a lifetime rusty dancemoves',
      label: 'Artworks'
    },
    {
      id: 4,
      title: "Pnot bianco what's a good wine?",
      label: 'Blogs'
    },
    {
      id: 5,
      title: 'A really big wall tap into the crazies sociopathic',
      label: 'Blogs'
    },
    {
      id: 6,
      title: 'Draft 6',
      label: 'Blogs'
    },
    {
      id: 7,
      title: 'Draft 7',
      label: 'Blogs'
    }
  ]);

  const onDelete = id => {
    const newTrash = TRASH.filter(item => item.id !== id);
    setSelectedLabel('All');
    setTRASH(newTrash);
  };

  return (
    <View style={styles.outerContainer}>
      <TopBar
        uri={profile}
        username={name}
        premium={isPremium}
        percentProfile={percentProfile}
        navigation={navigation}
      />
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Trash</Text>
          <DropdownFilter label={selectedLabel} setLabel={setSelectedLabel} />
        </View>
        <ScrollView>
          {TRASH.filter(item => {
            if (selectedLabel === 'All') {
              return item;
            } else {
              return item.label === selectedLabel;
            }
          }).map(({ id, title, label }) => (
            <View key={id}>
              <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                <DropdownDelete id={id} onDelete={onDelete} />
              </View>
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  pageContainer: {
    flex: 1,
    paddingBottom: '0%'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6%',
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },
  horizontalLine: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingVertical: '4%'
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Roboto-Medium',
    width: '90%'
  }
});

export default TrashScreen;
