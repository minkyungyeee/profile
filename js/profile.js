;(function($){
    var profile = {
        init:function(){
            var that = this;
                that.headerFn();
                that.section1Fn();
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
                    transX = e.clientX*.04;
                    transY = e.clientY*.04;
                    console.log(transX,transY)
                    $(this).css({transform:'translate('+transX+'px,'+transY+'px) rotate('+transX+'deg)'});
                },
                mouseleave:function(){
                    $(this).css({transform:'translate(0,0) rotate(0)'});
                }
            });
        }
    }
    profile.init();
})(jQuery);