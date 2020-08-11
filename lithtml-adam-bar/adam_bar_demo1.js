import {html, render} from 'https://unpkg.com/lit-html?module';
//import { html, render } from '../lit-element-2.3.1.js';

const library = 'lit-html';
const template = html`
  <h2>adam-bar-demo1</h2>
    <p>Hello from ${library}</p>
`;
// Render the template to the document
let elt = document.querySelector('#adam-bar-demo1');
render(template, elt);
