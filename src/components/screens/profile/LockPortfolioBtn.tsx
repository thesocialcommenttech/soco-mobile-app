import Color from 'color';
import produce from 'immer';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProfile } from '~/src/state/profileScreenState';
import { Blue } from '~/src/utils/colors';
import { lockUserPortfolio } from '~/src/utils/services/user-portfolio_service/lockUserPortfolio.service';
import Button from '../../theme/Button';

export function LockPortfolioBtn() {
  const { setUserProfile, userProfile } = useProfile();
  const [loading, setLoading] = useState(false);

  const locked = useMemo(
    () => userProfile?.portfolioLock === 'PRIVATE',
    [userProfile?.portfolioLock]
  );

  const togglePortfolioState = async () => {
    setLoading(true);
    const portfolioState = locked ? 'PUBLIC' : 'PRIVATE';
    const result = await lockUserPortfolio(portfolioState);

    if (result.data.success) {
      setUserProfile(
        produce(userProfile, draft => {
          draft.portfolioLock = portfolioState;
        })
      );
    }
    setLoading(false);
  };

  return (
    <Button
      type="filled"
      onPress={togglePortfolioState}
      disabled={loading}
      processing={loading}
      // disabled={!userProfile.premium}
      btnStyle={[
        styles.portfolioLock,
        loading && { backgroundColor: Blue.primary }
        // !userProfile.premium && styles.portfolioLockDisabled
      ]}
    >
      <MaterialCommunityIcons
        name={locked ? 'lock-outline' : 'lock-open-variant-outline'}
        size={20}
        color="white"
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  portfolioLock: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftColor: Blue[400],
    borderLeftWidth: 1
  },
  portfolioLockDisabled: {
    backgroundColor: Blue[200],
    borderLeftColor: Color(Blue[300]).lighten(0.08).rgb().toString()
  }
});
