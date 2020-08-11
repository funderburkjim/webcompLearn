import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
import {getwordStyles} from './getword_styles.js';

class cslCitation extends LitElement {
  static get styles() {
   return [
    getwordStyles
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
    };
  }

  constructor() {
    super();
 
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
  async unused_firstUpdated() {
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
        //this.done = true;
      });
  }

  render() {
    //const result=`${this.result}`;
    return html`
      <div id="citationdiv">
  citation:&nbsp;
  <input type="text" name="key" size="20" id="key" value="" 
    style="height:2.0em"/>
 </div>
      
    `;
  }
}

customElements.define('csl-citation', cslCitation);
