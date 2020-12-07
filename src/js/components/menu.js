import { create, removeChildren } from '../utils/create';
import CardsContainer from './cards-container';
import CategoryItem from './category-item';
import * as storage from '../utils/storage';
import CardItem from './card-item';

export default class Menu {
  constructor({ loader, mode }) {
    this.loader = loader;
    this.mode = mode;
    // this.router = router;
  }

  init = () => {
    this.loader.show();
    const mainContainer = document.querySelector('.main__container');
    this.cardsContainer = create('div', 'cards__container', '', mainContainer);
    this.categories = [];
    this.categoryItems = [];
    this.currentItems = [];
    const buttons = document.querySelector('.header-buttons');
    const toggleSwitch = buttons.firstElementChild;
    toggleSwitch.addEventListener('click', this.switchMode);

    const navigation = document.querySelector('.navigation');

    const cards = new CardsContainer();
    navigation.addEventListener(
      'click',
      this.openHamburger.bind(this, navigation, cards),
    );
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

  switchMode = (e) => {
    if (e.target === document.querySelector('#doggo')) {
      this.mode = e.target.checked ? 'play' : 'train';
    }
    if (document.querySelector('.card')) {
      const cards = document.querySelectorAll('.card');
      if (this.mode === 'play') {
        cards.forEach((c) =>
          c.firstElementChild.lastElementChild.classList.add('hide'),
        );
      } else {
        cards.forEach((c) =>
          c.firstElementChild.lastElementChild.classList.remove('hide'),
        );
      }
    }
  };

  openHamburger = (nav, cards) => {
    const menu = document.querySelector('.menu');
    if (nav.firstElementChild.classList[1] === 'open') {
      this.toggleHamburger(nav, menu);
    } else {
      this.createLinks(menu, cards);
      this.toggleHamburger(nav, menu);
    }
  };

  toggleHamburger = (nav, menu) => {
    const overlay = document.querySelector('.overlay');

    nav.firstElementChild.classList.toggle('open');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
  };

  createLinks = (menu, cards) => {
    if (menu.children.length === 0) {
      this.categoryItems.forEach((categoryItem) => {
        const menuLink = create('div', 'menu__link', categoryItem.name, '');
        const menuItem = create('li', 'menu__item', menuLink, menu);
        menuItem.addEventListener(
          'click',
          this.chooseCategory.bind(this, { cards, categoryItem }),
        );
      });
    }
  };

  createCategories = (cardsCategories, cards) => {
    for (let i = 0; i < cardsCategories.length; i++) {
      const currentCategory = cardsCategories[i];
      // this.router.addRoute(`/#/${currentCategory.id}`);
      const categoryCard = create(
        'div',
        'card__category',
        [
          create(
            'div',
            'image__wrapper color-change-border',
            [
              create(
                'img',
                'image',
                '',
                '',
                ['src', currentCategory.imgUrl],
                ['alt', currentCategory.id],
              ),
              '',
            ],
            '',
            // ['href', `${currentCategory.id}`]
          ),
          create('div', 'name', currentCategory.name),
        ],
        this.cardsContainer,
        ['id', currentCategory.id],
      );
      const categoryItem = new CategoryItem(currentCategory);
      this.categoryItems.push(categoryItem);
      categoryCard.addEventListener(
        'click',
        this.chooseCategory.bind(this, { cards, categoryItem }),
      );
      this.categories.push(categoryCard);
    }
  };

  chooseCategory = ({ cards, categoryItem }) => {
    cards.loadCategoryItems(categoryItem.id).then((res) => {
      this.loader.show();
      const cardContainer = document.querySelector('.cards__container');
      removeChildren(cardContainer);
      this.createCards(res.items, categoryItem);
      storage.set('items', res);
    });
  };

  createCards = (cards, categoryItem) => {
    for (let i = 0; i < cards.length; i++) {
      const currentCard = cards[i];
      const flipButton = create(
        'img',
        'flip-button',
        '',
        '',
        ['id', currentCard.word.split(' ').join('-').toLowerCase()],
        ['src', './media/icons/flip.png'],
      );

      flipButton.addEventListener(
        'click',
        this.showTranslation.bind(this, currentCard.ruSoundUrl),
      );
      const imageWrapper = create(
        'div',
        'image__wrapper color-change-border',
        create(
          'img',
          'card__image',
          '',
          '',
          ['src', currentCard.imgUrl],
          ['alt', currentCard.word.split(' ').join('-').toLowerCase()],
        ),
        '',
      );
      const translationSound = create('img', 'info__sound', '', '', [
        'src',
        './media/icons/rus.png',
      ]);
      create(
        'div',
        'card',
        [
          create(
            'div',
            'card__front',
            [
              imageWrapper,
              create(
                'div',
                `${this.mode === 'train' ? 'card__info' : 'card__info hide'}`,
                [
                  create('div', 'info__translation', [flipButton]),
                  create('div', 'info__word', currentCard.word),
                  translationSound,
                ],
                '',
              ),
            ],
            '',
          ),
          create(
            'div',
            'card__back',
            [
              create('div', 'image__wrapper color-change-border', [
                create(
                  'img',
                  'card__image',
                  '',
                  '',
                  ['src', currentCard.imgUrl],
                  ['alt', currentCard.word.split(' ').join('-').toLowerCase()],
                ),
              ]),

              create(
                'div',
                'card__info',
                [create('div', 'info__word', currentCard.translation)],
                '',
              ),
            ],
            '',
          ),
        ],
        this.cardsContainer,
        ['id', currentCard.word.split(' ').join('-').toLowerCase()],
      );
      if (this.mode === 'train') {
        imageWrapper.addEventListener(
          'click',
          this.playSound.bind(this, currentCard.enSoundUrl),
        );
        translationSound.addEventListener(
          'click',
          this.playSound.bind(this, currentCard.ruSoundUrl),
        );
      }
      const cardItem = new CardItem(currentCard);
      categoryItem.addCard(cardItem);
      this.currentItems.push(cardItem);
    }
  };

  showTranslation = (src, e) => {
    const id = e.target.getAttribute('data-id');
    const card = document.querySelector(`.card[data-id=${id}]`);
    card.classList.add('flip');
    this.playSound(src);
    card.addEventListener('mouseleave', () => {
      card.classList.remove('flip');
    });
  };

  playSound = (src) => {
    if (this.mode === 'train') {
      const audio = new Audio(src);
      audio.autoplay = true;
    }
  };
}
