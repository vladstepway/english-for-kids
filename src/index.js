import Loader from './js/components/loader';
import Menu from './js/components/menu';
// import Router from './js/utils/router';

const loader = new Loader();
// const router = new Router({
//   mode: 'hash',
//   root: '/',
// });

const defaultSettings = { loader, mode: 'train' };
new Menu(defaultSettings).init();
