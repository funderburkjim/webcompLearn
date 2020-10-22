import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
//import {getwordStyles} from './getword_styles.js';

import  './csl-getword02.js';
import  './csl-citation.js';
import  './csl-dict.js';

class myApp extends LitElement {
  static get styles() {
   return [
    //getwordStyles
    css`

    `
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
      dict: { type: String },
      servercode: { type: String }
    };
  }

  constructor() {
    super();
    this.key = '';
    this.dict = 'mw'; // default
    this.servercode='my-app-no-servercode';
    console.log('my-app. servercode = ',this.servercode);
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     this.key = e.detail.key;
  };
  newDictListener  = (e) => {
     e.stopPropagation();
     this.dict = e.detail.dict;
  }
  render() {
   console.log('my-app: render',this.key,this.dict,this.servercode);
    return html`
   <div>
    <csl-dict dict="${this.dict}"
     @new-dict="${ (e) => {this.newDictListener(e);}}"
    ></csl-dict>
   <csl-citation  key="${this.key}"
    @new-citation="${(e) => {this.newCitationListener(e);}}"
   ></csl-citation>
   ${((this.key != '') && (this.dict != ''))?
   html`
     <csl-getword  
      dict="${this.dict}" key="${this.key}" servercode="${this.servercode}">
     </csl-getword>
    ` :
    html``} 
   </div>
 `;
 }
}

customElements.define('my-app', myApp);
//myApp.appcount = 1;