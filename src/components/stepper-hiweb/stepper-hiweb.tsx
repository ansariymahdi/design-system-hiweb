import { Component, h, Prop, Watch, State } from '@stencil/core';
import Fragment from 'stencil-fragment';

import icons from './../../modules/iconsList';

@Component({
  tag: 'stepper-hiweb',
  styleUrl: 'stepper-hiweb.scss',
  shadow: true,
})
export class StepperHiweb {
  @Prop() totalSteps: number = 4;
  @Prop() step: number = 1;
  @State() stepState: number;
  @Watch('step')
  onValueChanged(step: number) {
    this.stepState = step;
  }

  componentWillLoad() {
    this.stepState = this.step;
  }

  render() {
    return (
      <div class="stepper-component">
        <div class="stepper-container">
            <div class="stepper">
            {
              [...Array(this.totalSteps)].map((_x, i) => {
                const current = i === this.stepState - 1;
                const active = i < this.stepState - 1;
                return (
                  <Fragment>
                    {
                      i !== 0
                        ? <div class={`spacer ${active ? 'spacer-active' : null}`}>
                            <div class={`spacer-current ${current ? 'spacer-current-active' : null}`}>

                            </div>
                          </div>
                        : null
                    }
                    <div class={`step ${active ? 'step-active' : (current ? 'step-current' : null)}`} innerHTML={icons['tick']}>
                      <div class={`circle ${current ? 'circle-active' : ''}`} />
                    </div>
                  </Fragment>
                )
              })
            }
          </div>
        </div>
        <div class="body">
          <slot></slot>
          <button onClick={() => this.stepState++}>next</button>
          <button onClick={() => this.stepState--}>back</button>
        </div>
      </div>
    );
  }

}
