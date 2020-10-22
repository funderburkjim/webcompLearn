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
.grid-container {
  display: grid; 
  grid-gap: 10px;
  grid-template-rows: auto auto 1fr; 
  border: 2px solid black;
  border-radius:5px;
}

.first-item {
 grid-column: 1;
 grid-row: 1;
 padding-left:10px;
 padding-top:10px;
}
.second-item {
 grid-column: 1;
 grid-row: 2;
 padding-left:10px;
}
.last-item {
 grid-column: 1;
 grid-row: 3;

 position:relative;
 min-height:4em;
 padding-left:10px;

}
.last-item >div {
  position:absolute;
  top:0;
  left:0;
  right:0;
  max-height:100%; 
  overflow-y:auto ;
  overflow-x:hidden;
}

    `
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
      dict: { type: String },
      servercode: { type: String },
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
    return html`
   <div class="grid-container" >
    <div class="first-item">
     <csl-dict style="width:90%;"
      dict="${this.dict}"
      @new-dict="${ (e) => {this.newDictListener(e);}}"
     ></csl-dict>
    
    </div>
   <div class="second-item">
    <csl-citation 
     key="${this.key}"
     @new-citation="${(e) => {this.newCitationListener(e);}}"
    ></csl-citation>
  <hr style="width:95%;text-align:center;padding-right:10px;padding-left:10px">
   
   </div>
   ${((this.key != '') && (this.dict != ''))?
   html`
    <div class="last-item">
     <div>
      <csl-getword  
       dict="${this.dict}" key="${this.key}" servercode="${this.servercode}">
      </csl-getword>
     </div>
    </div>
    ` :
    html``} 
   </div>
 `;
 }
}

customElements.define('my-app', myApp);
