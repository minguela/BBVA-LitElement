import { LitElement, html, css } from 'lit-element';

export class InputForm extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      text: { type: String },
      required: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        margin-bottom: 20px;
        display: block;
      }
      .form-field {
        display: block;
      }
      input {
        border: none;
        border-bottom: 1px solid grey;
      }
      .error {
        border-bottom: 1px solid red;
      }
    `;
  }

  constructor() {
    super();
    this.type = 'text';
    this.text = 'placeholder';
    this.required = false;
  }

  render() {
    return html`<div class="form-field">
      <input
        type="${this.type}"
        placeholder="${this.text}"
        aria-label="${this.text}"
        @blur="${this.handleState}"
      />
    </div>`;
  }

  firstUpdated() {
    this.input = this.shadowRoot.querySelector('input');
  }

  validEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  validPassword(value) {
    return value.length >= 8;
  }

  get invalid() {
    return this.hasAttribute('invalid');
  }

  set invalid(value) {
    if (!!value) {
      this.setAttribute('invalid', '');
    } else {
      this.removeAttribute('invalid');
    }
  }

  handleState(event) {
    if (!event.target.value && this.required) {
      this.invalid = true;
      this.input.classList.add('error');
    } else if (this.type === 'email' && !this.validEmail(event.target.value)) {
      this.invalid = true;
      this.input.classList.add('error');
    } else if (
      this.type === 'password' &&
      !this.validPassword(event.target.value)
    ) {
      this.invalid = true;
      this.input.classList.add('error');
    } else {
      this.invalid = false;
      this.input.classList.remove('error');
      this.sendValues({ type: this.type, value: event.target.value });
    }
  }

  sendValues({ type, value }) {
    const event = new CustomEvent('values', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        type,
        value,
      },
    });
    this.dispatchEvent(event);
  }
}
