export default class CategoryItem {
  constructor({ name, id, imgUrl }) {
    this.name = name;
    this.id = id;
    this.imgUrl = imgUrl;
    this.cards = [];
  }

  addCard = (item) => {
    this.cards.push(item);
  };
}
