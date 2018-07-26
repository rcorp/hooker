(function() {
    /**
     * extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
     * Works like Underscore.js's _.extend
     */
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

    //Browser and node.js compatible global variable, if not defined previously.
    var window = this;
    window._hookers = window._hookers || {};

    if (typeof hooker == 'undefined'){
        var hooker = {};

        /**
         * Triggers a hook. This is exactly like pub (publish)
         * or Socket.IO's emit or jQuery's Trigger.
         * All the functions registered for the hookname will be called and passed some data.
         *
         * @param hookName The name of the hook to trigger. All registered functions for this name will be called one by one.
         * @param data Optional parameter to pass any data necessary to all the functions registered for the hook. Each function can modify this data and send it to the next function.
         */
        hooker.trigger = function(hookName, data) {
            var prevData = [data];

            //An Array of functions (hookers) that have been registered for this particular hookName
            var hookers = window._hookers[hookName]

            //This is needed if there are no functions
            //registered for a hook but still it is triggered
            if (typeof hookers!=='undefined') {
                for (var i = 0; i < hookers.length; i++) {
                    prevData[i] = extend(data, {});
                    data = hookers[i].callback.apply(hookers[i]._this, [data, extend(prevData, [])]);
                }
            }
            return {
                final: data,
                previousData: prevData
            };
        };


        /**
         * Registers a function with a hookName, when the hookName is triggered, this function will be called along with the rest in serial order or order specified.
         *
         * @param callback function to be called when the hook is triggered.
         * @param _this The context (value of `this`) inside the callback.
         */
        hooker.register = function(hookName, callback, _this) {

            //Initialise the _hookers global array if its isn't already.
            window._hookers[hookName] = window._hookers[hookName] || [];

            //Push an object inside this array that contains a reference to the callback as well as the context(this) for the function.
            window._hookers[hookName].push({
                callback: callback,
                _this: _this
            })
            return hooker;
        }

        //Export for Node.js
        if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
            module.exports = hooker;
        }

        //Export for a browser environment
        else {

            //Export for AMD
            if (typeof define === 'function' && define.amd) {
                define([], function() {
                    return hooker;
                });
            }

            //Export as a global variable
            else {
                window.hooker = hooker;
            }
        }
    }
})()
