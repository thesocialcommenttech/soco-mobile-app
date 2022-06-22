import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../utils/colors';

export default function Categorybox({
  id,
  backgroundstyle,
  textstyle,
  text,
  cancel,
  obj,
  data,
  setData
}: {
  id: number;
  backgroundstyle: any;
  textstyle: any;
  text: string;
  cancel: string;
  obj: {
    id: number;
    text: string;
    selected: boolean;
  };
  data: any;
  setData: any;
}) {
  return (
    <View key={id}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (cancel === 'False') {
            setData(
              data.map(item => {
                if (item.id === obj.id) {
                  return {
                    ...item,
                    selected: true
                  };
                }
                return item;
              })
            );
          }
        }}
      >
        <View style={styles.container}>
          <View style={backgroundstyle}>
            <Text style={textstyle}>{text}</Text>
            {cancel === 'True'
              ? [
                  <TouchableOpacity
                    onPress={() => {
                      setData(
                        data.map(item => {
                          if (item.id === obj.id) {
                            return {
                              ...item,
                              selected: false
                            };
                          }
                          return item;
                        })
                      );
                    }}
                    style={styles.close}
                  >
                    <MaterialCommunityIcon
                      name="close"
                      size={15}
                      color={'rgba(255, 255, 255, 0.5)'}
                      suppressHighlighting={true}
                    />
                  </TouchableOpacity>
                ]
              : []}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '1.5%',
    alignItems: 'center'
  },
  close: {
    justifyContent: 'center',
    marginRight: '4%'
  }
});
