# esteghlal-input



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute      | Description | Type      | Default     |
| --------------- | -------------- | ----------- | --------- | ----------- |
| `checkInput`    | `check-input`  |             | `boolean` | `undefined` |
| `color`         | `color`        |             | `string`  | `'black'`   |
| `disable`       | `disable`      |             | `boolean` | `false`     |
| `error`         | `error`        |             | `string`  | `undefined` |
| `label`         | `label`        |             | `string`  | `undefined` |
| `placeHolder`   | `place-holder` |             | `string`  | `undefined` |
| `title`         | `title`        |             | `string`  | `undefined` |
| `type`          | `type`         |             | `string`  | `'text'`    |
| `valid`         | `valid`        |             | `boolean` | `undefined` |
| `validatorProp` | `validator`    |             | `string`  | `undefined` |
| `valueProp`     | `value-prop`   |             | `string`  | `undefined` |


## Events

| Event     | Description | Type                                                               |
| --------- | ----------- | ------------------------------------------------------------------ |
| `changed` |             | `CustomEvent<{ title: string; value: string; isValid: boolean; }>` |


## Methods

### `validate() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [form-hiweb](../form-hiweb)
 - [nav-top-hiweb](../nav-top-hiweb)
 - [table-hiweb](../table-hiweb)

### Graph
```mermaid
graph TD;
  form-hiweb --> input-hiweb
  nav-top-hiweb --> input-hiweb
  table-hiweb --> input-hiweb
  style input-hiweb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
