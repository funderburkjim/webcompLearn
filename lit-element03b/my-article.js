//import {LitElement, html, css} from "https://cdn.pika.dev/lit-element";
// next does not fail
// Ref: https://github.com/Polymer/lit-element/issues/603#issuecomment-565859359
//import {LitElement, html} from 'https://unpkg.com/lit-element?module';
// next fails
//import {LitElement, html, css} from './lit-element.min.js';
import {LitElement, html, css} from './lit-element-2.3.1.js';

class MyArticle extends LitElement {
  render() {
    return html`
      <article>article</article>
    `;
  }
}
customElements.define('my-article', MyArticle);
