export default function Loader() {
  Loader.prototype.show = () => {
    window.addEventListener('load', () =>
      document.body.classList.add('loaded')
    );
  };
}
// export default function Loader(el) {
//   el.loader = this;
//   this.el = el;
//   this.style = document.getElementById('loader');
//   this.init();

//   if (!document.body.animate) {
//     if (!this.style) {
//       this.style = document.createElement('style');
//       this.style.id = 'loader';
//       this.style.innerText =
//         '@keyframes spinner { 100% { transform: rotate(360deg); } }';
//       document.head.appendChild(this.style);
//     }
//   }
// }

// Loader.prototype.init = function () {
//   if (!this.overlay) {
//     this.el.style.position = 'relative';

//     this.overlay = document.createElement('div');
//     this.overlay.style.display = 'block';
//     this.overlay.style.position = 'absolute';
//     this.overlay.style.top = 0;
//     this.overlay.style.right = 0;
//     this.overlay.style.bottom = 0;
//     this.overlay.style.left = 0;
//     this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

//     this.loader = document.createElement('div');
//     this.loader.style.position = 'absolute';
//     this.loader.style.top = '50%';
//     this.loader.style.left = '50%';
//     this.loader.style.marginLeft = '-60px';
//     this.loader.style.marginTop = '-60px';
//     this.loader.style.borderWidth = '1em';
//     this.loader.style.borderColor = 'white';
//     this.loader.style.borderStyle = 'solid';
//     this.loader.style.borderTopColor = 'transparent';
//     this.loader.style.borderRadius = '50%';
//     this.loader.style.fontSize = '16px';
//     this.loader.style.width = '120px';
//     this.loader.style.height = '120px';

//     if (document.body.animate) {
//       this.loader.animate(
//         [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
//         {
//           duration: 1000,
//           iterations: Infinity,
//         }
//       );
//     } else {
//       this.loader.style.animation = 'spinner 1s linear infinite';
//     }

//     this.overlay.appendChild(this.loader);
//     this.el.appendChild(this.overlay);
//   }
// };

// Loader.prototype.show = function () {
//   this.overlay.style.display = 'block';
// };

// Loader.prototype.hide = function () {
//   this.overlay.style.display = 'none';
// };

// Loader.prototype.destroy = function () {
//   if (this.overlay) {
//     this.overlay.parentNode.removeChild(this.overlay);
//     this.overlay = null;
//     this.loader = null;
//   }
// };
