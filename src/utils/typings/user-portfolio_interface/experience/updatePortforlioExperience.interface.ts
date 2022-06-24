interface Experience {
  company?: string;
  description?: string;
  from?: Date;
  ongoing?: boolean;
  title?: string;
  to?: Date;
}

export interface UpdatePortforlioExperienceRequest {
  experience: Experience;
  indexID: string;
}

export interface UpdatePortforlioExperienceResponse {
  experience: Experience;
  success: boolean;
}
