<template>
  <section class="space-y-6">
    <header class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p class="text-sm font-medium uppercase tracking-[0.2em] text-teal-700">Directory</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Colleague directory
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Search people and open their Drupal profile page from the same view.
      </p>
    </header>

    <UserSearch />
    <UserDirectory />
  </section>
</template>

<script setup lang="ts">
import UserDirectory from '../components/UserDirectory.vue';
import UserSearch from '../components/UserSearch.vue';

</script>