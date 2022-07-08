interface Experience {
  company?: string;
  description?: string;
  from?: Date;
  ongoing?: boolean;
  title?: string;
  to?: Date;
}

export interface AddPortfolioExperienceRequest {
  experience?: Experience;
}

interface ExperienceResponse {
  company?: string;
  description?: string;
  from?: Date;
  ongoing?: boolean;
  title?: string;
  to?: Date;
  order?: number;
  _id?: string;
}
export interface AddPortfolioExperienceResponse {
  experience?: ExperienceResponse;
  success?: boolean;
}
