//api key: IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j

var baseURL = 'https://api.nal.usda.gov/ndb/nutrients/?'
var api = 'IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j'
//state
/* food id's
Vitamin C: 401

*/


var state = {
    symptoms: [
        { type: 'allergies', remedies: '401' },
        { type: 'bad eyesight', remedies: '401' },
        { type: 'headache', remedies: '401' },
        { type: 'brain fog', remedies: '401' },
        { type: 'sore throat', remedies: '401' },
        { type: 'asthma', remedies: '401' },
        { type: 'anxiety', remedies: '401' },
        { type: 'stomach ache', remedies: '401' },
        { type: 'depression', remedies: '401' },
        { type: 'insomnia', remedies: '401' },
    ],

    foodSearch: { name: [], ntrValue: [] },
}

globalVitamins = [];

//state functions

function getFoodData(srch, callback, id) {
    var params = {
        format: 'JSON',
        api_key: api,
        nutrients: srch,
        sort: 'c',
        subset: '1',
        measureby: 'g',
        max: 100,

    }
    $.getJSON(baseURL, params, callback);
}

function getTopTen(n) {

    var theFoodArray = n.report.foods;

    var foodList = state.foodSearch.name;
    var ntrList = state.foodSearch.ntrValue;
    theFoodArray.map(function (item) {
        var ntr = item.nutrients[0].gm;
        var foodName = item.name;
        if (item.nutrients[0].gm > 20) {
            foodList.push(foodName);
            ntrList.push(ntr);
            ntrList.sort(function (a, b) {
                return b - a;
            })
        }

    })
    console.log('hello');
    var slice1 = foodList.slice(0, 10);
    var slice2 = ntrList.slice(0, 10);
    state.foodSearch.name = slice1;
    state.foodSearch.ntrValue = slice2;
}

function sortNutrients() {

}
function symptomSearch(data, symptom) {

    var topTenFoods = [];
    for (var i = 0; i <= 10; i++) {
        topTenFoods.push(data.report.foods[i].name);
    }
    console.log(topTenFoods);
}



//render

function renderFoodData(data) {

    console.log(data);

}
function renderNutrients(n) {

}

//callbacks
