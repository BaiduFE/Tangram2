(function() {
	function mySetup() {
		if(!baidu.i18n)
			return;
		baidu.i18n.cultures = baidu.i18n.cultures || {};
		baidu.i18n.cultures['en-CA'] = {
			calendar : {
				dateFormat : 'yyyy-MM-dd',
				titleNames : '#{MM}&nbsp;#{yyyy}',
				monthNames : [ 'January', 'February', 'March', 'April', 'May',
						'June', 'July', 'August', 'September', 'October',
						'November', 'December' ],
				dayNames : {
					mon : 'Mon',
					tue : 'Tue',
					wed : 'Wed',
					thu : 'Thu',
					fri : 'Fri',
					sat : 'Sat',
					sun : 'Sun'
				}
			},

			timeZone : -4,
			whitespace : new RegExp(
					"(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),

			number : {
				group : ",",
				groupLength : 3,
				decimal : ".",
				positive : "",
				negative : "-",

				_format : function(number, isNegative) {
					return baidu.i18n.number._format(number, {
						group : this.group,
						groupLength : this.groupLength,
						decimal : this.decimal,
						symbol : isNegative ? this.negative : this.positive
					});
				}
			},

			currency : {
				symbol : 'CAD$'
			},

			language : {
				ok : 'ok',
				cancel : 'cancel',
				signin : 'signin',
				signup : 'signup'
			}
		};
	}

	var s = QUnit.moduleStart;
	QUnit.moduleStart = function() {
		var args = arguments, self = this;
//		stop();
//		ua.importsrc('baidu.i18n.cultures', function() {
			mySetup();
//			start();
			s.apply(self, args);
//		});
	};
})();