import { LitElement, html, css } from 'lit-element';

export class Button extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      type: { type: String },
      class: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 20px;
        text-align: center;
      }
      :host(.primary) button {
        width: 100%;
        padding: 5px 0;
        border: none;
        border-radius: 4px;
        color: white;
        background-color: #14549c;
      }
      :host(.secondary) button {
        width: 120px;
      }
    `;
  }

  constructor() {
    super();
    this.text = 'Submit';
    this.type = 'button';
    this.class = 'primary';
  }

  render() {
    return html`<button class="${this.class}" type="submit">
      ${this.text}
    </button>`;
  }
}
