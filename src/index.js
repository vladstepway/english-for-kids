import Loader from './js/components/loader';
import Menu from './js/components/menu';

const loader = new Loader();

const defaultSettings = { loader, mode: 'train' };
new Menu(defaultSettings).init();
