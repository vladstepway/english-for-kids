// const main = <h1>Categories</h1>;
// const animals = <h1>Animals</h1>;
// const countries = <h1>Countries</h1>;
// const emotions = <h1>Emotions</h1>;
// const fairyTales = <h1>Fairy Tales</h1>;
// const food = <h1>Food</h1>;
// const halloween = <h1>Halloween</h1>;
// const weather = <h1>Weather</h1>;
// const hospital = <h1>Hospital</h1>;

// const routes = {
//   '/': main,
//   '/animals': animals,
//   '/countries': countries,
//   '/emotions': emotions,
//   '/fairy-tales': fairyTales,
//   '/food': food,
//   '/halloween': halloween,
//   '/weather': weather,
//   '/hospital': hospital,
// };
// export default class Router {
//   routes = [];

//   mode = null;

//   root = '/';

//   constructor(options) {
//     this.mode = window.history.pushState ? 'history' : 'hash';
//     if (options.mode) {
//       this.mode = options.mode;
//     }
//     if (options.root) {
//       this.root = options.root;
//     }
//     this.listen();
//   }

//   addRoute = (path, cb) => {
//     this.routes.push({ path, cb });
//     return this;
//   };

//   remove = (path) => {
//     for (let i = 0; i < this.routes.length; i++) {
//       if (this.routes[i].path === path) {
//         this.routes.slice(i, 1);
//         return this;
//       }
//     }
//     return this;
//   };

//   flush = () => {
//     this.routes = [];
//     return this;
//   };

//   clearSlashes = (path) =>
//     path.toString().replace(/\/$/, '').replace(/^\//, '');

//   getFragment = () => {
//     let fragment = '';
//     if (this.mode === 'history') {
//       fragment = this.clearSlashes(
//         decodeURI(window.location.pathname + window.location.search)
//       );
//       fragment = fragment.replace(/\?(.*)$/, '');
//       fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
//     } else {
//       const match = window.location.href.match(/#(.*)$/);
//       fragment = match ? match[1] : '';
//     }
//     return this.clearSlashes(fragment);
//   };

//   navigate = (path = '') => {
//     if (this.mode === 'history') {
//       window.history.pushState(null, null, this.root + this.clearSlashes(path));
//     } else {
//       window.location.href = `${window.location.href.replace(
//         /#(.*)$/,
//         ''
//       )}#${path}`;
//     }
//   };

//   listen = () => {
//     clearInterval(this.interval);
//     this.interval = setInterval(this.interval, 50);
//   };

//   interval = () => {
//     if (this.current === this.getFragment()) {
//       return;
//     }
//     this.current = this.getFragment();
//     this.routes.some((r) => {
//       const match = this.current.match(r.path);
//       if (match) {
//         match.shift();
//         r.cb.apply({}, match);
//         return match;
//       }
//       return false;
//     });
//   };
// }
