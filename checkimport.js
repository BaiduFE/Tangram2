/**
 * Tangram 1.x分离程序
 *
 *@author bility
 *@date 2013-03-01
 */

var fs = require('fs');

(function(){
    var
        
        rootPath    = 'src/baidu'
      , packagepath = 'package/baidu'
      , oldFolder   = '.'
      , distFolder1  = '../dist1'
      , distFolder2  = '../dist2'
      
      , notFound = []
      
    ;
    
    
    //fs.mkdirSync(distFolder1);
    //fs.mkdirSync(distFolder2);
    
    //separate 1.x to distFolder
    (function(path){
        var callee = arguments.callee;
        fs.readdirSync(path).forEach(function(item){
            var _path = path + '/' + item;
            if(fs.statSync(path + '/' + item).isDirectory()){
                //fs.mkdirSync(distFolder1 + '/' + _path);
                callee(_path);
            }else{
                
                var _content = fs.readFileSync(_path, '');
                //检查下import的文件是否存在
                if((_path.indexOf('./src/baidu') == 0) && (_path.substring(_path.length - 2,_path.length) == 'js')){
                    
                    var _g = _content.toString().match(/\/\/\/import\s+(.*?)\;/g);
                    if(_g){
                        var waitCheck = [];
                        waitCheck = _g.join('').replace(/\/\/\/import\s+/g,'').replace(/\s+/g,'').replace(/\;$/g,'').split(/\;/g);
                        
                        waitCheck.forEach(function(v,k){
                            var url = 'src/' + v.replace(/\./g,'/')+'.js';
                            if(!fs.existsSync(url)){
                                notFound.push(url + ' in file ' + _path + ';');
                            }
                            
                        });
                    }
                }
                
                //fs.writeFileSync(distFolder1 + '/' + _path,_content,'');
                //console.log(_path);
            }
        });
    })(oldFolder);
    
    fs.writeFileSync('notfound.txt',notFound.join("\n"),'');
    
    //separate 2.0 to distFolder
    

    
    
})();