import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

import icons from './../../modules/iconsList';

@Component({
  tag: 'sidebar-admin-hiweb',
  styleUrl: 'sidebar-admin-hiweb.scss',
  shadow: true,
})
export class SideBarAdminHiweb {
  @Prop() open: boolean = false;
  @State() hover: boolean = false;
  @Prop({ attribute: 'itemsString' }) itemsStringProp: string;
  @Prop({ attribute: 'items' }) itemsProp: any;
  @Prop() contentcolor;
  @Prop() headercolor;
  @Prop() textcolor;
  @Event() onClick: EventEmitter;
  @State() items;
  @Prop() isDarkTheme: boolean;
  @State() switch: boolean;
  @Event() toggleTheme: EventEmitter;

  componentWillLoad() {
    console.log('items',this.itemsProp);

    if (this.itemsStringProp) {
      this.items = JSON.parse(this.itemsStringProp);
    } else {
      this.items = this.itemsProp;
    }
    if (this.isDarkTheme) {
      this.switch = !this.isDarkTheme;
    } else {
      this.switch = false;
    }

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
    console.log(this.open);

    if (!this.open) {
      this.hover = true;
    }

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
              <li onClick={() => this.onClick.emit(subtitle.path)}>
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

  applyTheme = () => {
    if (this.switch) {
      return 'light';
    }
    return 'dark';
  }

  toggleSwitch = () => {
    this.switch = !this.switch;
    this.toggleTheme.emit(this.switch);
  }

  render() {
    return (
      <div
        class={'host ' + this.selectClass() + ' ' + this.applyTheme()}
        onMouseLeave={this.mouseLeave}
        style={{background: this.contentcolor, color: this.textcolor}}
      >
        <div class="header" style={{background: this.headercolor}}>
          <div class="menu-icon" onClick={this.toggleBar}>
            <div class="img" innerHTML={icons['menu']} />
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
          <div class="theme-container">
            <div class="switch">
              <div
                class="switch-container"
                onClick={this.toggleSwitch}
              >
                <div
                  class={`swith-button ${this.switch ? 'left' : 'right'}`}
                  innerHTML={icons[this.switch ? 'sun' : 'moon']}
                >
                </div>
              </div>
            </div>
          </div>

          <div class="img" innerHTML={icons['back']} />
        </div>
      </div>
    );
  }

}
