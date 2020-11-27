import { fetchCategories } from '../utils/api';

export default class CardsContainer {
  constructor(settings) {
    this.settings = settings;
  }

  load = () => {
    return fetchCategories()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
}
