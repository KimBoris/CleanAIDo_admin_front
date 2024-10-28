<template>
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">자주묻는질문 등록</h4>
      <p class="card-description"> 내용을 입력하여주십시오 </p>
        <div class="form-group row">
          <label for="exampleInputEmail2" class="col-sm-3 col-form-label">질문</label>
          <div class="col-sm-9">
            <input type="text"
                   v-model="faq.question"
                   class="form-control"
                   id="exampleInputEmail2"
                   placeholder="질문을 입력해주십시오"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="exampleInputEmail2" class="col-sm-3 col-form-label">답변</label>
          <div class="col-sm-9">
            <textarea v-model="faq.answer"
                      class="form-control"
                      id="exampleInputEmail2"
                      style="height: 200px"
                      placeholder="답변을 입력해주십시오"
            />
          </div>
        </div>
      <div class="form-group row">
        <label for="file" class="col-sm-3 col-form-label">첨부파일</label>
        <div class="col-sm-9">
          <input type="file" @change="handleFileUpload" multiple class="form-control" id="file" />
        </div>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-light py-3 px-4 fs-6">
          <RouterLink to="/faq/list" class="text-decoration-none text-blue">취소</RouterLink>
        </button>
        <button @click="handleClickComplate" class="btn btn-primary me-2 py-3 px-4 fs-6 color text-light">완료</button>
      </div>
      <div v-if="error" class="error-msg">
        {{ error }}
      </div>
    </div>
  </div>
  </template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {postFAQOne} from "../../apis/faqApi.js";

const router = useRouter();

const faq = ref({
  question: "",
  answer: "",
});

const files = ref({});

const error = ref(null);

const handleClickUpload = (event) => {
  files.value = Array.from(event.target.files); // 파일을 배열로 저장
}

// 완료 버튼 이벤트
const handleClickComplate = async () => {

  const formData = new FormData();
  formData.append("question", faq.value.question);
  formData.append("answer", faq.value.answer);

  // 파일들을 FormData에 추가
  files.value.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  try {
    await postFAQOne(faq.value).then((result) => {
      console.log(result)
      router.replace(`/faq/read/${result}`);
    });
  } catch (err) {
    error.value = err.response.data.message;
    console.log(error.value);
  }

};

</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>