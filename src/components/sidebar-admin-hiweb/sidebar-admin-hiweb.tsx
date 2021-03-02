import { Component, h, Prop, State } from '@stencil/core';

import deleteIcon from '../../assets/icons/x-mark.svg';
import menu from '../../assets/icons/menu.svg';
import back from '../../assets/icons/back.svg';

const icons = {
  'deleteIcon': deleteIcon,
};

@Component({
  tag: 'sidebar-admin-hiweb',
  styleUrl: 'sidebar-admin-hiweb.css',
  shadow: true,
})
export class SideBarAdminHiweb {
  @Prop() open: boolean = false;
  @State() hover: boolean = false;
  @Prop({ attribute: 'items' }) itemsProp: string;
  @Prop() contentcolor;
  @Prop() headercolor;
  @Prop() textcolor;
  @Prop() onClick;
  @State() items;

  componentWillLoad() {
    this.items = JSON.parse(this.itemsProp);
    console.log(deleteIcon);

  }

  componentWillUpdate() {
  }

  toggleBar = () => {
    if (this.hover) {
      this.hover = false;
      this.open = false;
    } else {
      this.open = !this.open;
    }
  }

  mouseEnter = () => {
    this.hover = true;
  }
  mouseLeave = () => {
    this.hover = false;
  }

  renderItems = () => this.items.map(item => {
    return (
      <div>
        <h2>{item.title}</h2>
        {item.subtitle.map(subtitle => {
          return (
            <ul>
              <li onClick={() => this.onClick(subtitle.path)}>
                <div class="img" innerHTML={icons[subtitle.iconName]} />
                <h3>{subtitle.title}</h3>
              </li>
            </ul>
          )
        })}
      </div>
    );
  });

  selectClass = () => {
    if (this.hover) {
      return 'open hover';
    }
    if (this.open) {
      return 'open';
    }
    return 'close';
  }

  render() {
    return (
      <div
        class={'host ' + this.selectClass()}
        onMouseLeave={this.mouseLeave}
        style={{background: this.contentcolor, color: this.textcolor}}
      >
        <div class="header" style={{background: this.headercolor}}>
          <div class="menu-icon" onClick={this.toggleBar}>
            <div class="img" innerHTML={menu} />
          </div>
        </div>
        <div class="content">
          {this.renderItems()}
        </div>
        <div
          class="footer"
          onMouseEnter={this.mouseEnter}
          style={{background: this.headercolor}}
        >
          <div class="img" innerHTML={back} />
        </div>
      </div>
    );
  }

}
