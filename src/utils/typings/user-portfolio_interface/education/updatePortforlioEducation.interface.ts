import { IEducation } from '../getPortforlioWorkData.interface';

interface Education {
  course?: string;
  institute?: string;
  level?: string;
  passYear?: Date;
  status?: string;
}

export interface UpdatePortforlioEducationRequest {
  education?: Education;
  indexID?: string;
}

export interface UpdatePortforlioEducationResponse {
  education?: IEducation;
  success?: boolean;
}
