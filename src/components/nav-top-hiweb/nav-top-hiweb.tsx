import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import icons from './../../modules/iconsList';

@Component({
  tag: 'nav-top-hiweb',
  styleUrl: 'nav-top-hiweb.scss',
  shadow: true,
})
export class NavTopHiweb {

  @Prop() items: {icon: string, notification: number, path: string}[] = [
    {
      icon: 'logout',
      notification: 0,
      path: '/logout'
    },
    {
      icon: 'bell',
      notification: 3,
      path: '/'
    }
  ];
  @Prop() user: {fullName: string, info: string, imageUrl} = {
    fullName: 'امیرعلی محمدی',
    info: 'نمی‌دونم',
    imageUrl: 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'
  };
  @Event() onClick: EventEmitter;
  @Event() search: EventEmitter;

  renderIcons = () => this.items.map(item => {
    return (
      <div
        class="icon ripple"
        innerHTML={icons[item.icon]}
        onClick={() => this.onClick.emit(item.path)}
      >
        {
          item.notification
            ? <span>{item.notification}</span>
            : null
        }
      </div>
    );
  });

  render() {
    return (
      <nav>
        <div class="icons">
          {this.renderIcons()}
        </div>
        <div class="line" />
        <div class="user">
          <div class="dropdown ripple" innerHTML={icons['arrowDown']}/>
          <img src={this.user.imageUrl} alt="user profile picture" />
          <div class="info">
            <h6>{this.user.fullName}</h6>
            <p>{this.user.info}</p>
          </div>
        </div>
        <div class="search">
          <div class="search-container">
            <input-hiweb
              placeHolder="جستجو..."
              onChanged={(e) => this.search.emit(e.detail.value)}
            ></input-hiweb>
          </div>
        </div>
      </nav>
    );
  }

}
