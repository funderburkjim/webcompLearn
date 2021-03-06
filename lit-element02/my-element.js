import {LitElement, html, css} from '../lit-element-2.3.1.js';

class MyElement extends LitElement {
  static get properties() {
    return {
      message: { type: String },
      myBool: { type: Boolean },
      myArray: { type: Array }
    };
  }
  // TODO: Add a static styles getter
  constructor() {
    super();
    this.message = 'Hello world! From my-element';
    this.myArray = ['an','array','of','test','data'];
    this.myBool = true;
  }
  static get properties() {
    return {
      message: { type: String },
      myArray: { type: Array },
      myBool: { type: Boolean }
    };
  }
  // to define styles with Lit-Element
static get styles() {
  return css`
    p {
      font-family: Roboto;
      font-size: 16px;
      font-weight: 500;
    }
    .red {
      color: red;
    }
    .blue {
      color: blue;
    }
  `;
}
  render() {
    return html`
      <h3>Today's message: ${this.message}</h3>
      <ul>${this.myArray.map(item => html`<li>${item}</li>`)}</ul>
      ${this.myBool ?
        html`<p>Render some HTML if myBool is true</p>` :
        html`<p>Render some other HTML if myBool is false</p>`}
      <button @click=${this.clickHandler}>Click</button>
      <!-- TODO: Add a styled paragraph -->
      <p class="${this.myBool?'red':'blue'}">styled paragraph</p>
    `;
  }
  clickHandler(event) {
    console.log(event.target);
    this.myBool = !this.myBool;
  }
}
customElements.define('my-element', MyElement);
