import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'button-info-hiweb',
  styleUrl: 'button-info-hiweb.scss',
  shadow: true,
})
export class ButtonInfoHiweb {
  @Prop() title: string;
  render() {
    return <button class="btn-wrapper button-info-wrapper button--wide m-3">{this.title}</button>;
  }
}
