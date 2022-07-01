import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SkillList from '../../components/portfolio/skillList';

const Data = [
  {
    id: 1,
    skill: 'HTML & CSS',
    rating: 9
  },
  {
    id: 2,
    skill: 'Javascript',
    rating: 9.5
  },
  {
    id: 3,
    skill: 'React',
    rating: 9
  },
  {
    id: 4,
    skill: 'C++',
    rating: 7
  },
  {
    id: 5,
    skill: 'Python',
    rating: 8
  },
  {
    id: 6,
    skill: 'Programming',
    rating: 8.5
  },
  {
    id: 7,
    skill: 'Devops',
    rating: 9.5
  },
  {
    id: 8,
    skill: 'UI/UX',
    rating: 9.5
  },
  {
    id: 9,
    skill: 'System Design',
    rating: 7.5
  }
];

export default function Skills() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <SkillList skill={item.skill} rating={item.rating} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '4%',
    marginLeft: '5%',
    marginRight: '6.2%'
  }
});
