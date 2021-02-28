import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'button-outline-hiweb',
  styleUrl: 'button-outline-hiweb.scss',
  shadow: true,
})
export class ButtonOutlineHiweb {
  @Prop() title: string;
  render() {
    return <button class="btn-wrapper  button-outline-wrapper  button--wide m-3">{this.title}</button>;
  }
}
