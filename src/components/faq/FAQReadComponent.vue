<template>
  <div>
    <!-- 뒤로가기 버튼 -->
    <RouterLink to="/faq/list" class="btn btn-info">뒤로가기</RouterLink>

    <!-- delFlag가 false일 때만 question과 answer를 표시 -->
    <div v-if="!faq.delFlag">
      <div class="content">
        <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4"/>
        <h2 class="text-center">{{ faq.question }}</h2>
        <p>{{ faq.answer }}</p>



        <!-- 수정하기 버튼 -->
        <div class="button-group">
          <RouterLink :to="`/faq/edit/${faq.fno}`" class="btn btn-info">수정하기</RouterLink>
        </div>
      </div>
    </div>

    <!-- delFlag가 true일 때 삭제된 페이지 메시지 표시 -->
    <div v-else>
      <p>삭제된 페이지입니다</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getFAQOne} from "../../apis/faqApi";

const route = useRoute();
const faq = ref({});

// FAQ 데이터를 가져오는 함수
const fetchFAQ = async (fno) => {
  try {
    const data = await getFAQOne(fno);
    console.log("Fetched FAQ data:", data); // 데이터를 콘솔에 출력
    faq.value = data;
  } catch (error) {
    console.error("FAQ 데이터 가져오기 중 오류 발생:", error);
  }
};

onMounted(() => {
  const fno = route.params.fno;
  fetchFAQ(fno);
});
</script>

<style scoped>

.content {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.button-group{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}


.btn {
  margin-top: 5px;
}
</style>
