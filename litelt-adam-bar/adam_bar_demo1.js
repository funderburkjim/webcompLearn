// next fails
//import {LitElement} from "https://cdn.jsdelivr.net/npm/lit-element@2.3.1/lit-element.min.js";
//next does not fail
//import {LitElement, html, css} from "https://cdn.pika.dev/lit-element";
// next does not fail
// Ref: https://github.com/Polymer/lit-element/issues/603#issuecomment-565859359
//import {LitElement, html} from 'https://unpkg.com/lit-element?module';
import { html, css, LitElement,unsafeHTML } from '../lit-element-2.3.1.js';

class MyApp extends LitElement {
 constructor(targetDate,expectingFor) {
  super();
  this.targetDate = targetDate || '2020-08-15';
  this.expectingFor = expectingFor || 'holidays';
 }
 static get properties() {
  let state = {
   targetDate: {type: String},
   expectingFor: {type: String}
  };
  return state;
 }
 onTargetDateChanged = (event) => {
    this.targetDate = event.target.value;
 }
 onExpectingForChanged  = (event) => {
    this.expectingFor = event.target.value;
 }
 render() {
  const targetDate = this.targetDate;
  const expectingFor = this.expectingFor;
  const days = Math.round((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
  const template = html`
  <h2>adam-bar-demo3</h2>
    <p>
    <span class=${days < 30 ? 'soon' : '' }>${days} </span>
      days left to ${expectingFor}.
    </p>
    <p>
      My
      <input type="text" value=${expectingFor} @keyup=${this.onExpectingForChanged}/>
      start at
      <input type="date" value="${targetDate}" @change=${this.onTargetDateChanged}/>
    </p>
`;
  return template;
 } // render
}

customElements.define('my-app',MyApp);
