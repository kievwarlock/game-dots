export const generateGameFieldsArray = (countFields: number, defaultState: {}) => {
    return Array.apply(null, {length: countFields}).map(() => Object.assign({}, defaultState));
};

export const generateShuffleArray = (length: number): number[] => (
    [...Array(length).keys()].sort(() => Math.random() - 0.5)
);