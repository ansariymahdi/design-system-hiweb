import { Component, Host, h, State, Event, Listen, Prop, EventEmitter } from '@stencil/core';
import axios from 'axios';

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
  @Prop({mutable: true}) items: Item[] = [];
  @Prop() api: {url: string, query: string, field: string, token?: string};
  //  = {
  //   url: 'http://46.224.6.83:666/User',
  //   query: 'username',
  //   field: 'userName',
  //   token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNOM2d0V1AybWdNUjZja3lyNFJ6aWciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjU5MDM5NzYsImV4cCI6MTYyNTkwNzU3NiwiaXNzIjoiaHR0cDovLzQ2LjIyNC42LjgzOjgwOTAiLCJhdWQiOiJlZmNfYXBpIiwiY2xpZW50X2lkIjoiZWZjX2FwaV9jbGllbnQiLCJzdWIiOiJlYTYxYTEzMy05ZGE1LTRjODMtYjJkZS0xOWU4M2RlMzhjNDYiLCJhdXRoX3RpbWUiOjE2MjU5MDM5NzYsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRhbSIsIm5hbWUiOiJhZGFtIiwiZW1haWwiOiJzLmdob3JlaXNoaUBoaXdlYi5pciIsInBob25lX251bWJlciI6IjA5MTk0ODU0OTU2Iiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiLCJlZmNfYXBpIl0sImFtciI6WyJwd2QiXX0.D53GOGYe96UyfiscNev81fPWKs_Epv6w6Azlj1WjSopk6P-L6XfkqjMMWGatCK7VIXrDiYyfI2UqVP9YLgHK2c_NZToum4ufJPxuyCbw6mfIZbflBZ2YmEhmyb7xHrLqojQYOEEiwasabzrAmvwAC1u2Xgc67WD9ggK2YjleIPscLVRYJsw7SvTtq5x-ptsQL-lOehaZJjVgMlVriA0eDPprVDRDtJMxgNuPYod8rMTMtrhXXW8TIJ7DwZJRkHYtyjYCk1D5YUzl6DQaObC1dFNSKAe_F41DPnMdbenBlG_IEuJWfDWTyyk5dFoHB88FxXdayfomSp9lZhC0goeMmg'
  // };

  @State() loading: boolean = false;
  @State() isOpen: boolean = false;
  @State() selectedItems: Item[] = [];
  @State() searchValue: string = '';

  @Event() onChange: EventEmitter<(string | number)[]>;

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

    this.items = response.data.data.list.map((item: { [x: string]: any; id: any; }) => {
      return {
        id: item.id,
        value: item[this.api.field]
      }
    })

    this.loading = false;
  }

  handleHostClick() {
    this.isOpen = !this.isOpen;
  }

  async handleItemClick(_event: MouseEvent, _item: Item, index: number) {
    if (this.items[index].selected) return;
    this.addToSelected(index);
    this.searchValue = '';
    await this.getItems();
  }

  handleCheckboxClick(event: MouseEvent, item: Item, index: number) {
    event.stopPropagation();
    if (this.items[index].selected) {
      this.removeFromSelected(item.id);
      return this.items[index].selected = false;
    }
    this.addToSelected(index);
  }

  handleSelectedIconClick(event: MouseEvent, _id: string | number, itemIndex: number) {
    this.removeFromSelected(_id);
    this.items[itemIndex].selected = false;
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
    this.onChange.emit(values);
  }

  renderDropdown() {
    if (this.isOpen) {
      return (
        <div class="dropdown-items" >
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
        <div 
          class={'multiselect ' + (this.isOpen ? 'is-open' : null)} 
          onClick={() => this.handleHostClick()}
        >
          <div class="value-container">
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
