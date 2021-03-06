import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
import  './csl-input.js';
import  './my-app.js';
import './csl-citation.js';

class myApp1 extends LitElement {
  static get properties() {
    return {
     input: { type: String },
     key: {type: String }
     }
  }
  constructor() {
    super();
    this.input = 'slp1';
    this.key = '';
  }
  static get styles() {
    return [
    css`
.grid-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto;
}
.grid-item {
 width:400px;
 padding: 10px;
}
    `
    ];
  } // styles

  render() {
   //console.log('my-app1: input=',this.input);
   return html`
  <csl-input 
   input="${this.input}" style="display:inline-block; padding-left:10px;"
   @new-input="${(e) => {this.input=e.detail.input; ;}}" 

  ></csl-input>
  <csl-citation
   key="${this.key}" style="display:inline-block; padding-left:10px;"
   @new-citation="${(e) => {this.key=e.detail.key; ;}}" 

  ></csl-citation>

  <div class="grid-container" >
   <div class="grid-item" >
    <my-app id="app1"  suggest="yes" dict="mw"
    input="${this.input}"
    key="${this.key}"
    height="500px" style="position:absolute; width:400px;"
    > </my-app>
   </div>
   <div class="grid-item">
    <my-app id="app2" suggest="yes" dict="mw72"
    input="${this.input}"
    key="${this.key}"
    height="500px" style="position:absolute; width:400px;"
    > </my-app>
   </div>
  </div> 
  `;
  }

} // myApp1

if (!customElements.get('my-app1')) {
 customElements.define('my-app1', myApp1);
}
