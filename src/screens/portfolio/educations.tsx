import { FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import Education from '../../components/portfolio/educationList';
import {
  useNavigation,
  useFocusEffect,
  useRoute
} from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';

export default function Educations() {
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
                    navigation.navigate('Addeducation');
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
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={portfolio.education}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <Education
          data={item}
          style={styles.educationItem}
          editOptions={mine}
        />
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
  educationItem: {
    marginBottom: 20
  }
});
