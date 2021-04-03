import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

import icons from './../../modules/iconsList';

@Component({
  tag: 'nav-right-hiweb-2',
  styleUrl: 'nav-right-hiweb-2.scss',
  shadow: true,
})
export class NavRightHiweb2 {
  @State() open: boolean = false;
  @State() searchValue: string;
  @Prop() items: { title: string, subItems: { icon: string, title: string, path: string, active: boolean }[] }[] = [
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'logout',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: false
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
    {
      title: 'استقلال',
      subItems: [
        {
          icon: 'whatsapp',
          title: 'چت',
          path: '/',
          active: false
        },
        {
          icon: 'facebook',
          title: 'نمی‌دونم',
          path: '/',
          active: true
        },
        {
          icon: 'whatsapp',
          title: 'اصلا',
          path: '/',
          active: false
        }
      ]
    },
  ]
  @Event() onClick: EventEmitter;
  @Event() isOpen: EventEmitter<boolean>;

  toggleSideBar = () => {
    this.searchValue = '';
    this.open = !this.open;
    this.isOpen.emit(this.open);
  }

  search = () => {
    if (this.open) {
      return null;
    }
    this.open = true;
    this.isOpen.emit(this.open);
  }

  handleChange = (event) => {
    this.searchValue = event.target ? event.target.value : null;
  }

  renderHeader = () => {
    return (
      <div class="header">
        <div
          class="placeholder menu"
          innerHTML={icons['rightMenu']}
          onClick={this.toggleSideBar}
        />
        <h2>
          استقلال
        </h2>
        {/* <div
          class="placeholder search"
          innerHTML={icons['search']}
          onClick={this.search}
        />
        <input
          class="search-input"
          type="text"
          placeholder="جستجو"
          value={this.searchValue}
          style={{ paddingRight: this.searchValue ? '40px' : '10px' }}
          onInput={event => this.handleChange(event)}
        /> */}
      </div>
    )
  }

  renderItems = () => {
    return (
      <div class="body">
        {
          this.items.map(({title, subItems}) => {
            return (
              <ul>
                <li class="title">
                  <h4>{title}</h4>
                </li>
                {
                  subItems.map(item => {
                    return (
                      <li
                        class={item.active ? 'active' : '' }
                        onClick={() => {
                          this.onClick.emit(item.path);
                          if (this.open) {
                            this.open = false;
                            this.isOpen.emit(this.open);
                          }
                        }}
                        >
                        <div
                          class="itemPlaceHolder"
                          innerHTML={icons[item.icon]}
                        />
                        <h6>{item.title}</h6>
                      </li>
                    )
                  })
                }
              </ul>
            )
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div class={`sidebar ${this.open ? 'open' : 'close'}`}>
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    );
  }

}
