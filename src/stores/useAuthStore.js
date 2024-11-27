import { defineStore } from 'pinia';
import { ref, computed, toRef } from 'vue';

const useAuthStore = defineStore('authStore', () => {
    // 상태 정의
    const accessToken = ref(localStorage.getItem('accessToken') || '');
    const refreshToken = ref(localStorage.getItem('refreshToken'))
    const role = ref(localStorage.getItem('userRole') || '');
    const userId = ref(localStorage.getItem('userId') || '');

    const userRole = toRef(role);
    const memberId = toRef(userId);

    // 인증 상태 확인
    const isAuthenticated = computed(() => !!accessToken.value);

    // 로그인 메서드
    const login = (access, refresh, userRole, email) => {
        accessToken.value = access;
        refreshToken.value = refresh;
        role.value = userRole;
        userId.value = email;

        // localStorage에 저장하여 페이지 새로고침 후에도 상태 유지
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('accessToken', refreshToken);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', email);
        console.log("sdfasdfasdfasdfasdf"+accessToken)
    };

    // 로그아웃 메서드
    const logout = () => {
        accessToken.value = '';
        role.value = '';
        userId.value = '';

        // localStorage에서 인증 정보 삭제
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    // 계산된 값 (필요한 경우 사용)
    const computedRole = computed(() => {
        if(!localStorage.getItem('userRole')){
            return null
        }

        if(localStorage.getItem('userRole') && ! role.value){
            role.value = localStorage.getItem('userRole')
            return localStorage.getItem('userRole')
        }

        return userRole;
    });
    const computedUserId = computed(() => {
        if(!localStorage.getItem('userId')){
            return null
        }

        if(localStorage.getItem('userId') && ! userId.value){
            userId.value = localStorage.getItem('userId')
            return localStorage.getItem('userId')
        }

        return memberId;
    });

    return { accessToken, role, userId, isAuthenticated, login, logout, computedRole, computedUserId }
})
export default useAuthStore;
