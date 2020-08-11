import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
//import {getwordStyles} from './getword_styles.js';

import  './csl-getword02.js';
import  './csl-citation.js';
import  './csl-dict.js';

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
.grid-container>div {
/*
  border: 1px solid blue;
  border-radius: 5px;
*/
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
      appname: { type: String },
      servercode: { type: String },
      height: {type: String }
    };
  }
  static currentId = 0;

  constructor() {
    super();
    this.key = '';
    this.dict = 'mw'; // default
    this.appname = ++myApp.currentId;
    this.servercode='my-app-no-servercode';
    this.height='400px';
    console.log('my-app. appname = ',this.appname);
    console.log('my-app. servercode = ',this.servercode);
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     this.detail_appname = e.detail.appname;
     this.key = e.detail.key;
     console.log('my-app: appname=',this.appname,' new-citation=',this.key,e.detail.appname);
  };
  newDictListener  = (e) => {
     e.stopPropagation();
     //this.detail_appname = e.detail.appname;
     this.dict = e.detail.dict;
     console.log('my-app: appname=',this.appname,' new-dict=',this.dict);
  }
  render() {
   console.log('my-app: render',this.key,this.dict,this.appname,this.servercode);
    return html`
   <div class="grid-container" style="height:${this.height};">
    <div class="first-item">
     <csl-dict style="width:90%;"
      dict="${this.dict}"
      @new-dict="${ (e) => {this.newDictListener(e);}}"
     ></csl-dict>
    
    </div>
   <div class="second-item">
    <!-- <p> This is for csl-citation </p> -->
    
    <csl-citation 
     appname="${this.appname}" key="${this.key}"
     @new-citation="${(e) => {this.newCitationListener(e);}}"
    ></csl-citation>
     <!--<hr style="padding-left:50px;">-->
 <hr style="width:95%;text-align:center;padding-right:10px;padding-left:10px">
   
   </div>
   ${((this.key != '') && (this.dict != ''))?
   html`
    <div class="last-item">
     <div>
<!--
 Last item
<br>I<br>want<br>this<br>to<br>scroll<br>rather<br>than<br>making<br>everything<br>tall
<br>I<br>want<br>this<br>to<br>scroll<br>rather<br>than<br>making<br>everything<br>tall
<br>I<br>want<br>this<br>to<br>scroll<br>rather<br>than<br>making<br>everything<br>tall
<br>I<br>want<br>this<br>to<br>scroll<br>rather<br>than<br>making<br>everything<br>tall
<br>I<br>want<br>this<br>to<br>scroll<br>rather<br>than<br>making<br>everything<br>tall
   -->

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
//myApp.appcount = 1;