module('baidu.string.stripTags');

//新接口

test('stripTags', function(){
  equals(baidu.string('abc').stripTags(),'abc');
  equals(baidu.string('abc<ab>').stripTags(), 'abc');
  equals(baidu.string('<ab/>abc<ab>').stripTags(), 'abc');
  equals(baidu.string('<ab/>abc<ab><ab><ab><ab>').stripTags(), 'abc');
  equals(baidu.string('<AB/>abc<ab><AB><ab><AB>').stripTags(), 'abc');
  equals(baidu.string('<AB/>abc<><AB>123<ab><AB>').stripTags(), 'abc<>123');
  equals(baidu.string('<ab/>abc<ab/>').stripTags(), 'abc');
  equals(baidu.string('<ab/><ab/>').stripTags(), '');
  equals(baidu.string('<!-- test -->').stripTags(), '');
//  equals(baidu.string.stripTags('<script>tst</srcipt>'), '');
  equals(baidu.string('<script type="text/javascript"><!--document.write("!"); //--></script>').stripTags(),'');//style相同
  equals(baidu.string('<!DOCTYPE html>').stripTags(),'');
  equals(!baidu.string('   ').stripTags(),'');
});

//老接口
test('老接口：stripTags', function(){
  equals(baidu.string.stripTags('abc'),'abc');
  equals(baidu.string.stripTags('abc<ab>'), 'abc');
  equals(baidu.string.stripTags('<ab/>abc<ab>'), 'abc');
  equals(baidu.string.stripTags('<ab/>abc<ab><ab><ab><ab>'), 'abc');
  equals(baidu.string.stripTags('<AB/>abc<ab><AB><ab><AB>'), 'abc');
  equals(baidu.string.stripTags('<AB/>abc<><AB>123<ab><AB>'), 'abc<>123');
  equals(baidu.string.stripTags('<ab/>abc<ab/>'), 'abc');
  equals(baidu.string.stripTags('<ab/><ab/>'), '');
  equals(baidu.string.stripTags('<!-- test -->'), '');
//  equals(baidu.string.stripTags('<script>tst</srcipt>'), '');
  equals(baidu.string.stripTags('<script type="text/javascript"><!--document.write("!"); //--></script>'),'');//style相同
  equals(baidu.string.stripTags('<!DOCTYPE html>'),'');
  equals(!baidu.string.stripTags('   '),'');
});





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
