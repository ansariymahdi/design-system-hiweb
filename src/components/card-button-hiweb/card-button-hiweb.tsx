import { Component, h } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'card-button-hiweb',
  styleUrl: 'card-button-hiweb.scss',
  shadow: true,
})
export class CardButtonHiweb {

  render() {
    return (
      <div class="card-container">
        <div class="placeholder" innerHTML={icons['whatsapp']} />
        <h1>
          تیتر
        </h1>
        <p>
          نوشته نوشته
        </p>
      </div>
    );
  }

}
