import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { Black } from '~/src/utils/colors';
import WorkItem from '~/src/components/screens/portfolio/WorkItem';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import Bottomsheet, {
  DropdownOption
} from '~/src/components/bottomsheet/Bottomsheet';
import { PortfolioUpdateBtn } from '~/src/components/screens/portfolio/PortfolioItemUpdateBtn';
import { PortfolioSubTab_ScreenProps } from '~/src/types/navigation/portfolio';
import EmptyPortfolioSection from '~/src/components/screens/portfolio/EmptyPortfolioSection';

export default function Works(props) {
  const { portfolio } = usePortfolioData();
  const navigation = useNavigation<PortfolioSubTab_ScreenProps['navigation']>();
  const [showAddWorkBottomsheet, setshowAddWorkBottomsheet] = useState(false);
  const route = useRoute<PortfolioSubTab_ScreenProps['route']>();
  const mine = useMemo(() => route.params?.mine, [route.params]);

  const totalWorkItem = useMemo(() => {
    return Object.values(portfolio.work).reduce((p, c) => p + c.length, 0);
  }, [portfolio.work]);

  const addWorkOptions = {
    blog: 'Blog',
    artwork: 'Artwork',
    skill: 'Skill',
    article: 'Article',
    project: 'Project',
    presentation: 'Presentation'
  };

  const openAddWorkModal = () => {
    setshowAddWorkBottomsheet(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({
        headerRight: () => {
          if (mine) {
            return (
              <PortfolioUpdateBtn buttonProps={{ onPress: openAddWorkModal }} />
            );
          }
          return null;
        }
      });
    }, [navigation])
  );

  return (
    <View>
      <Bottomsheet
        visible={showAddWorkBottomsheet}
        onClose={() => setshowAddWorkBottomsheet(false)}
      >
        {Object.entries(addWorkOptions).map(([key, label]) => (
          <DropdownOption
            key={key}
            label={label}
            onOptionPress={() => {
              setshowAddWorkBottomsheet(false);
              navigation.navigate('Addblog', {
                postType: key as any
              });
            }}
          />
        ))}
      </Bottomsheet>
      <ScrollView>
        <View style={styles.container}>
          {totalWorkItem === 0 && (
            <EmptyPortfolioSection
              mine={mine}
              onAddBtnPress={openAddWorkModal}
              addBtnText="Add Work"
              message="You have no work yet"
              messageForMe="User has no work yet"
            />
          )}
          {portfolio.work?.blog?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Blog</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.blog}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
          {portfolio.work?.artwork?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Artwork</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.artwork}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
          {portfolio.work?.skill?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skill Videos</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.skill}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
          {portfolio.work?.article?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Articles</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.article}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
          {portfolio.work?.presentation?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Presentations</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.presentation}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
          {portfolio.work?.project?.length > 0 && (
            <View>
              <Text style={styles.heading}>Projects</Text>
              <FlatList
                horizontal
                contentContainerStyle={styles.worksList}
                data={portfolio.work.project}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <WorkItem editOptions={mine} item={item} />
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1
  },
  section: {
    marginBottom: 30
  },
  heading: {
    fontSize: 17,
    paddingHorizontal: 20,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
    textTransform: 'uppercase',
    color: Black[600],
    // marginLeft: '3.6%',
    // marginTop: '8%',
    marginBottom: 15
  },
  item: {
    // paddingLeft: 15,
    // marginTop: 5,
    marginRight: 10
  },
  worksList: {
    paddingLeft: 20,
    paddingRight: 10
  }
});
