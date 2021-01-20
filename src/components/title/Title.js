import { LitElement, html, css } from 'lit-element';

export class Title extends LitElement {
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
    this.text = 'Text';
  }

  render() {
    return html`<h1 aria-label="${this.text}">${this.text}</h1>`;
  }
}
