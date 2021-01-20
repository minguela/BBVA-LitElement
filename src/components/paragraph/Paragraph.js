import { LitElement, html, css } from 'lit-element';

export class Paragraph extends LitElement {
  static get properties() {
    return {
      text: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`<p>${this.text}</p>`;
  }
}
