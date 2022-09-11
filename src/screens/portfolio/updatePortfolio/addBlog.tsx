import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AddWork from '../../../components/portfolio/addWork';
import Button from '~/src/components/theme/Button';
import { getUserWorksForPortfolio } from '~/src/utils/services/user-portfolio_services/work/getUserWorksForPortfolio.service';
import { GetUserWorksForPortfolioResponse } from '~/src/utils/typings/user-portfolio_interface/work/getUserWorksForPortfolio.interface';
import Loading from '~/src/components/theme/Loading';
import { setPortforlioWorkData } from '~/src/utils/services/user-portfolio_services/work/setPortforlioWorkData.service';
import { produce } from 'immer';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { PortfolioSubScreen_ScreenProps } from '~/src/types/navigation/portfolio';

export default function AddBlog() {
  const navigation =
    useNavigation<PortfolioSubScreen_ScreenProps<'Addblog'>['navigation']>();
  const route = useRoute<PortfolioSubScreen_ScreenProps<'Addblog'>['route']>();

  const postType = useMemo(() => route.params?.postType, [route.params]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const selectedPosts = useRef<Set<string>>(new Set());
  const { portfolio, setPortfolio } = usePortfolioData();

  const [posts, setPosts] =
    useState<GetUserWorksForPortfolioResponse['posts']>();

  async function submitWork() {
    setSubmitting(true);
    const result = await setPortforlioWorkData({
      postType: postType,
      postsList: Array.from(selectedPosts.current)
    });

    if (result.data.success) {
      setPortfolio(
        produce(portfolio, draft => {
          draft.work[postType].push(...(result.data.posts as any));
        })
      );
      navigation.goBack();
    }
  }

  async function fetchData() {
    setLoading(true);
    const result = await getUserWorksForPortfolio(route.params.postType);
    if (result.data.success) {
      setPosts(result.data.posts);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.formCt}>
      {loading ? (
        <Loading />
      ) : posts.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>
          No {route.params.postType} to add
        </Text>
      ) : (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <AddWork
                imageUri={item.featureImage}
                text={item.title}
                style={styles.workItem}
                onSelectionChange={isSelected => {
                  if (isSelected) {
                    selectedPosts.current.add(item._id);
                  } else {
                    selectedPosts.current.delete(item._id);
                  }
                }}
              />
            )}
          />
          <Button
            type="filled"
            fullWidth
            text="Add"
            processing={submitting}
            disabled={submitting}
            onPress={submitWork}
            btnStyle={styles.submitBtn}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formCt: {
    flex: 1,
    padding: 20
  },
  MT: {
    marginTop: 27
  },
  submitBtn: {
    marginTop: 30
  },
  workItem: {
    marginBottom: 20
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  }
});
