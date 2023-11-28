/*------ plan of action ------*/
// Identify and initialize our state variables
// (pertain to the state of our game, usually they are the initial starting points of our elements)
// (our starting values) 

// Code main render() function & our renderResults()
// (these are controllers that update the view based on user input)

// Code the click event listener
// Code the win logic
// Update our renderResults() after we have win logic (to add border to winner)

// Code a countdown timer
// Add audio to the countdown to improve user experience



/*------ constants ------*/

// list of choices
const RPS_LOOKUP = {
    r: {img: 'imgs/rock.png', beats: 's'},
    p: {img: 'imgs/paper.png', beats: 'r'}, 
    s: {img: 'imgs/scissors.png', beats: 'p'}
};

// our audio file to play during countdown
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');

/*------ cached element references ------*/
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');

const countdownEl = document.getElementById('countdown');


/*------ App's initial state variables ------*/
// some things will change as the game proceeds
let scores;
// scores will be object keys (p = player score, c = computer score, t = tie)

let results;

let winner;



/*------ functions ------*/
// initializer function -> setup our initial state and call render
function init() {
    scores = {
        p: 0,
        c: 0,
        t: 0
    };

    results = {
        p: 'r',
        c: 'r'
    };

    winner = 't';

    render();
}

init();

// renderScores -> show how many wins/losses/ties
function renderScores() {
    // loop over scores object and display the scores accordingly
    // use for in when looping over an object
    for (let key in scores) {
        // use key to select an html element
        const scoreEl = document.getElementById(`${key}-score`);
        // use bracket notation to dynamically use object values based on a changing key
        scoreEl.innerText = scores[key];
    }
}

// renderResults -> show the results of player and computer choices
function renderResults() {
    // this looks at the results object, pulls the values for the keys P and C
    // then applies the image from the related part of the RPS_LOOKUP object
    // as the src for the img tag associated with the player and computer
    pResultEl.src = RPS_LOOKUP[results.p].img;
    cResultEl.src = RPS_LOOKUP[results.c].img;

    // this will visually identify who won the round
    // if this element belongs to the winner, change to purple
    // otherwise use white
    pResultEl.style.borderColor = winner === 'p' ? 'purple' : 'white';
    cResultEl.style.borderColor = winner === 'c' ? 'purple' : 'white';
}

// we'll do this by calling a couple other render functions through a countdown
// renderCountdown -> this will play audio and display the countdown to the user
// this will use a callback function
function renderCountdown(cbFunc) {
    // start the count at 3
    let count = 3;

    // display countdown div and set the text
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;

    // timer will update the DOM every second
    // once the timer is up, display the results
    AUDIO.currentTime = 0;
    AUDIO.play();

    // set up timer
    // setInterval takes two arguments -> callback fn, time (in ms), 
    const timerId = setInterval(() => {
        // every second, decrease the count
        count--;
        // if count is truthy, do something
        if (count) {
            console.log('interval running. count: ', count);
            countdownEl.innerText = count;
        } else {
            // otherwise, do something else
            // stop interval from running so it doesn't run infinitely
            clearInterval(timerId);
            countdownEl.style.visibility = 'hidden';

            // when the timer is done, run the callback function
            cbFunc();
        }
        // timeouts and intervals use milliseconds, 1/1000th of a second
    }, 1000);
}

// render function -> transfer/visualize all changes to the DOM
function render() {
    renderCountdown(() => {
        renderScores();
        renderResults();
    });
}

// getRandom function -> for our computer player to select a move

// handleChoice function -> for the player to select a move (will be an event listener)
// we'll use the innertext of our event target to determine what the move is
function handleChoice(evt) {
    console.log('this is what was clicked: \n', evt.target.tagName);

    // handle when the user clicks something that is not a button
    if (evt.target.tagName !== 'BUTTON') { return; }

    // change results.p to whatever is selected using innertext
    results.p = evt.target.innerText.toLowerCase();

    // call the random selector for our computer player

    // check for a winner

    // update scores accordingly

    // render the changes to the DOM
    render();
}

// getWinner function -> determine who wins: player, computer, tie



/*------ event listeners ------*/
document.querySelector('main').addEventListener('click', handleChoice);