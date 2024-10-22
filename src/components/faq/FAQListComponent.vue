<template>
  <div class="faq-list">
    <div class="faq-item" v-for="faq in faqList" :key="faq.fno">
      <h2>
        <RouterLink :to="`/faq/read/${faq.fno}`">{{ faq.question }}</RouterLink>
      </h2>
    </div>

    <!-- 페이지네이션 부분 -->
    <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
      <ul class="pagination">
        <li :class="`page-item ${page == faqData.number + 1 ? 'active' : ''}`" v-for="{ page, label } in pageNums" :key="page">
          <a class="page-link" @click="handleClickPage(page)">{{ label }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFAQList } from "../../apis/faqApi";

const faqList = ref([]);
const page = ref(1);
const faqData = ref({});
const pageNums = ref([]);

const fetchFAQList = async () => {
  const data = await getFAQList(page.value, 10);
  faqList.value = data.content;
  faqData.value = data;
  generatePageNums(data.totalPages);
};


const generatePageNums = (totalPages) => {
  pageNums.value = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNums.value.push({ page: i, label: i });
  }
};


const handleClickPage = (selectedPage) => {
  page.value = selectedPage;
  fetchFAQList();
};


onMounted(() => {
  fetchFAQList();
});
</script>

<style scoped>

</style>
