<template>
  <div>
    <h2>{{ faq.question }}</h2>
    <p>{{ faq.answer }}</p>
    <RouterLink to="/faq/list" class="btn btn-info">뒤로가기</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFAQOne } from "../../apis/faqApi";

const route = useRoute();
const faq = ref({});


const fetchFAQ = async (fno) => {
  const data = await getFAQOne(fno);
  faq.value = data;
};


onMounted(() => {
  const fno = route.params.fno;
  fetchFAQ(fno);
});
</script>

<style scoped>
</style>