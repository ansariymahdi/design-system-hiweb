import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'input-select-hiweb',
  styleUrl: 'input-select-hiweb.scss',
  shadow: true,
})
export class InputSelectHiweb {
  @Prop() title: string = '';
  @Prop() placeHolder: string = 'please select';
  @Prop() selectedValue: { value: string | number , text: string | number};
  @Prop() options: { value: string | number , text: string | number}[] = [{value: 'sdfsdf1', text: 'sfsdf'}, {value: 'sdfsdf2', text: 'sfsdf3'}, {value: 'sdfsdf4', text: 'sfsdf5'}, {value: 'sdfsdf6', text: 'sfsdf'}, {value: 'sdfs7df', text: 'sfsdf'}, {value: 'sdfsdf', text: 'sfsdf'}];
  @Prop() checkInput: boolean;
  @Watch('checkInput')
  onCheckInputChange(checkInput) {
    if(checkInput && typeof this.valueState === 'undefined') return this.error = true;
  }
  @State() error: boolean = false;
  @State() valueState: { value: string | number , text: string | number};

  @Event() valueChanged: EventEmitter<{ value: string | number , text: string | number}>;

  componentWillLoad() {
    if (this.selectedValue) {
      this.valueChanged.emit(this.selectedValue);
      return this.valueState = this.selectedValue;
    }
    this.valueState = undefined;
  }

  componentWillRender() {

    if (this.selectedValue) {
      this.valueState = this.selectedValue;
    } else {
      this.valueState = undefined;
    }
    
    if(this.checkInput && typeof this.valueState === 'undefined') return this.error = true;
    if(this.error) return this.error = false;
  }

  handleValueChanged(event) {
    const selectedData = this.options.find(option => option.value == event.target['value']);
    this.valueState = selectedData;
    this.valueChanged.emit(selectedData);
  }

  render() {
    return (
      <div class={`sort ${this.error ? 'error' : null}` }>
        <div class="input-group">
          <select
            class="form-select"
            id="inputGroupSelect01"
            onInput={(event) => this.handleValueChanged(event)}
            >
              <option value="" disabled selected={!this.valueState && true} hidden>
                {this.placeHolder}
              </option>
              {
                this.options.map(({value, text}) => {
                  return (
                    <option
                      selected={this.valueState && value === this.valueState.value}
                      value={value}
                    >{text}</option>
                  )
                })
              }
          </select>
        </div>
          {
            this.error
              ? <span class="message">{this.placeHolder}</span>
              : null
          }
      </div>
    );
  }

}

