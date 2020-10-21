import {html, render} from './lit-html.min.js';

const state = {
    targetDate:'2020-08-11',
    expectingFor:'operation'
}
const onTargetDateChanged = (event) => {
    state.targetDate = event.target.value;
    rerender(state);
};
const onExpectingForChanged  = (event) => {
    state.expectingFor = event.target.value;
    rerender(state);
};
//const targetDate = '2020-12-25';
function rerender(state) {
    const targetDate = state.targetDate;
    const expectingFor = state.expectingFor;
const days = Math.round((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
const template = html`
  <h2>adam-bar-demo3</h2>
    <p>
    <span class=${days < 30 ? 'soon' : '' }>${days} </span>
	days left to ${expectingFor}.
    </p>
    <p>
      My
	<input type="text" value=${expectingFor} @keyup=${onExpectingForChanged}/>
      start at
    <input type="date" value="${targetDate}" @change=${onTargetDateChanged}/>
    </p>
`;
// Render the template to the document
let elt = document.querySelector('#adam-bar-demo3');
render(template, elt);
} // rerender
//rerender('2020-08-25','holidays');  // initial call
rerender(state); // initial call

