import type { ProfileUser } from './user';

export interface CurrentUser {
  id: number;
  name: string;
  roles: string[];
  isAuthenticated: boolean;
}

declare global {
	interface Window {
		drupalSettings?: {
			vue_intranet_widget?: {
				api_base?: string;
				page_type?: 'directory' | 'profile';
				profile_user?: ProfileUser;
				current_user?: CurrentUser;
				csrf_token?: string;
			};
		};
	}
}


