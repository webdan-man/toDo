module.exports = () => {
    const data = {
        cards: []
    };
    data.cards = new Array(10).fill(1).map((item, index) => ({
        id: index,
        name: `Title-${index}`,
        toDos: new Array(index + 1).fill(1).map((e, i) => ({
            id: Number(`${index}` + i),
            title: `do-${i}`,
            done: 0
        }))
    }));
    return data
};