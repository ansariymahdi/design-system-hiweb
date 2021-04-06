import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'card-button-hiweb',
  styleUrl: 'card-button-hiweb.scss',
  shadow: true,
})
export class CardButtonHiweb {
  @Prop() title: string = "تیتر";
  @Prop() body: string = "نوشته نوشته";
  @Prop() iconColor: {background: string, shadow: string} = {background: '#702BFB', shadow: '#B08CE9'};
  @Prop() callback: string = '';
  @Prop() hover: boolean = false;
  @Prop() icon: string = 'whatsapp';
  @Event() click: EventEmitter;

  private iconStyle = {
    background: this.iconColor.background,
    boxShadow: `0px 3px 4px -1px ${this.iconColor.shadow}`,
    webkitBoxShadow: `0px 3px 4px -1px ${this.iconColor.shadow}`,
    mozBoxShadow: `0px 3px 4px -1px ${this.iconColor.shadow}`
  }

  render() {
    return (
      <div
        class={`card-container ${this.callback ? 'active' : null} ${this.hover ? 'active-hover' : null}`}
        onClick={() => this.click.emit(this.callback)}
      >
        <div class="placeholder" style={this.iconStyle} innerHTML={icons[this.icon]} />
        <h1>
          {this.title}
        </h1>
        <p>
          {this.body}
        </p>
      </div>
    );
  }

}
