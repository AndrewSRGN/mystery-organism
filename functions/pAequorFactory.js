const returnRandBase = require('./returnRandBase');

const pAequorFactory = (specimenNum, dna) => {
    return {
        _specimenNum: specimenNum,
        _dna: dna,

        mutate () {
            const randDnaIndex = Math.floor(Math.random() * this._dna.length);

            let dnaBases = ['A', 'T', 'C', 'G'];
            dnaBases.splice(dnaBases.indexOf(this._dna[randDnaIndex]), 1);

            this._dna[randDnaIndex] = returnRandBase(dnaBases);
        },
    }
}

module.exports = pAequorFactory;