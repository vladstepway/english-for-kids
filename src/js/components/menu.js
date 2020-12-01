import create from '../utils/create';
import CardsContainer from './cards-container';
import CategoryItem from './category-item';
import * as storage from '../utils/storage';
import CardItem from './card-item';

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
    this.currentItems = [];

    const navigation = document.querySelector('.navigation');
    navigation.addEventListener(
      'click',
      this.openHamburger.bind(this, navigation)
    );

    const cards = new CardsContainer();
    cards
      .loadCategories()
      .then((res) => {
        const cardsCategories = res;
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

  openHamburger = (nav) => {
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    if (nav.firstElementChild.classList[1] === 'open') {
      nav.firstElementChild.classList.remove('open');
      menu.classList.remove('open');
      overlay.classList.remove('active');
    } else {
      this.createLinks(menu);
      nav.firstElementChild.classList.add('open');
      menu.classList.add('open');
      overlay.classList.add('active');
    }
  };

  createLinks = (menu) => {
    if (menu.children.length === 0) {
      this.categoryItems.forEach((c) => {
        const menuLink = create('a', 'menu__link', c.name, '', [
          'href',
          `/${c.id}`,
        ]);
        menuLink.setAttribute('data-background', `url(${c.imgUrl})`);
        create('li', 'menu__item', menuLink, menu);
      });
    }
  };

  createCategories = (cardsCategories, cards) => {
    for (let i = 0; i < cardsCategories.length; i++) {
      const currentCategory = cardsCategories[i];
      const categoryCard = create(
        'div',
        'card__category',
        create('div', 'item-container', [
          create(
            'img',
            'image',
            '',
            '',
            ['src', currentCategory.imgUrl],
            ['alt', currentCategory.id]
          ),
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
    cards.loadCategoryItems(categoryItem.id).then((res) => {
      this.loader.show();
      // const cardContainer = document.querySelector('.cards__container');
      // cardContainer.childNodes = '';
      // console.log(cardContainer.children);
      this.createCards(res.items, categoryItem);
      storage.set('items', res);
    });
  };

  createCards = (cards, categoryItem) => {
    for (let i = 0; i < cards.length; i++) {
      const currentCard = cards[i];
      const card = create(
        'div',
        'card',
        [
          create(
            'div',
            'card__front',
            [
              create(
                'div',
                'card__image',
                '',
                '',
                ['src', currentCard.imgUrl],
                ['alt', currentCard.word.toLowerCase()]
              ),
              create('div', 'card__info', '', ''),
            ],
            ''
          ),
          create(
            'div',
            'card__back',
            [
              create(
                'div',
                'card__image',
                '',
                '',
                ['src', currentCard.imgUrl],
                ['alt', currentCard.word.toLowerCase()]
              ),
              create('div', 'card__info', '', ''),
            ],
            ''
          ),
        ],
        this.cardsContainer,
        ['id', currentCard.word.toLowerCase()]
      );
      console.log(card);
      const cardItem = new CardItem(currentCard);
      categoryItem.addCard(cardItem);
      this.currentItems.push(cardItem);
    }
  };
}
