<template>
  <div v-if="!faq.delFlag">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">자주 묻는 질문(수정)</h4>
        <p class="card-description">내용을 입력하여주십시오.</p>

        <div class="form-group row">
          <label for="question" class="col-sm-3 col-form-label">질문</label>
          <div class="col-sm-9">
            <input type="text"
                   v-model="faq.question"
                   class="form-control"
                   id="question"
                   placeholder="질문을 입력해주십시오" />
          </div>
        </div>

        <div class="form-group row">
          <label for="answer" class="col-sm-3 col-form-label">답변</label>
          <div class="col-sm-9">
            <textarea v-model="faq.answer"
                      class="form-control"
                      id="answer"
                      style="height: 200px"
                      placeholder="답변을 입력해주십시오"></textarea>
          </div>
        </div>

        <!-- 기존 파일 리스트 -->
        <div v-if="faq.attachFiles && faq.attachFiles.length" class="form-group row">
          <label class="col-sm-3 col-form-label">첨부된 파일</label>
          <div class="col-sm-9">
            <ul>
              <li v-for="(file, index) in faq.attachFiles" :key="index">
                {{ file.fileName }}
                <button @click="removeExistingFile(file.fileName)" class="btn btn-link text-danger">삭제</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 새로운 파일 업로드 -->
        <div class="form-group row">
          <label for="fileUpload" class="col-sm-3 col-form-label">새로운 첨부파일 추가</label>
          <div class="col-sm-9">
            <input type="file" id="fileUpload" multiple @change="handleFileChange" />
          </div>
        </div>

        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-light py-3 px-4 fs-6">
            <RouterLink :to="`/faq/read/${fno}`" class="text-decoration-none text-blue">취소</RouterLink>
          </button>
          <button @click="handleClickDelete" class="btn btn-light py-3 px-4 fs-6 border-danger">
            <RouterLink to="/faq/list" class="text-decoration-none text-danger">삭제</RouterLink>
          </button>
          <button @click="handleClickComplate" class="btn btn-primary me-2 py-3 px-4 fs-6 text-light">완료</button>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {deleteFAQOne, getFAQOne, putFAQOneWithFiles} from "../../apis/faqApi.js";
import {onMounted, ref} from "vue";

const route = useRoute();
const router = useRouter();

const fno = route.params.fno;

const faq = ref({
  fno: 0,
  question: "",
  answer: "",
  delFlag: false,
  attachFiles: [] // 기존 파일 목록
});

const files = ref([]); // 새로운 첨부 파일들
const removedFiles = ref([]); // 삭제할 파일 목록
const error = ref(null);

// 새로운 파일 선택 시 호출되는 함수
const handleFileChange = (event) => {
  files.value = Array.from(event.target.files);
};

// 기존 파일 삭제 시 호출되는 함수
const removeExistingFile = (fileName) => {
  removedFiles.value.push(fileName);
  faq.value.attachFiles = faq.value.attachFiles.filter(file => file.fileName !== fileName);
};

// 삭제 버튼 이벤트
const handleClickDelete = () => {
  deleteFAQOne(fno);
  router.replace("/faq/list");
};

// 수정 완료 버튼 이벤트
const handleClickComplate = async () => {
  const formData = new FormData();
  formData.append('question', faq.value.question);
  formData.append('answer', faq.value.answer);
  removedFiles.value.forEach(file => formData.append('removedFiles', file));
  files.value.forEach(file => formData.append('files', file));

  try {
    await putFAQOneWithFiles(fno, formData);
    router.replace(`/faq/read/${fno}`);
  } catch (err) {
    error.value = err.response.data.message;
  }
};

// FAQ 정보 로드
onMounted(() => {
  getFAQOne(fno).then((data) => {
    faq.value = data;
  });
});
</script>

<style scoped>
.error-msg {
  color: red;
}
</style>