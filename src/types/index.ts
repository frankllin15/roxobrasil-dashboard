export interface IUser {
  firstName: string;
  email: string;
  roles: IRole;
}

export interface IRole {
  id: string;
  nama: string;
  description: string;
}

export interface ISession {
  token: string;
  user: IUser;
}
