//import {html, render} from 'https://unpkg.com/lit-html?module';
// $ curl https://unpkg.com/lit-html@1.3.0/lit-html.js -o lit-html.js
// Doesn't work. import { html, render } from '../lit-element-2.3.1.js';
import {html, render} from './lit-html.min.js';

const library = 'lit-html';
const template = html`
  <h2>adam-bar-demo1</h2>
    <p>Hello from ${library}</p>
`;
// Render the template to the document
let elt = document.querySelector('#adam-bar-demo1');
render(template, elt);
