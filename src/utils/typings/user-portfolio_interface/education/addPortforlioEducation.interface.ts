interface Education {
  course?: string;
  institute?: string;
  level?: string;
  passYear?: Date;
  status?: string;
}

export interface AddPortforlioEducationRequest {
  education?: Education;
}

interface ResponseEducation extends Education {
  order?: number;
  _id?: string;
}

export interface AddPortforlioEducationResponse {
  success?: boolean;
  education?: ResponseEducation;
}
