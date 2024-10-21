<template>
    <div class="col-md-6 col-lg-6 col-xl-6" v-for="todo in serverData.content" :key="faq.fno">
        <h3 @click="faq.open = !faq.open" class="faq-question" :class="{ 'open': faq.open }">
            {{ faq.question }}
        </h3>
        <p v-if="faq.open" class="faq-answer">
            {{ faq.answer }}
        </p>

    </div>
</template>

<script setup>

</script>

<style scoped>

</style>