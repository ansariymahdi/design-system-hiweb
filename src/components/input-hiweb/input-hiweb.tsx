import { Component, h, Prop, State, Event, EventEmitter, Method } from '@stencil/core';
import { Validator, getValidator, defaultValidator, ValidatorEntry } from '../../validator';

import icons from '../../modules/iconsList';

@Component({
  tag: 'input-hiweb',
  styleUrl: 'input-hiweb.css',
  shadow: true,
})
export class inputHiweb {
  @Prop() label: string;
  @Prop() title: string;
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) valid: boolean;
  @Prop({ attribute: 'validator' }) validatorProp: string;
  @State() validator: Array<string | ValidatorEntry | Validator<string>>;
  @State() isChanged: boolean = false;
  @State() inputFocused: boolean = false;
  @Event() changed: EventEmitter<{title: string, value: string, isValid: boolean}>;

  _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this.validator = JSON.parse(this.validatorProp);
    this._validator = getValidator<string>(this.validator);
  }

  componentDidLoad() {
    // const test = document.querySelector('#img');
  }

  componentWillUpdate() {
    this._validator = getValidator<string>(this.validator);
  }

  handleChange(event) {
    this.value = event.target ? event.target.value : null;
    this.validate();
    this.changed.emit({title: this.title, value: this.value, isValid: this.valid});
    this.isChanged = true;
  }

  clearInput = () => {
    this.value = '';
    this.changed.emit({title: this.title, value: this.value, isValid: this.valid});
  }

  checkFocus = () => {
    if (this.inputFocused) {
      return {};
    }
    return {};
  }

  borderColor = () => {
    if (!this.valid && this.isChanged) {
      return { borderColor: '#B22222' };
    }
    return { borderColor: 'black' };
  }

  moveValid = () => {
    if (!this.inputFocused || !this.value) {
      return { transform: "translateX(-1.75rem)" };
    }
    return;
  }

  getColor = () => {
    if (this.valid) {
      return { background: 'green' }
    }
    return { background: '#B22222' };
  }

  @Method() validate(): void {
    this.valid = this._validator.validate(this.value);
  }

  render() {
    this.validate();
    return (
      <div>
        <div class="input-container">
          <label>{this.label}</label>
          {
            this.isChanged
              ? <div class="control" style={{ ...this.moveValid(), ...this.getColor() }}></div>
              : null
          }
          <input
            style={this.borderColor()}
            value={this.value}
            onInput={event => this.handleChange(event)}
            onFocus={() => this.inputFocused = true}
            onBlur={() => this.inputFocused = false}
          />
          {
            this.value
              ? <div innerHTML={icons['xMark']} class="img" style={this.checkFocus()} onClick={() => this.clearInput()} />
              : null
          }
        </div>
        {
          !this.valid && this.isChanged
            ? <span>{this._validator.errorMessage}</span>
            : null
        }
      </div>
    );
  }

}
