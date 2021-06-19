import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import * as _ from 'lodash';
import Fragment from 'stencil-fragment'

export interface TextInput {
  value: string,
  placeholder?: string,
  label: string,
  title: string,
  validator: string,
  disable: boolean,
  color?: string,
  isValid?: boolean,
  className?: string
}

export interface SelectOptionInput {
  title: string,
  value?: { value: string | number , text: string | number},
  options: { value: string | number, text: string | number }[],
  placeholder: string,
  required?: boolean,
  isValid?: boolean,
  className?: string,
  color?: string,
}

export interface CheckBoxInput {
  title: string,
  value?: boolean,
  className?: string,
  color?: string,
}

export interface DateInput {
  title: string,
  value?: string,
  label: string,
  className?: string,
  color?: string,
}

export interface TimeInput {
  title: string,
  value?: string,
  label: string,
  className?: string,
  color?: string,
}

export interface DateTimeInput {
  title: string,
  dateLabel: string,
  timeLabel: string,
  value?: string,
  className?: string,
  color?: string,
}

@Component({
  tag: 'form-hiweb',
  styleUrl: 'form-hiweb.scss',
  shadow: false,
})
export class FormHiweb {
  @Prop() formProp: { type: string, data: TextInput | SelectOptionInput | CheckBoxInput | DateInput | any }[] = [
    {
      type: 'text',
      data: {
        value: 'sdfsdfsdf',
        placeholder: 'text1',
        label: 'sdfsdf',
        title: 'text1',
        validator: '["required"]',
        color: 'yellow'
      }
    },
    {
      type: 'imageLink',
      data: {
        placeholder: 'text1',
        label: 'image',
        title: 'image',
        validator: '["url"]',
        color: 'yellow'
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
        options: [{value: 'sdfsdf1', text: 'sfsdf'}, {value: 'sdfsdf2', text: 'sfsdf3'}, {value: 'sdfsdf4', text: 'sfsdf5'}, {value: 'sdfsdf6', text: 'sfsdf'}, {value: 'sdfs7df', text: 'sfsdf'}, {value: 'sdfsdf', text: 'sfsdf'}],
        className: 'mb-3'
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
  @Prop() resetForm: boolean = false;
  @Watch('resetForm')
  onResetFormChange() {
    this.form = _.cloneDeep(this.formProp);
    this.checkInputs = false;
  }


  @State() checkInputs: boolean = false;
  @State() form: { type: string, data: TextInput | SelectOptionInput | CheckBoxInput | DateInput | any }[];
  @State() forceRender: boolean = true;

  @Event() onFormSubmit: EventEmitter<any>;

  componentWillLoad() {
    this.form = _.cloneDeep(this.formProp);
    this.checkInputs = false;
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
        case 'imageLink':
          return this.renderImageLink(data, index);
        default:
          return;
      }
    })
  }

  renderTextInput(data: TextInput, index: number) {
    const {
      label,
      placeholder,
      title,
      disable,
      validator,
      className,
      color
    }: TextInput = data;

    return (
      <input-hiweb
        class={className}
        valueProp={this.form[index].data.value}
        label={label}
        placeHolder={placeholder}
        title={title}
        disable={disable}
        validatorProp={validator}
        color={color}
        checkInput={this.checkInputs}
        onChanged={e => {
          this.form[index].data = {...this.form[index].data, ...e.detail};
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderSelectOptionInput(data: SelectOptionInput, index: number) {
    const {
      value,
      options,
      placeholder,
      title,
      required,
      className,
      color
    }: SelectOptionInput = data;

    return (
      <input-select-hiweb
        class={className}
        title={title}
        options={options}
        placeHolder={placeholder}
        selectedValue={value}
        color={color}
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

  renderCheckBoxInput(data: { value: any; title: any; className: any; color: any; }, index: number) {
    const {
      value,
      title,
      className,
      color
    } = data;

    return (
      <checkbox-hiweb
        class={className}
        title={title}
        value={value}
        color={color}
        onOnChange={e => {
          this.form[index].data.value = e.detail;
          this.forceRender = !this.forceRender;
        }}
      />
    )
  }

  renderDateInput(data: { value: any; label: any; className: any; color: any; }, index: number) {
    const {
      value,
      label,
      className,
      color
    } = data;

    return (
      <div class={className}>
        <date-picker-hiweb
          label={label}
          value={value}
          color={color}
          onGregorianDate={e => {
            this.form[index].data.value = e.detail;
            this.forceRender = !this.forceRender;
          }}
        />
      </div>
    )
  }

  renderTimeInput(data: { value: any; label: any; className: any; color: any; }, index: number) {
    const {
      value,
      label,
      className,
      color
    } = data;

    return (
      <div class={className}>
        <time-picker-hiweb 
          label={label}
          value={value}
          color={color}
          onTime={e => {
            this.form[index].data.value = e.detail;
            this.forceRender = !this.forceRender;
          }}
        />
      </div>
    )
  }

  renderDateTimeInput(data: { dateLabel: any; timeLabel: any; value: any; className: any; color: any; }, index: number) {
    const {
      dateLabel,
      timeLabel,
      value,
      className,
      color
    } = data;

    if (!value) this.form[index].data.value = '0000-00-00T00:00:00.000Z';

    return (
      <div class={className}>
        <date-picker-hiweb 
          label={dateLabel}
          color={color}
          value={value ? value.slice(0, 10) : null}
          onGregorianDate={e => {
            this.form[index].data.value = `${e.detail}T${this.form[index].data.value.slice(11, 16)}:00.000Z`;
            this.forceRender = !this.forceRender;
          }}
        />
        <div class="width10">
        </div>
        <time-picker-hiweb 
          label={timeLabel}
          value={value ? value.slice(11, 16): null}
          color={color}
          onTime={e => {
            this.form[index].data.value = `${this.form[index].data.value.slice(0, 10)}T${e.detail}:00.000Z`;
            this.forceRender = !this.forceRender;
          }}
        />
      </div>
    )
  }

  renderImageLink(data: TextInput, index: number) {
    const {
      label,
      placeholder,
      title,
      disable,
      validator,
      className,
      color
    }: TextInput = data;

    function checkLink() {
      const link = this.form[index].data.value;

      if(link.startsWith('http')) return link;
      return `http://${link}`;

    }

    return (
      <Fragment>
        <input-hiweb
          class={className}
          valueProp={this.form[index].data.value}
          label={label}
          placeHolder={placeholder}
          title={title}
          disable={disable}
          validatorProp={validator}
          color={color}
          checkInput={this.checkInputs}
          onChanged={e => {
            this.form[index].data = {...this.form[index].data, ...e.detail};
            this.forceRender = !this.forceRender;
          }}
        />
        {
          this.form[index].data.value && this.form[index].data.isValid
          ? <a
              href={this.form[index].data.value.startsWith('http') ? this.form[index].data.value : ('http://' + this.form[index].data.value)} 
              target="_blank">لینک</a>
          : null
        }
      </Fragment>
    )
  }

  handleFormSubmit = () => {
    this.checkInputs = true;
    const errors: string[] = [];
    let form = {};
    this.form.forEach(({type, data}) => {
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

    this.onFormSubmit.emit({form, errors});
  }

  render() {
    return (
      <div class="form-container">
        {this.renderForm()}
        <div class="submit-button-container">
          <button-hiweb
            title="ثبت" 
            onOnClick={this.handleFormSubmit}
          >
          </button-hiweb>
        </div>
      </div>
    );
  }

}
