export function staticFileSrc(path: string) {
  return 'https://socotestcdn.s3.ap-south-1.amazonaws.com/' + path;
}

export function postTitleSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]/g, '-');
}
