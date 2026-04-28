<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <div class="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-teal-700">People</p>
        <h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Colleague directory</h2>
      </div>

      <p class="text-sm text-slate-500">
        {{ store.status.directory.loading ? 'Loading team members…' : `${filteredUsers.length} result(s)` }}
      </p>
    </div>

    <ul v-if="store.status.directory.loading" class="grid gap-4">
      <UserCardSkeleton v-for="i in 3" :key="i" />
    </ul>

    <div v-else-if="filteredUsers.length === 0" class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
      <p class="text-sm font-medium text-slate-900">No colleagues match your search.</p>
      <p class="mt-2 text-sm text-slate-500">Try a different name or clear the search term.</p>
    </div>

    <ul v-else class="grid gap-4">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user-id="user.id"
        :name="user.attributes.display_name || user.attributes.name"
        role="Saarbrücken Office"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import UserCard from './UserCard.vue';
import UserCardSkeleton from './UserCardSkeleton.vue';
import { useUserStore } from '../stores/userStore';

const store = useUserStore();

const filteredUsers = computed(() => {
  const query = store.searchQuery.toLowerCase();
  return store.users.filter(user => 
    (user.attributes.display_name || user.attributes.name).toLowerCase().includes(query)
  );

});

onMounted(() => {
  store.fetchUsers();
  // store.getArticles();
});
</script>