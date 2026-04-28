<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

const store = useUserStore();

const hasQuery = computed(() => store.searchQuery.trim().length > 0);
</script>

<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <label class="mb-3 block text-sm font-medium text-slate-700">
      Search colleagues
    </label>

    <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition">
      <svg
        class="h-5 w-5 shrink-0 text-slate-400"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17.5 17.5L13.2 13.2M8.75 15A6.25 6.25 0 1 0 8.75 2.5a6.25 6.25 0 0 0 0 12.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <input
        v-model="store.searchQuery"
        class="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        type="search"
        placeholder="Search by name or username"
      />

      <button
        v-if="hasQuery"
        type="button"
        class="rounded-full px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
        @click="store.searchQuery = ''"
      >
        Clear
      </button>
    </div>
  </section>
</template>