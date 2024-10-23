<template>
  <div v-if="error !== null">ERROR: {{ error }}</div>
  <div v-if="error === null">
    <div>
      <label>질문:</label>
      <input type="text" v-model="faq.question" />

      <label>답변:</label>
      <input type="text" v-model="faq.answer" />

      <div>
        <button @click="handleDelete">삭제</button>
        <button @click="handleSave">완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFAQOne, putFAQOne, deleteFAQOne } from "../../apis/faqApi";

const route = useRoute();
const router = useRouter();

const fno = ref(route.params.fno || 0);
const faq = ref({
  fno: 0,
  question: "",
  answer: ""
});
const error = ref(null);

// FAQ 데이터 불러오기
const fetchFAQ = async () => {
  try {
    const data = await getFAQOne(fno.value);
    faq.value = data;
  } catch (err) {
    error.value = "FAQ를 불러오지 못했습니다.";
  }
};

// FAQ 수정 버튼 이벤트
const handleSave = async () => {
  try {
    await putFAQOne(faq.value);
    router.push(`/faq/read/${fno.value}`); // 수정 후 다시 읽기 페이지로 이동
  } catch (err) {
    error.value = "수정을 완료할 수 없습니다.";
  }
};

// FAQ 삭제 버튼 이벤트
const handleDelete = async () => {
  try {
    await deleteFAQOne(fno.value);
    router.push("/faq/list"); // 삭제 후 리스트 페이지로 이동
  } catch (err) {
    error.value = "삭제를 완료할 수 없습니다.";
  }
};

// 컴포넌트가 마운트될 때 FAQ 데이터를 불러옴
onMounted(() => {
  console.log("fno from route params:", fno.value); // fno 값 확인
  fetchFAQ();
});
</script>

<style scoped>
/* 필요한 스타일 정의 */
</style>