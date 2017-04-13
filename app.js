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

    foodSearch: [],
}
var template = '<table>' +
    '<tr>' +
    '<th>Food Name</th>' +
    '<th>Nutrient Content</th>' +
    '</tr>' +
    '<tr>' +
    '<td class="food">"$food"</th>' +
    '<td class="ntr">"$ntr"</th>' +
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
        max: 100,

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




    /* var foodList = state.foodSearch.name;
     var ntrList = state.foodSearch.ntrValue;
     var savedArray = theFoodArray.(function (item) {
         var ntr = item.nutrients[0].gm;
         var foodName = item.name;
         if (item.nutrients[0].gm > 20) {
             foodList.push(foodName);
             ntrList.push(ntr);
             ntrList.sort(function (a, b) {
                 return b - a;
             })
         }
     });
     console.log(savedArray);
     var slice1 = foodList.slice(0, 10);
     var slice2 = ntrList.slice(0, 10);
     state.foodSearch.name = slice1;
     state.foodSearch.ntrValue = slice2;*/
}



//render

function renderFoodData() {

    console.log('rendering')
    var food = state.foodSearch;
    var listForFood = food.map(function (i) {
        return template
            .replace('$food', i.name)
            .replace('$ntr', i.nutrients[0].gm)
    })
    console.log(listForFood);
    $('.listFood').html(listForFood.join(''));
    $('.ntrList').html('yoooo');

}

//event handlers

function handleBtn() {
    $('button').click(function (e) {
        e.preventDefault();
        console.log('hello');
        var val = $(this).attr('value');
        state.symptoms.forEach(function (i) {
            if (i.type === val) {
                console.log('looook');
                getFoodData(i.remedies, getTopTen);
                setTimeout(renderFoodData, 5000);
            }
        })
    })

    console.log('working');
}
//callbacks

$(function () {
    handleBtn();
});
