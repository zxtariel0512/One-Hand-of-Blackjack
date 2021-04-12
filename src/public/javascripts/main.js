

function main(){

    let user = [];
    let computer = [];
    let userScore = 0;
    let computerScore = 0;
    let winner = -1;
    
    // make the form disappear after clicking the play button
    const playButton = document.querySelector('.playBtn');
    playButton.addEventListener('click', formDisappear);
    const game = document.querySelector('.game');
    function formDisappear(evt){
        evt.preventDefault();
        const form = document.querySelector('.start');
        form.classList.add('disappear');

        // get the input
        const input = document.querySelector('#startValues').value.split(',');
        const shuffled = generateCards(input);
        computer.push(shuffled[0]);
        shuffled.splice(0, 1);
        user.push(shuffled[0]);
        shuffled.splice(0, 1);
        computer.push(shuffled[0]);
        shuffled.splice(0, 1);
        user.push(shuffled[0]);
        shuffled.splice(0, 1);

        // create buttons
        const hit = document.createElement('button');
        hit.classList.add('hit');
        hit.appendChild(document.createTextNode('Hit'));
        const stand = document.createElement('button');
        stand.classList.add('stand');
        stand.appendChild(document.createTextNode('stand'));

        function gameEnd(winner, computerDiv, computerScore){
            hit.classList.add('disappear');
            stand.classList.add('disappear');
            const result = document.createElement('h4');
            result.classList.add('result');
            if(winner === -1){
                result.appendChild(document.createTextNode('Oops, tie! 😕'));
            } else if(winner === 0){
                result.appendChild(document.createTextNode('User lost, saaaad! 😭'));
            } else{
                result.appendChild(document.createTextNode('Bravo! User wins! 🤠'));
            }
            game.appendChild(result);
            const computerHand = computerDiv.querySelector('.card');
            console.log(computerHand);
            // computerDiv.removeChild(document.getElementById('unknownCard'))
            computerDiv.replaceChild(createCard(computer[computer.length - 1].face, computer[computer.length - 1].suit), document.getElementById('unknownCard'));
            computerDiv.firstChild.firstChild.nodeValue = `Computer Hand -- Total: ${computerScore}`;
        }
        

        // scores
        userScore = updateScore(user);
        computerScore = updateScore(computer);

        // initialize 2 cards for each
        const userH = document.createElement('h4');
        userH.appendChild(document.createTextNode(`Player Hand -- Total: ${userScore}`));
        const computerH = document.createElement('h4');
        computerH.appendChild(document.createTextNode(`Computer Hand -- Total: ?`));
        
        const computerDiv = document.createElement('div');
        computerDiv.classList.add('computer');
        game.appendChild(computerDiv);
        computerDiv.appendChild(computerH);
        const unknownCard = createCard(computer[0].face, computer[0].suit, false);
        unknownCard.setAttribute('id', 'unknownCard');
        computerDiv.appendChild(unknownCard);
        computerDiv.appendChild(createCard(computer[1].face, computer[1].suit));
        userH.classList.add('userScore');
        game.appendChild(userH);
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        game.appendChild(userDiv);
        userDiv.appendChild(userH);
        userDiv.appendChild(createCard(user[0].face, user[0].suit));
        userDiv.appendChild(createCard(user[1].face, user[1].suit));

        game.appendChild(hit);
        game.appendChild(stand);

        // create events for hit and stand
        hit.addEventListener('click', clickHit);
        stand.addEventListener('click', clickStand);
        function clickHit(evt){
            user.push(shuffled[0]);
            userDiv.appendChild(createCard(user[user.length - 1].face, user[user.length - 1].suit))
            shuffled.splice(0, 1);
            userScore = updateScore(user);
            userDiv.firstChild.firstChild.nodeValue = `Player Hand -- Total: ${userScore}`;
            console.log(userScore);
            if(userScore > 20){
                winner = 0;
                gameEnd(winner, computerDiv, computerScore);
            }
        }
        // computer's tern
        function clickStand(evt){
            while(computerScore < 15){
                computer.push(shuffled[0]);
                computerDiv.appendChild(createCard(computer[computer.length - 1].face, computer[computer.length - 1].suit));
                shuffled.splice(0, 1);
                computerScore = updateScore(computer);
            }
            if(computerScore > 21){
                winner = 1;
            } else{
                if(computerScore > userScore){
                    winner = 0;
                } else if(computerScore === userScore){
                    winner = -1;
                } else{
                    winner = 1;
                }
            }
            gameEnd(winner, computerDiv, computerScore);
        }
    }
}

function updateScore(arr, a = false){
    let score = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].face === 'A'){
            a = true;
        } else if(arr[i].face === 'J' || arr[i].face === 'Q' || arr[i].face === 'K'){
            score += 10;
        } else{
            score += parseInt(arr[i].face);
        }
    }
    if(a === true){
        const attempt = score + 11;
        if(attempt > 21){
            score += 1;
        } else{
            score = attempt
        }
    }
    return score;
}

function createCard(face, suit, visible = true){
    const div = document.createElement('div');
    div.classList.add('card');
    if(visible){
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
    } else{
        div.classList.add('unknown');
    }
    
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