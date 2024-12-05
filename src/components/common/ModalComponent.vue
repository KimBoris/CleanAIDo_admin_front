<template>
  <div>
    <!-- 모달 -->
    <div
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        style="display: block; background: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog mt-5" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
                type="button"
                class="btn-close"
                @click="closeModal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot>모달 본문 내용입니다.</slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-primary py-2 px-4 text-white border-0 rounded-1" @click="closeModal">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '모달 제목',
    },
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close'); // 부모 컴포넌트로 닫기 이벤트 전달
    },
  },
};
</script>

<style scoped>
/* 모달 디자인 추가 */
</style>
