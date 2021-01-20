import { LitElement, html } from 'lit-element';
import '../counter/counter-up.js';
import '../button/button-component.js';
import '../title/title-component.js';
import '../paragraph/paragraph-component.js';
import constants from '../../constants.js';

export class BBVAUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      title: { type: String },
      paragraph: { type: String },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.title = 'Welcome';
    this.paragraph = 'The last time you accessed was';
  }

  async firstUpdated() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) BBVAUser.redirect();
    await this._getUser(id);
    if (!this.user || !this.user.logged_in) BBVAUser.redirect();
  }

  render() {
    return html`<title-component text="${this.title}"></title-component>
      <paragraph-component text="${this.paragraph}"></paragraph-component>
      <counter-up date="${this.user.last_connection}"></counter-up>
      <button-component
        class="primary secondary"
        text="Logout"
        @click="${this._logout}"
      ></button-component>`;
  }

  static redirect() {
    window.location = `${constants.loginPage}`;
  }

  async _logout() {
    await fetch(`${constants.api}/users/${this.user.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logged_in: false,
      }),
    });
    BBVAUser.redirect();
  }

  async _getUser(id) {
    await fetch(`${constants.api}/users/${id}`)
      .then(response => response.json())
      .then(data => {
        this.user = data;
        this.title = `Welcome ${this.user.name}`;
      });
  }
}
