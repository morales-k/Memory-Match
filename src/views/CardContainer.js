import { useEffect, useState } from 'react';
import Card from './Card';
import * as Donuts from '../assets/Donuts';
import * as Coffee from '../assets/Coffee';
import matchSound from '../assets/sounds/match.mp3';

function CardContainer(props) {
  const [cards, setCards] = useState([]);
  const [prevCard, setPrevCard] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const [prevTarget, setPrevTarget] = useState(null);
  let [flipCount, setFlipCount] = useState(0);

  useEffect(() => {
    if (cards.length === 0 || props.resetGame) {
      createCards();
    }
  }, [cards.length, props.resetGame]);

  useEffect(() => {
    if (prevCard === null) {
      setPrevCard(currentCard);
    }
  }, [currentCard]);


// Flips cards back after 2 cards are flipped if no match is found.
function handleCards(currentTarget, clickedCard) {
  // let updatedFlipCount = flipCount += 1;
  setFlipCount(flipCount += 1);
  props.handleFlipCount();

  clickedCard.flipped = true;

  // Handle finding a match.
  if (flipCount === 2) {
    if (clickedCard.matchIndex === prevCard.matchIndex && clickedCard.type === prevCard.type && clickedCard.id !== prevCard.id) {
      let sound = new Audio(matchSound);
      sound.play();
      clickedCard.matchFound = true;
      prevCard.matchFound = true;
      currentTarget.classList.add('flip');
      setFlipCount(0); 
      props.handleScore();
    } else if (clickedCard.matchIndex !== prevCard.matchIndex || clickedCard.type !== prevCard.type || clickedCard.id === prevCard.id) {
        // Flip previous card back if not part of a found match.
        setTimeout(() => {
          if (!prevCard.matchFound) {
            prevTarget.classList.remove('flip');
            prevCard.flipped = false;
          }
          // Flip back the current card.
            currentTarget.classList.remove('flip');
            clickedCard.flipped = false;
        }, 1000);
  
        setFlipCount(0);
    }
  }
  setCurrentCard(clickedCard);
  setPrevCard(clickedCard);
  setPrevTarget(currentTarget);
}

// Finds a match for the current card loop & index.
function selectMatch(loop, i) {
  let currentMatch = '';
  let object = loop === 0 ? Donuts : Coffee;

    Object.keys(object).map((obj, index) => {
      if (i === 24) {
        currentMatch = 0;
      } else if (i - 1 === index || i - 12 === index) {
        currentMatch = index;
      }
    });

  if (currentMatch !== '') {
    return currentMatch;
  }
}

// Creates an array of card objects.
function createCards() {
  const allCards = [];
  let loop = 0;

  while (loop < 2) {
    for (let i = 1; i < props.numberOfMatches + 1; i++) {
      // matchIndex: Index of a type's component array.
      let card = {
        id: loop === 0 ? i : props.numberOfMatches + i,
        type: loop === 0 ? 'Donut' : 'Coffee',
        matchIndex: selectMatch(loop, i),
        matchFound: false,
        flipped: false,
      }
      allCards.push(card);
    }
    loop++;
  }
  shuffleCards(allCards);
}

// Uses Fischer-Yates shuffle to randomize cards.
function shuffleCards(allCards) {
  const newArr = [];

  while (allCards.length) {
    const randomIndex = Math.floor(Math.random() * allCards.length),
        element = allCards.splice(randomIndex, 1);

    newArr.push(element[0]);
    }
    setCards(newArr);
}

  return (
    <div className="card-container">
      {
        cards && cards.map(card => {
            return (
              <div className="card-col" key={card.id + 'cardDiv'}>
                <Card key={card.id} card={card} handleCards={handleCards} />
              </div>
            );
          })
      }
    </div>
  );
}

export default CardContainer;
