import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UPIIconImage from '../../assets/images/icons/UPI.png';
import Button from '../theme/Button';
import { Black } from '~/src/utils/colors';
import Maskdata from 'maskdata';

export default function WithdrawAccount({
  title,
  type,
  showMoreOpts = true,
  style
}: {
  title: string;
  type: 'upi' | 'bank';
  showMoreOpts?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.body}>
        <View style={styles.iconCt}>
          {type === 'bank' ? (
            <MaterialCommunityIcons name="bank" size={26} color={Black[600]} />
          ) : (
            <Image style={styles.image} source={UPIIconImage} />
          )}
        </View>
        <Text style={styles.detailtext}>
          {Maskdata.maskPassword(title, {
            maskWith: 'X',
            unmaskedStartCharacters: title.length * 0.6
          })}
        </Text>
      </View>
      {showMoreOpts && (
        <Button btnStyle={{ padding: 5, borderRadius: 10 }} onPress={() => {}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={Black[500]}
          />
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconCt: {
    width: 80
  },
  body: {
    flexDirection: 'row'
  },
  detailtext: {
    fontSize: 16,
    color: 'black'
  },
  image: {
    marginLeft: '2%',
    marginTop: '4%'
  }
});
