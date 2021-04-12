function main(){
    
    // make the form disappear after clicking the play button
    const playButton = document.querySelector('.playBtn');
    playButton.addEventListener('click', formDisappear);
    function formDisappear(evt){
        const form = document.querySelector('.start');
        form.classList.add('disappear');
        evt.preventDefault();
    }


}

document.addEventListener('DOMContentLoaded', main);