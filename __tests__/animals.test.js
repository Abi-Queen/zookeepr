const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

test("create an animal object"), () => {
    const animal = createNewAnimal(
        { name: "Darlene", id: "jhgdja3ng2" },
        animals
    )
}