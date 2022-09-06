//install express
const express = require('express');

// instantiate: make the server listen to the app
const app = express(); 
app.listen(3001, () => {
    console.log('API server now on port 3001!');
});

// create route front end can use to request data from
const { animals } = require('./data/animals');
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(animals);
});

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // animalsArray saved as filteredResults 
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //if personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = [query.personalityTraits];
        }
        //loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filteredResults array (which starts as a copy of the animalsArray) but then becomes an array matching the query
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};


