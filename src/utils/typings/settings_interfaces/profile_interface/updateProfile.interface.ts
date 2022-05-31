export interface UpdateProfileRequest {
  academics: string;
  gender: string;
  name: string;
  phone: number;
  username: string;
}

interface Signature {
  hash: string;
  keyId: string;
}

interface ClusterTime {
  clusterTime: string;
  signature: Signature;
}

interface Result {
  ok: number;
  n: number;
  nModified: number;
  electionId: string;
  $clusterTime: ClusterTime;
}

export interface UpdateProfileResponse {
  success: boolean;
  result: Result;
}
