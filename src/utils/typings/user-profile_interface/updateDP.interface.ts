import { File } from '@babel/types';

export interface UpdateDPRequest {
  dp?: File;
}

export interface UpdateDPResposne {
  DPImageURL?: string;
  success?: boolean;
}
