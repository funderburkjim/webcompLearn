import {LitElement, html, until, css} from '../lit-element-2.3.1.js';

class MyElement extends LitElement {
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
    dbg: {type: String}
    //datalistComplete : {type: Boolean}
   };
  }

  constructor() {
   super();
   this.value = '';
   this.datalist = [
	
       ];
   this.dbg="";
  } // constructor

  customEvent() {
   let new_event = new CustomEvent('new-key',
    {detail: {input:this.dbg}
    });
   this.dispatchEvent(new_event);  // this. is needed. Not sure why
  }

  async onKeyupF (event) {
    //event.preventDefault();
    let value = event.target.value;
    this.value=value;
    //console.log('onKeyupF: new value =',value);
    if (value == '') {
     this.dbg = ""; 
     this.customEvent();
     this.requestUpdate();
     return;
    }
    // User hits enter key. This finishes the search
    //console.log('value in datalist=',(this.datalist.includes(value)),value,this.datalist);
    //if ((event.keyCode === 13) || (this.datalist.includes(value))) {
    if ((event.keyCode === 13) ) {
     // the second condition may be undesireable when some
     // elements of the datalist are prefixes of other elements.
     this.dbg = `${this.value}`;
     event.target.blur(); // causes option to stop
     this.requestUpdate();
     this.customEvent();
     return;
    }
    this.dbg="";
    if (value.length < 2) {
     this.dbg="";
     this.requestUpdate();
     return;
    }
    let url = `getlang.php?l=${this.value}`;
    await fetch(url)
      .then(r => r.json())
      .then(async data => {
        this.datalist = data;
        })
      .then(() => this.requestUpdate());
  }

/*
    await fetch(url)
      .then(r => r.json())
      .then(async data => {
        this.datalist = data;
      });
    this.requestUpdate();
*/

  urlbaseF() {
  console.log('csl-getword02. urlbaseF. servercode=',this.servercode,this.dict);
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
    return html`
    <div>
    <input name="cod" id="cod" list="lang" autofocus autocomplete="off" aria-autocomplete="list" placeholder="Enter html element" 
     @keyup=${this.onKeyupF}
     />
    <datalist id="lang">
     ${this.datalist.map(item => 
      html`
       <option value="${item}"
       >${item}</option>
      `)}
    </datalist>
    <!-- <label id="lblSel">${this.dbg}</label>   -->
</div>   
    `;
  }

  handleEvent(e) { // not used
   console.log(`Event type: ${e.type}, `,e);
  }

}
customElements.define('my-element', MyElement);
