import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'modal-hiweb',
  styleUrl: 'modal-hiweb.scss',
  shadow: false,
})
export class ModalHiweb {
  @Prop() data: {icon: string, text: string, buttonLeft: {text: string, callback: string},buttonRight: {text: string, callback: string}};
  @Event() onClick: EventEmitter;

  closeModal = () => {
    console.log('close');
    this.onClick.emit('close');
  }

  handleClick = cb => {
    this.onClick.emit(cb);
  }

  render() {
    if (!this.data) {
      return
    }
    return (
      <div class="modal-container">
        <div class="custom-modal">
          <div
            class="cross"
            innerHTML={icons['cross']}
            onClick={this.closeModal}
          />
          <div class="header">
            <div
              class="placeholder"
              innerHTML={icons[this.data.icon]}
            />
          </div>
          <div class="content">
            <p>
              {this.data.text}
            </p>
          </div>
          <div class="button-1 button">
            <button onClick={() => this.handleClick(this.data.buttonLeft.callback)}>
              {this.data.buttonLeft.text}
            </button>
          </div>
          <div class="button-2 button">
            <button onClick={() => this.handleClick(this.data.buttonRight.callback)}>
              {this.data.buttonRight.text}
            </button>
          </div>
        </div>
      </div>
    );
  }

}
