<template>
  <div class="directory-widget">
    <h2>👥 Colleague Directory</h2>
    
    <ul v-if="loading" class="user-list">
      <UserCardSkeleton v-for="i in 3" :key="i" />
    </ul>
    
    <ul v-else class="user-list">
      <UserCard 
        v-for="user in filteredUsers" 
        :key="user.id"
        :name="user.attributes.display_name || user.attributes.name"
        role="Saarbrücken Office"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DrupalService from '../services/DrupalService';
import UserCard from './UserCard.vue';
import UserCardSkeleton from './UserCardSkeleton.vue';
import { useUserStore } from '../stores/userStore';
const store = useUserStore();

interface DrupalUser {
  id: string;
  attributes: {
    name: string;
    display_name: string | null;
  };
}

const users = ref<DrupalUser[]>([]);
const searchQuery = ref('');
const loading = ref(true);

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const name = (user.attributes.display_name || user.attributes.name).toLowerCase();
    return name.includes(store.searchQuery.toLowerCase());
  });
});

onMounted(async () => {
  try {
    const response = await DrupalService.getUsers();
    users.value = response.data.data.filter((u: any) => u.attributes.name !== null);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.directory-widget {
  background: #f9f9fb;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
}
.user-list {
  padding: 0;
  display: grid;
  gap: 12px;
}
.status {
  text-align: center;
  color: #666;
}
</style>