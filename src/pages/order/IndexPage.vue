<template>
  <div class="order-layout">
    <div class="d-flex align-items-center">
      <div @click="goBack" v-if="!$route.meta.back" class="cursor-pointer" style="margin-right: 1rem; margin-bottom: 1.1rem">
        <RouterLink to="/order"><i class="fa fa-angle-left fs-30 cursor-pointer"></i></RouterLink>
      </div>
      <h3 class="mb-4 fw-semibold">{{ $route.meta.title }}</h3>
      <!--      <RouterLink to="/faq/list" class="btn btn-info">뒤로가기</RouterLink>-->
    </div>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.order-layout {
  padding: 20px;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
