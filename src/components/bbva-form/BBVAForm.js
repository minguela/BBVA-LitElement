import { LitElement, html, css } from 'lit-element';
import '../input-form/input-form.js';
import '../button/button-component.js';
import constants from '../../constants.js';

export class BBVAForm extends LitElement {
  static get properties() {
    return {
      image: { type: String, default: undefined },
    };
  }

  static get styles() {
    return css`
      img {
        display: block;
        width: 80px;
        margin: 0 auto 50px;
      }
    `;
  }

  constructor() {
    super();
    this.addEventListener('values', this.getValues);
  }

  get _inputForm() {
    return this.shadowRoot.querySelectorAll('input-form');
  }

  render() {
    let image;
    if (this.image) {
      image = html`<img src="${this.image}" alt="lock-image" />`;
    }
    return html`${image}
      <form id="submitForm">
        <input-form text="Email" type="email" required invalid></input-form>
        <input-form
          text="Password"
          type="password"
          required
          invalid
        ></input-form>
        <button-component
          @click="${this._handleForm}"
          class="primary"
          text="Log In"
          type="submit"
        ></button-component>
      </form>`;
  }

  getValues(e) {
    switch (e.detail.type) {
      case 'email':
        this.email = e.detail.value;
        break;
      case 'password':
        this.password = e.detail.value;
        break;
      default:
        break;
    }
  }

  async _handleForm(event) {
    event.preventDefault();
    let validForm = true;
    let userValid;
    this._inputForm.forEach(element => {
      if (element.hasAttribute('invalid')) validForm = false;
    });
    if (validForm) {
      await fetch(`${constants.api}/users`)
        .then(response => response.json())
        .then(data => {
          userValid = data.filter(
            item => item.email === this.email && item.password === this.password
          );
          userValid = userValid.length === 1 ? userValid[0] : undefined;
        });
      if (userValid) {
        await fetch(`${constants.api}/users/${userValid.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            last_connection: new Date(),
            logged_in: true,
          }),
        });
        window.location = `${constants.usersPage}?id=${userValid.id}`;
      }
    }
  }
}
