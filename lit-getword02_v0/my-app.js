import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

import  './csl-getword02.js';
import  './csl-citation.js';

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
      appname: { type: String },
    };
  }
  /* id ref:https://stackoverflow.com/questions/12378909/how-can-i-count-the-instances-of-an-object*/
  static currentId = 0;

  constructor() {
    super();
    this.key = '';
    this.dict = '';
    this.appname = ++myApp.currentId;
    console.log('my-app. appname = ',this.appname);
   addEventListener('new-citation',
     (e) => {
     e.stopPropagation();
     let detail_appname = e.detail.appname;
     if (this.appname != detail_appname){
      return;
     }
     this.key = e.detail.key;
     console.log('my-app: appname=',this.appname,' new-citation=',this.key,this.dict, detail_appname);
   });
  }
  render() {
   console.log('my-app: render',this.key,this.dict,this.appname);
    return html`
   <div>
   <csl-citation appname="${this.appname}" key="${this.key}"></csl-citation>
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
