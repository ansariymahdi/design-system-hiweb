import { Component, Host, h, State, Event, Listen, Prop, EventEmitter } from '@stencil/core';
import axios from 'axios';

import Fragment from 'stencil-fragment'
import icons from '../../modules/iconsList';

export interface Item {
  id: number | string,
  value: string,
  selected?: boolean,
  index?: number,
}

@Component({
  tag: 'multiselect-dropdown-hiweb',
  styleUrl: 'multiselect-dropdown-hiweb.scss',
  shadow: true,
})
export class MultiselectDropdownHiweb {
  @Prop() selectAllOption: boolean = true;
  @Prop() label: string;
  @Prop({mutable: true}) items: Item[] = [];
  @Prop() api: {url: string, query: string, field: string, token?: string} = {
    url: 'http://46.224.6.83:666/User',
    query: 'username',
    field: 'userName',
    token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg2THBfYy1ndENWUFJnZHZmME5SVmciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2Mjg2NTUxMzQsImV4cCI6MTYyODY1ODczNCwiaXNzIjoiaHR0cDovLzQ2LjIyNC42LjgzOjgwOTAiLCJhdWQiOiJlZmNfYXBpIiwiY2xpZW50X2lkIjoiZWZjX2FwaV9jbGllbnQiLCJzdWIiOiJlYTYxYTEzMy05ZGE1LTRjODMtYjJkZS0xOWU4M2RlMzhjNDYiLCJhdXRoX3RpbWUiOjE2Mjg2NTUxMzQsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRhbSIsIm5hbWUiOiJhZGFtIiwiZW1haWwiOiJzLmdob3JlaXNoaUBoaXdlYi5pciIsInBob25lX251bWJlciI6IjA5MTk0ODU0OTU2Iiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiLCJlZmNfYXBpIl0sImFtciI6WyJwd2QiXX0.jA3c-4iMEpfcvAGx3axJykP_CdOL3z_uzDYWYlNM42KcnEXCejs9-yLEeN6-UUADrvwsz9xCfM1votecKNUpi8g8B5ALX1OV-_T99h03Rnie7y9LYsKDibfBF7-zT0rm5_SXWoJbQMQJa06POaKSmmOY9ulbA1FR2Iw2BphfPDKdyn02sXIyqjFhxB3shcStq81X1-9Ht7BgWS9YTGgNwyxEoc7sOxDImwkQ-XdZWgSkQhsMGWp0rUM5JauKf5rk4nGeAheb1_5xEcIJsxL6Pn396nRaNBWOlpJFhFIc1xUVw30VoOnHAmOGULxHwLZNtEsRBHTvkLgDCNVoRM90_Q'
  };

  @State() allIsSelected: boolean = false;
  @State() loading: boolean = false;
  @State() isOpen: boolean = false;
  @State() selectedItems: Item[] = [];
  @State() searchValue: string = '';
  @State() allSelectedList: Item[] = [];

  @Event() onChange: EventEmitter<(string | number)[] | {allIsSelected: boolean, values: (string | number)[]}>;

  private hostRef: HTMLElement;
  private timeoutId: any;

  @Listen('click', {target: 'window'})
  handleWindowClick(e: { target: Node; }) {
    if(this.hostRef && !this.hostRef.contains(e.target)) {
      return this.isOpen = false;
    }
  }

  async componentWillLoad() {
    await this.getItems();
  }

  async getItems() {
    if (!this.api) return null;
    this.loading = true;
    const response = await axios.get(this.api.url, {
      params: {
        [this.api.query]: this.searchValue
      },
      headers: { Authorization: `Bearer ${this.api.token}` }
    });

    if (!this.searchValue) response.data.data.list = response.data.data.list.slice(0, 20);

    if (!this.allSelectedList.length) {
      this.allSelectedList = response.data.data.list.map((item: { [x: string]: any; id: any}) => {
        return {
          id: item.id,
          value: item[this.api.field]
        }
      });
    }

    if (this.selectAllOption && this.allIsSelected) {
      this.items = response.data.data.list.map((item: { [x: string]: any; id: any; }) => {
        const index = this.selectedItems.findIndex(({id}) => id == item.id);
        return {
          id: item.id,
          value: item[this.api.field],
          selected: index === -1 ? true : false
        }
      });
    } else {
      this.items = response.data.data.list.map((item: { [x: string]: any; id: any; }) => {
        const index = this.selectedItems.findIndex(({id}) => id == item.id);
        return {
          id: item.id,
          value: item[this.api.field],
          selected: index === -1 ? false : true
        }
      })
    }

    this.loading = false;
  }

  handleHostClick() {
    this.isOpen = !this.isOpen;
  }

  async handleItemClick(_event: MouseEvent, item: Item, index: number) {
    if (!this.allIsSelected && this.items[index].selected) return;
    if (this.allIsSelected) {
      if (this.items[index].selected) {
        this.addToSelected(index);
        this.items[index].selected = false;
      } else {
        this.items[index].selected = true;
        this.removeFromSelected(item.id);
      }
    } else {
      if (this.items[index].selected) {
        this.removeFromSelected(item.id);
        this.items[index].selected = false;
      } else {
        this.addToSelected(index);
      }
    }
    if (this.searchValue) {
      this.searchValue = '';
      await this.getItems();
    }
    this.isOpen = false;
  }

