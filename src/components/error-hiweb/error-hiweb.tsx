import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'error-hiweb',
  styleUrl: 'error-hiweb.scss',
  shadow: true,
})
export class ErrorHiweb {
  @Prop() error: { statusCode: number, message: string, buttonMessage: string, path: string};
  @Event() onClick: EventEmitter;

  handleClick = () => {
    this.onClick.emit(this.error.path);
  }

  render() {
    if (this.error) {
      return (
        <div class="container">
          <div class="error-container secondary">
            <h1>{this.error.statusCode}</h1>
            <h3>
              {this.error.message}
            </h3>
            <button class="button" onClick={this.handleClick}>
              {this.error.buttonMessage}
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

}
