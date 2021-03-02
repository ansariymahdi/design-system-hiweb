import { r as registerInstance, h } from './index-379a56b8.js';
import { d as deleteIcon, m as menu, b as back } from './x-mark-a93cd096.js';

const sidebarAdminHiwebCss = ".host{position:fixed;top:0;right:0;bottom:0;background:#111;color:white;transition-property:width;transition-duration:0.5s;z-index:9999}h2{cursor:default}.open{width:18.75rem}.close{width:3.75rem}.hover{box-shadow:0 0 0 100vmax rgb(0 0 0 / 30%)}.close h2,.close h3{display:none}.close ul{margin-right:0}.img{height:2.5rem}.img svg{height:2.5rem;width:2.5rem;fill:red}.header{width:100%;height:3.75rem;padding:0.625rem;box-sizing:border-box;position:absolute;top:0;background:#222}.header .menu-icon{height:2.5rem;width:2.5rem;padding:0;float:right;cursor:pointer;position:relative}.burger{width:2.5rem;height:0.313rem;left:0px;right:0px;position:absolute}.b-1{background-color:white;top:0;left:0.938rem;width:1.563rem}.b-2{background-color:white;top:1.094rem}.b-3{background-color:white;bottom:0px;width:1.563rem}ul{list-style-type:none;margin:0.625rem 0.625rem 0.625rem 0;padding-right:0}li{white-space:nowrap;margin-bottom:20px;cursor:pointer;transition-duration:0.2s}.open li:hover{transform:translate(-0.4rem)}li .img{display:inline-block;vertical-align:top}li h3{display:inline-block;margin:0.625rem 0.625rem 0 0;vertical-align:top}.content{position:absolute;padding:0.625rem;box-sizing:border-box;top:3.75rem;width:100%;height:calc(100vh - 7.5rem);direction:rtl;text-align:right;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}.content::-webkit-scrollbar{display:none}.footer{width:100%;height:3.75rem;background:#222;position:absolute;bottom:0;padding:0.625rem;box-sizing:border-box}";

const icons = {
  'deleteIcon': deleteIcon,
};
const SideBarAdminHiweb = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.open = false;
    this.hover = false;
    this.toggleBar = () => {
      if (this.hover) {
        this.hover = false;
        this.open = false;
      }
      else {
        this.open = !this.open;
      }
    };
    this.mouseEnter = () => {
      this.hover = true;
    };
    this.mouseLeave = () => {
      this.hover = false;
    };
    this.renderItems = () => this.items.map(item => {
      return (h("div", null, h("h2", null, item.title), item.subtitle.map(subtitle => {
        return (h("ul", null, h("li", { onClick: () => this.onClick(subtitle.path) }, h("div", { class: "img", innerHTML: icons[subtitle.iconName] }), h("h3", null, subtitle.title))));
      })));
    });
    this.selectClass = () => {
      if (this.hover) {
        return 'open hover';
      }
      if (this.open) {
        return 'open';
      }
      return 'close';
    };
  }
  componentWillLoad() {
    this.items = JSON.parse(this.itemsProp);
    console.log(deleteIcon);
  }
  componentWillUpdate() {
  }
  render() {
    return (h("div", { class: 'host ' + this.selectClass(), onMouseLeave: this.mouseLeave, style: { background: this.contentcolor, color: this.textcolor } }, h("div", { class: "header", style: { background: this.headercolor } }, h("div", { class: "menu-icon", onClick: this.toggleBar }, h("div", { class: "img", innerHTML: menu }))), h("div", { class: "content" }, this.renderItems()), h("div", { class: "footer", onMouseEnter: this.mouseEnter, style: { background: this.headercolor } }, h("div", { class: "img", innerHTML: back }))));
  }
};
SideBarAdminHiweb.style = sidebarAdminHiwebCss;

export { SideBarAdminHiweb as sidebar_admin_hiweb };
