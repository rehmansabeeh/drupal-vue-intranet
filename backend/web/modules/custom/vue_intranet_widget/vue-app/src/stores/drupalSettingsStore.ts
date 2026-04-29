import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProfileUser } from '../types/user';
import type { CurrentUser } from '../types/drupal';

type VueIntranetSettings = NonNullable<NonNullable<Window['drupalSettings']>['vue_intranet_widget']>;

export const useDrupalSettingsStore = defineStore('drupalSettings', () => {
  const apiBase = ref<string>('/jsonapi');
  const pageType = ref<'directory' | 'profile' | null>(null);
  const profileUser = ref<ProfileUser | null>(null);
  const currentUser = ref<CurrentUser | null>(null);
  const csrfToken = ref<string | null>(null);

  function init(settings: VueIntranetSettings | undefined) {
    if (!settings) return;
    if (settings.api_base)     apiBase.value     = settings.api_base;
    if (settings.page_type)    pageType.value    = settings.page_type;
    if (settings.profile_user) profileUser.value = settings.profile_user;
    if (settings.current_user) currentUser.value = settings.current_user;
    if (settings.csrf_token)   csrfToken.value   = settings.csrf_token;
  }

  return { apiBase, pageType, profileUser, currentUser, csrfToken, init };
});
