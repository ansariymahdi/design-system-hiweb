import { Component, h, Prop, State } from '@stencil/core';
// import Home from './../../assets/home.svg';
// import { Menu } from './../../models/Menu';
// import { SomeValue } from './../../models/some-value.interface';
import User from './../../assets/icons/user.svg';
// import { createPopper } from '@popperjs/core';

@Component({
  tag: 'nav-right-hiweb',
  styleUrl: 'nav-right-hiweb.scss',
  shadow: true,
})
export class NavRightHiweb {
  // private _arrayData: SomeValue[];
  @Prop() array: string;
  // @Watch('arrayData')
  // arrayDataWatcher(newValue: SomeValue[] | string) {
  //   if (typeof newValue === 'string') {
  //     this._arrayData = JSON.parse(newValue);
  //   } else {
  //     this._arrayData = newValue;
  //   }
  // }
  @State() items: any = [];

  componentWillLoad() {
    console.log(this.array);
    // for (let entry of this.array) {
    //   console.log(entry);
    // }
    try {
      this.items = JSON.parse(this.array);
      console.log(this.items);
    } catch (e) {}
  }

  // componentWillLoad() {
  //   this.arrayDataWatcher(this.objectData);
  // }

  render() {
    return (
      <nav>
        <div class="header-wrapper">
          <div class="header-inner">
            <a class="logo-nav">
              <div class="logo-nav-inner"></div>
            </a>
            <div class="navigation-btns">
              {this.items.map(item => (
                <a class="menu-nav">
                  <div class="placeholder" innerHTML={item.icon} />
                  <spen>{item.name}</spen>
                </a>
              ))}
            </div>
            <div class="navigation-btns-user">
              <div class="placeholder" innerHTML={User} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
