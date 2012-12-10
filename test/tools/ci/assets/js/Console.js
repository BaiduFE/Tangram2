define(function(require, exports) {

    var consoleOpened = false;
    var filter = 'All';
    var logTpl = '<p class="console-item {{log.level}}"><span class="level">[{{log.level}}]</span><span class="time">{{log.time}}</span><span class="desc">{{log.desc}}</span><span class="api">{{log.api}}</span></p>';

    /**
     * 初始化控制台
     */
    var init = function(){
        
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
        var _html = Mustache.render(logTpl, data);

        $('#J_console').append(_html);
    };

    /**
     * 显示一组log
     */
    var group = function(name, logs) {
        var html = '',
            count = 0,
            _list = {};

        $(failureList).each(function(index, item){
            var api = item.data.dir.replace('../../../src/', '');
            if(_list[api]){return;};
            _list[api] = true;
            count++;
            html += '<li>' + api + '</li>';
        });
        html += '</ul>';

        html = '<p>共有' + count + '个接口检查不通过：<p><ul>' + html;
        
        $('#J_' + currentCheckMode).html(html);
    };

    exports = {
        'init': init,
        'clear': clear,
        'show': show,
        'hide': hide,
        'log': log,
        'group': group
    };

    return exports;

});