import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle
} from 'react-native';
import React, { useState } from 'react';
import ProgressCircle from 'react-native-progress-circle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal1 from 'react-native-modal';
import Button from '../theme/Button';
import { Black, Blue } from '~/src/utils/colors';
import { ISkill } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { useNavigation } from '@react-navigation/native';
import produce from 'immer';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';
import { removePortforlioEducation } from '~/src/utils/services/user-portfolio_services/education/removePortforlioEducation.service';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';
import { removePortforlioSkill } from '~/src/utils/services/user-portfolio_services/skills/removePortforlioSkill.service';

export default function Skill(props: {
  data: ISkill;
  style?: StyleProp<ViewStyle>;
  editOptions?: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();
  const [isRemoving, setIsRemoving] = useState(false);
  const { portfolio, setPortfolio } = usePortfolioData();

  const remove = async () => {
    setIsRemoving(true);
    const result = await removePortforlioSkill({
      skillId: props.data._id
    });

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          const index = draft.skill.findIndex(ed => ed._id === props.data._id);
          draft.skill.splice(index, 1);
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
            navigation.navigate('Addskill', { data: props.data });
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
        style={[styles.container, props.style, isRemoving && styles.removing]}
      >
        <View style={styles.progresscont}>
          <View style={styles.progress}>
            <ProgressCircle
              percent={props.data.level}
              radius={20}
              borderWidth={4}
              color={Blue.primary}
              shadowColor={Blue[100]}
              bgColor="white"
            />
          </View>
          <View style={styles.skillInfo}>
            <Text style={styles.skill}>{props.data.skill}</Text>
            <Text style={styles.rating}>{props.data.level / 10} / 10</Text>
          </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removing: {
    opacity: 0.3
  },
  progress: {
    transform: [{ rotateY: '180deg' }]
  },
  progresscont: {
    flexDirection: 'row',
    marginRight: 45
  },
  skillInfo: { marginLeft: 20 },
  skill: {
    color: 'black',
    // fontSize: 16
  },
  rating: {
    color: Black[600],
    marginTop: 2
  },
  option: {
    marginTop: '2%'
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
    marginBottom: '2%',
    padding: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%'
  },
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
