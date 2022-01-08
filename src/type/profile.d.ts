export interface IProfile {
  username: string;
  bio: string;
  image: string;
  following: true;
}

export interface IProfileResponse {
  profile?: IProfile;
}
