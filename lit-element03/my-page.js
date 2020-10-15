import {LitElement, html, css} from '../lit-element-2.3.1.js';

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
