// dependencies
const fs = require("fs");
const path = require("path");

//export functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //animalsArray saved as filteredResults
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      //save personalityTraits as a dedicated array
      //if personalityTraits is a string, place it inot a new array and save
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
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

  //accept POST route's req.body value
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  };
  
//write user input to file (instead of just creating a copy)
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
      path.join(__dirname, '../data/animals.json'),
      JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
  };

  

//validate user input when adding animal
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }
  