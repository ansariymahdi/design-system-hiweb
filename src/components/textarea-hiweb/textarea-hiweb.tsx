import { Component, h } from '@stencil/core';

@Component({
  tag: 'textarea-hiweb',
  styleUrl: 'textarea-hiweb.scss',
  shadow: true,
})
export class TextareaHiweb {

  render() {
    return (
      <div>
        <div>
          <label></label>
          <textarea></textarea>
          <div class="img">
          </div>
        </div>
        <span></span>
      </div>
    );
  }

}
