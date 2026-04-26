<template>
  <li class="user-card skeleton">
    <div class="user-info">
      <div class="skeleton-name"></div>
      <div class="skeleton-role"></div>
    </div>
  </li>
</template>

<style scoped>
/* Reuse the card styling logic but add an animation */
.user-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  list-style: none;
}

.skeleton-name, .skeleton-role {
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 4px;
  background-size: 200% 100%;
  animation: shine 1.5s linear infinite;
}

.skeleton-name {
  height: 1.2rem;
  width: 70%;
  margin-bottom: 10px;
}

.skeleton-role {
  height: 0.85rem;
  width: 40%;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>