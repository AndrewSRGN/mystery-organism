const createSpecimen = require('./functions/createSpecimen');
const pAequorFactory = require('./functions/pAequorFactory');

const specimens = createSpecimen(200);


specimens.forEach( specimen =>{
    console.log(`Specimen #${specimen.specimenNum} DNA = ${specimen.dna}`);
})


const mostRelatedSpecimen = (specimens) => {
    let specimenTarget = {};
    let specimenSource = {};

    let similarity = 0;
    let isComplement = false;

    for (let i = 0; i < specimens.length - 1; i++) {
        for (let j = i + 1; j < specimens.length; j++) {
            const complementDNA = specimens[i].complementStrand();

            let complementSpecimen = {};
            complementSpecimen = Object.assign(complementSpecimen, specimens[i]);
            complementSpecimen.dna = complementDNA;

            if (specimens[i].compareDNA(specimens[j]) > similarity ||
                complementSpecimen.compareDNA(specimens[j]) > similarity) {
                isComplement = complementSpecimen.compareDNA(specimens[j]) > similarity;
                similarity = complementSpecimen.compareDNA(specimens[j]);
                specimenTarget = specimens[i];
                specimenSource = specimens[j];
            }
        }
    }

    return {
        target: specimenTarget,
        source: specimenSource,
        similarity: similarity,
        isComplement: isComplement
    };
}

const mostRelatedSpecimenAll = (specimens) => {
    const similarity = mostRelatedSpecimen(specimens).similarity;
    const mostRelatedSpecimens = [];

    for (let i = 0; i < specimens.length - 1; i++) {
        for (let j = i + 1; j < specimens.length; j++) {
            const complementDNA = specimens[i].complementStrand();

            let complementSpecimen = {};
            complementSpecimen = Object.assign(complementSpecimen, specimens[i]);
            complementSpecimen.dna = complementDNA;

            if (specimens[i].compareDNA(specimens[j]) === similarity ||
                complementSpecimen.compareDNA(specimens[j]) === similarity) {
                const isComplement = complementSpecimen.compareDNA(specimens[j]) === similarity;
                const relatedSpecimens = {
                    target: specimens[i],
                    source: specimens[j],
                    similarity: similarity,
                    isComplement: isComplement
                }

                mostRelatedSpecimens.push(relatedSpecimens);
            }
        }
    }

    return mostRelatedSpecimens;
}

const results = mostRelatedSpecimenAll(specimens);
console.log(`The most similar pairs of specimens is:`)
for (let result of results) {
    console.log(`Specimen #${result.target.specimenNum}${result.isComplement ? ' complement' : ''} and specimen #${result.source.specimenNum} which have ${Math.round(result.similarity * 100 * 100) / 100}% DNA in common.
Specimen #${result.target.specimenNum} DNA = ${result.target.dna} 
Specimen #${result.source.specimenNum} DNA = ${result.source.dna}
`);
}