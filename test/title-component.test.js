import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/title/title-component.js';

describe('titleComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<title-component></title-component>`);
  });

  it('renders a title', () => {
    const title = element.shadowRoot.querySelector('h1');
    expect(title).to.exist;
    expect(title.textContent.trim()).to.equal('Text');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
