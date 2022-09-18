const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
} = require('../lib/zookeepers.js');
const {zookeepers } = require('../data/zookeepers');

jest.mock('fs'); 
