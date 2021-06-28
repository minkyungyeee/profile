;(function($){
    var profile = {
        init:function(){
            var that = this;
                that.scrlMenuFn();
                that.headerFn();
                that.section1Fn();
        },
        scrlMenuFn:function(){

        },
        headerFn:function(){

        },
        section1Fn:function(){
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $sec1 = $('#section1');

            var $txt = $('#section1 .txt');
            var n = $('#section1 .txt').length;
            var cnt = 0;
            var next = [];
            var setId = null;

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                $sec1.css({width:winW,height:winH});
            }
            setTimeout(resizeFn,10);
            $(window).resize(function(){
                setTimeout(resizeFn,10);
            });

            function txtNextSlideFn(){
                next=[3,0,1,2];
                for(var i=0;i<cnt;i++){
                    var imsi = next.shift();
                        next.push(imsi);
                }

                for(var i=0;i<n;i++){
                    $txt.eq(next[i]).stop().animate({left:(33*i)+'%'},0).animate({left:(33*(i-1))+'%'},3000,'linear');
                }
            }

            function nextSlideCountFn(){
                cnt ++;
                if(cnt>n-1){cnt=0}
                txtNextSlideFn();
            }

            setTimeout(nextSlideCountFn,10);

            function autoPlay(){
                setId = setInterval(nextSlideCountFn,3000);
            }
            autoPlay();
        }
    }
    profile.init();
})(jQuery);