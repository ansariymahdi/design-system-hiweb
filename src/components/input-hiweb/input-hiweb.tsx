import { Component, h, Prop, State, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { Validator, getValidator, defaultValidator, ValidatorEntry } from '../../validator';

import icons from '../../modules/iconsList';

@Component({
  tag: 'input-hiweb',
  styleUrl: 'input-hiweb.scss',
  shadow: true,
})
export class inputHiweb {
  @Prop() label: string;
  @Prop() title: string;
  @Prop({ mutable: true }) valueProp: string;
  @Prop() placeHolder: string;
  @Prop() type: string = 'text';
  @State() value: string;
  @Watch('valueProp')
 onValueChanged(name: string) {
   console.log('prev value: ', this.value);
   console.log('got name: ', name);
   this.value = name;
 }
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
    this.onValueChanged(this.valueProp);

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
    console.log('cross clicked');
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
            this.isChanged && typeof(this.validatorProp) !== 'undefined'
              ? <div class="control" style={{ ...this.moveValid(), ...this.getColor() }}></div>
              : null
          }
          <input
            type={this.type}
            style={this.borderColor()}
            value={this.value}
            onInput={event => this.handleChange(event)}
            onFocus={() => this.inputFocused = true}
            onBlur={() => {setTimeout(() => {
                this.inputFocused = false
              }, 100);
            }}
            placeholder={this.placeHolder}
          />
          {
            this.value && this.inputFocused
              ? <div
                  innerHTML={icons['xMark']}
                  class="img"
                  style={this.checkFocus()}
                  onClick={() => this.clearInput()}
                />
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
