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
                    transX = e.clientX*.02;
                    transY = e.clientY*.04-20;
                    $(this).css({transform:'translate('+transX+'px,'+transY+'px) rotate('+transX+'deg)'});
                }
            });
        }
    }
    profile.init();
})(jQuery);