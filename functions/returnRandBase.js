// Returns a random DNA base
const returnRandBase = (dnaBases = ['A', 'T', 'C', 'G']) => {
    return  dnaBases[Math.floor(Math.random() * dnaBases.length)];
};

module.exports = returnRandBase;
