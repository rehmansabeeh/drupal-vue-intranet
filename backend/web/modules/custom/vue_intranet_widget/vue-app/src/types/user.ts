export interface DrupalUserAttributes {
  name: string;
  display_name: string | null;
}

export interface DrupalUserResource {
  id: string;
  attributes: DrupalUserAttributes;
}

export interface ProfileUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
  profileUrl: string;
}
