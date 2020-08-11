import {LitElement, html, until, css} from '../lit-element-2.3.1.js';

class cslCitation extends LitElement {
  static get styles() {
   return [
    css`
/* using normalize.css in settings */
body {
  background: #c9c9f5;
  box-sizing: border-box;
  font: 1.1rem  "Open Sans", sans-serif;
}
body * {
  box-sizing: inherit;
  font: inherit;
}
.wrapper {
  width: 600px;
  margin: 20px auto;
}
.lblTitle {
  display: block;
  margin-bottom: 12px;
  cursor: pointer;
  font-weight: 600;
}
#lblSel {
  margin-left: 5px;
}
p {
  font-size: 0.875em;
  margin-top: 80px;
}
input[list="lang"] {
  padding: 5px;
  width: 12.5em;
  border: 1px solid #aaa;
  background: #eee;
}
select[name="lang_sel"] {
  /* for Safari iOS */
  width: 12.5em;
  margin: 0;
  margin-left: -12.5em;
}
    `
   ];
  }
  static get_properties() {
   return {
    value: {type: String},
    datalist: {type: Array},
    servercode: {type: String},
    dict: {type: String},
    input: {type: String},
    key: {type: String},
    appname: {type: String}
    //datalistComplete : {type: Boolean}
   };
  }

  constructor() {
   super();
   this.value = '';
   this.datalist = [  ];
   this.key="";
   this.dict="mw";
   this.input="slp1";
   this.servercode = "cologne"; //"xampp";
   this.appname='csl-citation';
  } // constructor

  customEvent() {
   let new_event = new CustomEvent('new-citation',
    {detail: {key:this.key,appname:this.appname}
    });
   this.dispatchEvent(new_event);  // this. is needed. Not sure why
  }

  async onReturnKey (event) {
    //event.preventDefault();
    let value = event.target.value;
    this.value=value;
    //console.log('onKeyupF: new value =',value);
    if (value == '') {
     this.key = ""; 
     this.customEvent();
     this.requestUpdate();
     return;
    }
    // User hits enter key. This finishes the search
    if ((event.keyCode === 13) ) {
     // the second condition may be undesireable when some
     // elements of the datalist are prefixes of other elements.
     this.key = `${this.value}`;
     event.target.blur(); // causes option to stop
     this.requestUpdate();
     this.customEvent();
     return;
    }
    this.key="";
    if (value.length < 2) {
     this.key="";
     this.requestUpdate();
     return;
    }
    const urlbase = this.urlbaseF();
    const url_apidev = `${urlbase}/csl-apidev`;
    const baseurl = `${url_apidev}/getsuggest.php`;
    console.log('this.dict=',this.dict);
    let url = `${baseurl}?dict=${this.dict}&input=${this.input}&term=${this.value}`;
    console.log('fetch from url',url);
    await fetch(url)
      .then(r => r.json())
      .then(async data => {
        this.datalist = data;
        //console.log('return data=',data);
        })
      .then(() => this.requestUpdate());
  }


  urlbaseF() {
  //console.log('csl-getword02. urlbaseF. servercode=',this.servercode);
  if (this.servercode == 'cologne') {
   return `https://sanskrit-lexicon.uni-koeln.de/scans`;
  }
  if (this.servercode == 'xampp') {
   return `http://localhost/cologne`;
  }
  console.log(`urlbaseF: unknown servercode =  ${this.servercode} `);
  return `https://sanskrit-lexicon.uni-koeln.de/scans`;

 }


  render() {
//      @keyup=${this.onKeyupF}
//@mouseup="${(e) => this.handleEvent(e)}"
// Attaching this to the <option> element has no effect
// While it does as expected with attached to <input> element.
    console.log('csl-citation render. dict=',this.dict);
    return html`
    <div>
<!--
    <input name="cod" id="cod" list="lang" autofocus autocomplete="off" aria-autocomplete="list" placeholder="Search headword" 
     @keyup=${this.onKeyupF}
     />
-->
  <input class="keyInput" name="key" size="20" value="${this.key}" 
   style="height:2.0em" 
   list="lang"
   placeholder="Search headword"
   @keyup=${this.onReturnKey} /> [csl-citation: ${this.dict} ${this.input}]

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
customElements.define('csl-citation', cslCitation);
