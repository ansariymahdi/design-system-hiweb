import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'input-select-hiweb',
  styleUrl: 'input-select-hiweb.scss',
  shadow: true,
})
export class InputSelectHiweb {
  @Prop() placeHolder: string = 'please select';
  @Prop() selectedValue: string | number;
  @Prop() options: { value: string | number , text: string | number}[] = [{value: 'sdfsdf', text: 'sfsdf'}];
  @Prop() checkInput: boolean = true;

  @State() error: boolean = false;

  @Event() valueChanged: EventEmitter<{ value: string | number , text: string | number}>;

  componentWillRender() {
    if(this.checkInput && typeof this.selectedValue === 'undefined') this.error = true;
  }

  handleValueChanged(event) {
    const selectedData = this.options.find(option => option.value == event.target['value']);
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
              <option value="" disabled selected hidden>
                {this.placeHolder}
              </option>
              {
                this.selectedValue
                  ? <option
                      selected
                      value={this.selectedValue}
                    >{this.selectedValue}</option>
                  : null
              }
              {
                this.options.map(({value, text}) => {
                  return (
                    <option
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

