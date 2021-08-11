;(function($){
    var work0 = {
        init:function(){
            var that = this;
                that.section2Fn();
        },
        section2Fn:function(){
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $slide = $('#section2 .slide')

            function resizeFn(){
                winW = $(window).innerWidth();
                $slide.css({width:winW});
            }

            setTimeout(resizeFn,10);

            $(window).resize(function(){
                setTimeout(resizeFn,10);
            });
        }
    }

    work0.init();
})(jQuery);