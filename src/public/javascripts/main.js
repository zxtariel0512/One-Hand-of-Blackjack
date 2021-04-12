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

        // get the input, initialize 2 cards for each
        const input = document.querySelector('#startValues').value.split(',');
        const shuffled = generateCards(input);
        computer.push(shuffled[0]);
        user.push(shuffled[1]);
        computer.push(shuffled[2]);
        user.push(shuffled[3]);

        const game = document.querySelector('.game');
        const computerDiv = document.createElement('div');
        computerDiv.classList.add('computer');
        game.appendChild(computerDiv);
        computerDiv.appendChild(createCard(computer[0].face, computer[0].suit));
        computerDiv.appendChild(createCard(computer[1].face, computer[1].suit));
        const userDiv = document.createElement('div');
        game.appendChild(userDiv);
        userDiv.classList.add('user');
        userDiv.appendChild(createCard(user[0].face, user[0].suit));
        userDiv.appendChild(createCard(user[1].face, user[1].suit));

    }




}

function createCard(face, suit){
    const div = document.createElement('div');
    div.classList.add('card');
    const p1 = document.createElement('p');
    p1.classList.add('topLeftFace');
    p1.appendChild(document.createTextNode(face));
    const p2 = document.createElement('p');
    p2.classList.add('topLeftSuit');
    p2.appendChild(document.createTextNode(suit));
    const p3 = document.createElement('p');
    p3.classList.add('bottomRightSuit');
    p3.appendChild(document.createTextNode(suit));
    const p4 = document.createElement('p');
    p4.classList.add('bottomRightFace');
    p4.appendChild(document.createTextNode(face));
    if(suit === '♠' || suit === '♣'){
        p1.classList.add('black');
        p2.classList.add('black');
        p3.classList.add('black');
        p4.classList.add('black');
    } else{
        p1.classList.add('red');
        p2.classList.add('red');
        p3.classList.add('red');
        p4.classList.add('red');
    }
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    return div;
}

function generateCards(input){
    let cards = [];
    let shuffled = [];
    if(input.length !== 0){
        for(let i = 0; i < input.length; i++){
            shuffled.push({face: input[i], suit: '♠'});
        }
    }
    const allFaces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const allSuits = ['♠', '♥', '♣', '♦'];
    for(let i = 0; i < allFaces.length; i++){
        for(let j = 0; j < allSuits.length; j++){
            if(allSuits[j] !== '♠' || input.indexOf(allFaces[i]) === -1){
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