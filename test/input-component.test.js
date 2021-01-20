import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/input-form/input-form.js';

describe('inputform', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<input-form></input-form>`);
  });

  it('renders a input', () => {
    const input = element.shadowRoot.querySelector('input');
    expect(input).to.exist;
    expect(input.ariaLabel.trim()).to.equal('placeholder');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
