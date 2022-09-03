import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import { getCategories } from '~/src/utils/services/post/categories';
import { Category } from '~/src/utils/typings/postCategory';
import Button from '../theme/Button';
import Loading from '../theme/Loading';
import CategoryItem from './categoryItem';

export function PostCategoryModal(props: {
  show: boolean;
  onClose: () => void;
  onChange?: (newSelectedCategories: string[]) => void;
}) {
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState(true);
  const selection = useRef<Set<string>>(new Set()).current;
  const [numOfSelection, setNumOfSelection] = useState(0);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const result = await getCategories('artwork');
    if (result.data.success) {
      setCategories(result.data.categories.category);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={props.show}
      onRequestClose={() => props.onClose?.()}
    >
      <View style={styles.modaltopbar}>
        <Text style={styles.textStyle}>Select Category</Text>
        <Button size="xs" onPress={() => props.onClose?.()}>
          <MaterialCommunityIcons name="close" size={24} color={Black[500]} />
        </Button>
      </View>
      <View style={styles.centeredView}>
        {/* <Input
          inputContainer={{ paddingLeft: 15 }}
          inputProp={{
            placeholder: 'Search Category Name',
            onChangeText: setSearch,
            style: {
              paddingHorizontal: 15,
              paddingVertical: 10,
              paddingTop: 10
            }
          }}
          prefix={
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={Blue.primary}
            />
          }
          style={styles.textinput}
        /> */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <FlatList
              contentContainerStyle={styles.list}
              data={categories}
              keyExtractor={(item, i) => item.name + i}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              renderItem={({ item, index }) => (
                <CategoryItem
                  name={item.name}
                  selected={selection.has(item.name)}
                  onPress={action => {
                    if (action === 'select') {
                      selection.add(item.name);
                      setNumOfSelection(selection.size);
                    } else {
                      selection.delete(item.name);
                      setNumOfSelection(selection.size);
                    }
                  }}
                />
              )}
            />
            {numOfSelection > 0 && (
              <Button
                fullWidth
                text="Done"
                type="filled"
                onPress={() => {
                  props.onChange?.(Array.from(selection));
                  props.onClose?.();
                }}
              />
            )}
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingHorizontal: 20
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  modaltopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  list: {
    paddingVertical: 10
  }
});
