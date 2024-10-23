<template>
  <div class="container-scroller">
    <!-- Header -->
    <Header />
    <!-- Container -->
    <div class="container-fluid page-body-wrapper">
      <!-- SideBar -->
      <SideBar class="w-100" />
      <!-- Contents -->
      <Contents />
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./layout/Header.vue";
import SideBar from "./layout/SideBar.vue";
import Contents from "./layout/Contents.vue";
</script>

<style scoped>

</style>
