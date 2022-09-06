import { User } from '../../user-profile_interface/getUserData.interface';

export interface UpdateProfileRequest {
  academics?: string;
  gender?: User['gender'];
  name?: string;
  phone?: number;
  username?: string;
}

interface Signature {
  hash?: string;
  keyId?: string;
}

interface ClusterTime {
  clusterTime?: string;
  signature?: Signature;
}

interface Result {
  ok?: number;
  n?: number;
  nModified?: number;
  electionId?: string;
  $clusterTime?: ClusterTime;
}

export interface UpdateProfileResponse {
  success?: boolean;
  result?: Result;
}
