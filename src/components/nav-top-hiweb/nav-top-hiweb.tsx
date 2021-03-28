import { Component, h } from '@stencil/core';

import icons from './../../modules/iconsList';

@Component({
  tag: 'nav-top-hiweb',
  styleUrl: 'nav-top-hiweb.scss',
  shadow: true,
})
export class NavTopHiweb {



  imageUrl = "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg"

  render() {
    return (
      <nav>
        <div class="icons">
          <div class="icon ripple" innerHTML={icons['logout']}/>
          <div class="icon ripple" innerHTML={icons['bell']}>
            <span>4</span>
          </div>
        </div>
        <div class="line" />
        <div class="user">
          <div class="dropdown ripple" innerHTML={icons['arrowDown']}/>
          <img src={this.imageUrl} alt="user profile picture" />
          <div class="info">
            <h6>امیرعلی محمدی</h6>
            <p>نمی‌دونم</p>
          </div>
        </div>
        <div class="search">
          <input-hiweb
            placeHolder="جستجو..."
          ></input-hiweb>
        </div>
      </nav>
    );
  }

}
