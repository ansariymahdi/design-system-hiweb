import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import icons from './../../modules/iconsList';

@Component({
  tag: 'nav-top-hiweb',
  styleUrl: 'nav-top-hiweb.scss',
  shadow: true,
})
export class NavTopHiweb {
  @Prop() user: {text: string, buttons: {icon: string, text: string}[]} = {
    text: 'حساب کاربری',
    buttons: [
      {
        icon: 'arrowLeft',
        text: 'وارد شدن'
      },
      {
        icon: 'arrowLeft',
        text: 'ساختن'
      }
    ]
  }
  @Prop() items: {icon: string, callback: string, color: string, num: number}[] = [
    {icon: 'home', callback: 'home', color: 'green', num: 0}
  ];

  @Event() buttonClicked: EventEmitter<string>;

  renderItems() {
    return this.items.map(item => {
      const colors = ['red', 'green'];
      let selectedColor = 'yellow';
      if (colors.includes(item.color)) {
        selectedColor = item.color;
      }
      return (
        <div
          class="item"
          innerHTML={icons[item.icon]}
          onClick={() => this.handleClick(item.callback)}
        >
          {
            item.num
            ? <span class={selectedColor}>{item.num}</span>
            : null
          }
        </div>
      )
    });
  }

  handleClick = (cb) => {
    this.buttonClicked.emit(cb);
  }

  render() {
    return (
      <nav>
        <button>
          <div class="placeholder" innerHTML={icons['user']} />
          <h5>
            {this.user.text}
          </h5>
          <div class="spacer" />
          <div class="detail">
            <div class="info">
              <div class="placeholder" innerHTML={icons['user']} />
              <h5>
                {this.user.text}
              </h5>
            </div>
            <div class="actions">
              {this.user.buttons.map(button => {
                return (
                  <button onClick={() => this.handleClick(button.text)}>
                    <div
                      class="button-icon"
                      innerHTML={icons[button.icon]}
                    />
                    <h5>
                      {button.text}
                    </h5>
                  </button>
                )
              })}
            </div>
          </div>
        </button>
        <div class="items-container">
          {this.renderItems()}
        </div>

      </nav>
    );
  }

}
