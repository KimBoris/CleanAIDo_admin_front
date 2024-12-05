<template>
  <div class="card">
    <div class="card-body">
      <div v-if="!faq.delFlag">
        <h3 class="card-title">{{ faq.question }}</h3>

        <!-- 첨부 파일 리스트 -->
        <div v-if="faq.fileNames && faq.fileNames.length > 0" class="file-names mb-2">
          <span class="small text-muted">첨부파일:</span>
          <div v-for="(file, index) in faq.fileNames" :key="index" class="file-name">
            {{ file }}
          </div>
        </div>

        <div class="content">
          <p class="card-text"> {{ faq.answer }} </p>
        </div>

        <div class="button-group">
          <!-- 수정하기 버튼 -->
          <RouterLink :to="`/faq/edit/${faq.fno}`" class="btn btn-primary me-2 py-3 px-4 fs-6 color text-light">
            수정하기
          </RouterLink>
        </div>
      </div>
      <div v-else>
        <p>삭제된 페이지 입니다.</p>
      </div>
    </div>
  </div>
</template>
<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getFAQOne} from "../../apis/faqApi.js";

const route = useRoute();
const faq = ref({
  question: "",
  answer: "",
  fileNames: [] // 파일 이름 배열 초기화
});
const isLoading = ref(true);

// FAQ 데이터를 가져오는 함수
const fetchFAQ = async (fno) => {
  try {
    isLoading.value = true;
    const data = await getFAQOne(fno);
    faq.value = data;
  } catch (error) {
    console.error("FAQ 데이터 가져오기 중 오류 발생:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const fno = route.params.fno;
  fetchFAQ(fno);
});
</script>


<style scoped>

</style>