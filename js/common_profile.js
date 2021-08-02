;(function($){
    var common = {
        init:function(){
            var that = this;
                that.scrlMenuFn();
                that.headerFn();
                that.footerFn();
                that.goTopFn();
        },
        scrlMenuFn:function(){
            var scrlPrev = 0;
            var scrlNew = 0;
            var result = null;
            
            function wheelPositionFn(){
                result = scrlPrev-scrlNew>0?'u':'d'
                return {
                    result,
                    scrlPrev,
                    scrlNew
                }
            }

            $(window).scroll(function(){
                scrlNew = $(this).scrollTop();
                wheelPositionFn();

                if(scrlNew<=10){
                    $('#header').removeClass('addHide');
                    $('#goTop').removeClass('addTop');
                } else {
                    if(result === 'u'){
                        $('#header').removeClass('addHide');
                    }
                    if(result === 'd'){
                        $('#header').addClass('addHide');
                        $('#goTop').addClass('addTop');
                    }
                }

                scrlPrev = scrlNew;
            })
        },
        headerFn:function(){
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $navi = $('#navi');
            var $asideBtn = $('#aside .aside-btn');
            var $menu = $('#navi .menu')
            var t = 0;

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $navi.css({width:winW,height:winH});
                // if($navi.hasClass('addActive')){
                //     $navi.css({width:winW,height:winH});
                // } else {
                //     $navi.css({width:0})
                // }
            }

            setTimeout(resizeFn,10);

            $(window).resize(function(){
                setTimeout(resizeFn,10);
            });

            //햄버거 메뉴 클릭시 navi toggle, bar toggle, html toggle(scrl방지)
            $asideBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(t===0){
                        $(this).children().addClass('addNavi');
                        $(this).next().addClass('addActive');
                        $('html').addClass('prevenScrl');
                        t = 1;
                    } else if(t===1){
                        $(this).children().removeClass('addNavi');
                        $(this).next().removeClass('addActive');
                        $('html').removeClass('prevenScrl');
                        t = 0;
                    }
                }
            });

            //navi menu click => section이동 && navi, bar, hmtl 모두 초기화
            $menu.on({
                click:function(){
                    t = 0;
                    $('.bar').removeClass('addNavi');
                    $navi.removeClass('addActive');
                    $('html').removeClass('prevenScrl');
                }
            })
        },
        footerFn:function(){
            var $siteBtn = $('#footer .site-btn');

            $siteBtn.on({
                click:function(){
                    //$('.site-box').toggleClass('addOpen')
                    $('.site-wrap').stop().slideToggle();
                }
            });
        },
        goTopFn:function(){
            var $topBtn = $('#goTop .go-top-btn');

            $topBtn.on({
                click:function(e){
                    e.preventDefault();
                    $('html,body').stop().animate({scrollTop:0},1000,'easeInOutExpo');
                }
            });
        }
    }
    common.init();
})(jQuery);