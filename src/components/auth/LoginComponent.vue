<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="userId">아이디</label>
        <input type="text" id="userId" v-model="credentials.userId" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="credentials.password" required />
      </div>
      <button type="submit" class="btn btn-primary">로그인</button>
    </form>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../apis/authApi.js"

const credentials = ref({ userId: "", password: "" });
const error = ref(null);
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login(credentials.value).then(router.push("/"))
    console.log(response.data)
  } catch (err) {
    console.error("로그인 오류:", err);
    error.value = err.message;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-msg {
  color: red;
  margin-top: 10px;
}
</style>
