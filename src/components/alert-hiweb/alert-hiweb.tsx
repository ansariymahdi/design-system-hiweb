import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'alert-hiweb',
  styleUrl: 'alert-hiweb.scss',
  shadow: true,
})
export class AlertHiweb {
  @Prop() type;
  @Prop() timer;
  @Prop() title: string;
  @State() width = 0;
  @State() progressBarDone = false;
  @State() theme;
  @Event() onClick: EventEmitter;
  intervalId;

  componentWillLoad() {
    if (this.timer) {
      this.intervalId = setInterval(this.getWidth, 100);
    }
    switch (this.type) {
      case 'alert':
        this.theme = {class: 'alert', icon: 'lightning'};
        break;
      case 'warning':
        this.theme = {class: 'warning', icon: 'information'};
        break;
      case 'success':
      this.theme = {class: 'success', icon: 'tick'};
      break;
      case 'retry':
        this.theme = {class: 'retry', icon: 'refresh'};
        break;
      default:
        this.theme = {class: 'default', icon: 'refresh'};
        break;
    }

  }

  getWidth = () => {
    if (this.width >= 100) {
      this.progressBarDone = true
      clearInterval(this.intervalId);
    } else {
      this.width = this.width + 1;
    }
  }

  render() {
    return (
      <div class={'alert-container ' + (this.theme.class)}>
        <div class="placeholder icon right" innerHTML={icons[this.theme.icon]} />
        <strong>
          {this.title}
        </strong>
          <slot></slot>
        <button
          class="icon"
          onClick={() => this.onClick.emit(true)}
        >
          <div class="placeholder" innerHTML={icons['close']} />
        </button>
        <div
          class={'progress-bar ' + (this.progressBarDone ? 'done' : '')}
          style={{width: `${this.width}%`}}
        >
        </div>
      </div>
    );
  }

}
