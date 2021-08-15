import { Component, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';
import Fragment from 'stencil-fragment'

import icons from '../../modules/iconsList';

export interface Search {
  title: string,
  type: string,
  placeholder: string,
  value: any
}

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: false,
})
export class TableHiweb {
  @Prop({ attribute: 'data' }) dataProp: { head: { title: string, options: string[], colspan: number, search: Search }[], body: { type: string, data: any }[][] };
  @Prop({ attribute: 'dataString' }) dataStringProp: string;
  @Prop() checkbox: boolean = true;
  @Prop() page: number = 1;
  @Prop() range: number[] = [5, 10, 20, 50, 100, 200];
  @Prop() numberOfRows: number = 20;
  @Prop() totalDocuments: number = 8;
  @Prop() orderBy: { order: string, options: string[] } = { order: 'زمان', options: ['بازدید', 'سیبیب', 'سیبسبیسیبسیب', 'سشیبسیب'] };
  @Prop() info: { title: string, content: string }[] = [{ title: 'تعداد', content: '۲۳۴۲۳۴' }]
  @Prop() searchInputPlaceholder: string = 'جستجو';

  @State() data: { head: { title: string, options: string[], colspan: number, search: Search }[], body: { type: string, data: any }[][] };
  @State() options: { options: string[], colspan: number }[] = [];
  @State() allSelected: boolean = false;

  @State() tableBodyHeight: number;
  @State() shadowLeft: boolean = true;
  @State() shadowRight: boolean = false;

  @State() mousePosition: {x: number, y: number} = {x: 0, y: 0};

  @State() selectedFilterHeader: number = 0;
  @State() timerId: any;

  @Event() buttonClicked: EventEmitter<string|{text: string,detail: string}>;
  @Event() handleCheckbox: EventEmitter<{ index: number, checked: boolean } | { allSelected: boolean }>;
  @Event() pageChanged: EventEmitter<number>;
  @Event() rowNumChanged: EventEmitter<number>;
  @Event() orderChanged: EventEmitter<string>;
  @Event() searchInputChanged: EventEmitter<{ title: string, value: string, isValid: boolean }>;

  @Listen('resize', { target: 'window' })
    onWindowResize() {
      if(this.shadowLeft || this.shadowRight) return;
      if (this.tableRef.clientWidth !== this.tableRef.scrollWidth) this.shadowLeft = true;
    }

  @Listen('mouseover', {target: 'window'})
    onMouseMove(e) {
      this.mousePosition = {x: e.clientX, y: e.clientY};
    }

  private tableRef: HTMLElement;

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

  componentDidLoad() {
    // console.log(this.tableRef.scrollWidth);
    // console.log(this.tableRef.clientWidth);
    // console.log(this.tableRef.clientWidth - this.tableRef.scrollWidth);
    // this.formHeight = this.tableRef.clientHeight;
    this.tableBodyHeight = this.tableRef.children.item(0).children.item(1).clientHeight;
    if (this.tableRef.clientWidth === this.tableRef.scrollWidth) this.shadowLeft = false;
  }

