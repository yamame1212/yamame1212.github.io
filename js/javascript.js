$(function(){
    //----------------------
    // TOPボタンの処理
    //----------------------
    var pagetop = $('#page_top');
    // ボタン非表示
    pagetop.hide();
    
    // 100px スクロールしたらボタン表示
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
           pagetop.fadeIn();
       } else {
           pagetop.fadeOut();
       }
    });
    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });

    //----------------------
    // Navボタンの名前変更処理
    //----------------------
    $(".navBox").mouseover(function() {   
        var navid = $($(this).find('a')).attr("id");       
        switch (navid) {
            case "nav1":
                $("#nav1").html("ホーム");
                break;
        
            case "nav2":
                $("#nav2").html("体験メニュー");
                break;

            case "nav3":
                $("#nav3").html("アクセス");
                break;

            case "nav4":
                $("#nav4").html("体験予約");
                break;
        
            default:
                break;
        }
        
    });
  
    $(".navBox").mouseout(function() {   
        var navid = $($(this).find('a')).attr("id");       
        switch (navid) {
            case "nav1":
                $("#nav1").html("Home");
                break;
        
            case "nav2":
                $("#nav2").html("LessonMenu");
                break;

            case "nav3":
                $("#nav3").html("Access");
                break;

            case "nav4":
                $("#nav4").html("Reservation");
                break;
        
            default:
                break;
        }
        
    });
    
    //----------------------
    //ハンバーガーボタンの動作
    //----------------------
   
    $(function () {
        $('.js-btn').on('click', function () {        
          // js-btnクラスをクリックすると、
          $('.navBoxAll , .btn-line').toggleClass('open'); 
          // メニューとバーガーの線にopenクラスをつけ外しする
        })
      });
    
    //リサイズした時の処理
    $(function () {
        $(window).resize(function(){
            var timer = false;
            // console.log(timer);
            if (timer !== false) {
                clearTimeout(timer);              
            }
            timer = setTimeout(function() {
                // リサイズが終了した時点で行う処理または関数を記述
                var width = $(window).width();
                // console.log(width);
                if(width >= 500){
                // console.log('1');
                if($("#navMenu").hasClass("open")){
                    // console.log('2');
                    $('.navBoxAll , .btn-line').toggleClass('open');               

                }               
                }                          
            }, 1000);
        });
    });


    //----------------------
    //カレンダー　FullCalendar　サイズ変更処理 
    //----------------------
    $(function () {
        $("#calendar").fullCalendar({
                height: window.innerHeight - 100,
                windowResize: function () {
                $("#calendar").fullCalendar('option', 'height', window.innerHeight - 100);
                }
        });
        
    });


    //----------------------
    // 予約カレンダー過去日選択不可処理
    //----------------------
    $(function () {
        var today = new Date();        
        var  format = 'YYYY-MM-DDThh:mm';
        format = format.replace(/YYYY/g,today.getFullYear());
        format = format.replace(/MM/g,('0' + today.getDay()).slice(-2));
        format = format.replace(/DD/g,('0' + today.getDay()).slice(-2));
        format = format.replace(/hh/g,('0' + today.getHours()).slice(-2));
        format = format.replace(/mm/g,('0' + today.getMinutes()).slice(-2));        
        $("#dayS").click(function(){
            
            $("#dayS").attr("min",format);
        });
    });
    
    
    
    //----------------------
    // スライダー
    //----------------------
    $(function () {
   
    // var list = $('.list'),           
    var list = $('#list1'),           
    num = list.children().length, 
    counter = 0,                  
    running = false;              
   
        /* 最初に各.item の order に連番を振る*/
        for(var i = 0; i < num; i++){
        list.children().eq( i ).css('order', i );
        }


    /* スライド */
    function slider(reverse){ // 逆回しのとき reverse に true が入る
      running = true;         // フラグ on
      /* left を初期値 -100% から -200%（順回し）か 0（逆回し）まで動かす */
      var offset = reverse ? 0 : '-200%';
      list.animate({left: offset }, 600, 'swing', function(){
        ordering( reverse );  // .list を動かしたら.item の並び替え処理
        running = false;      // フラグ off
      });
    }
    
    /* 並び替え */
    function ordering(reverse){
      if( reverse ){
        /* 逆回ししたら、末尾の.item を先頭に移動 */
        var index = counter > 0 ? counter - 1 : num - 1, 
            tail = list.children().eq( index ),
            order = Number( tail.css('order') ) - num; 
        tail.css('order', order);
        counter = index;
      } else {
        /* 順回ししたら、先頭の.item を末尾に移動 */
        var lead = list.children().eq( counter ),
            order = Number( lead.css('order') ) + num;
        lead.css('order', order);
        counter = counter < num - 1 ? counter + 1 : 0;
      }
      list.css('left','-100%'); // .item の移動と同時に left を戻す
    }
    
    var setSlider = setInterval( slider, 4000);
    // タッチデバイスかどうか判定
    if('ontouchstart' in window){ 
        console.log(11111);
        $('.buttons').remove();   // タッチデバイスならボタンを消す
        var startX,               // タッチ開始位置
            endX,                 // タッチ終了位置
            difX;                 // 開始位置と終了位置の差分
        $('.view').on('touchstart', function(e){
            startX = e.originalEvent.changedTouches[0].pageX;
            endX = startX;          // touchmoveが発生しないケースに備えてstartXを代入
        }).on('touchmove', function(e){
            endX = e.originalEvent.changedTouches[0].pageX;
        }).on('touchend', function(e){
            difX = endX - startX;
            if( Math.abs(difX) > 100 ){ // 差分の絶対値|difX| > 100 のときだけ実行
                if( running ) return;     // アニメーション中フラグが on なら処理を抜ける
                clearInterval( setSlider );         // 繰り返しを止める
                var flag = difX > 0 ? true : false; // difX の正負で回す向きを判定
                slider(flag);                       // slider を1回実行
            }
        });
    }else{
          console.log(22222);
        // click
        $('.button').on('click', function(){
          if( running ) return;                          // フラグ on なら処理を抜ける
          clearInterval( setSlider );                    // 繰り返しを止める
          var flag = $(this).is('.prev') ? true : false; // 逆回しなら true を渡す
          slider( flag );　                              // slider を1回実行
        });
      }


});


});

