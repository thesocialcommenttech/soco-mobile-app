import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Yellow } from '~/src/utils/colors';
import Button from '../theme/Button';
import { IEducation } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import dayjs from 'dayjs';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';
import { useNavigation } from '@react-navigation/native';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';
import { removePortforlioEducation } from '~/src/utils/services/user-portfolio_services/education/removePortforlioEducation.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { produce } from 'immer';

export default function Education(props: {
  data: IEducation;
  style?: StyleProp<ViewStyle>;
  editOptions?: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();
  const [isRemoving, setIsRemoving] = useState(false);
  const { portfolio, setPortfolio } = usePortfolioData();

  const remove = async () => {
    setIsRemoving(true);
    const result = await removePortforlioEducation({
      educationId: props.data._id
    });

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          const index = draft.education.findIndex(
            ed => ed._id === props.data._id
          );
          draft.education.splice(index, 1);
        })
      );
    }
  };

  return (
    <>
      <Bottomsheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <DropdownOption
          optionKey="edit"
          label="Edit"
          onOptionPress={option => {
            setModalVisible(false);
            navigation.navigate('Addeducation', { data: props.data });
          }}
        />
        <DropdownOption
          optionKey="delete"
          label="Delete"
          onOptionPress={option => {
            setModalVisible(false);
            remove();
          }}
        />
      </Bottomsheet>
      <View style={[props.style, isRemoving && styles.removingEd]}>
        <View style={styles.educationInfo}>
          <View style={styles.courseCt}>
            <Text style={styles.degree}>{props.data.course}</Text>
            {props.data.status === 'completed' ? (
              <Text style={styles.passYear}>
                {dayjs(props.data.passYear).format('MMM YYYY')}
              </Text>
            ) : (
              <Text style={styles.pursuingTag}>Pursuing</Text>
            )}
          </View>
          <Text style={styles.instituteName}>{props.data.institute}</Text>
        </View>
        {props.editOptions && (
          <Button
            size="sm"
            disabled={isRemoving}
            processing={isRemoving}
            onPress={() => setModalVisible(!modalVisible)}
            btnStyle={styles.dropdownBtn}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={17}
              color={Black[600]}
            />
          </Button>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  educationInfo: {
    marginRight: 45
  },
  removingEd: {
    opacity: 0.3
  },
  courseCt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  degree: {
    color: Blue.primary,
    // marginTop: 1,
    // fontSize: 16
  },
  pursuingTag: {
    color: Yellow[700],
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: Yellow[100],
    marginLeft: 5
  },
  instituteName: {
    color: 'black',
    marginTop: 3
  },
  passYear: {
    color: Black[600],
    marginLeft: 5
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
