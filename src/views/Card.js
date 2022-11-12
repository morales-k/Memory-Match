import * as Donuts from '../assets/Donuts';
import * as Coffee from '../assets/Coffee';
import flipSound from '../assets/sounds/flip.mp3';

function Card(props) {
  const { card, handleCards } = props;
  const allDonuts = [
    <Donuts.ChocolateDrizzleFilled />,
    <Donuts.ChocolateSprinklesFilled />,
    <Donuts.GlazeDrizzleFilled />,
    <Donuts.GlazeSprinklesFilled />,
    <Donuts.GlazeHatchFilled />,
    <Donuts.StrawberryHatchFilled />,
    <Donuts.ChocolateDrizzle />,
    <Donuts.ChocolateSprinkles />,
    <Donuts.GlazeSprinkles />,
    <Donuts.StrawberryDrizzle />,
    <Donuts.StrawberryIced />,
    <Donuts.StrawberrySprinkles />
  ];
  const allCoffee = [
    <Coffee.BlueCupSleeve />,
    <Coffee.RedCupSleeve />,
    <Coffee.GrayCupSleeve />,
    <Coffee.BlueSprinklesSleeve />,
    <Coffee.RedSprinklesSleeve />,
    <Coffee.GraySprinklesSleeve />,
    <Coffee.BlueCup />,
    <Coffee.RedCup />,
    <Coffee.GrayCup />,
    <Coffee.BlueSprinkles />,
    <Coffee.RedSprinkles />,
    <Coffee.GraySprinkles />
  ];

  function handleCardClick(e) {
    let flip = new Audio(flipSound);

    if (!card.flipped) {
      flip.play();
    }

    if (card.matchFound === true) {
      e.currentTarget.classList.add('flip'); // Keeps matching icons up.
    } else {
      e.currentTarget.classList.toggle('flip');
      handleCards(e.currentTarget, card);
    }
  }

  return (
      <div id={card.id} className={card.flipped ? 'card flip' : 'card'} onClick={(e) => handleCardClick(e)}>
        <div className="card-front card-logo"></div>
        { 
          card.type === 'Donut' ? 
          <div className="card-back">
            {allDonuts[card.matchIndex]}
          </div> : 
          <div className="card-back">
            {allCoffee[card.matchIndex]}
          </div>
        }
      </div>
  );
}

export default Card;
