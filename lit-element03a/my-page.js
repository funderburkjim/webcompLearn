//import {LitElement, html, css} from "https://cdn.pika.dev/lit-element";
// next does not fail
// Ref: https://github.com/Polymer/lit-element/issues/603#issuecomment-565859359
import {LitElement, html} from 'https://unpkg.com/lit-element?module';

import './my-header.js';
import './my-article.js';
import './my-footer.js';

class MyPage extends LitElement {
  render() {
    return html`
      <my-header></my-header>
      <my-article></my-article>
      <my-footer></my-footer>
    `;
  }
}
customElements.define('my-page', MyPage);
