<template>
  <div v-if="!faq.delFlag">
    <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
      <div class="ms-auto">
        <Share/>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">자주묻는질문 수정</h4>
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
        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-light py-3 px-4 fs-6">
            <RouterLink :to="`/faq/read/${fno}`" class="text-decoration-none text-blue">취소</RouterLink>
          </button>
          <button @click="handleClickDelete" class="btn btn-light py-3 px-4 fs-6 border-danger">
            <RouterLink to="/faq/list" class="text-decoration-none text-danger">삭제</RouterLink>
          </button>
          <button @click="handleClickComplate" class="btn btn-primary me-2 py-3 px-4 fs-6 color text-light">완료</button>
        </div>
        <div v-if="error" class="error-msg">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {deleteFAQOne, getFAQOne, putFAQOne} from "../../apis/faqApi.js";
import {onMounted, ref} from "vue";
import Share from "../../layout/Share.vue";

const route = useRoute();
const router = useRouter();

const fno = route.params.fno;

const faq = ref({
  fno: 0,
  question: "",
  answer: "",
  delFlag: false,
});

const error = ref(null);

// 삭제 버튼 이벤트
const handleClickDelete = () => {
  deleteFAQOne(fno);
  router.replace("/faq/list");
};

// 완료 버튼 이벤트
const handleClickComplate = () => {
  putFAQOne(faq.value).then((result) => {
    router.replace(`/faq/read/${fno}`)
  });
};

onMounted(() => {
  console.log("fno: " + fno); // 이 부분에서 fno 값이 제대로 나오는지 확인
  getFAQOne(fno)
      .then((data) => {
        faq.value = data;
        console.log(faq.value);
      });
});

</script>

<style scoped>

</style>