import { getCategories, getCategoryItems } from '../utils/api';

export default class CardsContainer {
  constructor(settings) {
    this.settings = settings;
  }

  loadCategories = () => {
    return getCategories()
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  };

  loadCategoryItems = (categoryId) => {
    return getCategoryItems(categoryId).then((data) => data[0]);
  };
}
