export interface IUser {
  firstName: string;
  email: string;
  roles: IRole;
}

export interface IAssets {
  width: number;
  height: number;
  source: string;
}

export interface IVariant {
  id?: String;
  name: string;
  slug: string;
  description: string;
  assets: IAssets[];
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  name: string;
  description: string;
  id?: String;
  variants: IVariant[];
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
