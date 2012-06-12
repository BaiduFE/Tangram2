var tree = function(window, undefined){

	var toolID = "simpleTreeTool";
	var tool = window[toolID] = {
		isIe: /msie/i.test(navigator.userAgent),
		addEvent: function(target, name, fn){ var call = function(){ fn.apply(target, arguments); }; if(target.dom){ target = target.dom; } if(window.attachEvent){ target.attachEvent("on" + name, call); }else if(window.addEventListener){ target.addEventListener(name, call, false); }else{ target["on" + name] = call; } return call; },
		Class: function(initialize, methods, befores, afters){ var fn, prototype, blank; initialize = initialize || function(){}; methods = methods || {}; blank = {}; fn = function(){ this.instanceId = tool.id(); initialize.apply(this, arguments); }; prototype = fn.prototype; tool.registerClassEvent.call(prototype); tool.each(methods, function(item, key){ prototype[key] = function(method, name){ if(typeof(method) == "function"){ return function(){ var args, rtn; args = Array.prototype.slice.call(arguments, 0); if(befores && befores.apply(this, [name].concat(args)) === false){ return ; } this.fireEvent("before" + name, args); rtn = method.apply(this, args); if(afters) afters.apply(this, [name].concat(args)); this.fireEvent(name, args); return rtn; }; }else{ return method; } }(item, key); }); prototype.getOriginMethod = function(name){ return methods[name]; }; return fn; },
		registerClassEvent: function(){ this.on = function(name, fn){ var instanceId = this.instanceId; tool.dispatch(instanceId + name, fn.bind(this)); }; this.onbefore = function(name, fn){ var instanceId = this.instanceId; tool.dispatch(instanceId + "before" + name, fn.bind(this)); }; this.un = function(name, fn){ }; this.fireEvent = function(name, args){ var instanceId = this.instanceId; tool.dispatch(instanceId + name, args); }; },
		dispatch: function(arg1, arg2, arg3){ var fn, send, incept; if(typeof(arg2) == "undefined"){ arg2 = []; } fn = arguments.callee; if(!fn.map){ fn.map = {}; } send = function(processId, args, scope){ var map, processItems; map = fn.map; if(processItems = map[processId]){ tool.each(processItems, function(item){ item.apply(scope, args); }); } }; incept = function(processId, fun){ var map; map = fn.map; if(!map[processId]){ map[processId] = []; } map[processId].push(fun); }; if(typeof(arg2) == "function"){ incept.apply(this, arguments); }else if(arg2 instanceof Array){ send.apply(this, arguments); } },
		each: function(unknown, fn){ if(unknown instanceof Array || (typeof unknown == "object" && typeof unknown[0] != "undefined" && unknown.length)){ if(typeof unknown == "object" && tool.isSafari) unknown = Array.prototype.slice.call(unknown); unknown.forEach(fn); }else if(typeof(unknown) == "object"){ var blank = {}; for(var i in unknown){ if(blank[i]){ continue; } if(fn(unknown[i], i) === false){ break; } } }else if(typeof(unknown) == "number"){ for(var i = 0; i < unknown; i ++){ if(fn(i, i) === false){ break; } } }else if(typeof(unknown) == "string"){ for(var i = 0, l = unknown.length; i < l; i ++){ if(fn(unknown.charAt(i), i) === false){ break; } } } },
		Element: function(el, returnDom){ var rtn, handleId; if(el && el.isTElement){ return returnDom ? el.dom : el; } el = typeof(el) == "string" ? document.getElementById(el) : el;  if(!el) return null;  if(returnDom) return el;  handleId = el.getAttribute("handleId"); if(typeof handleId == "string"){ return tool.handle(handleId - 0); }else{ rtn = new tool.BasicElement(el); handleId = tool.handle(rtn); el.setAttribute("handleId", handleId + ""); return rtn;  } },
		Event: function(e){ e = e || window.event;  if(!e){ var c = arguments.callee.caller; while(c){ e = c.arguments[0]; if(e && typeof(e.altKey) == "boolean"){ break; } c = c.caller; e = null; } }  return e; },
		handle: function(unknown){ var fn, type, number; fn = arguments.callee; if(!fn.cache){ fn.cache = {}; } if(typeof(fn.number) == "undefined"){ fn.number = 0; } type = typeof(unknown); if(type == "number"){ return fn.cache[unknown.toString()]; }else if(type == "object" || type == "function"){ number = fn.number ++; fn.cache[number.toString()] = unknown; return number; } },
		id: function(){ var id = arguments.callee; id.number = ++ id.number || 0; return "_" + id.number; },
		makeElement: function(tagName, attributes){ var el = document.createElement(tagName); var setStyle = function(unknown){ if(typeof unknown == "string") el.style.cssText = unknown; else Ucren.apply(unknown, el.style); };  for (var prop in attributes) { if (prop === "class") el.className = attributes[prop]; else if (prop === "for") el.htmlFor = attributes[prop]; else if(prop === "style") setStyle(attributes[prop]); else el.setAttribute(prop, attributes[prop]); }  return el; }
	};
	tool.Template = tool.Class( /* constructor */ function(){ this.string = Array.prototype.join.call(arguments, ""); }, /* methods */ { apply: function(conf){ return this.string.format(conf); } } );
	tool.BasicElement = tool.Class(
		function(el){ this.dom = el; this.countMapping = {}; }, {
			isTElement: true,
			style: function(/* unknown1, unknown2 */){ var getStyle = tool.isIe ? function(name){ return this.dom.currentStyle[name]; } : function(name){ var style; style = document.defaultView.getComputedStyle(this.dom, null); return style.getPropertyValue(name); }; return function(unknown1, unknown2){ if(typeof unknown1 == "object"){ tool.each(unknown1, function(value, key){ this[key] = value; }.bind(this.dom.style)); }else if(typeof unknown1 == "string" && typeof unknown2 == "undefined"){ return getStyle.call(this, unknown1); }else if(typeof unknown1 == "string" && typeof unknown2 != "undefined"){ this.dom.style[unknown1] = unknown2; } return this; }; }(),
			addClass: function(name){ var el, className; el = this.dom; className = " " + el.className + " "; if(className.indexOf(" " + name + " ") == -1){ className += name; className = className.trim(); className = className.replace(/ +/g, " "); el.className = className; } return this; },
			delClass: function(name){ var el, className; el = this.dom; className = " " + el.className + " "; if(className.indexOf(" " + name + " ") > -1){ className = className.replace(" " + name + " ", " "); className = className.trim(); className = className.replace(/ +/g, " "); el.className = className; } return this; },
			html: function(html){ var el = this.dom;  if(typeof html == "string"){ el.innerHTML = html; }else if(html instanceof Array){ el.innerHTML = html.join(""); }else{ return el.innerHTML; } return this; },
			display: function(bool){ var dom = this.dom; if(typeof(bool) == "boolean"){ dom.style.display = bool ? "block" : "none"; this.fireEvent("infect", [{ display: bool }]); }else{ return this.style("display") != "none"; } return this; },
			add: function(dom){ var el; el = tool.Element(dom); this.dom.appendChild(el.dom); return this; },
			addEvents: function(conf){ var blank, el, rtn; blank = {}; rtn = {}; el = this.dom; tool.each(conf, function(item, key){ rtn[key] = tool.addEvent(el, key, item); }); return rtn; }
		}
	);

	var E = tool.Element;
	String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/, ""); };
	String.prototype.format = function(conf){ var rtn = this, blank = {}; tool.each(conf, function(item, key){ item = item.toString().replace(/\$/g, "$$$$"); rtn = rtn.replace(RegExp("@{" + key + "}", "g"), item); }); return rtn.toString(); };
	Function.prototype.defer = function(scope, timeout){ var me = this; var fn = function(){ me.apply(scope, arguments); }; return setTimeout(fn, timeout); };
	Function.prototype.bind = function(scope){ var me = this; return function(){ return me.apply(scope, arguments); } };
	Array.prototype.forEach = function(fn, context) { for (var i = 0, len = this.length >>> 0; i < len; i++) { if (i in this) { fn.call(context, this[i], i, this); } } };
	Array.prototype.reduce = function(fn /*, initial*/) { var len = this.length >>> 0, i = 0, rv;  if (arguments.length > 1) { rv = arguments[1]; } else { do { if (i in this) { rv = this[i++]; break; } if (++i >= len) { throw new TypeError(); } } while (true); }  for (; i < len; i++) { if (i in this) { rv = fn.call(null, rv, this[i], i, this); } }  return rv; };

	// 格式化数据，输入扁平数据，产生树状数据和 dataMapping
	var formatData = function(data){
		var formatedData = [],
			dataItemStates = {};

		data.forEach(function(item){
			dataItemStates[item.id] = item;
			item.nodeType = "normal";
			item.childs = [];
		});

		data.forEach(function(item){
			var p;
		    if(p = dataItemStates[item.pId]){
		    	p.nodeType = "folder";
		    	p.childs.push(item);
		    }else{
		    	formatedData.push(item);
		    }
		});

		return [formatedData, dataItemStates];
	};

	// 根据数据节点的状态，关联更新其它数据节点（与界面无关）
	var updateCheckStates = function(dataMapping, dataItem, value, _dire){ // _dire: 1 向外 0 向里
		if(!dataItem)return ;

		dataItem.checked = value;

		// 向里
		var inwards = function(){
			if(value == .5)return ;
			dataItem.childs.forEach(function(dataItem){
				updateCheckStates(dataMapping, dataItem, value, 0);
			});
		};

		// 向外
		var forth = function(){
			var p, c, sum;
			if(p = dataItem.pId){
				p = dataMapping[dataItem.pId];
				c = p.childs;
				sum = c.reduce(function(sum, dataItem){
					return sum + dataItem.checked;
				}, 0);
				if(sum === 0){
					p.checked = 0;
				}else if(sum === c.length){
					p.checked = 1;
				}else{
					p.checked = .5;
				}
				updateCheckStates(dataMapping, p, p.checked, 1);
			}
		};

		if(_dire === 0){
			inwards();
		}else if(_dire === 1){
			forth();
		}else{
			inwards();
			forth();
		}
	};

	var nodeTemplate = new tool.Template(
		"<div class='relation' id='@{relationId}'>",
			"<div class='expanded-viewer' id='@{expandedViewerId}'></div>",
		"</div>",
		"<div class='selection'>",
			"<div class='selection-inputer'>",
				"<input type='checkbox' id='@{checkinputId}' onfocus='this.blur()' onmousedown='return false' onclick='return false;' />",
			"</div>",
			"<div class='selection-clicker' id='@{checkClickerId}'></div>",
		"</div>",
		"<div class='icon' id='@{iconId}'></div>",
		"<div class='name'><a id='@{namelinkId}' href='' title='@{name}' onclick='return false;'>@{name} </a></div>");

	var nodeTemplate2 = new tool.Template(
		"<div class='relation' id='@{relationId}'>",
			"<div class='expanded-viewer' id='@{expandedViewerId}'></div>",
		"</div>",
		"<div class='icon' id='@{iconId}'></div>",
		"<div class='name'><a id='@{namelinkId}' href='' onclick='return false;' onkeydown='@{tool}.handle(@{handleId}).onkeydown(event); return false;'>@{name} </a></div>");

	// class node
	var node = new tool.Class(
		/* constructor */ function(conf){
			this.id = conf.id;
			this.container = E(conf.container);
			this.name = conf.name || "";
			this.childsData = conf.childsData;
			this.tree = conf.tree;
			this.expanded = !! conf.expanded;
			this.checked = 0;
			this.tree.nodes.push(this);
			this.tree.nodeMapping[this.id] = this;
			this.clickHandler = conf.clickHandler || function(){};
			this.nameRenderer = conf.nameRenderer || function(text){ return text; };
			this.data = conf.data;
			this.handleId = tool.handle(this);

			if(conf.icon){
				this.icon = conf.icon;
			}else if(this.childsData.length){
				this.icon = "images/tree/etfolder.gif";
			}else{
				this.icon = "images/tree/etfile.gif";
			}
		},

		/* methods */ {
			render: function(){
				var enableCheckBox = this.tree.enableCheckBox;
				var template = enableCheckBox ? nodeTemplate : nodeTemplate2;

				this.container.html(template.apply({
					tool: toolID,
					handleId: this.handleId,
					name: this.nameRenderer(this.name, this.data),
					iconId: this.iconId = tool.id(),
					namelinkId: this.namelinkId = tool.id(),
					expandedViewerId: this.expandedViewerId = tool.id(),
					relationId: this.relationId = tool.id(),
					checkinputId: this.checkinputId = tool.id(),
					checkClickerId: this.checkClickerId = tool.id()
				}));

				E(this.iconId).style("backgroundImage", "url(" + this.icon + ")");
				this.disposeEvent();

				if(this.childsData.length){
					E(this.expandedViewerId).display(true);
					var dropDownLayer = tool.makeElement("div", { "class": "dropdownlayer" });
					E(this.container).add(dropDownLayer);
					dropDownLayer = this.dropDownLayer = E(dropDownLayer);
				}

				if(this.dropDownLayer && !this.expanded)
					this.collapse();
				else
					this.expand();
			},

			expand: function(_callback){
				if(!this.hasExpanded && this.childsData.length){
					this.hasExpanded = true;
					this.renderChilds(this.childsData, function(){
						this.tree.updateListLastNodes();
						this.tree.updateNodeCheckStates(this);
						this.expand(_callback);
					}.bind(this));
					return ;
				}

				if(!this.dropDownLayer)return ;
				this.dropDownLayer.display(true);
				E(this.expandedViewerId).style("backgroundPosition", "0 -20px");
				E(this.iconId).style("backgroundPosition", "0 -20px");
				this.expanded = true;
				this.tree.fixRelativeEls();
				_callback && _callback();
			},

			collapse: function(){
				if(!this.dropDownLayer)return ;
				this.dropDownLayer.display(false);
				E(this.expandedViewerId).style("backgroundPosition", "0 0");
				E(this.iconId).style("backgroundPosition", "0 0");
				this.expanded = false;
				this.tree.fixRelativeEls();
			},

			setCheck: function(value){
				updateCheckStates(this.tree.dataMapping, this.tree.dataMapping[this.id], value);
				this.tree.updateNodeCheckStates(this);
				this.tree.fireEvent("nodeCheck", [this.id, value]);
			},

			setHidden: function(bool){
				this.isHidden = bool;
				this.container.display(bool);
				if(this.dropDownLayer)
					this.dropDownLayer.display(bool);
			},

			select: function(){
				var nameEl = E(this.namelinkId);
				if(this.tree.selectionNode){
					var lastNameEl = E(this.tree.selectionNode.namelinkId);
					lastNameEl.delClass("selected");
				}

				this.tree.selectionNode = this;
				nameEl.addClass("selected");
				
				setTimeout(function(){
				    nameEl.dom.focus();
				}, 100);

				return true;
			},

			focus: function(){
				var nameEl = E(this.namelinkId);
				if(this.tree.selectionNode){
					var lastNameEl = E(this.tree.selectionNode.namelinkId);
					lastNameEl.delClass("selected");
				}
				this.tree.selectionNode = this;
				nameEl.addClass("selected");
				this.clickHandler(this.data);

				var parent = this;
				while(parent = parent.parent)
					parent.expand && parent.expand();
			},

			setItsLast: function(bool){
				var relation = E(this.relationId);
				if(bool){
					this.dropDownLayer && this.dropDownLayer.addClass("dropdownlayer-last");
					relation.addClass("relation-last");
				}else{
					this.dropDownLayer && this.dropDownLayer.delClass("dropdownlayer-last");
					relation.delClass("relation-last");
				}
			},

			setIcon: function(image){
			    E(this.iconId).style("backgroundImage", "url(" + (this.icon = image) + ")");
			},

			// privates
			renderChilds: function(childsData, callback){
				var dropDownLayer = this.dropDownLayer;
				dropDownLayer.html("loading..");
				dropDownLayer.display(true);
				void function(){
					dropDownLayer.html("");
					dropDownLayer.display(false);
					var subContainerIds = [];
					var subContainers = [];
					childsData.forEach(function(item, index){
						subContainerIds[index] = tool.id();
						subContainers[index] = "<div id='" + subContainerIds[index] + "' class='node clearfix'></div>";
					});
					dropDownLayer.html(subContainers.join(""));
					var list = [];
					childsData.forEach(function(item, index, array){
						var nodeItem = new node({
							id: item.id,
							data: item,
							container: subContainerIds[index],
							name: item.name,
							childsData: item.childs,
							tree: this.tree,
							expanded: item.expanded,
							clickHandler: this.clickHandler,
							nameRenderer: this.nameRenderer
						});
						nodeItem.parent = this;
						nodeItem.index = index;
						nodeItem.render();
						list.push(nodeItem);
						if(index == 0){
						    nodeItem.isFirst = true;
						}else if(index == array.length - 1){
							nodeItem.isLast = true;
						}
					}.bind(this));
					this.tree.lists.push(list);
					this.childs = list;
					callback && callback();
				}.defer(this, 0);
			},

			setViewChecked: function(){
				clearTimeout(this.setViewCheckedTimer);
				this.setViewCheckedTimer = setTimeout(function(){
					var checkinput = E(this.checkinputId, true);
					var checkedValue = this.tree.dataMapping[this.id].checked;
					if(checkedValue == this.checked)
						return ;
					this.checked = checkedValue;
					switch(checkedValue){
						case 0:
							checkinput.disabled = false;
							checkinput.checked = false;
							break;
						case .5:
							checkinput.disabled = true;
							checkinput.checked = true;
							break;
						case 1:
							checkinput.checked = true;
							checkinput.disabled = false;
							break;
					}
				}.bind(this), 10);
			},

			disposeEvent: function(){
				var nameEl = E(this.namelinkId);
				var expandedViewer = E(this.expandedViewerId);
				var checkinput = E(this.checkinputId);
				var checkClicker = E(this.checkClickerId);

				nameEl.addEvents({
					focus: function(){
						nameEl.addClass("focus");
						return true;
					}.bind(this),

					blur: function(){
						nameEl.delClass("focus");
						return true;
					}.bind(this),

					mousedown: this.select.bind(this),

					click: function(){
						if(!this.expanded)
							this.expand();
						this.clickHandler(this.data);
						return true;
					}.bind(this)
				});

				expandedViewer.addEvents({
					click: function(){
						if(this.expanded){
							this.collapse();
						}else{
							this.expand();
						}
					}.bind(this)
				});

				if(this.tree.enableCheckBox){
					checkClicker.addEvents({
						click: function(){
							var checkValue = this.tree.dataMapping[this.id].checked;
							switch(checkValue){
								case undefined:
								case 0:
								case .5:
									this.setCheck(1);
									this.tree.fireEvent("beforeCheckBoxClick", [this, 1]);
									break;
								case 1:
									this.setCheck(0);
									this.tree.fireEvent("beforeCheckBoxClick", [this, 0]);
									break;
							}
						}.bind(this)
					});
				}
			},

			// 修正 checkClicker 位置偏差问题
			fixRelativeEls: function(step){
				if(!this.tree.enableCheckBox)return ;
				if(step == 1){
					E(this.checkClickerId).style("top", "0");
				}else if(step == 2){
					E(this.checkClickerId).style("top", "-20px");
				}
			},

			// 热键
			onkeydown: function(e){
			    e = tool.Event(e);
			    var node, newNode, parent;
			    switch(e.keyCode){
			        case 37: // left
			            if(this.expanded){
			            	this.collapse();
			            }else if(parent = this.parent){
			            	 parent.select && parent.select();
			            }
			        	break;
			        case 38: // top
			        	parent = this.parent;
			            if(this.isFirst){
			                parent.select && parent.select();
			            }else if(parent.childs && (newNode = parent.childs[this.index - 1])){
			            	newNode.select();
			            }
			            break;
			        case 39: // right
			            if(this.dropDownLayer && !this.expanded){
			                this.expand();
			            }else if(this.dropDownLayer && (node = this.childs[0])){
			            	node.select();
			            }
			            break;
			        case 40: // bottom
			        	if(this.dropDownLayer && this.expanded){
			        	    if(node = this.childs[0]){
			        	        node.select();
			        	    }
			        	}else{
			        	    node = this;
			        	    parent = node.parent;
			        	    while(parent){
			        	    	if(parent.childs && (newNode = parent.childs[node.index + 1])){
			        	    		newNode.select();
			        	    		break;
			        	    	}
			        	    	node = parent;
			        	    	parent = node.parent;
			        	    }
			        	}
			            break;
			    }
			}			
		}
	);

	// class tree
	var tree = new tool.Class(
		/* constructor */ function(conf){
			this.container = E(conf.container);
			this.data = conf.data;
			this.enableCheckBox = typeof conf.enableCheckBox == "boolean" ?
				conf.enableCheckBox : true;
			this.clickHandler = conf.clickHandler;
			this.nameRenderer = conf.nameRenderer;
			this.nodes = [];
			this.nodeMapping = {};
			this.lists = [];

			var formatedData = formatData(conf.data);
			this.formatedData = formatedData[0];
			this.dataMapping = formatedData[1];

			this.setNodeCheckWithoutUpdateTimers = {};
			this.handleId = tool.handle(this);
		},

		/* methods */ {
			render: function(){
				var innerContainer = tool.makeElement("div", { "class": "simpletree" });
				this.container.add(innerContainer = E(innerContainer));

				var subContainerIds = [];
				var subContainers = [];
				this.formatedData.forEach(function(item, index){
					subContainerIds[index] = tool.id();
					subContainers[index] = "<div id='" + subContainerIds[index] + "' class='node clearfix'></div>";
				});
				innerContainer.html(subContainers.join(""));

				var list = [];
				this.formatedData.forEach(function(item, index, array){
					var nodeItem = new node({
						id: item.id,
						data: item,
						container: subContainerIds[index],
						name: item.name,
						childsData: item.childs,
						tree: this,
						expanded: item.expanded,
						clickHandler: this.clickHandler,
						nameRenderer: this.nameRenderer
					});
					nodeItem.parent = this;
					nodeItem.index = index;
					nodeItem.render();
					list.push(nodeItem);
					if(index == 0){
					    nodeItem.isFirst = true;
					}else if(index == array.length - 1){
						nodeItem.isLast = true;
					}
				}.bind(this));
				this.lists.push(list);
				this.childs = list;
				this.updateListLastNodes();
			},

			getCheckedData: function(){
				// TODO:
			},

			getRoot: function(){
				return this.nodes[0];
			},

			focusToKey: function(id){
				var dataMapping = this.dataMapping;
				var data = dataMapping[id];
				var nodeMapping = this.nodeMapping;
				var arr = [], pn;

				var tp = data;
				while(tp = dataMapping[tp.pId])
					arr.unshift(tp.id);

				var expand = function(){
					var d, n;
					if(d = arr.shift()){
						n = nodeMapping[d];
						n.expand(expand);
					}else if(d = nodeMapping[id]){
						d.focus();
					}
				};

				expand();
			},

			setNodeIcon: function(id, image){
			    this.nodeMapping[id].setIcon(image);
			},

			// // 只更新 dataMapping 中某个节点的选中状态（会自动关联更新其它节点的更新状态），但界面上不作更新
			// setNodeCheckWithoutUpdate: function(id, value){
			// 	clearTimeout(this.setNodeCheckWithoutUpdateTimers[id]);
			// 	this.setNodeCheckWithoutUpdateTimers[id] = setTimeout(function(){
			// 		var dataMapping = this.dataMapping;
			// 		var dataItem = dataMapping[id];
			// 		updateCheckStates(dataMapping, dataItem, value);
			// 	}.bind(this), 10);
			// },

			// 根据 dataMapping 中记录的选中状态，更新界面，obj 为参考的节点实例，会根据 obj 来自动找出需要更新的节点的界面
			// 如果没有 obj 参数，则更新所有已渲染的节点
			updateNodeCheckStates: function(obj){
				clearTimeout(this.updateNodeCheckStatesTimer);
				this.updateNodeCheckStatesTimer = setTimeout(function(){
					if(obj){
						var nodes = [obj], p = obj;
						var inwards = function(node){
							if(node.childs){
								nodes.push.apply(nodes, node.childs);
								node.childs.forEach(function(node){
									if(node.expanded)
										inwards(node);
								});
							}
						};
						inwards(p);
						while(p = p.parent)
							nodes.push(p);
					}else{
						nodes = this.nodes;
					}

					nodes.forEach(function(node, index){
						node.setViewChecked && node.setViewChecked();
					});
				}.bind(this), 10);
			},

			// privates
			updateListLastNodes: function(){
				var lists = this.lists;
				lists.forEach(function(list, index){
					var length = list.length;
					var found = false;
					for(var i = length - 1; i >= 0; i --){
						var node = list[i];
						if(!node.isHidden){
							if(found){
								node.setItsLast(false);
							}else{
								found = true;
								node.setItsLast(true);
							}
						}
					}
				});
			},

			// 修正 checkClicker 位置偏差问题
			fixRelativeEls: function(){
				var nodes = this.nodes;
				nodes.forEach(function(node){
					node.fixRelativeEls(1);
				});
				setTimeout(function(){
					nodes.forEach(function(node){
						node.fixRelativeEls(2);
					});
				}, 0);
			}
		}
	);

	tree.updateCheckStates = updateCheckStates;

	return tree;
}(window);