<template>
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">입점 요청 조회</h4>

      <!-- 로딩 -->
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>

      <div v-else>
        <p class="card-description">가입정보</p>
        <div class="py-3 d-flex">
          <div class="text-small text-dark" style="width: 11rem">이메일(email)</div>
          <div class="text-small text-dark" style="color: slategray !important">{{ readData.userId }}</div>
        </div>

        <hr class="mt-4 mb-4"/>

        <p class="card-description">사업자 정보</p>

        <div class="py-3 d-flex">
          <div class="text-small text-dark" style="width: 11rem">사업자 유형</div>
          <div v-if="readData.businessType == '47925'"
               class="text-small text-dark" style="color: slategray !important">개인</div>
          <div v-else class="text-small text-dark" style="color: slategray !important">법인</div>
        </div>
        <div class="py-3 d-flex">
          <div class="text-small text-dark" style="width: 11rem">사업자등록번호</div>
          <div class="text-small text-dark" style="color: slategray !important">{{ readData.businessNumber }}</div>
        </div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">통신판매업신고번호</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.commerceLicenseNum }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">상호</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.businessName }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">대표자명</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.ownerName }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">사업장 소재지</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.businessAddress }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">업태</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.businessStatus }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">업종</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.businessCategory }}</div>
      </div>

      <hr class="mt-4 mb-4"/>

      <p class="card-description">스토어 정보</p>

      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">스토어명</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.storeName }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">배송 출고지</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.originAddress }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">판매자 연락처</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.contactNumber }}</div>
      </div>
      <div class="py-3 d-flex">
        <div class="text-small text-dark" style="width: 11rem">정산대금 입금계좌</div>
        <div class="text-small text-dark" style="color: slategray !important">{{ readData.accountNumber }}</div>
      </div>

      <hr class="mt-4 mb-4"/>

      <p class="card-description">사업자등록증 이미지</p>
      <div class="w-100 bg-body-secondary" style="height: 500px">
        <img :src="readData.businessLicenseFile" class="img-contain" />
      </div>

      <div class="d-flex justify-content-end gap-2 mt-5">
        <button class="w-auto btn-primary border-0 rounded-1 px-4 py-2">승인</button>
        <button class="w-auto btn-light border-0 rounded-1 px-4 py-2">거절/보류</button>
      </div>
    </div>
    <!--  //card-body  -->
  </div>
  <!--  //card  -->


</template>

<script setup>
import {onMounted, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import {getUserOne} from "../../apis/userApi.js";
import Share from "../../layout/Share.vue";
import {read} from "@popperjs/core";
import LoadingComponent from "../common/LoadingComponent.vue";

  const router = useRouter();
  const route = useRoute();
  const uid = route.params.userId;

  // 조회 데이터 셋
  const readData = ref({
    userId: uid,
    businessNumber: '',
    businessName: '',
    businessType: '',
    ownerName: '',
    businessAddress: '',
    businessStatus: '',
    businessCategory: '',
    storeName: '',
    commerceLicenseNum: '',
    businessLicenseFile: '',
    originAddress: '',
    contactNumber: '',
    accountNumber: '',
    createDate: '',
  })

  // 조회 데이터 호출 함수
  const fetchUserRead = async () => {
    const res = await getUserOne(uid);
    console.log(res.data)
    readData.value = res.data;
    console.log(readData.value)
  }

  // 승인 또는 거절 처리 필요


  // 페이지가 마운트되면 호출
  onMounted(() => {
    fetchUserRead();
  })

</script>

<style scoped>

</style>