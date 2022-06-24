interface Skill {
  skill: string;
  level: number;
}

export interface AddPortforlioSkillRequest {
  skill: Skill;
}

interface SkillResponse extends Skill {
  _id: string;
}

export interface AddPortforlioSkillResponse {
  skill: SkillResponse;
  success: boolean;
}
