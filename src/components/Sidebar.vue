<script setup></script>

<template>
  <div class="w-1/5 px-2">
    <!-- Logo -->
    <div class="p-3">Logo</div>

    <!-- Navbar -->
    <div class="flex flex-col">
      <router-link
        to="/"
        exact-active-class="bg-[#1dd078] text-white"
        class="py-2 px-6 rounded-lg"
        >Dashboard</router-link
      >
      <router-link
        to="/product-list"
        exact-active-class="bg-[#1dd078] text-white"
        class="py-2 px-6 rounded-lg"
        >List</router-link
      >
      <router-link
        to="/menu"
        exact-active-class="bg-[#1dd078] text-white"
        class="py-2 px-6 rounded-lg"
        >Menu</router-link
      >
    </div>
  </div>
</template>
