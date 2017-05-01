//api key: IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j

var baseURL = 'https://api.nal.usda.gov/ndb/nutrients/?'
var api = 'IxsqmsuTjedK9mqAwWxyW2Kn1EYBbi4uTwy4wQ7j'
//state
/* food id's
Calcium: 301
Iron: 303
Vitamin C: 401
Vitamin A: 320
Magnesium: 304
Folate: 417
B-12: 578
L-Tryptophan: 501
Niacin: 406
Tyrosine: 509

*/


var state = {
    symptoms: [
        {
            type: 'Allergies', remedies: '401',
            vitamin: 'The recommended nutrient for Allergies is: Vitamin C',
            description: 'Allergies are the result of histamine, a substance released when foreign particles' +
            ' invade the body and cause an immune response such as hives, sneezing and watery eyes. Vitamin C, a water- soluble' +
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

        {
            type: 'Brain Fog', remedies: '417', vitamin: 'The recommended nutrient for Brain Fog is: Folate',
            description: 'Folate deficiencies have been linked to confusion or memory problems' +
            ' AKA Brain Fog.'
        },
        {
            type: 'Sore Throat', remedies: '401', vitamin: 'the recommended nutrient for sore throat is: Vitamin C',
            description: 'Sore Throat is usually caused by some sort of bacterial infection affecting the tonsils' +
            ' Vitamin C helps boost the immune system to fight off this bacterial infection.'
        },
        {
            type: 'Fatigue', remedies: '578', vitamin: 'the recommended nutrient for Fatigue is: B-12',
            description: 'Vitamin B-12 is founds almost everywhere whenever a cure for fatigue is sought for..'
        },
        {
            type: 'Anxiety', remedies: '501', vitamin: 'the recommended nutrient for Anxiety is: L-Tryptophan',
            description: 'Anxiety is usually caused by a deficiency of the neurotransmitter Serotonin,' +
            'so a quick and easy remedy for this is L-Tryptophan an amino acid which is a precursor for' +
            ' the production of the happy chemical in your brain serotonin.'
        },
        {
            type: 'Stomach Ache', remedies: '406', vitamin: ' The recommended nutrient for Stomach issues is: Niacin',
            description: "B3. Also known as niacin, this vitamin is important for many digestive tract" +
            "functions, including the breakdown of carbohydrates, fats, and alcohol" +
            "A niacin deficiency can result in a disease known as pellagra, which causes severe vomiting and diarrhea."
        },
        {
            type: 'Depression', remedies: '509', vitamin: 'the recommended nutrient for Depression is: L-Tyrosine',
            description: 'Similar to amino acid L-Tryptophan, L-Tyrosine is a precursor to' +
            ' the neruotransmitter Dopamine which is also called the motivational chemical' +
            ' deficiencies in dopamine can cause low motivation and a very down mood.'
        },
        {
            type: 'Insomnia', remedies: '304', vitamin: 'the recommended nutrient for Insomnia is: Magnesium.',
            description: 'Studies have shown that deficiencies in the nutrient Magnesium can be related to' +
            ' insomia or difficult falling asleep quickly.'
        },
        {
            type: 'Weight Gain', remedies: '301', vitamin: 'the recommended nutrient for Weight Gain is: Calcium',
            description: 'Studies have shown that calcium aids in the speeding up of the' +
            ' metabolism, which is the process responsible for breaking down fat into energy. '
        },
        {
            type: 'ADHD', remedies: '303', vitamin: 'the recommended nutrient for ADHD is: Iron',
            description: 'Studies have shown that for those who experience ADHD have' +
            ' a deficiency in the mineral Iron, replenishing this deficiency can improve' +
            ' symptoms.'
        }
    ],

    symptomChoice: '',

    foodSearch: [],

    loading: false,
}
var template = '<tr>' +
    '</tr>' +
    '<tr>' +
    '<td class="food">$food</td>' +
    '<td class="ntr">$ntrmg</td>' +
    '</tr>'

var buttonTemplate = '<button value="type" class="col-3">$symptom</button>'




//state functions

function getFoodData(srch, symptom, callback) {
    var params = {
        format: 'JSON',
        api_key: api,
        nutrients: srch,
        sort: 'c',
        subset: '1',
        measureby: 'g',
        max: 800,

    }
    state.loading = true;
    $.getJSON(baseURL, params, callback);
}

/*filter 20 g min. 
  sort out highest content results
  get top ten results
*/

function filterLowNutrients(n) {
    return n.nutrients[0].gm > 1;
}

function sortHighestContent(a, b) {
    return b.nutrients[0].gm - a.nutrients[0].gm;
}



function getTopFoods(n) {

    var theFoodArray = n.report.foods;

    state.foodSearch = theFoodArray
        .filter(filterLowNutrients)
        .sort(sortHighestContent)
        .slice(0, 30);
    renderLoadingUI();
    renderFoodData();
    state.loading = false;
}



//render

function render(symptom, description, nutrient) {
    renderInfo(symptom, description, nutrient);
    renderLoadingUI();
    renderFoodData();
    $('.list').show();

};

function renderLoadingUI() {
    if (state.loading) {
        $('.loading').html('LOADING..')
    }
    else if (!state.loading) {
        $('.loading').hide();

    }
}

function renderFoodData() {
    var food = state.foodSearch;
    var listForFood = food.map(function (i) {
        return template
            .replace('$food', i.name)
            .replace('$ntr', i.nutrients[0].gm)
    })
    var foodListJoined = listForFood.join('');
    $('.list-container').html()
    $('.list').html('<table>' +
        '<tr>' +
        '<th class="th1">Food Name</th>' +
        '<th class="th2">Nutrient Content</th>' +
        '</tr>' +
        foodListJoined + '</table>');
}

function renderInfo(symptom, description, nutrient) {
    $('.symptom').html(symptom);
    $('.description').html(description);
    $('.nutrient').html(nutrient);
}

function renderButton(item, index) {
    return buttonTemplate
        .replace('type', item.type)
        .replace('$symptom', item.type);
}

function groupIntoRows(btn, index) {
    if (index === 0) {
        return "<div class='row'>" + btn;
    }
    else if (index % 4 === 0) {
        return "</div><div class='row'>" + btn;
    }
    return btn;
}

function renderButtons() {
    var symtypes = state.symptoms;
    var buttonList = symtypes
        .map(renderButton)
        .map(groupIntoRows);
    $('.btn-container').html(buttonList.join(''));

}

function hideLoading() {
    $('.loading').hide();
}

//event handlers

function handleBtn() {
    $('.btn-container > .row > button').click(function (e) {
        e.preventDefault();
        $('.about').hide();
        $('tr').hide();
        $('th').hide();
        $('.list').hide();
        $('.intro').hide();
        $('header > img').hide();
        $('.form-container').hide();
        $('.searchAgain').show();
        var val = $(this).attr('value');
        state.symptomChoice = state.symptoms.find(function (item) {
            return item.type === val;
        })
        getFoodData(state.symptomChoice.remedies, state.symptomChoice.type, getTopFoods);
        render(state.symptomChoice.type, state.symptomChoice.description, state.symptomChoice.vitamin);
        $('.info').show();
        setTimeout(hideLoading, 4000);


    })
};

//callbacks

$(function () {
    renderButtons();
    handleBtn();
});
