//api key: IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j

var baseURL = 'https://api.nal.usda.gov/ndb/nutrients/?'
var api = 'IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j'
//state
/* food id's
Vitamin C: 401
Vitamin A: 320
Magnesium: 304

*/


var state = {
    symptoms: [
        {
            type: 'Allergies', remedies: '401',
            vitamin: 'The recommended nutrient for Allergies is: Vitamin C',
            description: 'Allergies are the result of histamine, a substance released when foreign particles' +
            ' invade the body and cause an immune response such as hives, sneezing and watery eyes.Vitamin C, a water- soluble' +
            ' vitamin your body excretes through the urine, acts as an antihistamine'
        },
        {
            type: 'Bad Eyesight', remedies: '320',
            vitamin: 'the recommended nutrient for Bad Eyesight is: Vitamin A',
            description: 'Vitamin A is a great source for improving eyesight' +
            ' and so is beta carotene, although beta carotene converts to Vitamin A' +
            ' anyway.'
        },
        {
            type: 'Headache', remedies: '304',
            vitamin: 'the recommended nutrient for Headaches is: Magnesium',
            description: 'Magnesium may help to calm nerves during a migraine' +
            ' and correct any deficiencies that cause headaches, due to' +
            ' very low levels of magnesium. So say bye to that migraine!'
        },

        { type: 'brain fog', remedies: '401' },
        { type: 'sore throat', remedies: '401' },
        { type: 'asthma', remedies: '401' },
        { type: 'anxiety', remedies: '401' },
        { type: 'stomach ache', remedies: '401' },
        { type: 'depression', remedies: '401' },
        { type: 'insomnia', remedies: '401' },
    ],

    foodSearch: [],
}
var template = '<table>' +
    '<tr>' +
    '<th>Food Name</th>' +
    '<th>Nutrient Content</th>' +
    '</tr>' +
    '<tr>' +
    '<td class="food">"$food"</th>' +
    '<td class="ntr">"$ntr"gm</th>' +
    '</tr>'




//state functions

function getFoodData(srch, callback, symptom) {
    var params = {
        format: 'JSON',
        api_key: api,
        nutrients: srch,
        sort: 'c',
        subset: '1',
        measureby: 'g',
        max: 800,

    }
    $.getJSON(baseURL, params, callback);
}

/*filter 20 g min. 
  sort out highest content results
  get top ten results
*/

function filterLowNutrients(n) {
    return n.nutrients[0].gm > 20;
}

function sortHighestContent(a, b) {
    return b.nutrients[0].gm - a.nutrients[0].gm;
}



function getTopTen(n) {

    var theFoodArray = n.report.foods;

    state.foodSearch = theFoodArray
        .filter(filterLowNutrients)
        .sort(sortHighestContent)
        .slice(0, 10);
    renderFoodData();
}



//render

function renderFoodData() {
    var food = state.foodSearch;
    var listForFood = food.map(function (i) {
        return template
            .replace('$food', i.name)
            .replace('$ntr', i.nutrients[0].gm)
    })
    $('.list').html(listForFood.join(''));
    $('.ntrList').html('yoooo');

}

function renderInfo(symptom, description, nutrient) {
    $('.symptom').html(symptom);
    $('.description').html(description);
    $('.nutrient').html(nutrient);
}

//event handlers

function handleBtn() {
    $('button').click(function (e) {
        e.preventDefault();
        console.log('hello');
        var val = $(this).attr('value');
        state.symptoms.forEach(function (i) {
            if (i.type === val) {
                getFoodData(i.remedies, getTopTen);
                renderInfo(i.type, i.description, i.vitamin);
            }
        })
    })
}
//callbacks

$(function () {
    handleBtn();
});
