<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="userId">아이디</label>
        <input
            type="text"
            id="userId"
            v-model="credentials.userId"
            required
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
        />
      </div>
      <button type="submit" class="btn btn-primary">로그인</button>
    </form>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, setAuthToken } from "../../apis/authApi";

const credentials = ref({
  userId: "",
  password: "",
});

const error = ref(null);
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login(credentials.value);

    // 토큰 저장 및 axios 헤더 설정
    const { accessToken, refreshToken, adminRole } = response;
    setAuthToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // 콘솔 출력
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    console.log("ROLE:", adminRole ? "ROLE_ADMIN" : "ROLE_SELLER");

    // 기본 경로로 리다이렉트
    router.push("/");
  } catch (err) {
    error.value = err.response?.data || "로그인 실패";
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
