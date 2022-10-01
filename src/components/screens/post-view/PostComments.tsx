import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { Black } from '~/src/utils/colors';
import { commentOnPost } from '~/src/utils/services/user-posts_service/commentOnPost.service';
import { PostComment, Post } from '~/src/utils/typings/post';
import Button from '../../theme/Button';
import { Input } from '../../theme/Input';
import Comment from './Comment';

export default function PostComments(props: {
  commentCount: number;
  comments: PostComment[];
  postId: Post['_id'];
  style?: StyleProp<ViewStyle>;
}) {
  const authUser = useSelector((root: IRootReducer) => root.auth).user;
  const [newComment, setNewComment] = useState<string>();
  const [commentList, setCommentList] = useState<typeof props.comments>([]);
  const [commentCount, setCommentCount] =
    useState<typeof props.commentCount>(0);

  async function postNewComment() {
    setCommentCount(commentCount + 1);
    setCommentList([
      ...commentList,
      {
        by: {
          _id: authUser._id,
          name: authUser.name,
          username: authUser.username,
          profileImage: authUser.profileImage
        },
        comment: newComment
      }
    ]);
    setNewComment('');
    await commentOnPost(props.postId, newComment);
  }

  useEffect(() => {
    setCommentList(props.comments ?? []);
    setCommentCount(props.commentCount ?? 0);
  }, [props.comments, props.commentCount]);

  if (!props.comments) {
    return null;
  }

  return (
    <View style={props.style}>
      <Input
        style={[styles.commentInput]}
        inputProp={{
          value: newComment,
          placeholder: 'Write your comment',
          onChangeText: text => setNewComment(text)
        }}
        suffix={
          <Button
            text="Post"
            size="sm"
            btnStyle={styles.commentPostBtn}
            type="text"
            onPress={() => postNewComment()}
          />
        }
      />
      <Text style={styles.commentCount}>{commentCount ?? 0} Comment</Text>

      <View style={styles.commentList}>
        {commentCount === 0 && (
          <Text style={styles.noCommentText}>Be the first one to comment</Text>
        )}
        {commentList?.map((comment, i) => (
          <Comment
            key={comment.comment + i + comment.by._id}
            comment={comment}
            style={styles.commentItem}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentCount: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginTop: 10
  },
  commentInput: {},
  commentPostBtn: {
    alignSelf: 'center',
    marginRight: -20
  },
  commentList: {
    marginTop: 15
  },
  commentItem: {
    marginBottom: 10
  },
  noCommentText: {
    color: Black[500],
    textAlign: 'center'
  }
});
