import matchSound from '../assets/sounds/match.mp3';
import * as Donuts from '../assets/Donuts';
import * as Coffee from '../assets/Coffee';

// Plays sound when match is found.
export function playMatchSound() {
    let sound = new Audio(matchSound);
    sound.play();
  }

  /**
 * Uses Fischer-Yates shuffle to randomize array items.
 * 
 * @param {Array} arr - Array of items to shuffle.
 * @returns Array
 */
 export function shuffleArray(arr) {
  const shuffled = [];

  while (arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length),
        element = arr.splice(randomIndex, 1);

    shuffled.push(element[0]);
    }
    return shuffled
}

/**
 * Takes the last clicked card & determines if it matches the previously clicked card.
 * 
 * @param {Object} clickedCard - The last card clicked.
 * @param {Object} prevCard - The 2nd to last card clicked.
 * @returns boolean
 */
export function determineIfMatch(clickedCard, prevCard) {
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
 * Then matches key names to their index & sets array of random index matches.
 * 
 * @param {number} numberOfMatches - Total # of card matches.
 * @param {Function} setDonutMatches - Sets array of donut indexes.
 * @param {Function} setCoffeeMatches - Sets array of coffee indexes.
 */
 export function setMatches(numberOfMatches, setDonutMatches, setCoffeeMatches) {
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
 * Creates an array of cards for each card type.
 * 
 * @param {number} numberOfMatches - Total # of card matches.
 * @param {Array} donutMatches - Random array of Donuts object indexes.
 * @param {Array} coffeeMatches - Random array of Coffee object indexes.
 * @param {Function} setCards - Sets the random & shuffled cards.
 */
export function createCards(numberOfMatches, donutMatches, coffeeMatches, setCards) {
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