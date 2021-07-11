# multiselect-dropdown-hiweb



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                             | Default     |
| -------- | --------- | ----------- | ---------------------------------------------------------------- | ----------- |
| `api`    | --        |             | `{ url: string; query: string; field: string; token?: string; }` | `undefined` |
| `items`  | --        |             | `Item[]`                                                         | `[]`        |
| `label`  | `label`   |             | `string`                                                         | `undefined` |


## Events

| Event      | Description | Type                                |
| ---------- | ----------- | ----------------------------------- |
| `onChange` |             | `CustomEvent<(string \| number)[]>` |


## Dependencies

### Used by

 - [form-hiweb](../form-hiweb)

### Graph
```mermaid
graph TD;
  form-hiweb --> multiselect-dropdown-hiweb
  style multiselect-dropdown-hiweb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
