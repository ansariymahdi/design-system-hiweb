import { Component, h, Prop, State } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'alert-hiweb',
  styleUrl: 'alert-hiweb.scss',
  shadow: true,
})
export class AlertHiweb {
  @Prop() type = 'alert';
  @State() width = 0;
  @State() progressBarDone = false;
  intervalId;

  componentWillLoad() {
    this.intervalId = setInterval(this.getWidth, 100);
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
      <div class={'alert-container ' + (this.type)}>
        <div class="placeholder icon right" innerHTML={icons['lightning']} />
        <strong>
          اخطار
        </strong>
        مشکلی پیش آمده است
        <button class="icon">
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
