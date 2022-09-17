import { useEffect } from 'react';
import { incrementPostviews } from '../utils/services/increment-postviews_service/incrementPostviews.service';
import { Post } from '../utils/typings/post';

export function useViewIncrementor(postId: Post['_id']) {
  const incrementView = async () => {
    setTimeout(async () => {
      await incrementPostviews(postId);
    }, 1000);
  };

  useEffect(() => {
    if (postId) {
      incrementView();
    }
  }, [postId]);
}
