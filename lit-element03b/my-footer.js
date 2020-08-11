//import {LitElement, html, css} from "https://cdn.pika.dev/lit-element";
// next does not fail
// Ref: https://github.com/Polymer/lit-element/issues/603#issuecomment-565859359
//import {LitElement, html} from 'https://unpkg.com/lit-element?module';
import {LitElement, html, css} from './lit-element-2.3.1.js';


class MyFooter extends LitElement {
  render() {
    return html`
      <footer>footer</footer>
    `;
  }
}
customElements.define('my-footer', MyFooter);
