module('baidu.fn.abstractMethod');

test("老接口：call abstractMethod", function(){
  expect(1);

  function MyClass() {}

  MyClass.prototype.method1 = baidu.fn.abstractMethod;

  var ins = new MyClass();
  try {
    ins.method1();
  } catch(e) {
    ok(true);
  }
});
test("老接口：call method override",function() {
	expect(1);
	function ClassA(){};
	ClassA.prototype.abs = T.fn.abstractMethod;
	var ins = new ClassA();
	ins.abs = function() {
		ok(true);
	};
	try{
		ins.abs();
	} catch(e) {
		ok(false);
	}
});
test("老接口：call method chain",function() {
//	expect(1);
	function ClassA(){};
	ClassA.prototype.abs = T.fn.abstractMethod;
	ClassA.prototype.method = function () {
		equal(this.abs(), "abs call success");
	};
	var ins = new ClassA();
	ins.abs = function() {
		return "abs call success";
	};
	try{
		ins.method();
	} catch(e) {
		ok(false,'catch exception');
	}
});

test("老接口：call method chain",function() {
//	expect(1);
	function ClassA(){};
	ClassA.prototype.abs = T.fn.abstractMethod;
	var ins = new ClassA();
	ins.abs = function() {
		return "abs call success";
	};
	ins.method = function () {
		equal(ins.abs(), "abs call success");
	};
	try{
		ins.method();
	} catch(e) {
		ok(false,'catch exception');
	}
});
