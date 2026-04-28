<template>
  <li>
    <a
      :href="profileUrl"
      class="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/15"
    >
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-sm font-semibold text-white shadow-sm">
          {{ initials }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <span class="block truncate text-base font-semibold text-slate-900 transition group-hover:text-teal-700">{{ name }}</span>
              <span class="mt-1 block text-sm text-slate-600">{{ role }}</span>
            </div>

            <span class="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
              View
            </span>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  userId: string;
  name: string;
  role: string;
}>();

const profileUrl = computed(() => `/vue/profile/${props.userId}`);

const initials = computed(() => {
  return props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
});
</script>