import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import Education from '../../components/portfolio/educationList';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { PortfolioTabStackScreenProps } from '~/src/utils/typings/stack';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';

export default function Educations() {
  const { portfolio } = usePortfolioData();
  const navigation =
    useNavigation<PortfolioTabStackScreenProps['navigation']>();

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => (
          <PortfolioUpdateBtn
            buttonProps={{
              onPress: () => {
                navigation.navigate('Addeducation');
              }
            }}
          />
        )
      });
    }, [navigation])
  );
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={portfolio.education}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <Education data={item} style={styles.educationItem} />
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
