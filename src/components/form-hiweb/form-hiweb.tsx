import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

export interface TextInput {
  value: string,
  placeholder?: string,
  label: string,
  title: string,
  validator: string,
  disable: boolean,
  isValid?: boolean
}

export interface SelectOptionInput {
  title: string,
  value?: { value: string | number , text: string | number},
  options: { value: string | number, text: string | number }[],
  placeholder: string,
  required?: boolean,
  isValid?: boolean
}

export interface CheckBoxInput {
  title: string,
  value?: boolean,
}

export interface DateInput {
  title: string,
  value?: string,
  label: string,
}

export interface TimeInput {
  title: string,
  value?: string,
  label: string,
}

export interface DateTimeInput {
  title: string,
  dateLabel: string,
  timeLabel: string,
  value?: string
}

@Component({
  tag: 'form-hiweb',
  styleUrl: 'form-hiweb.scss',
  shadow: true,
})
export class FormHiweb {
  @Prop() formProp: { type: string, data: TextInput | SelectOptionInput | CheckBoxInput | DateInput | any }[] = [
    {
      type: 'text',
      data: {
        value: '',
        placeholder: 'text1',
        label: 'sdfsdf',
        title: 'text1',
        validator: '["required"]'
      }
    },
    {
      type: 'text',
      data: {
        value: '',
        placeholder: 'sdfsdf',
        label: 'sdfsdf',
        title: 'text2',
        validator: '["required"]'
      }
    },
    {
      type: 'selectOption',
      data: {
        title: 'select',
        placeholder: 'place',
        required: true,
        options: [{value: 'sdfsdf1', text: 'sfsdf'}, {value: 'sdfsdf2', text: 'sfsdf3'}, {value: 'sdfsdf4', text: 'sfsdf5'}, {value: 'sdfsdf6', text: 'sfsdf'}, {value: 'sdfs7df', text: 'sfsdf'}, {value: 'sdfsdf', text: 'sfsdf'}]
      }
    },
    {
      type: 'checkBox',
      data: {
        title: 'check'
      }
    },
    {
      type: 'date',
      data: {
        title: 'date-picker',
        label: 'tarikh'
      }
    },
    {
      type: 'time',
      data: {
        title: 'time-picker',
        label: 'zaman'
      }
    },
    {
      type: 'dateTime',
      data: {
        title: 'sdfsfs',
        dateLabel: 'tarikh-kol',
        timeLabel: 'zaman-kol'
      }
    }
  ];

  @State() checkInputs: boolean = false;
  @State() form: { type: string, data: TextInput | SelectOptionInput | CheckBoxInput | DateInput | any }[];
  @State() forceRender: boolean = true;

  @Event() onFormSubmit: EventEmitter<any>;
  @Event() erros: EventEmitter<string[]>;

  componentWillLoad() {
    this.form = this.formProp;
  }


  renderForm() {
    return this.form.map(({type, data}, index: number) => {
      switch (type) {
        case 'text':
          return this.renderTextInput(data, index);
        case 'selectOption':
          return this.renderSelectOptionInput(data, index);
        case 'checkBox':
          return this.renderCheckBoxInput(data, index);
        case 'date':
          return this.renderDateInput(data, index);
        case 'time':
          return this.renderTimeInput(data, index);
        case 'dateTime':
          return this.renderDateTimeInput(data, index);
        default:
          return;
      }
    })
  }

  renderTextInput(data, index: number) {
    const {
      label,
      placeholder,
      title,
      disable,
      validator
    }: TextInput = data;

    return (
      <input-hiweb
        valueProp={this.form[index].data.value}
        label={label}
        placeHolder={placeholder}
        title={title}
        disable={disable}
        validatorProp={validator}
        checkInput={this.checkInputs}
        onChanged={e => {
          console.log(this.form[index].data.value);
          this.forceRender = !this.forceRender;
          this.form[index].data = {...this.form[index].data, ...e.detail};
          console.log(this.form[index].data.value);
        }}
      />
    )
  }

  renderSelectOptionInput(data, index: number) {
    const {
      value,
      options,
      placeholder,
      title,
      required
    }: SelectOptionInput = data;

    return (
      <input-select-hiweb
        title={title}
        options={options}
        placeHolder={placeholder}
        selectedValue={value}
        checkInput={this.checkInputs}
        onValueChanged={e => {
          if (required && e.detail) {
            this.form[index].data.isValid = true;
          }
          this.form[index].data.value = e.detail;
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderCheckBoxInput(data, index: number) {
    const {
      value,
      title
    } = data;

    return (
      <checkbox-hiweb
        title={title}
        value={value}
        onOnChange={e => {
          this.form[index].data.value = e.detail;
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderDateInput(data, index: number) {
    const {
      value,
      label
    } = data;

    return (
      <date-picker-hiweb
        label={label}
        value={value}
        onGregorianDate={e => {
          this.form[index].data.value = e.detail;
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderTimeInput(data, index: number) {
    const {
      value,
      label
    } = data;

    return (
      <time-picker-hiweb 
        label={label}
        value={value}
        onTime={e => {
          this.form[index].data.value = e.detail;
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderDateTimeInput(data, index: number) {
    const {
      dateLabel,
      timeLabel,
      value
    } = data;

    if (!value) this.form[index].data.value = '0000-00-00T00:00:00.000Z';

    return (
      <div>
        <date-picker-hiweb 
          label={dateLabel}
          value={value ? value.slice(0, 10) : null}
          onGregorianDate={e => {
            this.form[index].data.value = `${e.detail}T${this.form[index].data.value.slice(11, 16)}:00.000Z`;
            this.forceRender = !this.forceRender;
          }}
        />
        <time-picker-hiweb 
          label={timeLabel}
          value={value ? value.slice(11, 16): null}
          onTime={e => {
            this.form[index].data.value = `${this.form[index].data.value.slice(0, 10)}T${e.detail}:00.000Z`;
            this.forceRender = !this.forceRender;
          }}
        />
      </div>
    )
  }

  handleFormSubmit = () => {
    this.checkInputs = true;
    const errors: string[] = [];
    let form = {};
    this.form.forEach(({type, data}) => {
      console.log(data)
      const {
        title,
        value,
        required,
        isValid
      } = data;

      if (type === 'text' && !isValid) errors.push(title);
      
      if (required && !isValid) errors.push(title);
      return form = {
        ...form,
        [title]: value
      }
    });

    if (errors.length) console.log(errors);

    console.log(form);

    this.erros.emit(errors);
    // this.onFormSubmit.emit(form);
  }

  render() {
    return (
      <div class="form-container">
        {this.renderForm()}
        <button
          onClick={this.handleFormSubmit}
        >log</button>
      </div>
    );
  }

}
