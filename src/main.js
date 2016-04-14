var add = require('./add');
var jquery = require('jquery');

jquery(function() {
    $(document.body).append('2+2=' + add(2, 2));
});
