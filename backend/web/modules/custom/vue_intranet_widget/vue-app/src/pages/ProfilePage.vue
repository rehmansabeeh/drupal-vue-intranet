<template>
  <section class="space-y-6">
    <header class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p class="text-sm font-medium uppercase tracking-[0.2em] text-teal-700">Profile</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Colleague profile
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        View the selected user record in a simple card layout that reads well on a white page.
      </p>
    </header>

    <UserProfile
      :name="profile.name"
      :role="roleLabel"
      :email="profile.email"
      :is-active="profile.isActive"
      :roles="profile.roles"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UserProfile from '../components/UserProfile.vue';
import type { ProfileUser } from '../types/user';
import { useDrupalSettingsStore } from '../stores/drupalSettingsStore';

const defaultProfile: ProfileUser = {
  id: 0,
  name: 'Unknown user',
  email: '',
  roles: [],
  isActive: false,
  profileUrl: '',
};

const drupalStore = useDrupalSettingsStore();
const profile = drupalStore.profileUser ?? defaultProfile;

const roleLabel = computed(() => {
  const roles = profile.roles.filter((role: string) => role !== 'authenticated');

  if (roles.length === 0) {
    return 'Member';
  }

  return roles.join(', ');
});
</script>