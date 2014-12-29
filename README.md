#hooker

*Despite what the name suggests! This is a legitimate package for*

##Hook Oriented Programming in JavaScript. Node.JS and the Browser

Hook based programming is very common. From web frameworks like [WordPress](http://codex.wordpress.org/Plugin_API#Hooks.2C_Actions_and_Filters) & [Drupal](https://www.drupal.org/node/292) to Operating Systems like Windows! You can read more about it [here](http://en.wikipedia.org/wiki/Hooking) and [here](http://stackoverflow.com/questions/467557/what-is-meant-by-the-term-hook-in-programming). Hooks can be implemented under the [Publish Subcribe Architecture](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) or more generally under [Event Driven Architecture](http://en.wikipedia.org/wiki/Event-driven_architecture). Hooks allow for loosely coupled code and ***eXtreme*** productivity and highly parallel teams.

This module brings hooks to the world of Client Side & Server Side JavaScript.

##Installation

###Node.js
`npm install hooker`

###Browser
`<script src = "hooker.min.js"> </script>`

##Usage

###Basic Usage

Use **hooker.register** like subscribe, sub, on, etc.  
Use **hooker.trigger** like publish, pub, emit, etc.

    hooker.register('hooked', function (data) {
      console.log ('I am hooked to hooker', data);
    });
    
    hooker.register('hooked', function (data) {
      console.log ('I am also hooked to hooker', data);
    });

    hooker.trigger('hooked', {
      message: 'hooking up!'
    });

###Data Passing
Each hook has some data passed to it. It can change this data for the next hook. All hooks have access to all the original data. Eg:

    hooker.register('hooker', function (data, previousData){
    	console.log ('hooker1', data)
        console.log ('prevData', previousData);
        data.message = 'First!';
        return data;
    })
    //Outputs
    //'hooker1' {message: 'value'}
    //'prevData' [{message: 'value'}]
    
    hooker.register('hooker', function (data, previousData){
    	console.log ('hooker2', data);
        console.log ('prevData', previousData);
        data.message = 'Second!';
        return data;
    })
    //Outputs
    //'hooker2' {message: 'First!'}
    //'prevData' [{message: 'value'}, {message: 'First!'}]

    
    hooker.register('hooker', function (data, previousData){
    	console.log ('hooker3', data)
        console.log ('prevData', previousData);
    })
    //Outputs
    //'hooker3' {message: 'Second!'}
    //'prevData' [{message: 'value'}, {message: 'First!'}, {message: 'Second!'}]

    
    hooker.trigger('hooker',{
    	'message': 'value'
    })

##API
Coming Soon

##Technical details

###How is this different than events?
In a traditional Pub Sub system, when an Event fires, all its listeners are fired simultaneously. Hooks are different because they are ordered. In the default configuration, hooks will be called one after another unless they are asynchronous.

### Sequencing of Hooks
There will be an API later on for complete control over sequencing of when each listener will fire. 

###Performance
We hope to include a compiler which will inline most of the static hooking calls for much greater performance. Dynamic Hooks are a much more complex problem to solve and will be tackled in the issues.

##Tests
We will include more tests using The Intern testing framework. For nwo you can just use `test.js` 
 
##Contributing
Coming Soon. Till then, why don't you join the discussion?

##Authors
[Gaurav Ramanan](https://github.com/gaurav21r) 

##Copyright & License
(c) 2014 [RCorp](http://www.rcorp.co.in). Code released under the [Apache License](https://github.com/rcorp/hooker/blob/master/LICENSE).