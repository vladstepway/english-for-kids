import create from '../utils/create';
import CardsContainer from './cards-container';
import CategoryItem from './category-item';
import * as storage from '../utils/storage';

export default class Menu {
  constructor({ loader, mode }) {
    this.loader = loader;
    this.mode = mode;
  }

  init = () => {
    this.loader.show();
    const mainContainer = document.querySelector('.main__container');
    this.cardsContainer = create('div', 'cards__container', '', mainContainer);
    this.categories = [];
    this.categoryItems = [];
    const cards = new CardsContainer();
    cards
      .loadCategories()
      .then((res) => {
        const cardsCategories = res[0];
        this.createCategories(cardsCategories, cards);
        storage.set('categories', this.categoryItems);
      })
      .catch((err) => {
        if (err) {
          const cardsCategories = storage.get('categories');
          this.createCategories(cardsCategories, cards);
        }
      });
  };

  createCategories = (cardsCategories, cards) => {
    for (let i = 0; i < cardsCategories.length; i++) {
      const currentCategory = cardsCategories[i];
      const categoryCard = create(
        'div',
        'card__category',
        create('div', 'item-container', [
          create('img', 'image', '', '', ['src', currentCategory.imgUrl]),
          create('div', 'name', currentCategory.name),
        ]),
        this.cardsContainer,
        ['id', currentCategory.id]
      );
      const categoryItem = new CategoryItem(currentCategory);
      this.categoryItems.push(categoryItem);
      categoryCard.addEventListener(
        'click',
        this.chooseCategory.bind(this, { categoryItem, cards })
      );
      this.categories.push(categoryCard);
    }
  };

  chooseCategory = ({ cards, categoryItem }) => {
    console.log(categoryItem);
    const items = cards.loadCategoryItems(categoryItem.id);
    console.log('items', items);
  };
}
