const api = {
  URL: `https://secret-springs-02552.herokuapp.com/https://raw.githubusercontent.com/vladstepway/english-for-kids/master/cards.js`,
};

export function fetchCards() {
  const response = fetch(api.URL, {
    method: 'GET',
    headers: {
      // 'Access-Control-Allow-Origin': 'http://localhost:8080',
      // 'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return JSON.stringify(data);
    });
  return response;
}

const fetchCategories = async () => {
  return fetch(api.URL).then((res) => {
    return res.json();
  });
};

export const getCategories = () => {
  return fetchCategories().then((data) => data);
};

// const getFetchedData = (fetchType) => {
//   console.log(fetchType);
//   switch (fetchType) {
//     case 'CATEGORIES':
//       return fetchCategories();
//     case 'CARDS':
//       return fetchCards();
//     default:
//       return;
//   }
// };
