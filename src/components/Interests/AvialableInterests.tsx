import React, { memo, useEffect, useMemo, useState } from 'react';
import { useInterestData } from '~/src/state/InterestSelectorState';
import { getInterestCategories } from '~/src/utils/services/settings_services/interests_services/getInterestCategories.service';
import Loading from '../theme/Loading';
import { InterestCategory } from './InterestCategory';

export const AvailableInterestList = memo(() => {
  const [categoriesList, { selectInterest, setCategoryList }] = useInterestData(
    data => data.categoriesList
  );

  const [searchQuery] = useInterestData(data => data.searchQuery);
  const [loading, setLoading] = useState(true);

  const filteredCategories = useMemo(() => {
    const query = (searchQuery ?? '').trim().split(' ');
    let pattern = '';
    // /(?=.*\bclass\b)(?=.*\bexamination\b)(?=.*9)(?=.*\binformation\b).+/
    query.forEach(word => {
      pattern += `(?=.*${word})`;
    });
    pattern += '.+';
    return categoriesList.filter(
      cat => !!cat.category.match(new RegExp(pattern, 'i'))
    );
  }, [categoriesList, searchQuery]);

  async function fetchData() {
    setLoading(true);
    const result = await getInterestCategories();

    if (result.data.success) {
      setCategoryList(result.data.interest_categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (categoriesList?.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading style={{ width: '100%' }} />;
  }

  return (
    <>
      {filteredCategories?.map((category, i) => (
        <InterestCategory
          key={category._id}
          _id={category._id}
          CategoryChipProps={{
            text: category.category,
            onPress: () => {
              selectInterest(category);
            }
          }}
        />
      ))}
    </>
  );
});
