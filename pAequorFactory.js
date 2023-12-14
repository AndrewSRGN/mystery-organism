const returnRandBase = require('./returnRandBase');

const pAequorFactory = (specimenNum, dna) => {
    return {
        _specimenNum: specimenNum,
        _dna: dna,

        get specimenNum () {
            return this._specimenNum;
        },
        get dna () {
            return this._dna;
        },

        mutate () {
            const randDnaIndex = Math.floor(Math.random() * this._dna.length);

            let dnaBases = ['A', 'T', 'C', 'G'];
            dnaBases.splice(dnaBases.indexOf(this._dna[randDnaIndex]), 1);

            this._dna[randDnaIndex] = returnRandBase(dnaBases);
        },

        compareDNA (pAequor) {
            const targetDna = pAequor.dna;
            const sourceDna = this.dna;
            let compareBases = 0;

            for (let i = 0; i < targetDna.length; i++) {
                if (targetDna[i] === sourceDna[i]) {
                    compareBases++;
                }
            }

            console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${compareBases/targetDna.length * 100}% DNA in common.`);

            return compareBases/targetDna.length;
        }
    }
}

module.exports = pAequorFactory;