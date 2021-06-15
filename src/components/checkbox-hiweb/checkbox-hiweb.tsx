import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'checkbox-hiweb',
  styleUrl: 'checkbox-hiweb.scss',
  shadow: true,
})
export class CheckboxHiweb {
  @Prop() value: boolean;
  @Prop() color: string = 'black';

  @State() valueState: boolean;

  @Event() onChange: EventEmitter<boolean>;

  private inputStyle = {
  }

  private svgStyle = {
    stroke: 'white',
  }

  componentWillLoad() {
    if (this.value) {
      return this.valueState = true;
    }
    this.valueState = false;
  }

  componentWillRender() {
    this.inputStyle = {
      boxShadow: `inset 0 0 0 ${this.valueState ? '20px' : '1px'} ${this.color}`,
    }
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
          style={this.inputStyle}
        />
        <svg viewBox="0 0 21 21" style={this.svgStyle}>
            <polyline  points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </label>
    );
  }

}
