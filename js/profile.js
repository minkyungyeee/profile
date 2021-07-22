;(function($){
    var profile = {
        init:function(){
            var that = this;
                that.scrlMenuFn();
                that.scrlSectionFn();
                that.headerFn();
                that.section1Fn();
                that.section2Fn();
                that.section3Fn();
                that.section4Fn();
                that.section5Fn();
                that.footerFn();
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
                    $('#header').removeClass('addHide')
                } else {
                    if(result === 'u'){
                        $('#header').removeClass('addHide');
                    }
                    if(result === 'd'){
                        $('#header').addClass('addHide');
                    }
                }

                scrlPrev = scrlNew;
            })
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
        section1Fn:function(){
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $sec1 = $('#section1');
            var h2 = $('#section1 .box-wrap h2');

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

            $(document).ready(function(){
                h2.addClass('addLoad');
            });
            //portfolio 글씨 롤링
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

            var $introImg = $('#section2 .intro-img');
            var sclT = $(window).scrollTop();

            $(window).scroll(function(e){
                
                if($(window).scrollTop() >= $('#section2').offset().top){
                    //svgAnimationFn();
                    $svg.addClass('addActive');
                } else if($(window).scrollTop()<=10){
                    $svg.removeClass('addActive');
                }
                

                //img사진 이동 event
                sclT = $(window).scrollTop()*.2;
                //console.log(sclT)
                $introImg.css({transform:'translateY('+sclT+'px)'})
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
        },
        section3Fn:function(){
            var cir = $('.cir');
            var num = $('.num');
            var totalL = [];
            var perLen = [];
            var percent = [.90, .90, .70, .75, .60, .60];
            var seconds = 4;
            var piece = [];
            var cnt = [0,0,0,0,0,0];
            var setId = [];
            var t = 0;

            $.each(cir,function(idx,obj){
                totalL[idx] = Math.ceil(obj.getTotalLength());

                obj.style.strokeDasharray = totalL[idx];
                obj.style.strokeDashoffset = totalL[idx];

                perLen[idx] = totalL[idx] * percent[idx];
                
                piece[idx] = (perLen[idx]/seconds)/100;
                
                $(window).scroll(function(){
                    if($(window).scrollTop() >= $('#section3').offset().top-400){
                        setId[idx] = setInterval(countFn,100);
                    } else if($(window).scrollTop()<=10){
                        //위로 올라가면 다시 지워져있음 좋겟음,,
                        
                    }
                });

                function countFn(){
                    cnt[idx] += piece[idx];
                    if(cnt[idx] > perLen[idx]){
                        clearInterval(setId[idx]);
                    } else {
                        $(obj).css({strokeDashoffset:totalL[idx]-cnt[idx]});
                        num.eq(idx).text(Math.ceil((cnt[idx]/totalL[idx])*100)+'%')
                    }
                }
            });

        },
        section4Fn:function(){
            var $slide = $('#section4 .slide');
            var $sliCont = $('#section4 .slide-cont');
            var n = $('#section4 .slide').length; //4
            var cnt = 0;
            var next = [];
            var prev = [];
            var setId = null;
            var setId2 = null;

            function mainNextSlideFn(){
                for(var i=0;i<n;i++){
                    next[i] = i;
                }
                var imsi = next.pop();
                    next.unshift(imsi);

                for(var i=0;i<cnt;i++){
                    var imsi = next.shift();
                        next.push(imsi);
                }

                for(var i=0;i<n;i++){
                    $slide.eq(next[i]).stop().animate({left:(30*i)+'%'},0).animate({left:(30*(i-1))+'%'},3000,'linear');
                }
            }

            function nextSlideCountFn(){
                cnt ++;
                if(cnt>n-1){cnt=0}
                mainNextSlideFn();
            }

            setTimeout(nextSlideCountFn,10);

            function autoPlay(){
                setId = setInterval(nextSlideCountFn,3000);
            }

            autoPlay();

            function pauseFn(){
                clearInterval(setId);
            }

            $sliCont.each(function(idx){
                $(this).on({
                    mouseenter:function(){
                        $slide.removeClass('addHover');
                        $(this).parent().addClass('addHover');
                        pauseFn();
                    },
                    mouseleave:function(){
                        $slide.removeClass('addHover');
                        autoPlay();
                    },
                    click:function(e){
                        e.preventDefault();
                    }
                });
            });
        },
        section5Fn:function(){
            var $sec5 = $('#section5');
            var $cir = $('#section5 .circle');
            var mouseX = 0;
            var mouseY = 0;
            var cirX = 0;
            var cirY = 0;
            var x = 0;
            var y = 0;
            var s = .06;

            function animate(){
                var disX = mouseX - cirX
                var disY = mouseY - cirY
                var trans = 'translate3d('+cirX+'%,' + cirY + '%,0)';

                cirX = cirX + (disX * s)
                cirY = cirY + (disY * s)

                $cir.css({transform:trans});

                requestAnimationFrame(animate)
            }
            animate();

            $sec5.on({
                mousemove:function(e){
                    mouseX = e.clientX - $cir.innerWidth();
                    mouseY = e.clientY - $cir.innerHeight()-300;
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
        }
    }
    profile.init();
})(jQuery);