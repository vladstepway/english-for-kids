export default function Loader() {
  Loader.prototype.show = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        document.body.classList.add('loaded')
      );
    } else {
      document.body.classList.add('loaded');
    }
  };
}
