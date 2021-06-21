;(function($){
    var profile = {
        init:function(){
            var that = this;
                that.scrlMenuFn();
                that.headerFn();
                that.section1Fn();
        },
        scrlMenuFn:function(){
            var scrlPrev = 0;
            var scrlNew = 0;
            var result = null;
            var that = this;

            function wheelPositionFn(){
                result = scrlPrev - scrlNew > 0 ? 'u':'d'
                return {
                    result,scrlPrev,scrlNew
                }
            }

            $(window).scroll(function(){
                scrlNew = $(this).scrollTop();
                wheelPositionFn();

                if(scrlNew <= 10){
                    $('#header').removeClass('addHide');
                } else {
                    if(result === 'u'){
                        $('#header').removeClass('addHide');
                    }
                    if(result === 'd'){
                        $('#header').addClass('addHide');
                    }
                }
                scrlPrev = scrlNew;
            });
        },
        headerFn:function(){

        },
        section1Fn:function(){
            var $me = $('#section1 .intro-btn');
            var transX = 0;
            var transY = 0;
            var transZ = 0;

            $me.on({
                mousemove:function(e){
                    transX = e.clientX*.02;
                    transY = e.clientY*.04-20;
                    $(this).css({transform:'translate('+transX+'px,'+transY+'px) rotate('+transX+'deg)'});
                }
            });
        }
    }
    profile.init();
})(jQuery);