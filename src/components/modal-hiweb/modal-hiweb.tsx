import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'modal-hiweb',
  styleUrl: 'modal-hiweb.scss',
  shadow: false,
})
export class ModalHiweb {
  @Prop() data: {icon: string, text: string, buttonLeft: {text: string, callback: string},buttonRight: {text: string, callback: string}} = {
    icon: "trash",
    text: "مطمئن هستید می‌خواهید این خبر را پاک کنید؟",
    buttonLeft: {
      text: "بله",
      callback: "yes"
    },
    buttonRight: {
      text: "خیر",
      callback: "no"
    }
  };
  @Event() onClick: EventEmitter;

  closeModal = () => {
    console.log('close');
    this.onClick.emit('close');
  }

  handleClick = cb => {
    console.log(cb);
    this.onClick.emit(cb);
  }

  render() {
    if (!this.data) {
      return
    }
    return (
      <div
        class="modal-container"
        onClick={this.closeModal}
      >
        <div
          class="custom-modal"
          onClick={(e) => e.stopPropagation()}
        >
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
              <h1>
                {this.data.buttonLeft.text}
              </h1>
            </button>
          </div>
          <div class="button-2 button">
            <button onClick={() => this.handleClick(this.data.buttonRight.callback)}>
              <h1>
                {this.data.buttonRight.text}
              </h1>
            </button>
          </div>
        </div>
      </div>
    );
  }

}
