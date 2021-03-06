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
    this.key = event.target.value
    var new_event = new CustomEvent('new-citation',
     {detail: {key:this.key,appname:this.appname}
     });
    this.dispatchEvent(new_event);  // this. is required  why?
  }
 }
  render() {
    return html`
 <div class="citationdiv">
  <input class="keyInput" type="text" name="key" size="20" value="${this.key}" 
   style="height:2.0em"
   placeholder="Search headword"
   @keyup=${this.onReturnKey} />
 </div>
 `;
 }
}
if (!customElements.get('csl-citation')) {
customElements.define('csl-citation', cslCitation);}

