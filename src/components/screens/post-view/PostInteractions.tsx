import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Red } from '~/src/utils/colors';
import { addPostToUserFav } from '~/src/utils/services/user-posts_service/addPostToUserFav.service';
import { votePost } from '~/src/utils/services/user-posts_service/votePost.service';
import { Post } from '~/src/utils/typings/post';
import { VotePostRequest } from '~/src/utils/typings/user-posts_interface/votePost.interface';
import Button from '../../theme/Button';
import Skeleton from '../../theme/Skeleton';

export default function PostInteractions(props: {
  upvotesCount: number;
  downVotesCount: number;
  upVoted: boolean;
  downVoted: boolean;
  favourite: boolean;
  postId: Post['_id'];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}) {
  const [voteCounts, setVoteCounts] = useState<{ up: number; down: number }>({
    up: undefined,
    down: undefined
  });
  const [vote, setVote] = useState<VotePostRequest['voteType']>();
  const [isFavourite, setIsFavourite] = useState(props.favourite);

  async function postVote(voteType: VotePostRequest['voteType']) {
    if (vote) {
      voteCounts[vote]--;
    }

    voteCounts[voteType]++;
    setVoteCounts({ ...voteCounts });
    setVote(voteType);
    await votePost({ voteType, postID: props.postId });
  }

  async function postFav() {
    setIsFavourite(!isFavourite);
    await addPostToUserFav(isFavourite ? 'remove' : 'add', props.postId);
  }

  useEffect(() => {
    if (props.downVoted) {
      setVote('down');
    }

    if (props.upVoted) {
      setVote('up');
    }

    setIsFavourite(props.favourite);
    setVoteCounts({
      up: props.upvotesCount ?? 0,
      down: props.downVotesCount ?? 0
    });
  }, [props.downVoted, props.upVoted]);

  return (
    <View style={[styles.likeNShareRow, props.style]}>
      {props.loading ? (
        <>
          <Skeleton style={styles.actionBtn} width={55} height={35} />
          <Skeleton style={styles.actionBtn} width={55} height={35} />
          <Skeleton style={styles.actionBtn} width={55} height={35} />
          <Skeleton width={55} height={35} />
        </>
      ) : (
        <>
          <Button
            size="sm"
            btnStyle={styles.actionBtn}
            onPress={() => postVote('up')}
          >
            <View style={styles.actionBtnView}>
              <MaterialCommunityIcons
                name={vote === 'up' ? 'thumb-up' : 'thumb-up-outline'}
                size={18}
                style={[styles.actionIcon, vote === 'up' && styles.voted]}
                color="black"
              />
              <Text style={[styles.voteCount, vote === 'up' && styles.voted]}>
                {voteCounts.up}
              </Text>
            </View>
          </Button>
          <Button
            size="sm"
            btnStyle={styles.actionBtn}
            onPress={() => postVote('down')}
          >
            <View style={styles.actionBtnView}>
              <MaterialCommunityIcons
                name={vote === 'down' ? 'thumb-down' : 'thumb-down-outline'}
                size={18}
                style={[styles.actionIcon, vote === 'down' && styles.voted]}
                color={Black[600]}
              />
              <Text style={[styles.voteCount, vote === 'down' && styles.voted]}>
                {voteCounts.down}
              </Text>
            </View>
          </Button>
          <Button
            size="sm"
            btnStyle={styles.actionBtn}
            onPress={() => postFav()}
          >
            <MaterialCommunityIcons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={18}
              style={isFavourite && styles.favourite}
              color="black"
            />
          </Button>
          <Button size="sm" onPress={() => {}}>
            <View style={styles.actionBtnView}>
              <MaterialCommunityIcons
                name="share"
                size={18}
                style={styles.actionIcon}
                color={Blue.primary}
              />
              <Text style={styles.shareTxt}>Share</Text>
            </View>
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  likeNShareRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shareTxt: {
    color: Blue.primary,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textTransform: 'uppercase'
  },
  actionIcon: {
    marginRight: 5
  },
  voted: {
    color: Blue.primary
  },
  actionBtn: {
    marginRight: 5
  },
  favourite: { color: Red.primary },
  actionBtnView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  voteCount: {
    color: Black[600],
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  }
});
