$(function() {
    document.createElement("picture");
    /*-----------------------------------*/
    ///////////// fix iOS bug /////////////
    /*-----------------------------------*/
    document.documentElement.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    }, false);
    /*-----------------------------------*/
    ///////////////// 變數 ////////////////
    /*-----------------------------------*/
    var _window = $(window),
        ww = _window.outerWidth(),
        wh = _window.height(),
        _body = $('body'),
        wwNormal = 1400,
        wwMedium = 992,
        wwSmall = 768,
        wwxs = 576;
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/
    //////////// nav如果有兩個選單///////////
    /*-----------------------------------*/
    var _navLength = $('.navigation ul').length;
    if (_navLength > 1) {
        $('.navigation ul:nth-child(1)').addClass('left_nav');
    }
    $('.navigation').has('.language').addClass('have_language');
    /*-----------------------------------*/
    /////// header選單 tab及 fix設定////////
    /*-----------------------------------*/
    var _menu = $('.menu');
    _menu.find('li').has('ul').addClass('hasChild');
    var liHasChild = _menu.find('li.hasChild'),
        liHasChild_level1 = $('.menu ul').children('li.hasChild'),
        liHasChild_level2 = $('.menu ul ul').children('li.hasChild'),
        liHasChild_level3 = $('.menu ul ul ul').children('li.hasChild'),
        subMenuWidth = liHasChild.first().children('ul').outerWidth();
    /*-----------------------------------*/
    ////////////// 行動版選單切換////////////
    /*-----------------------------------*/
    _body.prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>');
    $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>');
    var menu_status = false;
    var _sidebar = $('.sidebar'),
        _search = $('.search'),
        _nav = $('.navigation'),
        _sidebarClose = $('.sidebarClose'),
        _sidebarCtrl = $('.sidebarCtrl'),
        _overlay = $('.menu_overlay');
    _mArea = $('.m_area');
    _sidebarCtrl.append('<span></span><span></span><span></span>');
    var search_mode = false;
    // 打開選單 function
    function showSidebar() {
        _sidebar.show();
        _mArea.show();
        _mArea.animate({
            'margin-left': 0
        }, 400, 'easeOutQuint');
        _body.addClass('noscroll');
        _overlay.fadeIn();
        $('.m_search').hide();
        search_mode = false;
    }
    // 縮合選單 function
    function hideSidebar() {
        _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function() {
            _sidebar.fadeOut(200);
            _mArea.hide();
        });
        _body.removeClass('noscroll');
        _overlay.fadeOut();
        liHasChild.children('ul').hide();
    }
    // 打開選單動作
    _sidebarCtrl.click(function(e) {
        showSidebar();
        e.preventDefault();
    });
    // 關閉動作
    _overlay.add(_sidebarClose).off().click(function() {
        hideSidebar();
    });
    _overlay.off("mouseenter");
    // 無障礙tab設定
    liHasChild.children('a').keyup(function() {
        $(this).siblings("ul").fadeIn();
        $(this).parent("li").siblings().focus(function() {
            $(this).hide();
        });
    });
    _menu.find('li').keyup(function() {
        $(this).siblings().children('ul').hide();
    });
    _menu.find('li:last>a').focusout(function() {
        _menu.find('li ul').hide();
    });
    // 切換PC/Mobile 選單
    function mobileMenu() {
        ww = _window.outerWidth();
        if (ww < wwSmall) {
            /*-----------------------------------*/
            /////////////// 手機版設定 /////////////
            /*-----------------------------------*/
            menu_status = false;
            _sidebar.hide();
            _overlay.hide();
            _nav.prependTo(_mArea);
            _menu.prependTo(_mArea);
            _search.prependTo(_body);
            _search.addClass('m_search');
            _mArea.css({
                'margin-left': _mArea.width() * -1 + 'px'
            });
            liHasChild_level1.on({
                mouseenter: function() {
                    $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
                },
                mouseleave: function() {
                    $(this).parent().siblings('ul').hide();
                    $(this).children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                }
            });
            // 副選單點出
            liHasChild.off().on('mouseenter,mouseleave');
            liHasChild.on('touchstart', function() {
                $(this).off('mouseenter,mouseleave');
            });
            // 第一層選單
            liHasChild_level1.off().on('click', function(e) {
                $(this).siblings('li').find('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
            });
            // 第二層選單
            liHasChild_level2.off().on('click', function(e) {
                $(this).siblings('li').children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
            });
            // 第三層選單
            liHasChild_level3.off().on('click', function(e) {
                e.preventDefault();
            });
            //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
            liHasChild.children('a').off().on('click', function(e) {
                e.preventDefault();
            });
            _body.off('touchmove');
            $('.m_search').hide();
            $('.language').find('ul').hide();
        } else {
            /*-----------------------------------*/
            /////////////// PC版設定 /////////////
            /*-----------------------------------*/
            hideSidebar();
            _body.removeClass('noscroll');
            _nav.prependTo('.header .container');
            _search.appendTo('.header .container');
            _menu.appendTo('.header .container');
            _search.removeClass('m_search');
            _search.show();
            search_mode = false;
            $('.language').find('ul').hide();
            // 副選單滑出
            liHasChild.on({
                mouseenter: function() {
                    $(this).children('ul').stop(true, false).fadeIn();
                },
                mouseleave: function() {
                    $(this).parent().siblings('ul').hide();
                    $(this).children('ul').stop(true, false).fadeOut();
                }
            });
            liHasChild.off('click');
            // 如果點在外面
            $(document).on('touchend click', function(e) {
                var target = e.target;
                if (!$(target).is('.menu li a')) {
                    $('.menu').find('li ul').hide();
                }
            });
        }
    }
    //設定resize 計時器
    var resizeTimer;
    _window.bind("load resize", function(event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            search_mode = true;
            mobileMenu();
        }, 50);
    });
    mobileMenu();
    // 行動版查詢
    var _searchCtrl = $('.searchCtrl');
    $('.m_search').hide();
    _searchCtrl.off().on('click', function(e) {
        if (!search_mode) {
            $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
            _window.off('resize');
            // $('.m_search').find('input[type="text"]').focus();
            search_mode = true;
        } else {
            $('.m_search').hide();
            search_mode = false;
        }
    });
    // 如果點在外面
    $('.main').off().on('click touchend', function(e) {
        $('.m_search').hide();
        search_mode = false;
    });
    // 固定版頭
    hh = Math.floor($('.header').outerHeight(true));
    if ($('header').has('menu')) {
        var stickyMenuTop = Math.floor($('.header .menu').offset().top);
        // console.log(stickyMenuTop);
        hh = Math.floor($('.header').outerHeight(true));
        menuH = Math.floor(_menu.outerHeight(true));
        $(window).bind("load scroll resize", function(e) {
            ww = _window.outerWidth();
            if (ww >= wwSmall && $(this).scrollTop() > stickyMenuTop) {
                $('.header').addClass('fixed');
                $('.header').css('margin-top', menuH - hh);
                $('.main').css('margin-top', hh);
            } else {
                $('.header').removeClass('fixed');
                $('.header').css('margin-top', 0);
                $('.main').css('margin-top', 0);
            }
        });
    }
    /*-----------------------------------*/
    //////////// notice訊息區塊 ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
        e.preventDefault();
    });
    /*-----------------------------------*/
    //////////// Accordion設定 ////////////
    /*-----------------------------------*/
    $('.accordion').each(function() {
        $(this).find('.accordion-content').hide();
        var _accordionItem = $(this).children('ul').children('li').children('a');
        _accordionItem.each(function() {
            function accordion(e) {
                $(this).parent('li').siblings().children('a').removeClass('active');
                $(this).toggleClass('active');
                $(this).parent('li').siblings().children('.accordion-content').slideUp();
                $(this).next('.accordion-content').slideToggle();
                e.preventDefault();
            }
            $(this).click(accordion);
            $(this).keyup(accordion);
        });
    });
    /*-----------------------------------*/
    /////////////fatfooter開關/////////////
    /*-----------------------------------*/
    $('.btn-fatfooter').click(function(e) {
        $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
            if ($(this).is(':visible')) {
                $('.btn-fatfooter').html("收合/CLOSE");
                $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
            } else {
                $('.btn-fatfooter').html("展開/OPEN");
                $('.btn-fatfooter').attr('name', '展開選單/OPEN');
            }
        });
        $(this).stop(true, true).toggleClass('close');
    });
    /*-----------------------------------*/
    //////////////相簿燈箱//////////////
    /*-----------------------------------*/
    //相簿JQ設定
    if ($('.has_lightbox').length > 0) {
        var lightbox_Status = false;
        $('.album').append('<div class="lightbox"><a href="#" class="light_close">關閉</a><a href="#" class="light_prev">上一張</a><a href="#" class="light_next">下一張</a><img src="" alt=""><div class="galler_overlay"></div></div>')
        $('.album .lightbox').hide(); // lightbox先隱藏
        $('.light_close').click(function(event) {
            $('.album .lightbox').hide(); // 如果點到close，lightbox隱藏
            $('body').removeClass('noscroll');
            $('.album .lightbox .caption').html('');
            lightbox_Status = false;
        });
        $('.album .lightbox .galler_overlay').click(function(event) {
            $('.album .lightbox').hide(); // 如果點到overlay，lightbox隱藏
            $('body').removeClass('noscroll');
            $('.album .lightbox .caption').html('');
            lightbox_Status = false;
        });
        var PIC_SRC = $('.album .lightbox img').attr('src');
        // var THUMB_PIC = $(this).attr('src');
        var PIC_INDEX = 0;
        $('.album a').click(function(e) {
            e.preventDefault();
            lightbox_Status = true;
        });
        $('.album .thumbnail a').each(function(index) {
            $(this).click(function(e) {
                var THUMB_H3 = $(this).find('.img-container img').attr('alt');
                $('body').addClass('noscroll');
                $('.album .lightbox').append('<div class="caption">' + THUMB_H3 + '<div>');
                THUMB_PIC = $(this).find('.img-container img').attr('data-src');
                $('.album .lightbox img').attr('src', THUMB_PIC);
                $('.album .lightbox').fadeIn();
                $('.album .lightbox .galler_overlay').fadeIn();
                PIC_INDEX = index;
                e.preventDefault();
            });
        });
        //計算當頁縮圖數量
        var PIC_NUM = $('.album .thumbnail').length;
        // 下一張 function
        function NEXT_MOV() {
            //pic_index+1 如果小於 圖片數量
            if ((PIC_INDEX + 1) < PIC_NUM) {
                //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
                PIC_INDEX++; //pic_index ++
                //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
            } else {
                PIC_INDEX = 0 //如果等於或大於圖片數量 pic_index =0 ，跳到第一張
            }
            THUMB_PIC = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container picture source:first').attr('data-srcset');
            // 沒寫picture
            // THUMB_PIC = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container img').attr('src');
            THUMB_H3 = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container img').attr('alt');
            $('.album .lightbox .caption').html(THUMB_H3);
            $('.album .lightbox img').hide();
            $('.album .lightbox img').fadeIn();
            $('.album .lightbox img').attr('src', THUMB_PIC);
            //放入燈箱 img src
        }
        $('.album .light_next').click(function(e) {
            NEXT_MOV();
            e.preventDefault();
        });
        // 上一張 function
        function PREV_MOV() {
            if ((PIC_INDEX + 1) > 1) { //pic_index+1  如果大於 1
                //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
                PIC_INDEX--; //pic_index --
                //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
            } else {
                PIC_INDEX = PIC_NUM - 1; //如果等於或小於圖片數量 pic_index =圖片數量-1 ，跳到最後一張
            }
            //取縮圖 img src
            THUMB_PIC = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container picture source:first').attr('data-srcset');
            // 沒寫picture
            // THUMB_PIC = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container img').attr('src');  
            THUMB_H3 = $('.album .thumbnail').eq(PIC_INDEX).find('.img-container img').attr('alt');
            $('.album .lightbox .caption').html(THUMB_H3);
            $('.album .lightbox img').hide();
            $('.album .lightbox img').fadeIn();
            $('.album .lightbox img').attr('src', THUMB_PIC);
            //放入燈箱 img src
        }
        $('.album .light_prev').click(function(e) {
            PREV_MOV();
            e.preventDefault();
        });
        //左右按鍵移動
        if (lightbox_Status = true) {
            $('body').keydown(function(e) {
                if (e.keyCode == 37) {
                    PREV_MOV();
                } else if (e.keyCode == 39) {
                    NEXT_MOV();
                } else if (e.keyCode == 27) {
                    $('.album .lightbox').hide();
                    $('body').removeClass('noscroll');
                }
            });
        }
    }
    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    var resizeTimer1;
    _window.resize(function() {
        clearTimeout(resizeTimer1);
        resizeTimer1 = setTimeout(function() {
            ww = _window.outerWidth();
            tabSet();
        }, 50);
    });

    function tabSet() {
        $('.tabs').each(function() {
            var _tab = $(this),
                _tabItem = _tab.find('.tabItem'),
                _tabItemA = _tabItem.children('a'),
                _tabContent = _tab.find('.tabContent'),
                tabwidth = _tab.width(),
                tabItemHeight = _tabItem.outerHeight(),
                tabContentHeight = _tab.find('.active').next().innerHeight(),
                tiGap = 0,
                tabItemLength = _tabItem.length,
                tabItemWidth;
            _tab.find('.active').next('.tabContent').show();
            if (ww >= wwSmall) {
                _tabContent.css('top', tabItemHeight);
                _tab.height(tabContentHeight + tabItemHeight);
                tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
                _tabItem.width(tabItemWidth).css('margin-left', tiGap);
                _tabItem.first().css('margin-left', 0);
                _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth);
            } else {
                _tab.css('height', 'auto');
                _tabItem.width(tabwidth);
                _tabItem.css('margin-left', 0).last().css('position', 'relative');
            }
            _tabItemA.focus(tabs);
            _tabItemA.click(tabs);

            function tabs(e) {
                var _tabItemNow = $(this).parent(),
                    tvp = _tab.offset().top,
                    tabIndex = _tabItemNow.index() / 2,
                    scollDistance = tvp + tabItemHeight * tabIndex - hh;
                _tabItem.removeClass('active');
                _tabItemNow.addClass('active');
                if (ww <= wwSmall) {
                    _tabItem.not('.active').next().slideUp();
                    _tabItemNow.next().slideDown();
                    $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
                } else {
                    _tabItem.not('.active').next().hide();
                    _tabItemNow.next().show();
                    tabContentHeight = _tabItemNow.next().innerHeight();
                    _tab.height(tabContentHeight + tabItemHeight);
                }
                e.preventDefault();
            }
        });
    }
    $('.tabs>.tabItem:first-child>a').trigger('click');
    tabSet();
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop').click(function(e) {
        $('html, body').animate({ scrollTop: 0 }, 400, 'easeOutExpo');
        e.preventDefault();
    });
    $('.scrollToTop').keydown(function(e) {
        _body.find('a:first').focus();
        e.preventDefault();
    });
    /*--------------------------------------------------------*/
    /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
    /*--------------------------------------------------------*/
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".img-container").each(function() {
            var imgUrl = $(this).find('img').attr('data-src');
            var $container = $(this);
            $container.has('.none').addClass('ie-object-none');
            $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.cover').addClass('ie-object-cover');
            $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.fill').addClass('ie-object-fill');
            $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.contain').addClass('ie-object-contain');
            $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
        });
    }
    /*-----------------------------*/
    /////form表單 placeholder隱藏/////
    /*-----------------------------*/
    $('input,textarea').focus(function() {
        $(this).removeAttr('placeholder');
    });
    $('input[type="checkbox"]').off().click(function(e) {
        $(this).blur();
    });
    /*------------------------------------*/
    /////form表單 單個檔案上傳+多個檔案上傳/////
    /*------------------------------------*/
    $(document).on('change', '.check_file', function() {
        var names = [];
        var length = $(this).get(0).files.length;
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            names.push($(this).get(0).files[i].name);
        }
        // $('input[name=file]').val(names);
        if (length > 2) {
            var fileName = names.join(', ');
            $(this).closest('.upload_grp').find('.upload_file').attr("value", length + " files selected");
        } else {
            $(this).closest('.upload_grp').find('.upload_file').attr("value", names);
        }
    });
    /*------------------------------------*/
    //////////分享按鈕 share dropdwon////////
    /*------------------------------------*/
    $('.function_panel .share').children('ul').hide();
    $('.function_panel .share').prepend('<a href="#" class="shareButton">share分享按鈕</a>');
    var _shareButton = $('.shareButton');
    _shareButton.off().click(function(e) {
        $(this).siblings('ul').stop(true, true).slideToggle();
        e.preventDefault();
    });
    _shareButton.keyup(function(event) {
        $(this).siblings('ul').stop(true, true).slideDown();
    });
    $('.function_panel .share').find('li:last>a').focusout(function(event) {
        $(this).parent().parent('ul').hide();
    });
    // 點外面關閉share
    $(document).on('touchend click', function(e) {
        var container = $(".function_panel .share");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.function_panel .share ul').hide();
        }
    });
    /*------------------------------------*/
    /////////////字型大小 font-size//////////
    /*------------------------------------*/
    $('.font_size').find('.medium').addClass('active');
    $('.font_size').find('.small').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('large_size').addClass('small_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('.font_size').find('.medium').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('large_size small_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('.font_size').find('.large').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('small_size').addClass('large_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    /*-----------------------------------*/
    /////////// category active  //////////
    /*-----------------------------------*/
    $('.category').find('a').off().click(function(event) {
        $(this).parent('li').siblings().find('a').removeClass('active');
        $(this).addClass('active');
    });
    /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function(e) {
        // alt+S 查詢
        if (e.altKey && e.keyCode == 83) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('.search').find('input[type="text"]').focus();
        }
        // alt+U header
        if (e.altKey && e.keyCode == 85) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.keyCode == 67) {
            $('html, body').stop(true, true).animate({ scrollTop: $('.main').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('.main').find('.accesskey').focus();
        }
        // alt+B footer
        if (e.altKey && e.keyCode == 90) {
            $('html, body').stop(true, true).animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('footer').find('.accesskey').focus();
        }
    });
    //無障礙切換slick箭頭語系
    if ($('html')[0].hasAttribute("labg")) {
        var weblang = $('html').attr('lang');
        if (weblang.substring(0, 2) == 'zh') {
            $('.slick-prev').attr('title', '上一筆');
            $('.slick-next').attr('title', '下一筆');
        } else if (weblang.substring(0, 2) !== 'zh') {
            $('.slick-prev').attr('title', 'previous');
            $('.slick-next').attr('title', 'next');
        }
    }
    // 無障礙錨點切換語系，更改accesskey的title名稱
    var weblang = $('html').attr('lang');
    if (weblang.substring(0, 2) == 'zh') {
        $('header').find('.accesskey').attr('title', '上方功能區塊');
        $('.main').find('.accesskey').attr('title', '中央內容區塊');
        $('footer').find('.accesskey').attr('title', '下方功能區塊');
        $('.search').find('.accesskey').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
    } else if (weblang.substring(0, 2) !== 'zh') {
        $('header').find('.accesskey').attr('title', 'header');
        $('.main').find('.accesskey').attr('title', 'content');
        $('footer').find('.accesskey').attr('title', 'footer');
        $('.search').find('.accesskey').attr('title', 'search');
    }
    /*------------------------------------*/
    /////gotoCenter on focus跳到 content/////
    /*------------------------------------*/
    $('a.goCenter').keydown(function(e) {
        if (e.which == 13) {
            $('#aC').focus();
            $('html, body').stop(true, true).animate({ scrollTop: $('.main').find('.accesskey').offset().top }, 800, 'easeOutExpo');
        }
    });
    /*-----------------------------------*/
    //////// 語言模組 無障礙遊走設定  ////////
    /*-----------------------------------*/
    $('.language').find('ul').hide();
    var openLang = $('.language').children('a');
    openLang.off().click(function(e) {
        $(this).next('ul').stop(true, true).slideToggle();
        e.preventDefault();
    });
    openLang.keyup(function() {
        $(this).next('ul').stop(true, true).slideDown();
    });
    $('.language').find('ul li:last>a').focusout(function() {
        $('.language').find('ul').hide();
    });
    $(document).on('touchend click', function(e) {
        var target = e.target;
        if (!$(target).is('.language a')) {
            $('.language').find('ul').hide();
        }
    });
    // /*------------------------------------*/
    // ///////table 加上響應式table wrapper/////
    // /*------------------------------------*/
    $('table').each(function(index, el) {
        //判斷沒有table_list
        if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
            $(this).scroltable();
        }
    });
    // tablearrow arrow，為了設定箭頭
    $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
    $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
    // 固定版頭
    function table_Arrow() {
        if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
            if ($('.scroltable-wrapper').length > 0) {
                var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
                    thisScroll = Math.floor($(this).scrollTop());
                if (thisScroll > stickyArrowTop - 230) {
                    $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
                    $('.scroltable-wrapper .tablearrow_left').css({ "top": thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
                    $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
                    $('.scroltable-wrapper .tablearrow_right').css({ "top": thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
                } else {
                    $('.scroltable-wrapper .tablearrow_left').css({
                        top: '10px',
                        display: 'none'
                    });
                    $('.scroltable-wrapper .tablearrow_right').css({
                        top: '10px',
                        display: 'none'
                    });
                }
            }
        }
    }
    $(window).scroll(function(event) {
        table_Arrow();
    });
    var scrollTimer;
    _window.scroll(function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            table_Arrow();
        }, 50);
    });
    // /*------------------------------------*/
    // //////////table 加上 data-title//////////
    // /*------------------------------------*/
    function rwdTable() {
        $('.table_list').find('table').each(function() {
            var $row = $(this).find('tr');
            rowCount = $row.length;
            for (var n = 1; n <= rowCount; n++) {
                $(this).find('th').each(function(index) {
                    var thText = $(this).text();
                    $row.eq(n).find('td').eq(index).attr('data-title', thText);
                });
            }
        });
    }
    rwdTable();
    /*-----------------------------------*/
    ////////////// lazy load //////////////
    /*-----------------------------------*/
    if ($('img.lazy').length > 0) {
        var lazyLoadInstance = new LazyLoad({
            elements_selector: "img.lazy",
            placeholder: '/images/basic/placeholder.gif',
            effect: "fadeIn",
            fadeTime: 200,
            threshold: 0
        });
    }
});
