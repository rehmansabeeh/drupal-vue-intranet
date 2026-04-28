import type { ProfileUser } from './user';

declare global {
	interface Window {
		drupalSettings?: {
			vue_intranet_widget?: {
				api_base?: string;
				page_type?: 'directory' | 'profile';
				profile_user?: ProfileUser;
			};
		};
	}
}

export {};
