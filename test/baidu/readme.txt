
新增测试接口【equalAll】

equalAll(baidu.xxx.xxx, {
	"TestA": valueis(m, [a], [a, b], [a, b, c]),
	"TestB": valueis(n, [x], [x, y], [x, y, z])
});

相当于：

equal(baidu.xxx.xxx(a), m, "TestA");
equal(baidu.xxx.xxx(a, b), m, "TestA");
equal(baidu.xxx.xxx(a, b, c), m, "TestA");
equal(baidu.xxx.xxx(x), n, "TestB");
equal(baidu.xxx.xxx(x, y), n, "TestB");
equal(baidu.xxx.xxx(x, y, z), n, "TestB");

演示：见 baidu.type


新增测试接口【waiting】

waiting(fn1, fn2); // 监视 fn1（频繁调用），直到 fn1 返回值不为 undefined 为止，然后执行 fn2

演示：见 baidu.dom.append