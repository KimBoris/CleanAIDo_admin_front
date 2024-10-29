<template>
  <div>
    <div>
      <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
        <div class="ms-auto">
          <Share/>
        </div>
      </div>
      <div>
        <div v-if="isLoading" class="flex items-center justify-center h-screen">
          <!--로딩창-->
          <LoadingComponent></LoadingComponent>
        </div>
        <div v-else>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFAQOne } from "../../apis/faqApi";
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

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
.file-names {
  font-size: 0.875em;
  color: #6c757d;
  margin-top: 5px;
  margin-bottom: 10px;
}

.file-name {
  margin-top: 2px;
}

.content {
  margin-bottom: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  padding-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  margin-top: 5px;
}
</style>
