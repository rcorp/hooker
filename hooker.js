(function () {
	// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
	function extend(from, to) {
		if (from == null || typeof from != "object") return from;
	    if (from.constructor != Object && from.constructor != Array) return from;
	    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
	        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
	        return new from.constructor(from);

	    to = to || new from.constructor();

	    for (var name in from) {
	        to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
	    }
	    return to;
	}
	
	//Browser and node.js compatible global variable.
	var window = this;
	window._hookers = {};
	var hooker = {};
	
	hooker.trigger = function (hook, data) {
        var prevData = [data];
        var hookData = window._hookers[hook]
        for (var i = 0; i < hookData.length; i++){
            prevData[i] = extend(data, {});
            data = hookData[i].callback.apply(hookData[i]._this, [data, extend(prevData, [])]);
        }
	}

	hooker.register = function (hook, callback, _this) {	
		window._hookers[hook] = window._hookers[hook] || [];		
		window._hookers[hook].push({
			callback: callback,
			_this: _this
		}) 
	}

	//Export for Node.js, Browser and AMD
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	    module.exports = hooker;
	}
	else {
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return hooker;
			});
		}
		else {
			window.hooker = hooker;
		}
	}
})()
