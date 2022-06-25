import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';

export default function CategoryList({
  name,
  selected
}: {
  name: string;
  selected: boolean;
}) {
  const [active, setActive] = useState(selected);
  return (
    <>
      <View style={styles.list}>
        <TouchableWithoutFeedback onPress={() => setActive(!active)}>
          <View style={[active ? styles.listactive : styles.listinactive]}>
            <Text style={styles.listtext}>{name}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: '1%'
  },
  listtext: {
    color: 'black'
  },
  listactive: {
    backgroundColor: '#F5F9FF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#0063FF',
    marginLeft: '3%',
    marginRight: '2%'
  },
  listinactive: {
    padding: 10,
    marginLeft: '3%',
    marginRight: '2%'
  }
});
