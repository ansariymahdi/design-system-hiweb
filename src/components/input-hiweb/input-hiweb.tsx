import { Component, h, Prop, State, Event, EventEmitter, Method } from '@stencil/core';
import { Validator, getValidator, defaultValidator, ValidatorEntry } from '../../validator';
// import deleteIcon from '../../assets/x-mark.svg';

import icons from './../../modules/iconsList';

@Component({
  tag: 'input-hiweb',
  styleUrl: 'input-hiweb.css',
  shadow: true,
})
export class inputHiweb {
  @Prop() label: string;
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) valid: boolean;
  @Prop({ attribute: 'validator' }) validatorProp: string;
  @State() validator: Array<string | ValidatorEntry | Validator<string>>;
  @State() isChanged: boolean = false;
  @State() inputFocused: boolean = false;
  @Event() changed: EventEmitter<string>;

  _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this.validator = JSON.parse(this.validatorProp);
    this._validator = getValidator<string>(this.validator);
  }

  componentDidLoad() {
    const test = document.querySelector('#img');

    console.log(test);


  }

  componentWillUpdate() {
    console.log(2);


    this._validator = getValidator<string>(this.validator);
  }

  handleChange(event) {
    this.value = event.target ? event.target.value : null;
    this.changed.emit(this.value);
    this.validate();
    this.isChanged = true;
  }

  clearInput = () => {
    console.log(3);

    this.value = '';
    this.changed.emit(this.value);
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
              ? <img src="../../assets/x-mark.svg" alt="App Name" style={this.checkFocus()} onClick={() => this.clearInput()} />
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
