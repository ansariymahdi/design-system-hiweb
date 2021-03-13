# table-hiweb



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description | Type                                                                                                          | Default                |
| ---------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `checkbox`       | `checkbox`       |             | `boolean`                                                                                                     | `true`                 |
| `dataProp`       | --               |             | `{ head: { title: string; options: string[]; colspan: number; }[]; body: { type: string; data: any; }[][]; }` | `undefined`            |
| `dataStringProp` | `datastring`     |             | `string`                                                                                                      | `undefined`            |
| `numberOfRows`   | `number-of-rows` |             | `number`                                                                                                      | `10`                   |
| `page`           | `page`           |             | `number`                                                                                                      | `1`                    |
| `range`          | --               |             | `number[]`                                                                                                    | `[5,10,20,50,100,200]` |


## Events

| Event            | Description | Type                                                                             |
| ---------------- | ----------- | -------------------------------------------------------------------------------- |
| `buttonClicked`  |             | `CustomEvent<string>`                                                            |
| `handleCheckbox` |             | `CustomEvent<{ allSelected: boolean; } \| { index: number; checked: boolean; }>` |
| `orderChanged`   |             | `CustomEvent<{ title: string; down: boolean; }>`                                 |
| `pageChanged`    |             | `CustomEvent<number>`                                                            |
| `rowNumChanged`  |             | `CustomEvent<number>`                                                            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
