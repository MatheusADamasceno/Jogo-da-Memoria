const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const countdownElement = document.getElementById('countdown');

const characters = [
  'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 
];

let firstCard = '';
let secondCard = '';

let seconds = 40;

let intervalId; 

function updateCountdown() {
  if (seconds > 0) {
    countdownElement.textContent = seconds + (seconds === 1 ? ' segundo' : ' Segundos');
    seconds--;
  } else {
    clearInterval(intervalId); 
    countdownElement.textContent = 'Tempo esgotado';
    turnAllCards();
  }
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function checkEndGame() {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 14) {
    clearInterval(intervalId); 
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

function checkCards() {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 750);
  }
}

function revealCard({ target }) {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

function createCard(character) {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

function loadGame() {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

function turnAllCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.add('reveal-card');
  });
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  intervalId = setInterval(updateCountdown, 1000); 
  loadGame();
};
