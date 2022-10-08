import { FlatList, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import Experience from '../../components/portfolio/experiencelist';
import {
  useNavigation,
  useFocusEffect,
  useRoute
} from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';

export default function Experiences() {
  const {
    portfolio: { experience }
  } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const addNewExperience = () => {
    navigation.navigate('Addexperience');
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn buttonProps={{ onPress: addNewExperience }} />
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      {experience?.length === 0 ? (
        <EmptyPortfolioSection
          mine={mine}
          onAddBtnPress={addNewExperience}
          addBtnText="Add Experience"
          message="You have no experience yet"
          messageForMe="User has no experience yet"
        />
      ) : (
        <FlatList
          data={experience}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Experience
              data={item}
              style={styles.experienceItem}
              editOptions={mine}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  experienceItem: {
    marginBottom: 20
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
  }
});
