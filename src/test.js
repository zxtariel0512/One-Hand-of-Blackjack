function generateCards(input){
    let cards = [];
    let shuffled = [];
    if(input.length !== 0){
        for(let i = 0; i < input.length; i++){
            shuffled.push({face: input[i], suit: '♣'});
        }
    }
    const allFaces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const allSuits = ['♣', '♦', '♥', '♠'];
    for(let i = 0; i < allFaces.length; i++){
        for(let j = 0; j < allSuits.length; j++){
            if(allSuits[j] !== '♣' || input.indexOf(allFaces[i]) === -1){
                cards.push({face: allFaces[i], suit: allSuits[j]});
            }
        }
    }
    console.log(cards.length);
    while(cards.length > 0){
        const idx = Math.floor(Math.random() * cards.length);
        shuffled.push(cards[idx]);
        cards.splice(idx, 1);
    }
    console.log(shuffled.length);
    return shuffled;
}

console.log(generateCards([]));