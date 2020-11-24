export default class Menu {
  constructor(settings) {
    this.settings = settings;
    this.loader = settings.loader;
  }

  init = () => {
    this.loader.show();
  };
}
