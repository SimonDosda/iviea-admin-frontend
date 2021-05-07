export interface LoginT {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface StrapiUser {
  id: number;
  firstname: string;
  lastname: string;
  username?: null;
  email: string;
  registrationToken?: null;
  isActive: boolean;
  blocked?: null;
  preferedLanguage?: null;
  roles?: RolesEntity[] | null;
}

export interface RolesEntity {
  id: number;
  name: string;
  description: string;
  code: string;
}
