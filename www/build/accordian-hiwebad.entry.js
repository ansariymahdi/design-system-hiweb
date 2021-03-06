import { r as registerInstance, h, e as Host } from './index-9f89ab65.js';

const accordianHiwebadCss = ":host{display:block}";

const AccordianHiwebad = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
AccordianHiwebad.style = accordianHiwebadCss;

export { AccordianHiwebad as accordian_hiwebad };
