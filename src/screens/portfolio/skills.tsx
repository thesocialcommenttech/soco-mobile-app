import { FlatList, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import Skill from '../../components/portfolio/Skill';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';

export default function Skills() {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const addNewSkill = () => {
    navigation.navigate('Addskill');
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn buttonProps={{ onPress: addNewSkill }} />
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  if (portfolio.skill?.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyPortfolioSection
          mine={mine}
          onAddBtnPress={addNewSkill}
          addBtnText="Add Skill"
          message="You have no skill yet"
          messageForMe="User has no skill yet"
        />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={portfolio.skill}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <Skill data={item} style={styles.skillItem} editOptions={mine} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  skillItem: { marginBottom: 25 }
});
