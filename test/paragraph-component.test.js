import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/paragraph/paragraph-component.js';

describe('paragraphComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<paragraph-component></paragraph-component>`);
  });

  it('renders a paragraph', () => {
    const paragraph = element.shadowRoot.querySelector('p');
    expect(paragraph).to.exist;
    expect(paragraph.textContent.trim()).to.equal('');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
