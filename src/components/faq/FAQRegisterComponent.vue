<template>
  <div>
    <input type="text" />
    <input type="text" />
    <button>완료</button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const faq = ref({
  question: "",
  answer: "",
});

const handleClickComplate = async () => {
  await postFAQOne(faq.value);
  router.replace("/faq/list");
}

</script>

<style scoped>

</style>