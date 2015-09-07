define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var hooker = require('src/hooker');

    registerSuite({
        name: 'Hooker Unit Tests',
        setup: function () {
        },

        'Basic': function () {
            hooker.register ('hook1', function (data, prevData){
                assert.deepEqual(data, {
                    message: 'This is a message'
                },
                'Hooks should receive the correct Data');

                assert.sameDeepMembers(prevData, [{message: 'This is a message'}], 'The first hook should have a sigle entity array prevData');
            });

            hooker.trigger('hook1', {
                message: 'This is a message'
            });

        },

        'Error Checks': function () {
            var i = 1;
            i = hooker.trigger('trigger', i);
            hooker.register('trigger', function (i){
                return i + 20;
            });

            assert.notEqual(i, 21, 'A hook triggered before it is registered should have no effect.');
        },

        'Custom Class': function () {
            var MyClass = function (name) {
                this.hook = hooker;
                this.name = name;
            };


            MyClass.prototype.doSomething = function () {
                this.data = {
                    a: 1
                };

                this.data = this.hook.trigger(this.name + '/doSomething', this.data).final;
            };

            MyClass.prototype.doSomethingElse = function () {
                this.index = this.hook.trigger(this.name + '/doSomethingElseBefore', this.index).final;
                ++this.index;
                this.index = this.hook.trigger(this.name + '/doSomethingElseAfter', this.index).final;
            };

            var one = new MyClass('one');
            var two = new MyClass('two');

            one.hook.register('one/doSomething', function (data){
                data.b = 2;
                return data;
            });

            one.doSomething();
            assert.deepEqual(one.data, {
                a: 1,
                b: 2
            }, 'Hook must modify original data');

            one.hook.register('one/doSomethingElseBefore', function (index){
                index = 1;
                return index;
            });

            one.hook.register('one/doSomethingElseAfter', function (index){
                ++index;
                return index;
            });

            one.doSomethingElse();
            assert.equal(one.index, 3, 'Hook and original function must both increment index');
        },

        teardown: function () {
        }
    });
});
