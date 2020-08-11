import {LitElement, html, css} from "https://cdn.pika.dev/lit-element";
// next does not fail
// Ref: https://github.com/Polymer/lit-element/issues/603#issuecomment-565859359
//import {LitElement, html} from 'https://unpkg.com/lit-element?module';


class MyArticle extends LitElement {
  render() {
    return html`
      <article>article</article>
    `;
  }
}
customElements.define('my-article', MyArticle);
