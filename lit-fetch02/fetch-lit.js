import { html, css, LitElement } from '../lit-element-2.3.1.js';
/* Ref: https://stackoverflow.com/questions/56301613/how-to-do-ajax-callback-in-javascript
*/
class FetchLit extends LitElement {
  static get styles() {
    return css`
     * {color:red;}
    `;
  }

  static get properties() {
    return {
      users: { type: Array },
    };
  }

  constructor() {
    super();
    this.users = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@somewhere.com',
      },
    ];
  }

  // Don't use connectedCallback() since it can't be async
  async firstUpdated() {
    let url=`https://demo.vaadin.com/demo-data/1.0/people?count=10`;
    url = './vaadin_users.json';
    await fetch(url)
      .then(r => r.json())
// Not sure why stackoverflow has 'async'
// It seems to work without.
//      .then(async data => {   
      .then(data => {
        this.users = data.result;
      });
  }

  render() {
    return html`
      <ul>
        ${this.users.map(
          u =>
            html`
              <li>${u.lastName}, ${u.firstName} - ${u.email}</li>
            `,
        )}
      </ul>
    `;
  }
}

customElements.define('fetch-lit', FetchLit);
