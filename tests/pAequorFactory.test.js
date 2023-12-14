const createSpecimen = require('../functions/createSpecimen');


const specimens = createSpecimen(100);

describe (
    `TEST pAequorFactory.mutate()
    Specimen DNA !== Specimen mutated DNA`,
    () => {
        const originalSpecimens = JSON.parse(JSON.stringify(specimens));
        const mutatedSpecimens = specimens.slice();

        mutatedSpecimens.forEach( specimen => {
            specimen.mutate();
        });

        for (let i = 0; i < originalSpecimens.length; i++) {
            test (
                `TEST №${i + 1}
    Specimen #${i + 1} mutate DNA = ${mutatedSpecimens[i].dna} 
    Specimen #${i + 1} origin DNA = ${originalSpecimens[i].dna}`,
                () => expect(mutatedSpecimens[i].dna).not.toEqual(originalSpecimens[i].dna)
            )
        }
    }
)