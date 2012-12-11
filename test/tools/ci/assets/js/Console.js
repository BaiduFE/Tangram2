define(function(require, exports) {
    var Tools = require('Tools');
    var Mustache = require('mustache');

    var consoleOpened = false;
    var filter = 'All';
    var ingroup = false;
    var logTpl = '<p class="console-item {{level}}" {{{style}}}><span class="level">[{{level}}]</span><span class="time">{{time}}</span><span class="desc">{{desc}}</span><span class="api">{{api}}</span></p>';

    /**
     * 初始化控制台
     */
    var init = function(){
        var timer;

        $('#J_consoleBar').click(function(event){
            if(consoleOpened){
                $('#J_consoleWrap').removeClass('console-open').addClass('console-close');
                consoleOpened = false;
            }else{
                $('#J_consoleWrap').removeClass('console-close').addClass('console-open');
                consoleOpened = true;
            }
        });

        $('#J_clearConsole').click(function(){
            clear();
        });

        $('.console-filter').click(function(){
            filter = $(this).attr('filter');

            $('.console-item').hide();
            switch(filter){
                case 'All':
                    $('.console-item').show();
                    break;
                case 'Pass':
                    $('.console .pass').show();
                    break;
                case 'Error':
                    $('.console .error').show();
                    break;
                case 'Warning':
                    $('.console .warning').show();
                    break;
                default:
                    break;
            }
            
            $('.console-filterWrap .focus').removeClass('focus');
            $(this).addClass('focus');
        }).mouseover(function(){
            $(this).addClass('hover');
        }).mouseout(function(){
            $(this).removeClass('hover');
        });

        $('#J_consoleWrap').css('top', $(window).scrollTop() + $(window).height() - 300);
        if($.browser.msie && /6/.test($.browser.version)){
            $(window).scroll(function(){
                // baidu.dom.setStyle("sidebar-wrap", "display", "none");
                timer && window.clearTimeout(timer);
                timer = window.setTimeout(function(){
                    $('#J_consoleWrap').css('top', $(window).scrollTop() + $(window).height() - 300);
                    // baidu.dom.setStyle("sidebar-wrap", "display", "block");
                }, 30);
            });
        }

    };

    /**
     * 显示控制台
     */
    var show = function(){
        
    };

    /**
     * 隐藏控制台
     */
    var hide = function(){
        
    };

    /**
     * 清除控制台
     */
    var clear = function() {
        $('#J_console').html('');
    };

    /**
     * 显示Log
     */
    var log = function(data) {
        data.time = Tools.dformat(new Date());

        // 不是当前过滤器对应的错误级别，隐藏
        if(filter.toLowerCase() != data.level && filter != 'All'){
            data.style = ' style="display: none;"';
        }
        var _html = Mustache.render(logTpl, data);

        if(ingroup){
            var groups = $('.log-group');
            $($('.log-group')[groups.length - 1]).append(_html);
        }else{
            $('#J_console').append(_html);
        }
        
    };

    /**
     * 进入logGroup
     */
    var group = function(name) {
        ingroup = true;
        $('#J_console').append('<div class="log-group"><h6>' + name + '</h6></div>');
    };

    /**
     * 退出logGroup
     */
    var groupEnd = function(){
        ingroup = false;
    };

    exports = {
        'init': init,
        'clear': clear,
        'show': show,
        'hide': hide,
        'log': log,
        'group': group,
        'groupEnd': groupEnd
    };

    return exports;

});