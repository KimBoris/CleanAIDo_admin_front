<template>
  <div>
    <div class="d-flex align-items-center">
      <div @click="goBack" v-if="!$route.meta.back" class="cursor-pointer" style="margin-right: 1rem; margin-bottom: 1.1rem">
        <RouterLink to="/qna/list"><i class="fa fa-angle-left fs-30 cursor-pointer"></i></RouterLink>
      </div>
      <h3 class="mb-4 fw-semibold">{{ $route.meta.title }}</h3>
      <!--      <RouterLink to="/faq/list" class="btn btn-info">뒤로가기</RouterLink>-->
    </div>
    <RouterView />
  </div>
</template>

<script setup>

import {RouterView} from "vue-router";
</script>

<style scoped>

</style>