const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
} = require('../lib/zookeepers.js');
const {zookeepers } = require('../data/zookeepers');
const { hasUncaughtExceptionCaptureCallback } = require('process');

jest.mock('fs'); 
test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        { 
            id: "2",
            name: "Bobo",
            age: 17,
            favoriteAnimal: "lizard",
        },
        {
            id: "3",
            name: "Frank",
            age: 71,
            favoriteAnimal: "hawk",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 17 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2", 
            name: "Bobo", 
            age: 17, 
            favoriteAnimal: "lizard",
        },
        {
            id: "3",
            name: "Frank",
            age: 71,
            favoriteAnimal: "hawk",
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Frank");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Bobo",
        age: 17,
        favoriteAnimal: "lizard",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Frank",
        age: "20",
        favoriteAnimal: "hawk",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
