import { Component, h, Prop, State } from '@stencil/core';
import user from './../../assets/icons/user.svg';
import logoTest from './../../assets/icons/esteghlal_logo.svg';
// import home from './../../assets/home.svg';
import arrowDown from './../../assets/icons/down-arrow.svg';
import icons from './../../modules/iconsList';

@Component({
  tag: 'nav-right-hiweb',
  styleUrl: 'nav-right-hiweb.scss',
  shadow: true,
})
export class NavRightHiweb {
  @Prop() array: any;
  @Prop() arrayString: string;
  @Prop() onClick;
  @State() open: boolean = false;
  @State() items: any = [];

  componentWillLoad() {
    if (this.arrayString) {
      this.items = JSON.parse(this.arrayString);
    } else {
      this.items = this.array;
    }
    console.log(this.items);


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
          <div class="placeholder" innerHTML={logoTest} />
        </div>
        <div class="body">
          {this.items.map(item => (
            <div>
              <a
                class="placeholder item"
                innerHTML={icons[item.icon]}
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
