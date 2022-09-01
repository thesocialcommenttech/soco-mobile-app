import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React from 'react';
import { ICertification } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { staticFileSrc } from '~/src/utils/methods';
import { Black, Blue } from '~/src/utils/colors';
import dayjs from 'dayjs';
import Button from '../theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Certification(props: {
  data: ICertification;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.experienceCt, props.style]}>
      <Image
        style={styles.certificateImage}
        source={{
          uri: staticFileSrc(props.data.certification_image_url)
        }}
      />
      <View style={styles.content}>
        <Button size="xs" onPress={() => {}} btnStyle={styles.titleBtn}>
          <View style={styles.titleCt}>
            <Text style={styles.title}>{props.data.title}</Text>
            <MaterialCommunityIcons
              name="launch"
              size={16}
              color={Blue.primary}
            />
          </View>
        </Button>
        <Button
          size="sm"
          onPress={() => {
            // props.toggleModal();
          }}
          btnStyle={styles.dropdownBtn}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={17}
            color={Black[600]}
          />
        </Button>
        <Text style={styles.subText}>{props.data.issuer_organization}</Text>
        <Text style={styles.subText}>
          Issued on {dayjs(props.data.issue_date).format('MMM YYYY')}
        </Text>
        <Text style={styles.subText}># {props.data.credential_id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  certificateImage: {
    width: 100,
    height: 60,
    borderRadius: 5
  },
  experienceCt: {
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    marginLeft: 10
  },
  subText: {
    color: Black[600],
    // marginTop: 3,
    fontSize: 14
  },
  titleCt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleBtn: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  title: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlignVertical: 'center',
    marginRight: 5
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
