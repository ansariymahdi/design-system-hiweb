import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: true,
})
export class TableHiweb {
  @Prop({ attribute: 'data' }) dataProp: {head: {title: string, options: string[]}[], body: {type: string, data: any}[][]};
  @Prop({ attribute: 'dataString' }) dataStringProp: string;
  @State() data: {head: {title: string, options: string[]}[], body: {type: string, data: any}[][]};
  @State() options: string[][] = [];
  @Event() buttonClicked: EventEmitter<string>;

  componentWillLoad() {
    if (this.dataStringProp) {
      console.log('bye');

      this.data = JSON.parse(this.dataStringProp);
    } else {
      console.log('hi');

      this.data = this.dataProp;
    }

    this.options = this.data.head.map(({options}) => {
      return (options);
    });
  }

  handleClick = path => {
    console.log(path);
    this.buttonClicked.emit(path);
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
        {dataArray.map((body, index) => {
          const {type, data} = body;
          const styleClass = this.options[index].join(' ');
          switch (type) {
            case 'text':
              return (
                <td class={styleClass}>{data.value}</td>
              )
            case 'image':
              return (
                <td class={styleClass}><img src={data.src} alt="image" /></td>
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
                <td class={styleClass}>
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
