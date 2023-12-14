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

        compareDNA (pAequor, isLog = false) {
            const targetDna = pAequor.dna;
            const sourceDna = this.dna;
            let compareBases = 0;

            for (let i = 0; i < targetDna.length; i++) {
                if (targetDna[i] === sourceDna[i]) {
                    compareBases++;
                }
            }

            if (isLog) {
                console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(compareBases/targetDna.length * 100 * 100) / 100 }% DNA in common.`);
            }

            return compareBases/targetDna.length;
        },

        willLikelySurvive () {
            let countBasesC = 0;
            let countBasesG = 0;
            const dnaLength = this._dna.length;

            this._dna.forEach( base => {
                switch (base) {
                    case 'C':
                        countBasesC++;
                        break;
                    case 'G':
                        countBasesG++;
                        break;
                    default:
                        break;
                }
            });

            return (countBasesC / dnaLength >= 0.6 || countBasesG / dnaLength >= 0.6)
        },

        complementStrand () {
            return this._dna.map( base => {
                switch (base) {
                    case 'A':
                        return 'T';
                    case 'T':
                        return 'A';
                    case 'C':
                        return 'G';
                    case 'G':
                        return 'C';
                }
            });
        }
    }
}

module.exports = pAequorFactory;