<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">자주 묻는 질문 등록</h4>
      <p class="card-description">내용을 입력하여주십시오.</p>

      <div class="form-group row">
        <label for="question" class="col-sm-3 col-form-label">질문</label>
        <div class="col-sm-9">
          <input type="text"
                 v-model="faq.question"
                 class="form-control" id="question"
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

      <div class="form-group row">
        <label for="fileUpload" class="col-sm-3 col-form-label">첨부파일</label>
        <div class="col-sm-9">
          <input type="file" id="fileUpload" multiple @change="handleFileChange" />
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button @click="handleClickComplate" class="btn btn-primary">완료</button>

        <RouterLink to="/faq/list" class="btn btn-secondary text-decoration-none text-white ms-2">
          취소
        </RouterLink>
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {postFAQOneWithFiles} from '../../apis/faqApi.js';

const router = useRouter();
const faq = ref({
  question: '',
  answer: ''
});
const files = ref([]);
const error = ref(null);

const handleFileChange = (event) => {
  files.value = Array.from(event.target.files);
};

const handleClickComplate = async () => {
  const formData = new FormData();
  formData.append('question', faq.value.question);
  formData.append('answer', faq.value.answer);
  files.value.forEach(file => {
    formData.append('files', file);
  });

  try {
    const result = await postFAQOneWithFiles(formData);
    router.replace(`/faq/read/${result}`);
  } catch (err) {
    error.value = err.response.data.message;
  }
};
</script>

<style scoped>
.error-msg {
  color: red;
}
</style>
