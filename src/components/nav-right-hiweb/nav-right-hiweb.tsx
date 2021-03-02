import { Component, h, Prop, State } from '@stencil/core';
import user from './../../assets/icons/user.svg';
import google from './../../assets/google.svg';
import home from './../../assets/home.svg';
import arrowDown from './../../assets/down-arrow.svg';

const logo = {
  Home: home
};

@Component({
  tag: 'nav-right-hiweb',
  styleUrl: 'nav-right-hiweb.scss',
  shadow: true,
})
export class NavRightHiweb {
  @Prop() array: string;
  @Prop() onClick;
  @State() open: boolean = false;
  @State() items: any = [];

  componentWillLoad() {
    this.items = JSON.parse(this.array);
  }

  handleClick = () => {
    this.open = false;
    // this.onClick();
  }

  handleOpen = () => {
     this.open = !this.open;
  }

  render() {
    return (
      <nav class={this.open ? 'open' : 'close'}>
        <div class="header last">
          <div class="placeholder" innerHTML={google} />
        </div>
        <div class="body">
          {this.items.map(item => (
            <div>
              <a
                class="placeholder item"
                innerHTML={logo[item.icon]}
                data-tooltip={item.title}
                onClick={this.handleClick}
              />
            </div>
          ))}
        </div>
        <div class="footer last">
          <div
            class="placeholder"
            innerHTML={user}
            onClick={this.handleClick}
          />
        </div>
        <div class="button">
          <div
            class="placeholder"
            innerHTML={arrowDown}
            onClick={this.handleOpen}
            onScroll={this.handleOpen}
          />
        </div>
      </nav>
    );
  }
}
