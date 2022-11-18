import { STATIC_FILE_URL } from '@env';
import { NavigationProp } from '@react-navigation/native';
import { IMainStack } from '../types/navigation/main';
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

export const navigatePostScreen = (
  navigation: NavigationProp<any>,
  postId: Post['_id'],
  postType: Post['postType']
) => {
  let postScreenKey: keyof IMainStack;
  switch (postType) {
    case 'artwork':
      postScreenKey = 'Post_Artwork';
      break;
    case 'presentation':
      postScreenKey = 'Post_Presentation';
      break;
    case 'skill':
      postScreenKey = 'Post_Skill';
      break;
    case 'blog':
      postScreenKey = 'Post_Blog';
      break;
    case 'article':
      postScreenKey = 'Post_Article';
      break;
    case 'link':
      postScreenKey = 'Post_Link';
      break;
    case 'project':
      postScreenKey = 'Post_Project';
      break;
    default:
      return;
  }
  navigation.navigate(postScreenKey, { post_id: postId });
};
