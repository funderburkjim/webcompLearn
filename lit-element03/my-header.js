import {LitElement, html} from '../lit-element-2.3.1.js';


class MyHeader extends LitElement {
  render() {
    return html`
      <header>header</header>
    `;
  }
}
customElements.define('my-header', MyHeader);
