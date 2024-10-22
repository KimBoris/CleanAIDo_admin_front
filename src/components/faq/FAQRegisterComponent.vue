<template>
  <div>
    <input type="text" v-model="faq.question" />
    <input type="text" v-model="faq.answer" />
    <button @click="handleClickComplete">완료</button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import { postFAQOne } from "../../apis/faqApi";

const router = useRouter();

const faq = ref({
  question: "",
  answer: "",
});

const handleClickComplete = async () => {
  await postFAQOne(faq.value);
  router.replace("/faq/list");
};

</script>

<style scoped>

</style>