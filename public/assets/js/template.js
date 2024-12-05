(function ($) {
  'use strict';
  $(document).ready(function () {
    var sidebar = $('.sidebar');

    // 현재 URL 가져오기
    var currentPath = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');

    // 모든 메뉴 초기화: active 클래스 제거 및 닫기
    $('.nav-item').removeClass('active');
    $('.nav-link').attr('aria-expanded', 'false');
    $('.collapse').removeClass('show');

    // 현재 URL이 빈 문자열(메인 페이지)일 경우 처리
    if (currentPath === '') {
      currentPath = 'index.html'; // 메인 페이지로 간주되는 경로를 지정
    }

    // 현재 URL에 해당하는 메뉴 활성화
    var activeFound = false; // 활성화된 항목을 추적
    $('.nav li a').each(function () {
      var $this = $(this);
      var href = $this.attr('href');

      if (href && href === currentPath) { // 정확히 일치하는 URL만 활성화
        if (!activeFound) {
          $this.parents('.nav-item').addClass('active'); // 부모 메뉴 활성화
          $this.closest('.collapse').addClass('show'); // 하위 메뉴 펼치기
          $this.attr('aria-expanded', 'true');
          $this.addClass('active'); // 현재 링크 활성화
          activeFound = true; // 활성화된 항목이 있음을 표시
        }
      }
    });

    // 클릭 이벤트로 활성화된 상태 업데이트
    $('.nav-link[data-bs-toggle="collapse"]').on('click', function () {
      var $this = $(this);

      // 현재 메뉴 열기/닫기
      $this.attr('aria-expanded', function (index, value) {
        return value === 'true' ? 'false' : 'true';
      });

      // 클릭된 메뉴 외의 모든 collapse를 닫음
      $('.collapse').not($this.closest('.collapse')).removeClass('show');
      $('.nav-item').not($this.parents('.nav-item')).removeClass('active');
      $('.nav-link').not($this).attr('aria-expanded', 'false');
      $('.nav-link').not($this).removeClass('active');

      // 클릭된 메뉴 활성화
      $this.parents('.nav-item').addClass('active');
    });

    // Close other submenus in sidebar on opening any
    sidebar.on('show.bs.collapse', '.collapse', function () {
      sidebar.find('.collapse.show').collapse('hide');
    });
  });
})(jQuery);
