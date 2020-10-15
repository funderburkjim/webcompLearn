import {LitElement, html, css} from '../lit-element-2.3.1.js';

class MyFooter extends LitElement {
  render() {
    return html`
      <footer>footer</footer>
    `;
  }
}
customElements.define('my-footer', MyFooter);
