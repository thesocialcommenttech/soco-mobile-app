import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import EducationList from '../../components/portfolio/educationList';
import { useFocusEffect } from '@react-navigation/native';

const Data = [
  {
    id: 1,
    degree: 'B.Tech',
    present: true,
    date: 'May, 2018',
    information: 'IIT Bombay'
  },
  {
    id: 2,
    degree: '12th',
    present: false,
    date: 'May, 2014',
    information: 'St. Anselms Senior Secondary, School Ajmer.'
  },
  {
    id: 3,
    degree: '10th',
    present: false,
    date: 'May, 2012',
    information: 'Bombay School of Excellence'
  }
];

export default function Educations({ ...props }) {
  useFocusEffect(
    React.useCallback(() => {
      //Alert.alert('Screen was focused');
      props.extraData('Education');
      return () => {
        //Alert.alert('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [props])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <EducationList
            degree={item.degree}
            present={item.present}
            date={item.date}
            information={item.information}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '6%'
  },
  degreeview: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },
  degree: {
    color: '#0063FF',
    marginTop: 1,
    fontSize: 16
  },
  presenttext: {
    color: '#B88F00',
    marginTop: 2,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 2
  },
  details: {
    color: 'black',
    marginTop: 8,
    lineHeight: 17,
    fontSize: 16
  },
  date: {
    color: '#7D7987',
    marginLeft: 9,
    marginTop: 1
  },
  presentview: {
    backgroundColor: '#FFF7DB',
    borderRadius: 10,
    marginLeft: 9
  }
});
