import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

//import './csl-getword02.js';
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
  }
  newCitationListener  = (e) => {
     e.stopPropagation();
     /*
     if (this.appname != detail_appname){
      return;
     }
     */
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
   elt.addEventListener('new-citation',this.newCitationListener);
  }
  disconnectedCallback() {
   super.disconnectedCallback();
   let elt = this.shadowRoot.getElementById('root');
   elt.removeEventListener('new-citation',this.newCitationListener);
  }
  
  firstUpdated(changedProperties) {
   this.addEventListener('new-citation',this.newCitationListener);
  }
  */
  render() {
   console.log('my-app: render',this.key,this.appname);
    return html`
   <div id="root">
<!-- This doesn't work
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${this.newCitationListener}"></csl-citation>
-->
<!-- this works
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${(e) => { console.log('my-app: e.detail=',e.detail) }}"></csl-citation>
-->
<!-- this works also
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${(e) => { console.log('my-app: e.detail=',e.detail) ; this.newCitationListener(e);}}"></csl-citation>
-->
   <csl-citation appname="${this.appname}" key="${this.key}"
    @new-citation="${(e) => {this.newCitationListener(e);}}"></csl-citation>

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