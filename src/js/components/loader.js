export default function Loader() {
  Loader.prototype.show = () => {
    window.addEventListener('load', () => {
      if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
      }
    });
  };
}
