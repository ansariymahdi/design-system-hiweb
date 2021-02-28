import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'button-error-hiweb',
  styleUrl: 'button-error-hiweb.scss',
  shadow: true,
})
export class ButtonErrorHiweb {
  @Prop() title: string;
  render() {
    return <button class="btn-wrapper button-error-wrapper button--wide m-3">{this.title}</button>;
  }
}
