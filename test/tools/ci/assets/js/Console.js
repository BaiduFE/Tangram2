define(function(require, exports) {

    var consoleOpened = false;

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
    var log = function() {

    };

    /**
     * 显示一组log
     */
    var group = function(name, logs) {
        var html = '',
            count = 0,
            _list = {};

        if(failureList.length){
            $(failureList).each(function(index, item){
                var api = item.data.dir.replace('../../../src/', '');
                if(_list[api]){return;};
                _list[api] = true;
                count++;
                html += '<li>' + api + '</li>';
            });
            html += '</ul>';

            html = '<p>共有' + count + '个接口检查不通过：<p><ul>' + html;
        }else{
            html = '<p>所有文件全部检查通过。</p>';
        }
        
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