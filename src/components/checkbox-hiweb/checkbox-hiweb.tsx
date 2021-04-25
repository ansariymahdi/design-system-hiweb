import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'checkbox-hiweb',
  styleUrl: 'checkbox-hiweb.scss',
  shadow: true,
})
export class CheckboxHiweb {
  @State() valueState: boolean;
  @Prop() value: boolean;
  @Event() onChange: EventEmitter<boolean>;

  componentWillLoad() {
    if (this.value) {
      return this.valueState = true;
    }
    this.valueState = false;
  }

  handleChange(event) {
    this.valueState = event.target['checked'];
    this.onChange.emit(this.valueState); 
  }

  render() {
    return (
      <label class="checkbox bounce">
        <input 
          type="checkbox" 
          checked={this.valueState}
          onInput={(e) => this.handleChange(e)} 
        />
        <svg viewBox="0 0 21 21">
            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </label>
    );
  }

}
