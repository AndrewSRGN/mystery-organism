const pAequorFactory = require('./pAequorFactory.js');
const mockUpStrand = require('./mockUpStrand.js');

const createSpecimen = (quantity = 1) => {
    const specimens = [];

    for (let i = 1; i <= quantity; i++) {
        specimens.push(pAequorFactory(i, mockUpStrand()));
    }

    return specimens;
}

module.exports = createSpecimen;