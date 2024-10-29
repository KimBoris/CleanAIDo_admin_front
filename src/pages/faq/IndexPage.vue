<template>
  <div>
    <div class="flex-container">
      <div @click="goBack" v-if="!$route.meta.back" class="cursor-pointer">
        <RouterLink to="/faq/list"><i class="fa fa-angle-left fs-30 cursor-pointer"></i></RouterLink>
      </div>
      <h3 class="mb-4 fw-semibold">{{ $route.meta.title }}</h3>
      <!--      <RouterLink to="/faq/list" class="btn btn-info">뒤로가기</RouterLink>-->
    </div>
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

<style>
.flex-container {
  display: flex;
  gap: 20px;
}

.cursor-pointer {
  cursor: pointer; /* 클릭할 수 있음을 나타냄 */
}

.fs-30 {
  font-size: 30px; /* 아이콘 크기 조정 */
}
</style>