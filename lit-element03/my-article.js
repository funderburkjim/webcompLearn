import {LitElement, html} from '../lit-element-2.3.1.js';

class MyArticle extends LitElement {
  render() {
    return html`
      <article>article</article>
    `;
  }
}
customElements.define('my-article', MyArticle);
