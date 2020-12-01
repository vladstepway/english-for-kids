const api = {
  URL: `https://secret-springs-02552.herokuapp.com/https://raw.githubusercontent.com/vladstepway/english-for-kids/master/cards.js`,
};

const fetchCategories = async () => {
  return fetch(api.URL).then((res) => res.json());
};

const fetchCategoryItems = async () => {
  return fetch(api.URL).then((res) => res.json());
};

export const getCategories = () => {
  return fetchCategories().then((data) => data.categories);
};

export const getCategoryItems = (categoryId) => {
  return fetchCategoryItems().then((data) =>
    data.cards.filter((card) => card.id === categoryId)
  );
};