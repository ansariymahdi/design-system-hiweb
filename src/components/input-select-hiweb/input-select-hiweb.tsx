import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'input-select-hiweb',
  styleUrl: 'input-select-hiweb.scss',
  shadow: true,
})
export class InputSelectHiweb {
  @Prop() placeHolder: string = 'please select';
  @Prop() selectedValue: string | number = 'selected';
  @Prop() options: { value: string | number , text: string | number}[] = [{value: 'sdfsdf', text: 'sfsdf'}];

  @Event() valueChanged: EventEmitter<string | number>;

  render() {
    return (
      <div class="sort">
        <div class="input-group">
          <select
            class="form-select"
            id="inputGroupSelect01"
            onInput={(event) => this.valueChanged.emit(event.target['value'])}
            >
              <option value="" disabled selected hidden>
                {this.placeHolder}
              </option>
            <option
              selected
              value={this.selectedValue}
            >{this.selectedValue}</option>
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
      </div>
    );
  }

}

