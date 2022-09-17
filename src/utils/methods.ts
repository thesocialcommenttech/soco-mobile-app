import { STATIC_FILE_URL } from '@env';

export function staticFileSrc(path: string) {
  return `${STATIC_FILE_URL}/${path}`;
}

export function postTitleSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]/g, '-');
}
