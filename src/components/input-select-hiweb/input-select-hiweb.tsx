import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'input-select-hiweb',
  styleUrl: 'input-select-hiweb.scss',
  shadow: true,
})
export class InputSelectHiweb {
  @Prop() title: string = '';
  @Prop() placeHolder: string = 'please select';
  @Prop() selectedValue: string | number;
  @Prop() options: { value: string | number , text: string | number}[] = [{value: 'sdfsdf', text: 'sfsdf'}];
  @Prop() checkInput: boolean = false;

  @State() error: boolean = false;

  @Event() valueChanged: EventEmitter<{ value: string | number , text: string | number}>;

  componentWillRender() {
    if(this.checkInput && typeof this.selectedValue === 'undefined') return this.error = true;
    if(this.error) return this.error = false;
  }

  handleValueChanged(event) {
    const selectedData = this.options.find(option => option.value == event.target['value']);
    const emitEvent = { ...selectedData, title: this.title};
    this.valueChanged.emit(emitEvent);
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

