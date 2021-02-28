import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'button-hiweb',
  styleUrl: 'button-hiweb.scss',
  shadow: true,
})
export class ButtonHiweb {
  @Prop() title: string;
  render() {
    return <button class="btn-wrapper button-primary-wrapper button--wide m-3">{this.title}</button>;
  }
}
