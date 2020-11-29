import { getCategories } from '../utils/api';

export default class CardsContainer {
  constructor(settings) {
    this.settings = settings;
  }

  load = () => {
    return getCategories()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
}
