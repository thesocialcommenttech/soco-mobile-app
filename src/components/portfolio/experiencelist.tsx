import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Experience as IExperience } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import dayjs from 'dayjs';
import Button from '../theme/Button';
import { Black } from '~/src/utils/colors';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';
import { removePortforlioExperience } from '~/src/utils/services/user-portfolio_services/experience/removePortforlioExperience.service';
import { produce } from 'immer';
import { useNavigation } from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';

export default function Experience(props: {
  data: IExperience;
  style?: StyleProp<ViewStyle>;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();
  const [isRemoving, setIsRemoving] = useState(false);
  const { portfolio, setPortfolio } = usePortfolioData();

  const remove = async () => {
    setIsRemoving(true);
    const result = await removePortforlioExperience({
      experienceId: props.data._id
    });

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          const index = draft.experience.findIndex(
            ed => ed._id === props.data._id
          );
          draft.experience.splice(index, 1);
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
            navigation.navigate('Addexperience', { data: props.data });
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
      <View
        style={[styles.container, props.style, isRemoving && styles.removingEd]}
      >
        <Text style={styles.title}>{props.data.title}</Text>
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
        <Text style={styles.companyNduration}>
          {props.data.company && (
            <>
              @ {props.data.company}
              {'  |  '}
            </>
          )}
          {dayjs(props.data.from).format('MMM YYYY')}
          {'  '}-{'  '}
          {props.data.ongoing ? 'Now' : dayjs(props.data.to).format('MMM YYYY')}
        </Text>
        <Text style={styles.description}>{props.data.description}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginRight: 45,
    textAlignVertical: 'bottom'
  },
  removingEd: {
    opacity: 0.3
  },
  companyNduration: {
    color: 'black',
    marginTop: 5,
    marginRight: 45
  },
  description: {
    color: Black[600],
    lineHeight: 20,
    marginTop: 5
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