  handleTableScroll(e) {
    console.log('called')
    if (this.tableBodyHeight === 0) this.tableBodyHeight = this.tableRef.children.item(0).children.item(1).clientHeight;
    const scrollPosition = e.target['scrollLeft'];
    if (scrollPosition >= 0 ) {
      this.shadowRight = false;
    } else {
      this.shadowRight = true;
    }
    if (scrollPosition <= this.tableRef.clientWidth - this.tableRef.scrollWidth + 1) {
      this.shadowLeft = false;
    } else {
      this.shadowLeft = true;
    }
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
          this.data.head.map(({ title, search }, index) => {
            return (
              <th
                class={
                  this.options[index].options.join(' ')
                  + ' ' +
                  (search ? 'search-header' : '')
                  + ' ' +
                  (this.selectedFilterHeader - 1 === index ? 'search-filter-selected' : '')
                }
                colSpan={this.options[index].colspan}
                onClick={() => {
                  if (!search || this.selectedFilterHeader === index + 1) return this.selectedFilterHeader = 0;
                  this.selectedFilterHeader = index + 1
                }}
              > 
                {title}
              </th>
            );
          })
        }
      </tr>
    );
  }

  renderSearch() {
    if (this.selectedFilterHeader === 0) return;

    const search = this.data.head[this.selectedFilterHeader - 1].search;

    return ( 
      <tr>
        <td colSpan={this.data.head.length + (this.checkbox ? 1 : 0)}>
          {
            search.type === 'text'
              ? (
                <input-hiweb
                  title={search.title}
                  placeHolder={search.placeholder}
                  valueProp={search.value}
                  onChanged={e => {
                    this.data.head[this.selectedFilterHeader - 1].search.value = e['detail'].value;
                    if (this.timerId) clearTimeout(this.timerId);
                    this.timerId = setTimeout(() => {
                      if (e['detail'].value) this.searchInputChanged.emit(e['detail'])
                    }, 1000); 
                  }}
                ></input-hiweb>
              )
              : (
                <div class="sort">
                  <div class="text">
                    {search.placeholder}
                  </div>
                  <div class="input-group">
                    <select
                      class="form-select"
                      id="inputGroupSelect01"
                      onInput={(event) => {
                        console.log(event.target['value']);
                        this.orderChanged.emit(event.target['value'])
                      }}
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
              )
          }
          
        </td>
      </tr>
    )
  }

  renderRow = (dataArray, rowIndex) => {
    return (
      <tr>
        {
          this.checkbox
            ? <td class="center checkbox" style={{zIndex: `${this.numberOfRows - rowIndex }`}}>
                {
                  rowIndex === 0 && this.shadowRight
                  ? <div class="shadow-right" style={{height: `${this.tableBodyHeight}px`}} />
                  : null
                }
                <input
                  class="form-check-input cursor"
                  type="checkbox"
                  value=""
                  checked={this.allSelected}
                  style={{zIndex: `${this.numberOfRows - rowIndex - 1}`}}
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
                <td colSpan={colSpan} class={`${styleClass} tooltip-t`}>
                  {data.value.length > 30 ? `${data.value.slice(0,30)}...` : data.value}
                  <span style={{top: `${this.mousePosition.y}px`, left: `${this.mousePosition.x}px`, maxHeight: `${window.innerHeight - this.mousePosition.y - 10}px`}}>
                      {data.value}
                  </span>
                </td>
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

              return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                  style={{zIndex: `${this.numberOfRows - rowIndex }`}}
                >
                  {
                    rowIndex === 0 && this.shadowLeft
                    ? <div class="shadow-left" style={{height: `${this.tableBodyHeight}px`}} />
                    : null
                  }
                  <dropdown-hiweb
                    icon={data['icon']}
                    items={data['items']}
                    onClicked={e => this.buttonClicked.emit({text: e['detail'],detail: data['detail']})}
                  ></dropdown-hiweb>
                </td>
              )
            case 'link':
              return (
                <td
                  class={styleClass}
                  colSpan={colSpan}
                >
                  <a
                    href={data.value}
                    target="_blank"
                  >
                      لینک
                  </a>
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
    
    return (
      <select
        class=""
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
          {/* <div class="search">
            <input-hiweb
              placeHolder={this.searchInputPlaceholder}
              onChanged={e => {
                if (this.timerId) clearTimeout(this.timerId);
                this.timerId = setTimeout(() => {
                  if (e['detail'].value) this.searchInputChanged.emit(e['detail'])
                }, 1000); 
              }}
            ></input-hiweb>
          </div> */}
          {/* <div class="sort">
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
          </div> */}
        </div>
        <div
         class="table-container scrollbox"
          onScroll={e => this.handleTableScroll(e)} 
          ref = {(el : HTMLElement) =>  this.tableRef = el}
        >
          <table
          class="table text-right table-hover"
          >
            <thead>
              {this.renderHead()}
            </thead>
            <tbody>
              {this.renderSearch()}
              {
                this.data.body.map((eachRow, index) => this.renderRow(eachRow, index))
              }
            </tbody>
          </table>
        </div>
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
