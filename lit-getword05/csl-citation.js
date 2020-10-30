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
      suggest: {type: String},
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
    this.suggest='no';  // or 'yes'
    this.dbg=false;
  }
  customEvent() {
   let new_event = new CustomEvent('new-citation',
    {detail: {key:this.key,appname:this.appname}
    });
   this.dispatchEvent(new_event);  // this. is needed. Not sure why
  }
  onReturnKey = (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    this.key = event.target.value
    var new_event = new CustomEvent('new-citation',
     {detail: {key:this.key,appname:this.appname}
     });
    this.dispatchEvent(new_event);  // this. is required  why?
  }
 }

  async onKeyup (event) {
    // User hits enter key. This finishes the search
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
    this.key="";
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
  urlbaseF = function () {
  return css`https://sanskrit-lexicon.uni-koeln.de/scans`;
  let origin = window.location.origin;  
  if (origin.indexOf("sanskrit-lexicon.uni-koeln.de") >= 0)  {
   return css`https://sanskrit-lexicon.uni-koeln.de/scans`;
  }else {
   //return origin + "/cologne";
   return css`http://localhost/cologne`;
  }
 }

  render() {
    if (this.dbg) {console.log('render: suggest comes in as',this.suggest);}
    //if(this.suggest === undefined) {this.suggest = 'no';}
    // Not sure why above statement does NOT always catch undefine
    if (this.suggest != 'yes') {this.suggest = 'no';}
    if (this.dbg) {console.log('csl-citation render. dict=',this.dict,this.suggest);}
    if (this.suggest == 'no') {
    return html`
 <div class="citationdiv">
  <input class="keyInput" type="text" name="key" size="20" value="${this.key}" 
   style="height:2.0em"
   placeholder="Search headword"
   @keyup=${this.onReturnKey} />
 </div>
 `;
    }
    return html`
    <div>

  <input class="keyInput" name="key" size="20" value="${this.key}" 
   style="height:2.0em" 
   list="lang"
   placeholder="Search headword"
   title="headword"
   @keyup=${this.onKeyup} /> 

    <datalist id="lang">
     ${this.datalist.map(item => 
      html`
       <option value="${item}"
       >${item}</option>
      `)}
    </datalist>
  </div>   

 `;
 }
}
if (!customElements.get('csl-citation')) {
customElements.define('csl-citation', cslCitation);}

