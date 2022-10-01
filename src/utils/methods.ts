import { STATIC_FILE_URL } from '@env';
import { NavigationProp } from '@react-navigation/native';
import { Post } from './typings/post';

export function staticFileSrc(path: string) {
  return `${STATIC_FILE_URL}/${path}`;
}

export function postTitleSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]/g, '-');
}

export const navigateEditPostScreen = (
  navigation: NavigationProp<any>,
  postId: Post['_id'],
  postType: Post['postType']
) => {
  switch (postType) {
    case 'artwork':
      navigation?.navigate('Upload_Artwork', { postId });
      break;
    case 'skill':
      navigation?.navigate('Upload_SkillVideo', { postId });
      break;
    case 'presentation':
      navigation?.navigate('Upload_Presentation', { postId });
      break;
    case 'link':
      navigation?.navigate('Upload_Link', { postId });
      break;
  }
};
