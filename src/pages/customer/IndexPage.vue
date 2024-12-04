<template>
<div>
  <h3 class="mb-4 fw-semibold">{{$route.meta.title}}</h3>
</div>
</template>
<script setup>
import {RouterView} from "vue-router";

import $route from "../../routers/customer.js";
</script>


<style scoped>

</style>