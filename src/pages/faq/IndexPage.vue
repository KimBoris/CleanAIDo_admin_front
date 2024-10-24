<template>
  <div>
    <div @click="goBack" v-if="!$route.meta.back">
      <i class="fa fa-angle-left fs-10"></i>
    </div>
    <h3 class="text-center mb-4 fw-semibold">{{ $route.meta.title }}</h3>
    <RouterView/>
  </div>

</template>

<script setup>
import {RouterView, useRouter} from "vue-router";

const router = useRouter();
const route = useRouter();

const goBack = () => {
  if (router.go(-1) == null) {
    router.replace("/faq/list");
  }
  router.go(-1);
}

</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}


</style>