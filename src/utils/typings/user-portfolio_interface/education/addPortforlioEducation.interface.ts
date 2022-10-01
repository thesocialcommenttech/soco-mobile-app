import { IEducation } from '../getPortforlioWorkData.interface';

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

export interface AddPortforlioEducationResponse {
  success?: boolean;
  education?: IEducation;
}
