import * as Donuts from '../assets/Donuts';
import * as Coffee from '../assets/Coffee';

function Card(props) {
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
    if (props.card.matchFound === true) {
      e.currentTarget.classList.add('flip'); // Keeps matching icons up.
    } else {
      e.currentTarget.classList.toggle('flip');
      props.handleCards(e.currentTarget, props.card);
    }
  }

  return (
      <div id={props.card.id} className={props.card.flipped ? 'card flip' : 'card'} onClick={(e, matchIndex) => handleCardClick(e)}>
        <div className="card-front card-logo"></div>
        { 
          props.card.type === 'Donut' ? 
          <div className="card-back">
            {allDonuts[props.card.matchIndex]}
          </div> : 
          <div className="card-back">
            {allCoffee[props.card.matchIndex]}
          </div>
        }
      </div>
  );
}

export default Card;
