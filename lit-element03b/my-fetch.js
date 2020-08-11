import {LitElement, html, until} from '../lit-element-2.3.1.js';

class MyFetch extends LitElement {

  render() {
    const content = fetch('./fetchContent.txt').then(r => r.text());

    return html`
      ${until(content, html`<span>Loading...</span>`)}
    `;
  }
}
customElements.define('my-fetch', MyFetch);
