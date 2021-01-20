import { LitElement, html, css } from 'lit-element';

export class InputForm extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      text: { type: String },
      required: { type: Boolean },
      invalid: { type: Boolean, reflect: true },
      textError: { type: String, attribute: 'text-error' },
    };
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        max-width: 150px;
        padding-bottom: 20px;
        margin: 0 auto;
      }
      .form-field {
        display: block;
      }
      input {
        max-width: 150px;
        width: 100%;
        padding: 1px 0;
        border: none;
        border-bottom: 1px solid grey;
      }
      .error {
        border-bottom: 1px solid red;
      }
      p {
        position: absolute;
        top: 22px;
        padding-left: 2px;
        margin: 0;
        font-size: 12px;
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.type = 'text';
    this.text = 'placeholder';
    this.required = false;
    this.invalid = false;
    this.textError = '';
  }

  render() {
    return html`<div class="form-field">
      <input
        type="${this.type}"
        placeholder="${this.text}"
        aria-label="${this.text}"
        @blur="${this.handleState}"
      />
      <p ?hidden="${!this.invalid}">${this.textError}</p>
    </div>`;
  }

  firstUpdated() {
    this.input = this.shadowRoot.querySelector('input');
  }

  static validEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  static validPassword(value) {
    return value.length >= 0;
  }

  handleState(event) {
    if (!event.target.value && this.required) {
      this.invalid = true;
      this.input.classList.add('error');
    } else if (
      this.type === 'email' &&
      !InputForm.validEmail(event.target.value)
    ) {
      this.invalid = true;
      this.input.classList.add('error');
    } else if (
      this.type === 'password' &&
      !InputForm.validPassword(event.target.value)
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
