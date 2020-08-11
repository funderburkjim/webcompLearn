import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
import {getwordStyles} from './getword_styles.js';

class cslGetword01 extends LitElement {
  static get styles() {
   return [
    getwordStyles,
    css`
     /*strong {font-size:48px;} */
    `
   ];
  }
  
  static get properties() {
    return {
      dict: { type: String },
      key:  { type: String },
      result: { type: String }
    };
  }

  constructor() {
    super();
    this.dict = 'md';
    this.key  = 'guru';
    this.result = 'working';
    this.done = false;
  }
  urlbaseF = function () {
  let origin = window.location.origin;  
  if (origin.indexOf("sanskrit-lexicon.uni-koeln.de") >= 0)  {
   return css`https://sanskrit-lexicon.uni-koeln.de/scans`;
  }else {
   //return origin + "/cologne";
   return css`http://localhost/cologne`;
  }
 }

  // Don't use connectedCallback() since it can't be async
  async firstUpdated() {
  const urlbase = this.urlbaseF();
  const url_apidev = `${urlbase}/csl-apidev`;

    //const baseurl = 'https://sanskrit-lexicon.uni-koeln.de/scans/csl-apidev/getword.php';
  const baseurl = `${url_apidev}/getword.php`;
    const url = `${baseurl}?dict=${this.dict}&key=${this.key}&dispopt=3`
    console.log('firstUpdated. url=',url);
    await fetch(url)
      .then(r => r.text())
      .then(async data => {
        console.log('firstUpdated result=',data);
        this.result = data;
        this.done = true;
      });
  }

  render() {
    const result=`${this.result}`;
    return html`
      <div id="CologneBasic">
        ${unsafeHTML(result)}
        
      </div>
    `;
  }
}

customElements.define('csl-getword', cslGetword01);
