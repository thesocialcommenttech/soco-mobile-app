import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Experience from '../../components/portfolio/experiencelist';
import Modal1 from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { PortfolioTabStackScreenProps } from '~/src/utils/typings/stack';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';

export default function Experiences() {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    portfolio: { experience }
  } = usePortfolioData();
  const navigation =
    useNavigation<PortfolioTabStackScreenProps['navigation']>();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => (
          <PortfolioUpdateBtn
            buttonProps={{
              onPress: () => {
                navigation.navigate('Addexperience');
              }
            }}
          />
        )
      });
    }, [navigation])
  );

  return (
    <View>
      <Modal1
        isVisible={modalVisible}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible(false)}
      >
        <>
          <View style={styles.optionview}>
            <TouchableWithoutFeedback
            // onPress={() => {
            //   chooseFile('photo');
            //   setModalVisible1(false);
            // }}
            >
              <View style={styles.modalrow}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={22}
                  color="black"
                />
                <Text style={styles.optiontext}>Edit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.modalDelete}>
                <MaterialCommunityIcons name="delete" size={22} color="black" />
                <Text style={styles.optiontext}>Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal1>
      <FlatList
        contentContainerStyle={styles.container}
        data={experience}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Experience data={item} style={styles.experienceItem} />
        )}
      />
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
