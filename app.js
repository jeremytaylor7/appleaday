//api key: fbd5f1e074982e68932f563706a9ae47
//app key: e5de02a2

var baseURL = 'https://api.nutritionix.com/v1_1/search/'
var api = 'fbd5f1e074982e68932f563706a9ae47'
var theAppId = 'e5de02a2'
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
        query: srch,
        appKey: api,
        appId: theAppId,
    }
    $.getJSON(baseURL, params, callback);
}

//render

function renderFoodData(data) {

    console.log(data.hits);

}


//callbacks
