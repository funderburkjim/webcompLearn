import {html, render} from 'https://unpkg.com/lit-html?module';
const onTargetDateChanged = (event) => {
    rerender(event.target.value);
};
//const targetDate = '2020-12-25';
function rerender(targetDate) {
const days = Math.round((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
const template = html`
  <h2>adam-bar-demo2</h2>
    <p>
    <span class=${days < 30 ? 'soon' : '' }>${days} </span>
     days left to holiday
    </p>
    <p>
      My holidays start at
    <input type="date" value="${targetDate}" @change=${onTargetDateChanged}/>
    </p>
`;
// Render the template to the document
let elt = document.querySelector('#adam-bar-demo2');
render(template, elt);
} // rerender
rerender('2020-12-25');  // initial call

