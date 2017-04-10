//api key: IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j

var baseURL = 'https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j'
var api = 'IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j'
//state

var state = {
    symptoms: [
        { type: 'allergies', remedies: 'vitamin C' },

    ]
}

//state functions

function getFoodData(srch, callback) {
    console.log('hello world');
    var params = {
        api_key: api,
    }
    $.getJSON(baseURL, params, callback);
}

//render

function renderFoodData(data) {

    data.list.item.map(function (i) {
        $('body').html('<p>' + i + '</p>');
    })

}


//callbacks
