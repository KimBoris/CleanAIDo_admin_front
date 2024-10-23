<template>
  <div v-if="error !== null">ERROR {{ error }}</div>
  <div v-if="error === null">
    <div>
      <input type="text" v-model="faq.question" />
      <input type="text" v-model="faq.answer" />
      <div>
        <button @click="handleClickDelete">삭제</button>
        <button @Click="handleClickComplate">완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {deleteFAQOne, getFAQOne, putFAQOne} from "../../apis/faqApi.js";
import {onMounted, ref} from "vue";

const route = useRoute();
const router = useRouter();

const fno = route.params.fno;

const faq = ref({
  fno: 0,
  question: "",
  answer: "",
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
    router.replace(`faq/read/${fno}`)
  });
};

onMounted(() => {
  console.log("fno: " + fno); // 이 부분에서 fno 값이 제대로 나오는지 확인
  getFAQOne(fno)
      .then((data) => (faq.value = data))
      .catch((err) => {
        console.log("----------------------");
        console.log(err);
        error.value = err.response.data.message;
      })
});

</script>

<style scoped>

</style>