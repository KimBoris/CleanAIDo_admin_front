<template>
  <div>
    <input type="text" v-model="faq.question" />
    <input type="text" v-model="faq.answer" />
    <button @click="handleClickComplate">완료</button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter();

const faq = ref({
  question: "",
  answer: "",
});

// 완료 버튼 이벤트
const handleClickComplate = async () => {
  await postFAQOne(faq.value);
  router.replace("/faq/list");
};

</script>

<style scoped>

</style>