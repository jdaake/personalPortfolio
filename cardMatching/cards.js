var cardArray = [{
    'name': 'shell',
    'img': 'img/blueshell.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    'name': 'bobomb',
    'img': 'img/bobomb.png',
  },
  {
    'name': 'mario',
    'img': 'img/mario.png',
  },
  {
    'name': 'luigi',
    'img': 'img/luigi.png',
  },
  {
    'name': 'peach',
    'img': 'img/peach.png',
  },
  {
    'name': '1up',
    'img': 'img/1up.png',
  },
  {
    'name': 'mushroom',
    'img': 'img/mushroom.png',
  },
  {
    'name': 'thwomp',
    'img': 'img/thwomp.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img/bulletbill.png',
  },
  {
    'name': 'coin',
    'img': 'img/coin.png',
  },
  {
    'name': 'goomba',
    'img': 'img/goomba.png',
  },
];

var game = document.getElementById('game');

// Create section in HTML for Grid.
var grid = document.createElement('section');
// Set the grid's attributes.
grid.setAttribute('class', 'grid');
// Append the game variable to the grid.
game.appendChild(grid);

// Variables
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200

// Duplicate cardsArray and shuffle order. - WORKS
var gameGrid = cardArray.concat(cardArray).sort(function () {
  return 0.5 - Math.random();
});

// Create div elements
$.each(gameGrid, function(key, value) {
  // Create Outer div
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = value.name;
  // Create "front" div
  var front = document.createElement('div');
  front.classList.add('front');
  // Create "back" div
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${value.img})`;
  // Append divs
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
})

// Reset the game
function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  // Remove selected on wrong pick
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

// Switch from selected to match
function match(){
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
    // card.classList.remove('selected')
  });
}

// Event listener for when card is clicked
grid.addEventListener('click', function(e) {
  var clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
    // If first and second guesses are not blank.
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        // run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
})

// Allow user to start new game
var button = document.getElementById('button').addEventListener('click', function(){
  window.location.reload()
})
// Shuffle function
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
