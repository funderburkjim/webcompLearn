import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
//import {getwordStyles} from './getword_styles.js';

import  './csl-getword02.js';
import  './csl-citation.js';
import  './csl-dict.js';
import  './csl-input.js';
import  './csl-output.js';

class myApp extends LitElement {
  /* id ref:https://stackoverflow.com/questions/12378909/how-can-i-count-the-instances-of-an-object*/
  static get styles() {
/* to get the 3rd (csl-getword) element to scroll, used reference
https://stackoverflow.com/questions/43352501/css-grid-content-to-use-free-space-but-scroll-when-bigger
*/

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
      input: { type: String },
      output: { type: String },
      appname: { type: String },
      servercode: { type: String },
      height: {type: String },
      suggest: {type: String},
      dbg: {type: Boolean}
    };
  }
  static currentId = 0;

  constructor() {
    super();
    this.key = '';
    this.dict = 'mw'; // default
    this.input = 'slp1';
    this.output = 'iast';
    this.appname = ++myApp.currentId;
    this.servercode='my-app-no-servercode';
    this.height='400px';
    this.suggest='no'; // default
    this.dbg=false;
    if(this.dbg) {console.log('my-app. appname = ',this.appname);}
    if(this.dbg) {console.log('my-app. servercode = ',this.servercode);}
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     this.detail_appname = e.detail.appname;
     this.key = e.detail.key;
     if(this.dbg) {console.log('my-app: appname=',this.appname,' new-citation=',this.key,e.detail.appname);}
  };
  newDictListener  = (e) => {
     e.stopPropagation();
     //this.detail_appname = e.detail.appname;
     this.dict = e.detail.dict;
     if(this.dbg) {console.log('my-app: appname=',this.appname,' new-dict=',this.dict);}
  }
  
  render() {
   if(this.dbg) {console.log('my-app: render',this.key,this.dict,this.appname,this.servercode);}
   if(this.dbg) {console.log('my-app: render. input/output=',this.input,this.output);}
    return html`
   <div class="grid-container" style="height:${this.height};">
    <div class="first-item">
     <csl-dict style="width:90%;"
      dict="${this.dict}"
      @new-dict="${ (e) => {this.newDictListener(e);}}"
     ></csl-dict>
    
    </div>
   <div class="second-item">
    
     <csl-input input="${this.input}" style="display:inline-block;"
      @new-input="${(e) => {this.input=e.detail.input; ;}}" >
     </csl-input>
     <csl-output output="${this.output}" style="display:inline-block"
      @new-output="${(e) => {this.output=e.detail.output; ;}}" >
     </csl-output>
    
    <csl-citation 
     appname="${this.appname}" key="${this.key}"
     dict="${this.dict}" input="${this.input}"
     suggest="${this.suggest}"
     @new-citation="${(e) => {this.newCitationListener(e);}}"
    ></csl-citation> 
    <!-- [my-app: ${this.dict} ${this.input}] for debugging -->
    
 <hr style="width:95%;text-align:center;padding-right:10px;padding-left:10px">
   
   </div>
   ${((this.key != '') && (this.dict != ''))?
   html`
    <div class="last-item">
     <div>
      <csl-getword  
       dict="${this.dict}" key="${this.key}"
       input="${this.input}" output="${this.output}" 
      servercode="${this.servercode}">
      </csl-getword>
     </div>
    </div>
    ` :
    html``} 
   </div>
 `;
 }
}
if (!customElements.get('my-app')) {
customElements.define('my-app', myApp);
}