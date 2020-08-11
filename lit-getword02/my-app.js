import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
//import {getwordStyles} from './getword_styles.js';

import  './csl-getword02.js';
import  './csl-citation.js';

class myApp extends LitElement {
  /* id ref:https://stackoverflow.com/questions/12378909/how-can-i-count-the-instances-of-an-object*/
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
      appname: { type: String },
    };
  }
  static currentId = 0;

  constructor() {
    super();
    this.key = '';
    this.dict = '';
    this.appname = ++myApp.currentId;
    console.log('my-app. appname = ',this.appname);
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     this.detail_appname = e.detail.appname;
     this.key = e.detail.key;
     console.log('my-app: appname=',this.appname,' new-citation=',this.key,e.detail.appname);
  }
  
  render() {
   console.log('my-app: render',this.key,this.dict,this.appname);
    return html`
   <div>
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${(e) => {this.newCitationListener(e);}}"
   ></csl-citation>
   ${((this.key != '') && (this.dict != ''))?
   html`
     <csl-getword  dict="${this.dict}" key="${this.key}" ></csl-getword>
   ` :
    html``} 
   </div>
 `;
 }
}

customElements.define('my-app', myApp);
//myApp.appcount = 1;