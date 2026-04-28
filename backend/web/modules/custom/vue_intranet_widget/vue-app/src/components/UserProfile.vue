<template>
  <article class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-500 text-xl font-semibold text-white shadow-sm">
        {{ initials }}
      </div>

      <div class="min-w-0 flex-1 space-y-4">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <h2 class="truncate text-2xl font-semibold tracking-tight text-slate-900">{{ name }}</h2>
            <span
              class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
              :class="isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'"
            >
              {{ isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>

          <p class="mt-2 text-sm text-slate-600">{{ role }}</p>
        </div>

        <dl class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Email</dt>
            <dd class="mt-2 break-all text-sm font-medium text-slate-900">
              {{ email || 'Not available' }}
            </dd>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4">
            <dt class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Roles</dt>
            <dd class="mt-2 text-sm font-medium text-slate-900">
              {{ roles.length > 0 ? roles.join(', ') : 'Member' }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  name: string;
  role?: string;
  email?: string | null;
  isActive?: boolean;
  roles?: string[];
}>(), {
  role: 'Member',
  email: null,
  isActive: true,
  roles: () => [],
});

const initials = computed(() => {
  return props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
});
</script>