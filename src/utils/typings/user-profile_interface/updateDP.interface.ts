import { FileObject } from '../file';

export interface UpdateDPRequest {
  profileImage: FileObject;
}

export interface UpdateDPResposne {
  DPImageURL?: string;
  success?: boolean;
}
