function main(){

    let user = [];
    let computer = [];
    
    // make the form disappear after clicking the play button
    const playButton = document.querySelector('.playBtn');
    playButton.addEventListener('click', formDisappear);
    function formDisappear(evt){
        const form = document.querySelector('.start');
        form.classList.add('disappear');
        evt.preventDefault();
    }

    // get the input, initialize 2 cards for each
    const input = document.querySelector('#startValues').value.split(',');
    const shuffled = generateCards(input);
    computer.push(shuffled[0]);
    user.push(shuffled[1]);
    computer.push(shuffled[2]);
    user.push(shuffled[3]);


}

function generateCards(input){
    let cards = [];
    let shuffled = [];
    if(input.length !== 0){
        for(let i = 0; i < input.length; i++){
            shuffled.push({face: input[i], suit: 'clubs'});
        }
    }
    const allFaces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const allSuits = ['clubs', 'diamonds', 'hearts', 'spades'];
    for(let i = 0; i < allFaces.length; i++){
        for(let j = 0; j < allSuits.length; j++){
            if(allSuits[j] !== 'clubs' || input.indexOf(allFaces[i]) === -1){
                cards.push({face: allFaces[i], suit: allSuits[j]});
            }
        }
    }
    while(cards.length > 0){
        const idx = Math.floor(Math.random() * cards.length);
        shuffled.push(cards[idx]);
        cards.splice(idx, 1);
    }
    return shuffled;
}

document.addEventListener('DOMContentLoaded', main);