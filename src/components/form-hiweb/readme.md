# form-hiweb



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                             | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------- | ------------ | ----------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formProp`  | --           |             | `{ type: string; data: any; }[]` | `[     {       type: 'text',       data: {         value: 'sdfsdfsdf',         placeholder: 'text1',         label: 'sdfsdf',         title: 'text1',         validator: '["required"]'       }     },     {       type: 'text',       data: {         value: '',         placeholder: 'sdfsdf',         label: 'sdfsdf',         title: 'text2',         validator: '["required"]'       }     },     {       type: 'selectOption',       data: {         title: 'select',         placeholder: 'place',         required: true,         options: [{value: 'sdfsdf1', text: 'sfsdf'}, {value: 'sdfsdf2', text: 'sfsdf3'}, {value: 'sdfsdf4', text: 'sfsdf5'}, {value: 'sdfsdf6', text: 'sfsdf'}, {value: 'sdfs7df', text: 'sfsdf'}, {value: 'sdfsdf', text: 'sfsdf'}],         className: 'mb-3'       }     },     {       type: 'checkBox',       data: {         title: 'check'       }     },     {       type: 'date',       data: {         title: 'date-picker',         label: 'tarikh'       }     },     {       type: 'time',       data: {         title: 'time-picker',         label: 'zaman'       }     },     {       type: 'dateTime',       data: {         title: 'sdfsfs',         dateLabel: 'tarikh-kol',         timeLabel: 'zaman-kol'       }     }   ]` |
| `resetForm` | `reset-form` |             | `boolean`                        | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `onFormSubmit` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [input-hiweb](../input-hiweb)
- [input-select-hiweb](../input-select-hiweb)
- [checkbox-hiweb](../checkbox-hiweb)
- [date-picker-hiweb](../date-picker-hiweb)
- [time-picker-hiweb](../time-picker-hiweb)
- [button-hiweb](../button-hiweb)

### Graph
```mermaid
graph TD;
  form-hiweb --> input-hiweb
  form-hiweb --> input-select-hiweb
  form-hiweb --> checkbox-hiweb
  form-hiweb --> date-picker-hiweb
  form-hiweb --> time-picker-hiweb
  form-hiweb --> button-hiweb
  style form-hiweb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
