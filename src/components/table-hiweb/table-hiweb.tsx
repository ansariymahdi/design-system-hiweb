import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import Fragment from 'stencil-fragment'

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
  @Prop() range: number[] = [5, 10, 20, 50, 100, 200];
  @Prop() numberOfRows: number = 20;
  @Prop() totalDocuments: number = 8;
  @Prop() orderBy: { order: string, options: string[] } = { order: 'زمان', options: ['بازدید', 'سیبیب', 'سیبسبیسیبسیب', 'سشیبسیب'] };
  @Prop() info: { title: string, content: string }[] = [{ title: 'تعداد', content: '۲۳۴۲۳۴' }]

  @State() data: { head: { title: string, options: string[], colspan: number }[], body: { type: string, data: any }[][] };
  @State() options: { options: string[], colspan: number }[] = [];
  @State() allSelected: boolean = false;

  @Event() buttonClicked: EventEmitter<string|{text: string,detail: string}>;
  @Event() handleCheckbox: EventEmitter<{ index: number, checked: boolean } | { allSelected: boolean }>;
  @Event() pageChanged: EventEmitter<number>;
  @Event() rowNumChanged: EventEmitter<number>;
  @Event() orderChanged: EventEmitter<string>;
  @Event() searchInputChanged: EventEmitter<{ title: string, value: string, isValid: boolean }>;

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
            ? <th class="center checkbox">
              <div
                class="placeholder"
                innerHTML={icons[this.allSelected ? 'checkBox' : 'roundSquare']}
                onClick={() => { this.allSelected = !this.allSelected; this.handleCheckbox.emit({ allSelected: this.allSelected }) }}
              />
            </th>
            : null
        }
        {
          this.data.head.map(({ title }, index) => {
            console.log('bye');

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
            ? <td class="center checkbox">
              <input
                class="form-check-input cursor"
                type="checkbox"
                value=""
                checked={this.allSelected}
                onChange={(e) => this.handleCheckbox.emit({ index: rowIndex, checked: e.target['checked'] })}
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
            case 'badge':
              return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                >
                  <div class={'badge-custom ' + data.className}>
                    {data.value}
                  </div>
                </td>
              )
            case 'dropdown':
            console.log(data);

              return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                >
                  <dropdown-hiweb
                    icon={data['icon']}
                    items={data['items']}
                    onClicked={e => this.buttonClicked.emit({text: e['detail'],detail: data['detail']})}
                  ></dropdown-hiweb>
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
      if (this.totalDocuments % this.numberOfRows !== 0) {
        var totalDocumentsRoof = this.totalDocuments + (this.numberOfRows - (this.totalDocuments % this.numberOfRows));
      } else {
        var totalDocumentsRoof = this.totalDocuments;
      }
      return (
        <ul class="pagination-custom">
          <li
            onClick={() => this.handlePageChange(this.page - 1)}
            class={this.page - 1 > 0 ? '' : 'disable'}
          >
            <div class="placeholder" innerHTML={icons['arrowLeft']} />
          </li>
          <li
            class={(this.page + 1) * this.numberOfRows > totalDocumentsRoof ? 'disable' : ''}
            onClick={() => this.handlePageChange(this.page + 1)}
          >
            <div class="placeholder" innerHTML={icons['arrowRight']} />
          </li>
        </ul>
      )
    }
  }

  handlePageChange = page => {
    if (this.totalDocuments % this.numberOfRows !== 0) {
      var totalDocumentsRoof = this.totalDocuments + (this.numberOfRows - (this.totalDocuments % this.numberOfRows));
    } else {
      var totalDocumentsRoof = this.totalDocuments;
    }

    if (page === 0 || page * this.numberOfRows > totalDocumentsRoof) {

      return;
    }
    console.log('page', page);
    this.pageChanged.emit(page);
  }

  renderInfo = () => {
    return this.info.map(({ title, content }, index) => {
      return (
        <Fragment>
          <div class="info">
            <h1>
              {title}
            </h1>
            <h4>
              {content}
            </h4>
          </div>
          {
            index !== this.info.length - 1 && <div class="line" />
          }
        </Fragment>
      )
    });
  }


  renderSelecter = () => {
    // this.range
    // this.totalDocuments
    let range = this.range.filter(num => num < this.totalDocuments);

    if (!range.includes(this.numberOfRows)) {
      if (!range.length) {
        range = [this.totalDocuments];
        this.numberOfRows = this.totalDocuments;
      } else {
        this.numberOfRows = range[range.length - 1];
      }
    }
    
    return (
      <select
        class=""
        onInput={(event) => this.rowNumChanged.emit(event.target['value'])}
      >
        {
          range.map(num => {
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
    )
  }

  calculateRangeEnd = () => {
    if (this.numberOfRows * (this.page) > this.totalDocuments) {
      return this.totalDocuments;
    }
    return this.numberOfRows * (this.page);
  }

  render() {
    return (
      <div class="host">
        <div class="header">
          <div class="info-div">
            {
              this.info && this.renderInfo()
            }
          </div>
          <div class="search">
            <input-hiweb
              placeHolder="جستجو"
              onChanged={e => this.searchInputChanged.emit(e['detail'])}
            ></input-hiweb>
          </div>
          <div class="sort">
            <div class="text">
              مرتب سازی براساس
            </div>
            <div class="input-group">
              <select
                class="form-select"
                id="inputGroupSelect01"
                onInput={(event) => this.orderChanged.emit(event.target['value'])}
              >
                <option
                  selected
                  value={this.orderBy.order}
                >{this.orderBy.order}</option>
                {
                  this.orderBy.options.map(option => {
                    return (
                      <option
                        value={option}
                      >{option}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <table class="table text-right table-hover">
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
          <div class="selecter">
              نمایش {this.renderSelecter()} از <span>{this.totalDocuments}</span>
          </div>
          <nav>
            {this.renderPagination()}
            <h5>{((this.numberOfRows * (this.page - 1)) + 1) + ' - ' + this.calculateRangeEnd()}</h5>
          </nav>
        </div>
      </div>
    );
  }
}
