import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

import './csl-citation.js';

class myApp extends LitElement {
  static get styles() {
   return [
    css`

    `
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
      appname: { type: String },
      detail_appname: {type: String},
    };
  }
  static currentId = 0;

  constructor() {
    super();
    this.key = '';
    this.appname = ++myApp.currentId;
    console.log('my-app. appname = ',this.appname);
    addEventListener('new-citation',(e) => {this.newCitationListener(e);});
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     this.detail_appname = e.detail.appname;
     this.key = e.detail.key;
     console.log('my-app: appname=',this.appname,' new-citation=',this.key,e.detail.appname);
  }
/*  
  connectedCallback() {
  // https://20190108t174118-dot-polymer-lit-element.appspot.com/guide/events
   super.connectedCallback();
   let elt = this.shadowRoot.getElementById('root');
   console.log('connectedCallback: elt=',elt);
   elt=window;
   elt.addEventListener('new-citation',this.newCitationListener);
  }
  disconnectedCallback() {
   super.disconnectedCallback();
   let elt = this.shadowRoot.getElementById('root');
   elt=window;
   elt.removeEventListener('new-citation',this.newCitationListener);
  }
  
  firstUpdated(changedProperties) {
   this.addEventListener('new-citation',this.newCitationListener);
  }
  */
  render() {
   console.log('my-app: render',this.key,this.appname);
    return html`
   <div >
   <!--
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${(e) => {this.newCitationListener(e);}}"></csl-citation>
   -->
   <csl-citation appname="${this.appname}" key="${this.key}"></csl-citation>
   ${(this.key != '' )?
   html`
     <p>my-app: appname=${this.appname}, key=${this.key}</p>
     <p>detail_appname=${this.detail_appname}</p>
   ` :
    html`<p>my-app: key is empty</p>`} 
   </div>
 `;
 }
}

customElements.define('my-app', myApp);
myApp.appcount = 1;