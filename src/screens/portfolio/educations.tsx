import { FlatList, StyleSheet, View } from 'react-native';
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
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';

export default function Educations() {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const addNewEducation = () => {
    navigation.navigate('Addeducation');
  };
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn buttonProps={{ onPress: addNewEducation }} />
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  if (!portfolio.education || portfolio.education?.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyPortfolioSection
          mine={mine}
          onAddBtnPress={addNewEducation}
          addBtnText="Add Education"
          message="You have no education yet"
          messageForMe="User has no education yet"
        />
      </View>
    );
  }

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
