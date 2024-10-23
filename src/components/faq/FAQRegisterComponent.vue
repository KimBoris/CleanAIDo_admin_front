<template>
  <div>
    <div v-if="error" class="error-msg">
      {{ error }}
    </div>
    <input type="text" v-model="faq.question" />
    <input type="text" v-model="faq.answer" />
    <button @click="handleClickComplate">완료</button>
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

const error = ref(null);

// 완료 버튼 이벤트
const handleClickComplate = async () => {
  try {
    await postFAQOne(faq.value);
    router.replace("/faq/list");
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