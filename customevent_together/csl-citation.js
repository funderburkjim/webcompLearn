import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';
//import {getwordStyles} from './getword_styles.js';
export {cslCitation};
class cslCitation extends LitElement {
  static get styles() {
   return [
    //getwordStyles
    css``
   ];
  }
  
  static get properties() {
    return {
      key:  { type: String },
      appname: { type: String }
    };
  }

  constructor() {
    super();
    this.key='';
    this.appname='csl-citation';
 
  }
  onReturnKey = (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    //document.getElementById("myBtn").click();
    this.key = event.target.value
    console.log('csl-citation: appname=',this.appname,'You entered word ',this.key);
   
    var new_event = new CustomEvent('new-citation',
     {detail: {key:this.key,appname:this.appname}
     });
    //this.dispatchEvent(new_event);   //  this doesn't work at all!
    //window.dispatchEvent(new_event);  // this works
    dispatchEvent(new_event);  // This seems to work same as window.dispatchEvent
  } 
 }
  render() {
    return html`
 <div class="citationdiv">
  citation:&nbsp;
  <input class="keyInput" type="text" name="key" size="20" value="${this.key}" 
   style="height:2.0em"
   @keyup="${this.onReturnKey}" /> (appname=${this.appname})
 </div>
 `;
 }
}
if (!customElements.get('csl-citation')) {
customElements.define('csl-citation', cslCitation);}

