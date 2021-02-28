import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'card-news-hiweb',
  styleUrl: 'card-news-hiweb.scss',
  shadow: true,
})
export class CardNewsHiweb {
  @Prop() backgroundUrl: string = 'blue';
  @Prop() titleNews: string = '';
  @Prop() descriptionNews: string = '';
  @Prop() btnText: string = '';
  @Event() clicked: EventEmitter;

  menuToggle(event: any) {
    console.log('Background toggled menu', event);
    this.clicked.emit(event.target.value);
  }
  // onClickHandler(e) {
  //   // Do something
  //   console.log('sdklg');
  //   this.clicked.emit();
  //   console.log(this.clicked);
  // }
  render() {
    return (
      <div class="example-2 card-news" style={{ 'background-image': 'url(' + this.backgroundUrl + ')' }}>
        <div class="wrapper">
          <div class="header">
            <div class="date">
              <span class="year">خبر ورزشی</span>
            </div>
          </div>
          <div class="data text-right direction-rtl ">
            <div class="content">
              <span class="author"></span>
              <h1 class="title">
                <a href="#">{this.titleNews}</a>
              </h1>
              <p class="text">{this.descriptionNews}</p>
              <a class="button" onClick={event => this.menuToggle(event)}>
                {this.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
