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