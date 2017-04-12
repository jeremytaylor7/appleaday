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
        measureby: 'g'

    }
    $.getJSON(baseURL, params, callback);
}

function getTopTen(n) {

    var foodArray = n.report.foods;
    for (var i = 0; i <= foodArray.length; i++)
        if (foodArray[i].nutrients[0].gm > 20) {
            for (var i = 0; i <= 10; i++) {
                foodArray.map(function (item) {
                    state.foodSearch.name.push(item.name);
                    state.foodSearch.name.push(item.nutrients[0].gm);
                })
            }
        };
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
