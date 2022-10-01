interface Skill {
  skill?: string;
  level?: number;
}

export interface UpdatePortforlioSkillRequest {
  indexID?: string;
  skill?: Skill;
}

interface SkillResponse extends Skill {
  _id?: string;
}

export interface UpdatePortforlioSkillResponse {
  skill?: SkillResponse;
  success?: boolean;
}
