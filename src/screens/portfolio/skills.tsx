import { FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import Skill from '../../components/portfolio/Skill';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';

export default function Skills() {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn
                buttonProps={{
                  onPress: () => {
                    navigation.navigate('Addskill');
                  }
                }}
              />
            );
          }
          return null;
        }
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
