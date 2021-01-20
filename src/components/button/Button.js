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
        width: var(--btn-primary-width);
        padding: var(--btn-primary-padding);
        border: var(--btn-primary-border);
        border-radius: var(--btn-primary-border-radius);
        color: var(--btn-primary-color);
        background-color: var(--btn-primary-background-color);
      }
      :host(.secondary) button {
        width: var(--btn-secondary-width);
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
