import create from '../utils/create';
import CardsContainer from './cards-container';

export default class Menu {
  constructor(settings) {
    this.settings = settings;
    this.loader = settings.loader;
  }

  init = () => {
    this.loader.show();
    const mainContainer = document.querySelector('.main__container');
    this.cardsContainer = create('div', 'cards__container', '', mainContainer);
    this.categories = [];
    const cards = new CardsContainer();
    cards.load().then((res) => {
      const cardsCategories = res[0];
      console.log(cardsCategories);
      for (let i = 0; i < cardsCategories.length; i++) {
        this.categories.push(
          create(
            'div',
            'card__category',
            create('div', '', [
              create('div', 'name', cardsCategories[i].name),
              create('img', 'image', '', '', [
                'src',
                cardsCategories[i].imgUrl,
              ]),
            ]),
            this.cardsContainer,
            ['id', cardsCategories[i].id]
          )
        );
      }
      console.log(this.cardsContainer);
    });
  };
}
