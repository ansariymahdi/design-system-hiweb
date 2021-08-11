# better-multiselect-dropdown-hiweb



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type                                                             | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------- | ----------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api`             | --                  |             | `{ url: string; query: string; field: string; token?: string; }` | `{     url: 'http://46.224.6.83:666/User',     query: 'username',     field: 'userName',     token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg2THBfYy1ndENWUFJnZHZmME5SVmciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2Mjg1MDQ1NzMsImV4cCI6MTYyODUwODE3MywiaXNzIjoiaHR0cDovLzQ2LjIyNC42LjgzOjgwOTAiLCJhdWQiOiJlZmNfYXBpIiwiY2xpZW50X2lkIjoiZWZjX2FwaV9jbGllbnQiLCJzdWIiOiJlYTYxYTEzMy05ZGE1LTRjODMtYjJkZS0xOWU4M2RlMzhjNDYiLCJhdXRoX3RpbWUiOjE2Mjg1MDQ1NzMsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRhbSIsIm5hbWUiOiJhZGFtIiwiZW1haWwiOiJzLmdob3JlaXNoaUBoaXdlYi5pciIsInBob25lX251bWJlciI6IjA5MTk0ODU0OTU2Iiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiLCJlZmNfYXBpIl0sImFtciI6WyJwd2QiXX0.GYKMsoRaQmt5YxzsyGyjtvPgvBMO-hEy4BfY-ySvyK6I7FPs5zFgfKv4qnVBml5lRfffV3p5u6fMrYOzQ4WFlOosQBkrr8U9I9RQIkdFgLFkXcbTg896NrGBnbQk2Ifr9TcRknm-64U9E0ydJNANfv5WuVQBxPmQt7i6IEl1aaokhSvEYJTQKUAMdtDD9nHScj2PyUq74rQ3uPqHtNG-Wop28w7nk3uChzN3SCpKkIJilsSjjD2nRR1dbdBxzge4UxCfG3Et-hQBkjALTOuXq2u_L9cCkTXccUSj1Gzowmfyxan1JsVXz9fcFEDcZoY_poly5T7Oh68p4GupE5ED2Q'   }` |
| `items`           | --                  |             | `Item[]`                                                         | `[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `label`           | `label`             |             | `string`                                                         | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `selectAllOption` | `select-all-option` |             | `boolean`                                                        | `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |


## Events

| Event      | Description | Type                                                                                             |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `onChange` |             | `CustomEvent<(string \| number)[] \| { allIsSelected: boolean; values: (string \| number)[]; }>` |


## Dependencies

### Used by

 - [form-hiweb](../form-hiweb)

### Graph
```mermaid
graph TD;
  form-hiweb --> better-multiselect-dropdown-hiweb
  style better-multiselect-dropdown-hiweb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
