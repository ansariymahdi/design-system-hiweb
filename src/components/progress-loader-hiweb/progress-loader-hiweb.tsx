import { Component, h } from '@stencil/core';

@Component({
  tag: 'progress-loader-hiweb',
  styleUrl: 'progress-loader-hiweb.scss',
  shadow: true,
})
export class ProgressLoaderHiweb {
  render() {
    return (
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}
