/**
 * Created by ChengYa on 2016/6/18.
 */

//判断手机类型
window.onload = function () {
    //alert($(window).height());
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //屏蔽ios下上下弹性
        $(window).on('scroll.elasticity', function (e) {
            e.preventDefault();
        }).on('touchmove.elasticity', function (e) {
            e.preventDefault();
        });
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
    }
    //预加载
    loading();
}


//加载页面
function loading() {    
    //配置turn.js
    function loadApp() {
        // var w = $(window).width();
        // var h = $(window).height();
        // $('.flipboox').width(w).height(h);
        // $(window).resize(function () {
        //     w = $(window).width();
        //     h = $(window).height();
        //     $('.flipboox').width(w).height(h);
        // });

        $('.flipbook').turn({
            // Width
            width: 380,
            // Height
            height: 640,
            // Elevation
            elevation: 100,
            display: 'single',
            // Enable gradients
            gradients: true,
            // Auto center this flipbook
            autoCenter: true,
            acceleration:true,
            // direction:'rtl',
            // page:2,
            when: {
                turning: function (e, page, view) {
                    // console.log(view);
                    if (page == 1) {
                        $(".btnImg").css("display", "block");
                        $(".mark").css("display", "block");
                    } else {
                        $(".btnImg").css("display", "block");
                        $(".mark").css("display", "block");
                    }
                    if (page == 9) {
                        $(".nextPage").css("display", "none");
                     }//else {
                    //     $(".nextPage").css("display", "block");
                    // }
                },
                turned: function (e, page, view) {
                    var total = $(".flipbook").turn("pages");//总页数
                    // console.log(total);
                    if (page == 1) {
                        $(".return").css("display", "block");
                        $(".btnImg").css("display", "block");
                    } else {
                        $(".return").css("display", "block");
                        $(".btnImg").css("display", "block");
                    }
                    if (page == 2) {
                        $(".catalog").css("display", "block");
                    } else {
                        $(".catalog").css("display", "none");
                    }
                }
            }
        })
    }
    yepnope({
        test: Modernizr.csstransforms,
        yep: ['js/turn.js'],
        complete: loadApp
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + "" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;


    
}


// 阻止事件冒泡
 function eventBubble(){
       $('.catelog').each(function(){
            $('this').bind('touchstart',function(event){
                event.stopPropagation();
            });
       });
 }

//目录链接跳转
 function catalogLink(i){
     $(".flipbook").turn('page', i);
 }

// 按钮翻页------------------------------------------------------------------------------

 //封装自定义仿iphone弹出层插件
    (function ($) {
        //ios confirm box
        jQuery.fn.confirm = function (title, option, okCall, cancelCall) {
            var defaults = {
                title: null, //what text
                cancelText: '取消', //the cancel btn text
                okText: '确定' //the ok btn text
            };

            if (undefined === option) {
                option = {};
            }
            if ('function' != typeof okCall) {
                okCall = $.noop;
            }
            if ('function' != typeof cancelCall) {
                cancelCall = $.noop;
            }

            var o = $.extend(defaults, option, {title: title, okCall: okCall, cancelCall: cancelCall});

            var $dom = $(this);

            var dom = $('<div class="g-plugin-confirm">');
            var dom1 = $('<div>').appendTo(dom);
            var dom_content = $('<div>').html(o.title).appendTo(dom1);
            var dom_btn = $('<div>').appendTo(dom1);
            var btn_cancel = $('<a href="#"></a>').html(o.cancelText).appendTo(dom_btn);
            var btn_ok = $('<a href="#"></a>').html(o.okText).appendTo(dom_btn);
            btn_cancel.on('click', function (e) {
                o.cancelCall();
                dom.remove();
                e.preventDefault();
            });
            btn_ok.on('click', function (e) {
                o.okCall();
                dom.remove();
                e.preventDefault();
            });

            dom.appendTo($('body'));
            return $dom;
        };
    })(jQuery);


$(function(){
            //上一页
    $(".previousPage").bind("touchend", function () {
        var pageCount = $(".flipbook").turn("pages");//总页数
        var currentPage = $(".flipbook").turn("page");//当前页
        if (currentPage >= 2) {
            $(".flipbook").turn('page', currentPage - 1);
        } else {
        }
    });
    // 下一页
    $(".nextPage").bind("touchend", function () {
        var pageCount = $(".flipbook").turn("pages");//总页数
        var currentPage = $(".flipbook").turn("page");//当前页
        if (currentPage <= pageCount) {
            $(".flipbook").turn('page', currentPage + 1);
        } else {
        }
    });
    //返回到目录页
    $(".return").bind("touchend", function () {
        $(document).confirm('您确定要返回目录吗?', {}, function () {
            $(".flipbook").turn('page', 2); //跳转页数
            eventBubble();
        }, function () {
        });
    });
});

