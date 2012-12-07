<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <?php
            if(preg_match('/magic/i', $_SERVER["REQUEST_URI"])){
                $project = 'Magic';
                echo '<title>Magic集成测试工具</title>';
            }else{
                $project = 'Tangram';
                echo '<title>Tangram集成测试工具</title>';
            }
        ?>
        <link rel="stylesheet" type="text/css" href="./assets/css/app.css" />
        <link type="text/css" rel="stylesheet" href="./assets/css/shCoreDefault.css"/>
        <script type="text/javascript" src="./assets/js/jQuery-1.8.2.js"></script>
        <script type="text/javascript" src="./assets/js/mustache.js"></script>
        <script type="text/javascript" src="./assets/js/tree.js"></script>
        <script type="text/javascript" src="./assets/js/app.js"></script>
        <script type="text/javascript" src="./assets/js/shCore.js"></script>
        <script type="text/javascript" src="./assets/js/shBrushJScript.js"></script>
        <script type="text/javascript" src="./assets/js/jshint.js"></script>
    </head>
    <body>
        <div class="hd">
            <?php
                if(preg_match('/magic/i', $_SERVER["REQUEST_URI"])){
                    echo '<div class="magic_logo"></div>';
                }else{
                    echo '<div class="tangram_logo"></div>';
                }
            ?>
            <div class="toolbar">
                <div class="options">
                    <input type="checkbox" id="J_hideOnPass" /><label for="J_hideOnPass">隐藏测试通过的文件</label>
                </div>
                <div class="actions">
                    <button id="J_autoRunUnitTest">批量单元测试</button>
                    <button id="J_autoRunStaticCheck">批量静态检查</button>
                    <button id="J_autoRunSyntaxCheck">批量语法检查</button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="col-sub">
                <div id="J_tree" class="tree" onselectstart="return false;"></div>
            </div>
            <div class="col-main">
                <div class="main-wrap">
                    <div id="J_appDesc" class="app-desc">
                        <h2>欢迎使用 <?php echo $project;?> 集成测试工具</h2>
                        <h3>单元测试</h3>
                        <p>针对 <?php echo $project;?> 接口的单元测试。</p>
                        <h3>静态检查</h3>
                        <p>静态检查主要对文件编码、Bomb 头、缩进符进行检查。</p>
                        <h3>语法检查</h3>
                        <p>语法检查主要对 js 的语法进行检查，包括意外暴露的全局变量、额外的逗号、debugger等。</p>
                        <h3>文档预览</h3>
                        <p>文档预览用于在本地查看代码注释的正确性。</p>
                    </div>
                    <!-- tab: 静态检查、语法检查、文档预览 -->
                    <br />
                    <div class="tabs">
                        <ul>
                            <li id="J_unitTestTab" class="current">单元测试</li>
                            <li id="J_staticCheckTab">静态检查</li>
                            <li id="J_syntaxCheckTab">语法检查</li>
                            <li id="J_docPreviewTab">文档预览</li>
                            <li id="J_showSrcTab">查看源码</li>
                            <li id="J_showUnitTab">查看用例</li>
                        </ul>
                    </div>
                    <div id="J_unitTest" class="tab-item current"><iframe id="J_unitTestFrame" src="" frameborder="no" scrolling="auto" ></iframe></div>
                    <div id="J_staticCheck" class="testcase-wrap tab-item"></div>
                    <div id="J_syntaxCheck" class="syntax-wrap tab-item"></div>
                    <div id="J_docPreview" class="doc-wrap tab-item"></div>
                    <div id="J_showSrc" class="src-wrap tab-item"></div>
                    <div id="J_showUnit" class="unit-wrap tab-item"></div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            (function(){
                App.run();
            })();
        </script>
    </body>
</html>