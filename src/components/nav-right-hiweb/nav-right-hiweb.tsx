import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
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
  @Event() onClick: EventEmitter;
  @Prop({attribute: 'user'}) userIcon: {title: string,icon: string, path: string};
  @State() open: boolean = false;
  @State() items: any = [];
  @State() switch: boolean = false;

  componentWillLoad() {

    if (this.arrayString) {
      this.items = JSON.parse(this.arrayString);
    } else {
      this.items = this.array;
    }
    console.log('test', this.userIcon);

  }

  handleClick = path => {
    this.open = false;
    this.onClick.emit(path);
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
                onClick={() => this.handleClick(item.path)}
              />
            </div>
          ))}
        </div>
        <div class="switch last">
          <div class="switch-container">
            <div
              class={`swith-button ${this.switch ? 'left' : 'right'}`}
              onClick={() => this.switch = !this.switch}
            >
            </div>
          </div>
        </div>
        <div class="footer last">
          <div
            class="placeholder item"
            innerHTML={icons[this.userIcon.icon]}
            data-tooltip={this.userIcon.title}
            onClick={() => this.handleClick(this.userIcon.path)}
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