  handleCheckboxClick(event: MouseEvent, item: Item, index: number) {
    event.stopPropagation();
    if (this.allIsSelected) {
      if (this.items[index].selected) {
        this.addToSelected(index);
        return this.items[index].selected = false;
      }
      this.items[index].selected = true;
      return this.removeFromSelected(item.id);
    }

    if (this.items[index].selected) {
      this.removeFromSelected(item.id);
      return this.items[index].selected = false;
    }
    this.addToSelected(index);
    this.items[index].selected = true;
  }

  handleSelectedIconClick(event: MouseEvent, _id: string | number, itemIndex: number) {
    this.removeFromSelected(_id);
    this.items[itemIndex].selected = this.allIsSelected;
    event.stopPropagation();
  }

  async handleSearchValueChange(event) {
    this.searchValue = event.target.value;
    this.loading = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      await this.getItems();
    }, 1000);
  }

  addToSelected(index: number) {
    this.items[index].selected = true;
    this.selectedItems = [...this.selectedItems, {...this.items[index], index}];
    this.emitEvent();
  }

  removeFromSelected(_id: string | number) {
    const array = this.selectedItems;
    const index = this.selectedItems.findIndex(({id}) => id == _id);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.selectedItems = [...array];
    this.emitEvent();
  }

  clearItems() {
    this.items = this.items.map(item => {
      return {...item, selected: false};
    });
    this.selectedItems = [];
    this.emitEvent();
  }

  emitEvent() {
    const values = this.selectedItems.map(item => {
      return item.id;
    });
    if (this.selectAllOption) return this.onChange.emit({
      allIsSelected: this.allIsSelected,
      values
    });
    this.onChange.emit(values);
  }

  selectAll() {
    this.items = this.items.map(item => {
      return {...item, selected: !this.allIsSelected};
    });
    this.allIsSelected = !this.allIsSelected;
    this.selectedItems = [];
  }

  renderDropdown() {
    if (this.isOpen) {
      return (
        <div class="dropdown-items" >
          {
            this.selectAllOption
              ? <div
                  class={'option ' + (this.allIsSelected ? 'selected' : null)} 
                  onClick={() => {
                    this.selectAll();
                    this.isOpen = false;
                  }}
                >
                  <input
                    type="checkbox" 
                    checked={this.allIsSelected} 
                    onClick={(e) => {
                      this.selectAll();
                      e.stopPropagation();
                    }}
                  />
                  <span class="label">همه</span>
                </div>
              : null
          }
          {!this.loading
            ? this.items.length
              ? this.items.map((item, index) => {
                  if(!item.value.includes(this.searchValue)) return;
                  return (
                    <div
                      class={'option ' + (item.selected ? 'selected' : null)} 
                      onClick={(e) => this.handleItemClick(e, item, index)}
                    >
                      <input
                        type="checkbox" 
                        checked={item.selected} 
                        onClick={(e) => this.handleCheckboxClick(e, item, index)}
                      />
                      <span class="label">{item.value}</span>
                    </div>
                  )
                })
              : <div
                  class="option"
                >
                  <span class="label">موردی یافت نشد</span>
                </div>
            : <div
                class="option"
              >
                <span class="label">در حال جستجو</span>
              </div>
          }
        </div>
      );
    }
  }

  render() {
    return (
      <Host ref = {(el : HTMLElement) =>  this.hostRef = el}>
        <label>{this.label}</label>
        <div 
          class={'multiselect mb-3 ' + (this.isOpen ? 'is-open' : null)} 
          onClick={() => this.handleHostClick()}
        >
          <div class="value-container">
            {
              this.allIsSelected
                ? <Fragment>
                    <div class="value">
                      <span
                        class="value-icon"
                        innerHTML={icons.close}
                        onClick={(e) => {
                          this.selectAll();
                          e.stopPropagation();
                        }}
                      />
                      <span class="value-label">همه</span>
                    </div>
                    {
                      this.selectedItems.length
                        ? this.allSelectedList.map(item => {
                          const index = this.selectedItems.findIndex(({id}) => id == item.id);
                          if (index !== -1) return;
                          return (
                            <div class="value">
                              <span
                                class="value-icon" 
                                innerHTML={icons.close} 
                                onClick={(e) => this.handleSelectedIconClick(e, item.id, item.index)}
                              />
                              <span class="value-label">{item.value}</span>
                            </div>
                          )
                        })
                        : null
                    }
                  </Fragment>
                : null
            }
            {this.selectedItems.map((item) => {
              return (
                <div class="value">
                  <span
                    class="value-icon" 
                    innerHTML={icons.close} 
                    onClick={(e) => this.handleSelectedIconClick(e, item.id, item.index)}
                  />
                  <span class="value-label">{item.value}</span>
                </div>
              )
            })}
            <div class="input-container">
              <input
                value={this.searchValue}
                onInput={event => this.handleSearchValueChange(event)}
                onClick={e => {
                  this.isOpen = true;
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
          {
            this.selectedItems.length
              ? <div
                  class="dropdown-icon" 
                  innerHTML={icons.close} 
                  onClick={() => this.clearItems()}
                />
              : null
          }
          <div class="dropdown-icon" innerHTML={icons.arrowDown}/>
        </div>
        {this.renderDropdown()}
      </Host>
    );
  }

}
