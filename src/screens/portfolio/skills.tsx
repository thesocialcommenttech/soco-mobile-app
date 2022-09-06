import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import Skill from '../../components/portfolio/Skill';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { Portfolio_ScreenProps } from '~/src/types/navigation/portfolio';

export default function Skills() {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<Portfolio_ScreenProps['navigation']>();

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => (
          <PortfolioUpdateBtn
            buttonProps={{
              onPress: () => {
                navigation.navigate('Addskill');
              }
            }}
          />
        )
      });
    }, [navigation])
  );

  useFocusEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('Addskill');
          }}
          size="sm"
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={24}
            color="black"
          />
        </Button>
      )
    });
  });

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={portfolio.skill}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <Skill data={item} style={styles.skillItem} />}
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
