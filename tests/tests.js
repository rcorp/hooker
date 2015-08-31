var hooker = require('../src/hooker.js');

hooker.register('hooker', function (data, previousData) {
    console.log ('hooker1', data)
    console.log ('prevData', previousData);
    data.message = 'First!';
    return data;
})

//Outputs
// 'hooker1' {message: 'value'}
// 'prevData' [{message: 'value'}]



hooker.register('hooker', function (data, previousData) {
    console.log ('hooker2', data);
    console.log ('prevData', previousData);
    data.message = 'Second!';
    return data;
})

//Outputs
// 'hooker2' {message: 'First!'}
// 'prevData' [{message: 'value'}, {message: 'First!'}]



hooker.register('hooker', function (data, previousData) {
    console.log ('hooker3', data)
    console.log ('prevData', previousData);
    var myData = { message: 'Third!'}
    return myData;
})

//Outputs
// 'hooker3' {message: 'Second!'}
// 'prevData' [{message: 'value'}, {message: 'First!'}, {message: 'Second!'}]



var data = hooker.trigger('hooker', {
  'message': 'value'
});
console.log ('data', data);

//Outputs
// 'data' {
//     final: {message: 'Third!'},
//     previousData: [{message: 'value'}, {message: 'First!'}, {message: 'Second!'}]
// }
