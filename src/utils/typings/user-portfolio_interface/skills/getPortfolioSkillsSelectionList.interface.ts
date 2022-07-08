interface Skill {
  _id: string;
  skill: string;
}

export interface GetPortfolioSkillsSelectionListResponse {
  skills: Skill[];
  success: boolean;
}
