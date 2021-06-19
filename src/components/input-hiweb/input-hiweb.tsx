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
  @Prop() color: string = '#DDDFE0';
  @Prop({ mutable: true }) valueProp: string;
  @Prop() placeHolder: string;
  @Prop() type: string = 'text';
  @Prop() checkInput: boolean;
  @Watch('checkInput')
  onCheckInputChange() {
    this.isChanged = this.checkInput;
  }
  @Prop() disable: boolean = false;
  @Prop() error: string;
  @State() value: string;
  @Watch('valueProp')
 onValueChanged(name: string) {
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
    this.validate();
    if(this.valueProp) {
      this.changed.emit({title: this.title, value: this.value, isValid: this.valid});
    }
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
    this.validate();
    this.changed.emit({title: this.title, value: this.value, isValid: this.valid});
  }

  checkFocus = () => {
    if (this.inputFocused) {
      return {};
    }
    return {};
  }

  borderColor = () => {
    console.log('change', this.isChanged);
    console.log('valid',this.valid);
    console.log('error',this.error);
    if ( this.isChanged && (!this.valid || this.error)) {
      return { borderColor: '#B22222' };
    }
    return { borderColor: this.color };
  }

  moveValid = () => {
    if (!this.inputFocused || !this.value) {
      return { transform: "translateX(-1.75rem)" };
    }
    return;
  }

  getColor = () => {
    if (this.valid && !this.error) {
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
            disabled={this.disable}
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
            : this.error && this.isChanged
              ? <span>{this.error}</span>
              : null
        }
      </div>
    );
  }

}
