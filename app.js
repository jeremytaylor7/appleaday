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
    ]
}

//state functions

function getFoodData(srch, callback, id) {
    console.log('hello world');
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

//render

function renderFoodData(data) {

    console.log(data);

}


//callbacks
