import { useEffect, useState } from 'react';
import Card from './Card';
import * as Donuts from '../assets/Donuts';
import * as Coffee from '../assets/Coffee';
import matchSound from '../assets/sounds/match.mp3';

function CardContainer(props) {
  const { resetGame, handleFlipCount, handleScore, numberOfMatches } = props;
  const [coffeeMatches, setCoffeeMatches] = useState([]);
  const [donutMatches, setDonutMatches] = useState([]);
  const [cards, setCards] = useState([]);
  const [prevCard, setPrevCard] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const [prevTarget, setPrevTarget] = useState(null);
  let [flipCount, setFlipCount] = useState(0);

  useEffect(() => {
    if (cards.length === 0 || resetGame) {
      setMatches();
    }
  }, [cards.length, resetGame]);

  useEffect(() => {
    if (!!coffeeMatches?.length && !!donutMatches?.length) {
      createCards();
    }
  }, [coffeeMatches, donutMatches])

  useEffect(() => {
    if (prevCard === null) {
      setPrevCard(currentCard);
    }
  }, [currentCard]);


// Flips cards back after 2 cards are flipped if no match is found.
function handleCards(currentTarget, clickedCard) {
  setFlipCount(flipCount += 1);
  handleFlipCount();

  clickedCard.flipped = true;

  // Handle finding a match.
  if (flipCount === 2) {
    let matchFound = determineIfMatch(clickedCard);

    if (matchFound) {
      playMatchSound();
      clickedCard.matchFound = true;
      prevCard.matchFound = true;
      currentTarget.classList.add('flip');
      setFlipCount(0); 
      handleScore();
    } else if (!matchFound) {
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

// Plays sound when match is found.
function playMatchSound() {
  let sound = new Audio(matchSound);
  sound.play();
}

/**
 * Takes the last clicked card & determines if it matches the previously clicked card.
 * 
 * @param {Object} clickedCard - The last card clicked.
 * @returns 
 */
function determineIfMatch(clickedCard) {
  if (clickedCard.matchIndex === prevCard.matchIndex && 
    clickedCard.type === prevCard.type && 
    clickedCard.id !== prevCard.id) {
      return true
    } else if (clickedCard.matchIndex !== prevCard.matchIndex || 
      clickedCard.type !== prevCard.type || 
      clickedCard.id === prevCard.id) {
        return false
    }
}

/**
 * Creates & shuffles an array of key names from the Coffee and Donut objects.
 * Then takes the array & matches the key names to the objects index, 
 * creating an array of random index matches.
 * 
 */
function setMatches() {
  let count = 0;

  while (count < 2) {
    let deckImages = count === 0 ? Donuts : Coffee;
    let deckKeys = Object.keys(deckImages);
    let shuffledImages = shuffleArray(deckKeys).splice(0, (numberOfMatches / 2));
    let donutIndexes = [];
    let coffeeIndexes = [];

    Object.keys(deckImages).forEach((key, index) => {
      shuffledImages.forEach(image => {
        if (key === image && count === 0) {
          donutIndexes.push(index)
        } else if (key === image && count === 1) {
          coffeeIndexes.push(index)
        }
      })
    })

    if (count === 0) {
      setDonutMatches(donutIndexes)
    } else {
      setCoffeeMatches(coffeeIndexes)
    }

    count++;
  }
}

/**
 * Uses Fischer-Yates shuffle to randomize array items.
 * 
 * @param {Array} arr - Array of items to shuffle.
 * @returns 
 */
function shuffleArray(arr) {
  const newArr = [];

  while (arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length),
        element = arr.splice(randomIndex, 1);

    newArr.push(element[0]);
    }
    return newArr
}

// Creates an array of cards for each card type.
function createCards() {
  const allCards = [];
  let loop = 0;
  let currentDeckMatch = 0; // A number indicating which index of the current deck to use for matching. (coffee/donut matches)
  let numberOfDeckMatches = numberOfMatches / 2; // Always half of the total# of matches.

  while (loop < 2) {
    for (let i = 1; i < numberOfMatches + 1; i++) {
      let card = {
        id: loop === 0 ? i : numberOfMatches + i,
        type: loop === 0 ? 'Donut' : 'Coffee',
        matchIndex: loop === 0 ? donutMatches[currentDeckMatch] : coffeeMatches[currentDeckMatch],
        matchFound: false,
        flipped: false,
      }
      allCards.push(card);

      // Reset currentDeckMatch to avoid adding an invalid match index.
      if (currentDeckMatch + 1 === numberOfDeckMatches) {
        currentDeckMatch = 0;
      } else {
        currentDeckMatch++;
      }
      
    }
    loop++;
  }
  setCards(shuffleArray(allCards));
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
