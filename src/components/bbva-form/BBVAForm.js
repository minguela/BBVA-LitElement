import { LitElement, html, css } from 'lit-element';
import '../input-form/input-form.js';
import '../button/button-component.js';
import constants from '../../constants.js';

export class BBVAForm extends LitElement {
  static get properties() {
    return {
      image: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      svg {
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
      image = html`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .cls-1 {
              fill: #14549c;
            }
          </style>
        </defs>
        <title />
        <g data-name="Layer 13" id="Layer_13">
          <path
            class="cls-1"
            d="M25,31H7a3,3,0,0,1-3-3V17a3,3,0,0,1,3-3H25a3,3,0,0,1,3,3V28A3,3,0,0,1,25,31ZM7,16a1,1,0,0,0-1,1V28a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V17a1,1,0,0,0-1-1Z"
          />
          <path
            class="cls-1"
            d="M24,16H8a1,1,0,0,1-1-1V9a8,8,0,0,1,8-8h2a8,8,0,0,1,8,8v6A1,1,0,0,1,24,16ZM9,14H23V9a6,6,0,0,0-6-6H15A6,6,0,0,0,9,9Z"
          />
          <path class="cls-1" d="M16,23a2,2,0,1,1,2-2A2,2,0,0,1,16,23Zm0-2Z" />
          <rect class="cls-1" height="4" width="2" x="15" y="22" />
        </g>
      </svg>`;
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
