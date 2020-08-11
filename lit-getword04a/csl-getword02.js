import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
import {getwordStyles} from './getword_styles.js';
//export {cslGetword02};
//console.log('csl-getword02.js. getwordStyles=',getwordStyles);
class cslGetword02 extends LitElement {
  static get styles() {
   return [
    getwordStyles
   ];
  }
  
  static get properties() {
    return {
      dict: { type: String },
      key:  { type: String },
      input: { type: String },
      output: { type: String },
      accent: { type: String},
      result: { type: String },
      servercode: { type: String }
    };
  }

  constructor() {
    super();
    this.dict = 'md';
    this.key  = 'guru';
    this.input = 'slp1';
    this.output = 'iast';
    this.accent = 'no';
    this.result = '... working ...';
    this.dbg = false;
    // 'cologne is default or 'xampp' for local installation.
    this.servercode = 'cologne';  
    if (this.dbg) {console.log('csl-getword02 constructor. this.servercode=',this.servercode,this.dict);}
  }
  urlbaseF() {
  if (this.dbg) {console.log('csl-getword02. urlbaseF. servercode=',this.servercode,this.dict);}
  if (this.servercode == 'cologne') {
   return `https://sanskrit-lexicon.uni-koeln.de/scans`;
  }
  if (this.servercode == 'xampp') {
   return `http://localhost/cologne`;
  }
  if (this.dbg) {(`urlbaseF: unknown servercode =  ${this.servercode} `);}
  return `https://sanskrit-lexicon.uni-koeln.de/scans`;
 /*
  let origin = window.location.origin;  
  if (this.dbg) {console.log('csl-getword02: urlbaseF. origin = ',origin);}
  if (origin.indexOf("sanskrit-lexicon.uni-koeln.de") >= 0)  {
   return `https://sanskrit-lexicon.uni-koeln.de/scans`;
  }else {
   //return origin + "/cologne";
   return `http://localhost/cologne`;
  }
*/
 }

  // Don't use connectedCallback() since it can't be async
  //async firstUpdated() {
  async updated() {
  const urlbase = this.urlbaseF();
  if (this.dbg) {console.log('csl-getword02: urlbase=',urlbase);}
  const url_apidev = `${urlbase}/csl-apidev`;

    //const baseurl = 'https://sanskrit-lexicon.uni-koeln.de/scans/csl-apidev/getword.php';
  const baseurl = `${url_apidev}/getword.php`;
    const url = `${baseurl}?dict=${this.dict}&key=${this.key}&input=${this.input}&output=${this.output}&dispopt=3`
    if (this.dbg) {('updated. url=',url);}
    await fetch(url)
      .then(r => r.text())
      .then(async data => {
        if (this.dbg) {console.log('csl-getword02: updated result=','found');}
        this.result = data;
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

customElements.define('csl-getword', cslGetword02);
