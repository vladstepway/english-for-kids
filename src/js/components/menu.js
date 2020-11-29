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
      for (let i = 0; i < cardsCategories.length; i++) {
        this.categories.push(
          create(
            'div',
            'card__category',
            create('div', 'item-container', [
              create('img', 'image', '', '', [
                'src',
                cardsCategories[i].imgUrl,
              ]),
              create('div', 'name', cardsCategories[i].name),
            ]),
            this.cardsContainer,
            ['id', cardsCategories[i].id]
          )
        );
      }
    });
  };
}
