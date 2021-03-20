
jQuery(function() {
  var pagetop = $('#page_top');   
  pagetop.hide();
  $(window).scroll(function () {
    //100pxスクロールしたら表示
      if ($(this).scrollTop() > 100) {  
          pagetop.fadeIn();
      } else {
          pagetop.fadeOut();
      }
  });
  pagetop.click(function () {
    //0.5秒かけてトップへ移動
      $('body,html').animate({
          scrollTop: 0
      }, 500); 
      return false;
  });
});


$(function(){
  $('.js-modal-open1').on('click',function(){
      $('.js-modal1').fadeIn();
      return false;
  });
  $('.js-modal-open2').on('click',function(){
      $('.js-modal2').fadeIn();
      return false;
  });
  $('.js-modal-open3').on('click',function(){
      $('.js-modal3').fadeIn();
      return false;
  });
  $('.js-modal-open4').on('click',function(){
      $('.js-modal4').fadeIn();
      return false;
  });
  $('.js-modal-open5').on('click',function(){
      $('.js-modal5').fadeIn();
      return false;
  });
  $('.js-modal-open6').on('click',function(){
      $('.js-modal6').fadeIn();
      return false;
  });
  $('.js-modal-close').on('click',function(){
      $('.modal').fadeOut();
      return false;
  });
});



$(function () {
  $('.js-btn').on('click', function () {        
    // js-btnクラスをクリックすると、
    $('.navBoxAll , .btn-line').toggleClass('open'); 
    // メニューとバーガーの線にopenクラスをつけ外しする
  })
});


