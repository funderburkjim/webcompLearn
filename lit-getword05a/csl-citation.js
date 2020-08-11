import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

class cslCitation extends LitElement {
  static get styles() {
   return [
    css``
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
      appname: { type: String },
      dict: { type: String},
      input: { type: String},
      datalist: {type: Array},
      oldval: {type: String},
      value: {type: String},
      dbg: Boolean
    };
  }

  constructor() {
    super();
    this.key='';
    this.appname='csl-citation';
    this.dict="";
    this.input="";
    this.datalist=[];
    this.oldval='';
    this.value='';
    this.dbg=false;
  }
  customEvent() {
   let new_event = new CustomEvent('new-citation',
    {detail: {key:this.key,appname:this.appname}
    });
   this.dispatchEvent(new_event);  // this. is needed. Not sure why
   //this.datalist = [];  // not sure why needed
  }

  async onKeyup (event) {
    // User hits enter key. This finishes the search
    if (this.dbg) {console.log('csl-citation.onKeyup. keyCode=',event.keyCode);}
    if ((event.keyCode === 13) ) {
     // the second condition may be undesireable when some
     // elements of the datalist are prefixes of other elements.
     this.key = this.value;
     event.target.blur(); // causes option to stop
     //this.requestUpdate();
     this.customEvent();
     return;
    }
    event.preventDefault();
    let value = event.target.value;
    if (this.dbg) {console.log('csl-citation.onKeyup:old/new value=',this.oldval,value);}
    if (value == this.oldval) {return;}
    this.oldval = value;
    this.value=value;
    if (this.dbg) {console.log('onKeyup: new value =',value);}
    if (value == '') {
     this.key = ""; 
     this.customEvent();
     //this.requestUpdate();
     return;
    }
    //this.key=""; //?
    if (value.length < 2) {
     return;
    }

    const urlbase = this.urlbaseF();
    const url_apidev = `${urlbase}/csl-apidev`;
    const baseurl = `${url_apidev}/getsuggest.php`;
    if (this.dbg) {console.log('this.dict=',this.dict);}
    let url = `${baseurl}?dict=${this.dict}&input=${this.input}&term=${this.value}`;
    if (this.dbg) {console.log('fetch from url',url);}
    await fetch(url)
      .then(r => r.json())
      .then(async data => {
        this.datalist = data;
        if (this.dbg) {console.log('return data=',data);}
        })
      /*.then(() => this.requestUpdate());*/
  }
  urlbaseF() {
  //console.log('csl-getword02. urlbaseF. servercode=',this.servercode);
  if (this.servercode == 'cologne') {
   return `https://sanskrit-lexicon.uni-koeln.de/scans`;
  }
  if (this.servercode == 'xampp') {
   return `http://localhost/cologne`;
  }
  if (this.dbg) {console.log(`urlbaseF: unknown servercode =  ${this.servercode} `);}
  return `https://sanskrit-lexicon.uni-koeln.de/scans`;

 }

  render() {
   /* Below '.value="${this.key}" ' sets the PROPERTY of the input element.
      Ref: https://github.com/Polymer/lit-element/issues/144#issuecomment-435919928
   */
    if (this.dbg) {
     console.log('csl-citation render. dict=',this.dict,this.key,this.appname);
    }
    return html`
    <div>

  <input name="key" size="20" .value="${this.key}" 
   style="height:2.0em" autocomplete="off"
   list="lang"
   placeholder="Search headword"
   @keyup=${this.onKeyup} /> 

    <datalist id="lang">
     ${this.datalist.map(item => 
      html`
       <option value="${item}"
        @keyup="(e) => {console.log('csl-citation: keyup over option';}"
       >${item}</option>
      `)}
    </datalist>
  </div>   

 `;
 }
}
if (!customElements.get('csl-citation')) {
customElements.define('csl-citation', cslCitation);}

