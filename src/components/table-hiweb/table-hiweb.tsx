import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: true,
})
export class TableHiweb {
  @Prop({ attribute: 'data' }) dataProp: {head: {title: string, options: string[], colspan: number}[], body: {type: string, data: any}[][]};
  @Prop({ attribute: 'dataString' }) dataStringProp: string;
  @State() data: {head: {title: string, options: string[], colspan: number}[], body: {type: string, data: any}[][]};
  @State() options: {options: string[], colspan: number}[] = [];
  @Event() buttonClicked: EventEmitter<string>;

  componentWillLoad() {
    if (this.dataStringProp) {
      this.data = JSON.parse(this.dataStringProp);
    } else {
      this.data = this.dataProp;
    }
    console.log(this.data);


    this.options = this.data.head.map(({options, colspan}) => {
      let obj = {
        options,
        colspan: 1
      }
      if (colspan) {
        console.log(colspan);

        obj = {...obj, colspan: colspan};
      }
      return obj;
    });
  }

  handleClick = path => {
    this.buttonClicked.emit(path);
  }

  renderHead = () => {
    return (
      <tr>
        {
          this.data.head.map(({title},index) => {
            return (
              <th
                class={this.options[index].options.join(' ')}
                colSpan={this.options[index].colspan}
              >
                {title}
              </th>
            );
          })
        }
      </tr>
    );
  }

  renderRow = dataArray => {
    return (
      <tr>
        {dataArray.map((body, index) => {
          const {type, data} = body;
          const styleClass = this.options[index].options.join(' ');
          const colSpan = this.options[index].colspan;

          switch (type) {
            case 'text':
              return (
                <td colSpan={colSpan} class={styleClass}>{data.value}</td>
              )
            case 'image':
              return (
                <td
                  colSpan={colSpan}
                  class={styleClass}
                >
                  <img
                    src={data.src}
                    alt="image"
                  />
                </td>
              )
            case 'button':
            let style = {};
            if (data.background) {
              style = {...style, background: data.background};
            }
            if (data.color) {
              style = {...style, color: data.color};
            }
            return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                >
                  <button
                    style={style}
                    onClick={() => this.handleClick(data.path)}
                  >
                    {data.text}
                  </button>
                </td>
            )
            default:
              break;
          }
        })}
      </tr>
    );
  }

  render() {
    return (
      <div class="">
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
