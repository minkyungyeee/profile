;(function($){
    var profile = {
        init:function(){
            var that = this;
                that.scrlMenuFn();
                that.scrlSectionFn();
                that.headerFn();
                that.section1Fn();
                that.section2Fn();
        },
        scrlMenuFn:function(){

        },
        scrlSectionFn:function(){
            var $sec1 = $('#section1');
            var $sec2 = $('#section2');
            var wheelDelta = 0;

            // section2로 이동
            $sec1.on({
                mousewheel:function(e){
                    e.preventDefault();
                    if(e.originalEvent.wheelDelta){
                        wheelDelta = e.originalEvent.wheelDelta;
                    } else {
                        wheelDelta = e.detail*-1;
                    }
                    
                    if(!$('html,body').is(':animated')){
                        if(wheelDelta<0){
                            $('html,body').stop().animate({scrollTop:$sec2.offset().top},600,'easeInSine');
                        } else {
                            $('html,body').stop().animate({scrollTop:$(this).offset().top},0);
                            //section1과 2사이에화면이잇는데 마우슨 ㄴsection1에 잇으면 이상하게올라감
                        }
                    }
                }
            });

            // $sec2.on({
            //     mousewheel:function(e){
            //         e.preventDefault();
            //         if(e.originalEvent.wheelDelta){
            //             wheelDelta = e.originalEvent.wheelDelta;
            //         } else {
            //             wheelDelta = e.detail*-1;
            //         }
                    
            //         if(!$('html,body').is(':animated')){
            //             if(wheelDelta>=0){
            //                 $('html,body').stop().animate({scrollTop:$sec1.offset().top},600,'easeInSine');
            //             } else {
                            
            //             }
            //         }
            //     }
            // });
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
        },
        section2Fn:function(){
            var $me = $('#section2 .me');
            var $svg = $('#section2 .svg1 path');
            var objTot = [];

            $(window).scroll(function(){
                if($(window).scrollTop() === $('#section2').offset().top){
                    //svgAnimationFn();
                    $svg.addClass('addActive');
                } else if($(window).scrollTop()<=10){
                    $svg.removeClass('addActive');
                }
            });
            // function svgAnimationFn(){
            //     $.each($svg,function(idx,obj){
            //         objTot[idx] = Math.ceil(obj.getTotalLength());
            //         console.log(objTot)
            //         obj.style.strokeDasharray = objTot[idx];
            //         obj.style.strokeDashoffset = objTot[idx];
                    
            //         $(obj).stop().animate({strokeDashoffset:0},2000)
            //     });
            // }
        }
    }
    profile.init();
})(jQuery);