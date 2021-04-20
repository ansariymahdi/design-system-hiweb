import { Component, h, State, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'counter-input-hiweb',
  styleUrl: 'counter-input-hiweb.scss',
  shadow: true,
})
export class CounterInputHiweb {
  @State() value: number = 0;
  @Event() valueChanged: EventEmitter<number>;

  handleClick(num) {
    if (this.value === 0 && num === -1) return;
    this.value = this.value + num;
    this.valueChanged.emit(this.value);
  }

  render() {
    return (
      <div class="counter-input-container">
        <div 
          class={'placeholder ' + (this.value === 0 ? 'disable' : '')}
          innerHTML={icons['minus']} 
          onClick={() => this.handleClick(-1)}
        />
        <input
          readonly
          disabled
          value={this.value}
          type="number"
        />
        <div 
          class="placeholder" 
          innerHTML={icons['plus2']} 
          onClick={() => this.handleClick(1)}
        />
      </div>
    );
  }

}
