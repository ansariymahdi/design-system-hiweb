import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: true,
})
export class TableHiweb {
  @Prop({ attribute: 'data' }) dataProp: string;
  @State() data: {head: {title: string, options: string[]}[], body: string[][]};
  @State() options: string[][] = [];

  componentWillLoad() {
    this.data = JSON.parse(this.dataProp);
    this.options = this.data.head.map(({options}) => {
      return (options);
    });
  }

  renderHead = () => {
    return (
      <tr>
        {
          this.data.head.map(({title, options}) => {
            return (
              <th class={options.join(' ')}>{title}</th>
            );
          })
        }
      </tr>
    );
  }

  renderRow = dataArray => {
    return (
      <tr>
        {dataArray.map((data, index) => {
          return (
            <td class={this.options[index].join(' ')}>{data}</td>
          );
        })}
      </tr>
    );
  }

  render() {
    return (
      <div class="table-responsive">
        <table class="table text-right">
          <thead>
            {this.renderHead()}
          </thead>
          <tbody>
            {
              this.data.body.map(eachRow => this.renderRow(eachRow))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
