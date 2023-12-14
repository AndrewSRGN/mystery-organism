const createSpecimen = require('./functions/createSpecimen');

const specimens = createSpecimen(30);

const mostRelatedSpecimen = (specimens) => {
    let specimenTarget = {};
    let specimenSource = {};

    let similarity = 0;

    for (let i = 0; i < specimens.length - 1; i++) {
        for (let j = i + 1; j < specimens.length - 1; j++) {
            if (specimens[i].compareDNA(specimens[j]) > similarity) {
                similarity = specimens[i].compareDNA(specimens[j]);
                specimenTarget = specimens[i];
                specimenSource = specimens[j];
            }
        }
    }

    return {
        target: specimenTarget,
        source: specimenSource,
        similarity: similarity
    };
}

const mostRelatedSpecimenAll = (specimens) => {
    const similarity = mostRelatedSpecimen(specimens).similarity;
    const mostRelatedSpecimens = [];

    for (let i = 0; i < specimens.length - 1; i++) {
        for (let j = i + 1; j < specimens.length - 1; j++) {
            if (specimens[i].compareDNA(specimens[j]) === similarity) {
                const relatedSpecimens = {
                    target: specimens[i],
                    source: specimens[j],
                    similarity: similarity
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
    console.log(`Specimen #${result.target.specimenNum} and specimen #${result.source.specimenNum} which have ${Math.round(result.similarity * 100 * 100) / 100}% DNA in common.`);
}