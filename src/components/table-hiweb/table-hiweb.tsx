import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: false,
})
export class TableHiweb {
  @Prop({ attribute: 'data' }) dataProp: { head: { title: string, options: string[], colspan: number }[], body: { type: string, data: any }[][] };
  @Prop({ attribute: 'dataString' }) dataStringProp: string;
  @Prop() checkbox: boolean = true;
  @Prop() page: number = 1;
  @Prop() range: number[] = [5,10,20,50,100,200];
  @Prop() numberOfRows: number = 10;
  @State() data: { head: { title: string, options: string[], colspan: number }[], body: { type: string, data: any }[][] };
  @State() options: { options: string[], colspan: number }[] = [];
  @State() allSelected: boolean = false;
  @Event() buttonClicked: EventEmitter<string>;
  @Event() handleCheckbox: EventEmitter<{index: number, checked: boolean} | {allSelected: boolean}>;
  @Event() pageChanged: EventEmitter<number>;
  @Event() rowNumChanged: EventEmitter<number>;

  componentWillLoad() {
    if (this.dataStringProp) {
      this.data = JSON.parse(this.dataStringProp);
    } else {
      this.data = this.dataProp;
    }



    this.options = this.data.head.map(({ options, colspan }) => {
      let obj = {
        options,
        colspan: 1
      }
      if (colspan) {
        console.log(colspan);

        obj = { ...obj, colspan: colspan };
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
          this.checkbox
            ? <th class="center">
                <div
                  class="placeholder"
                  innerHTML={icons[this.allSelected ? 'checkBox' : 'roundSquare']}
                  onClick={() => {this.allSelected = !this.allSelected; this.handleCheckbox.emit({allSelected: this.allSelected})}}
                />
              </th>
            : null
        }
        {
          this.data.head.map(({ title }, index) => {
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

  renderRow = (dataArray, rowIndex) => {
    return (
      <tr>
        {
          this.checkbox
            ? <td class="center">
                <input
                  class="form-check-input cursor"
                  type="checkbox"
                  value=""
                  checked={this.allSelected}
                  onChange={(e) => this.handleCheckbox.emit({index: rowIndex, checked: e.target['checked']})}
                />
              </td>
            : null
        }
        {dataArray.map((body, index) => {
          const { type, data } = body;
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
            case 'icon':
              return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                >
                  <div
                    class={"placeholder " + data.className}
                    chosen-color="yellow"
                    innerHTML={icons[data.icon]}
                    onClick={() => this.handleClick(data.path)}
                  />
                </td>
              )
            case 'button':
              let style = {};
              if (data.background) {
                style = { ...style, background: data.background };
              }
              if (data.color) {
                style = { ...style, color: data.color };
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

  renderPagination = () => {
    if (this.page) {
      return (
        <ul class="pagination-custom">
          <li class={this.page - 1 === 0 ? 'disabled' : ''} onClick={() => this.handlePageChange(this.page - 1)}>Previous</li>
          {
            this.page - 1 !== 0
              ? <li class="" onClick={() => this.handlePageChange(this.page - 1)}>{this.page - 1}</li>
              : null
          }
          <li class="selected" onClick={() => this.handlePageChange(this.page)}>{this.page}</li>
          <li class="" onClick={() => this.handlePageChange(this.page + 1)}>{this.page + 1}</li>
          {
            this.page - 1 === 0
              ? <li class="" onClick={() => this.handlePageChange(this.page + 2)}>{this.page + 2}</li>
              : null
          }
          <li class="" onClick={() => this.handlePageChange(this.page + 1)}>Next</li>
        </ul>
      )
    }
  }

  handlePageChange = page => {
    if (page === 0 || page === this.page) {
      return;
    }
    console.log('page', page);
    this.pageChanged.emit(page);
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
              this.data.body.map((eachRow, index) => this.renderRow(eachRow, index))
            }
          </tbody>
        </table>
        <div class="footer">
          <p>

          </p>
          <nav>
            {this.renderPagination()}
          </nav>
          <div class="selecter">
            <select
              class="form-select"
              onInput={(event) => this.rowNumChanged.emit(event.target['value'])}
              >
              {
                this.range.map(num => {
                  return (
                    <option
                      selected={num === this.numberOfRows ? true : false}
                      value={num}
                    >
                      {num}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
      </div>
    );
  }
}
