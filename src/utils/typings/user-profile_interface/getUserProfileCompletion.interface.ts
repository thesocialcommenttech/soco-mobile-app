interface Work {
  artworks?: boolean;
  blogs?: boolean;
  projects?: boolean;
  skills?: boolean;
}

interface Completed_profile {
  bio?: boolean;
  certifications?: boolean;
  educations?: boolean;
  expriences?: boolean;
  intro_video_url?: boolean;
  skills?: boolean;
  social_accounts?: boolean;
  work?: Work;
}

export interface GetUserProfileCompletionResponse {
  completed_profile?: Completed_profile;
  success?: boolean;
}
