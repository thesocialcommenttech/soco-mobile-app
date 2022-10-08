import { FlatList, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import Certification from '../../components/portfolio/Certificaction';
import {
  useNavigation,
  useFocusEffect,
  useRoute
} from '@react-navigation/native';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';

export default function Certifications() {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const addNewCertification = () => {
    navigation.navigate('Addcertificate');
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn
                buttonProps={{ onPress: addNewCertification }}
              />
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      {portfolio.certifications?.length === 0 ? (
        <EmptyPortfolioSection
          mine={mine}
          onAddBtnPress={addNewCertification}
          addBtnText="Add Certification"
          message="You have no certification yet"
          messageForMe="User has no certification yet"
        />
      ) : (
        <FlatList
          style={{ overflow: 'visible' }}
          data={portfolio.certifications}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Certification
              data={item}
              style={styles.certificationItem}
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
  certificationItem: {
    marginBottom: 20
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
  }
});
