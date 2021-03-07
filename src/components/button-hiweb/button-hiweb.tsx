import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'button-hiweb',
  styleUrl: 'button-hiweb.scss',
  shadow: true,
})
export class ButtonHiweb {
  @Prop() title: string;
  @Event() onClick: EventEmitter;
  render() {
    return <button class="btn-wrapper button-primary-wrapper button--wide m-3" onClick={() => this.onClick.emit()}>{this.title}</button>;
  }
}
