import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'button-error-hiweb',
  styleUrl: 'button-error-hiweb.scss',
  shadow: true,
})
export class ButtonErrorHiweb {
  @Prop() title: string;
  @Event() onClick: EventEmitter;
  render() {
    return <button class="btn-wrapper button-error-wrapper button--wide" onClick={() => this.onClick.emit()}>{this.title}</button>;
  }
}
