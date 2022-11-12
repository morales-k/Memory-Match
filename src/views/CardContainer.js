import { useEffect, useState } from 'react';
import Card from './Card';
import { playMatchSound, determineIfMatch, shuffleArray, setMatches, createCards } from '../ViewModel/CardContainerVM';

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
      setMatches(numberOfMatches, setDonutMatches, setCoffeeMatches);
    }
  }, [cards.length, resetGame]);

  useEffect(() => {
    if (!!coffeeMatches?.length && !!donutMatches?.length) {
      createCards(numberOfMatches, donutMatches, coffeeMatches, setCards);
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
    let matchFound = determineIfMatch(clickedCard, prevCard);

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
