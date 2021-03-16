import { Component, h, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'dropdown-hiweb',
  styleUrl: 'dropdown-hiweb.scss',
  shadow: true,
})
export class DropdownHiweb {
  @Prop() icon: string = 'more';
  @Prop() items: {icon: string, text: string}[];

  @State() hasSpaceDown: boolean;
  @State() isOpen: boolean = false;
  private isLoaded: boolean = false;

  @Listen('scroll', {target: 'window'})
    onScroll() {
     this.checkSpace();
    }
  @Listen('resize', {target: 'window'})
    onResize() {
      this.checkSpace();
    }
  @Listen('click', {target: 'body'})
    onClick(e) {
      if (this.isOpen && e.target.items !== this.items) {
        return this.isOpen = false;
      }
    }

  @Event() clicked: EventEmitter<string>;

  private dropDownRef: HTMLElement;

  componentDidRender() {
    this.isLoaded = true;
  }

  checkSpace = () => {

    if (this.isLoaded && this.isOpen) {
      const position = this.dropDownRef.getBoundingClientRect();
      const screanHeight = window.innerHeight;

      if (this.items.length * 40 > screanHeight - position['bottom'] - 30) {

        return this.hasSpaceDown = false;

      }
      this.hasSpaceDown = true;
    }

  }

  handleIconClick = () => {
    this.isOpen = !this.isOpen;
    this.checkSpace();
  }

  handleItemClick = text => {
    this.isOpen = false;
    this.clicked.emit(text);
  }

  renderDropdown = () => {
    if (this.isOpen) {
      return (
        <div class={'dropdown-custom ' + (this.hasSpaceDown ? 'down' : 'up')}>
          {
            this.items.map(({icon,text}) => {
              return (
                <div
                  class="item"
                  onClick={() => this.handleItemClick(text)}
                >
                  <div class="icon" innerHTML={icons[icon]} />
                  <h6>{text}</h6>
                </div>
              )
            })
          }
        </div>
      )
    }
    return null;
  }

  render() {
    return (
      <div class="dropdown-div" ref = {(el : HTMLElement) =>  this.dropDownRef = el}>
        <div
          class={'placeholder ' + (this.isOpen ? 'active' : '')}
          innerHTML={icons[this.icon]}
          onClick={this.handleIconClick}
        />
        {this.renderDropdown()}
      </div>
    );
  }

}
