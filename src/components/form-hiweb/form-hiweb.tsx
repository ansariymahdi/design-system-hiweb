import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import * as _ from 'lodash';
import Fragment from 'stencil-fragment'
import { Item } from '../multiselect-dropdown-hiweb/multiselect-dropdown-hiweb';

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
  label: string,
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

export interface MultiselectDropdownHiweb {
  label: string,
  items?: Item[],
  api?: {url: string, query: string, field: string, token?: string},
  value?: (string|number)[],
  selectAllOption: boolean,
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
        title: 'check',
        label: 'sdfs'
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
    },
    {
      type: 'multiselectDropdown',
      data: {
        api: {
          url: 'http://46.224.6.83:666/User',
          query: 'username',
          field: 'userName',
          token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNOM2d0V1AybWdNUjZja3lyNFJ6aWciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjU5OTQ3NTIsImV4cCI6MTYyNTk5ODM1MiwiaXNzIjoiaHR0cDovLzQ2LjIyNC42LjgzOjgwOTAiLCJhdWQiOiJlZmNfYXBpIiwiY2xpZW50X2lkIjoiZWZjX2FwaV9jbGllbnQiLCJzdWIiOiJlYTYxYTEzMy05ZGE1LTRjODMtYjJkZS0xOWU4M2RlMzhjNDYiLCJhdXRoX3RpbWUiOjE2MjU5OTQ3NTIsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRhbSIsIm5hbWUiOiJhZGFtIiwiZW1haWwiOiJzLmdob3JlaXNoaUBoaXdlYi5pciIsInBob25lX251bWJlciI6IjA5MTk0ODU0OTU2Iiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiLCJlZmNfYXBpIl0sImFtciI6WyJwd2QiXX0.XGO6fdkjk-0ddyQ9aW-BaBzOrlCetyCLIgmORF-wBQotJbocdGQ3MNeMhT98IZtNkAjNX8Jp8v4Q3VYk0mb7eg8otNl5tXU6b4JKZdz0pdL23iNRpuzuoD-QdO1_JIRp_ttIJ30oZwFwY5pg8vRrHTPu5ooSCcXbrRQjGhD-viF7tVPR1bBXLy3752s6iT7E_IO4igc8JiqQxgty__y1JvwyN5nJN1ekVeTaG7ekHRpGB-V7Iisk3AkgE2jMKOq4vLYLa9hFsJTsChNbWWMI2bz90VGp1hc1lxPVDmvENuIfHLfA_jU6jSGYwRxnABPS-J6T9_Mh83AVYve5F0Dt4g'
        }
      }
    }
  ];
  @Prop() buttonTitle: string = 'ثبت';
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
  @Event() formEvent: EventEmitter<any>;

  componentWillLoad() {
    this.form = _.cloneDeep(this.formProp);
    this.checkInputs = false;
  }

  componentDidRender() {
    this.formEvent.emit(this.form);
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
        case 'multiselectDropdown':
          return this.renderMultiselectDropdown(data, index);
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

  renderCheckBoxInput(data: { value: any; title: any; className: any; color: any; label: string }, index: number) {
    const {
      value,
      title,
      className,
      color,
      label
    } = data;

    return (
      <div class="checkbox-container">
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
        <label>{label}</label>
      </div>
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

  renderMultiselectDropdown(data: MultiselectDropdownHiweb, index) {
    const {
      items,
      api,
      label,
      selectAllOption
    } = data;

    return (
      <multiselect-dropdown-hiweb
        label={label}
        items={items}
        api={api}
        selectAllOption={selectAllOption}
        onOnChange={e => {
          this.form[index].data.value = e.detail;
          this.formEvent.emit(this.form);
        }}
      />
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

      if ((type === 'text' || type === 'imageLink') && !isValid) errors.push(title);
      
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
            title={this.buttonTitle} 
            onOnClick={this.handleFormSubmit}
          >
          </button-hiweb>
        </div>
      </div>
    );
  }

}
