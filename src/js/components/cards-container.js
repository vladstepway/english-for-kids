import { getCategories, getCategoryItems } from '../utils/api';

export default class CardsContainer {
  constructor(settings) {
    this.settings = settings;
  }

  loadCategories = () => {
    return getCategories()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  loadCategoryItems = (categoryId) => {
    getCategoryItems(categoryId);
  };
}
