import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/button/button-component.js';

describe('ButtonComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<button-component></button-component>`);
  });

  it('renders a button', () => {
    const button = element.shadowRoot.querySelector('button');
    expect(button).to.exist;
    expect(button.textContent.trim()).to.equal('Submit');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
