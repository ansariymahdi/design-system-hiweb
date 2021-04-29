import { Component, h, State, Listen, Prop } from '@stencil/core';
import JDate from 'jalali-date';

import getRandomdInteger from '../../modules/getRandomInteger';
import range from '../../modules/range';
import formatNumbersToPersian from '../../modules/formatNumberToPersian';
import icons from '../../modules/iconsList';

@Component({
  tag: 'time-picker-hiweb',
  styleUrl: 'time-picker-hiweb.scss',
  shadow: true,
})
export class TimePickerHiweb {
  @Prop() label: string = 'زمان';

  @State() randomNumber: number = getRandomdInteger(1000,9999);
  @State() inputValue: string;
  @State() openSelector: boolean = false;
  @State() hour: number;
  @State() minute: number;
  @State() am: boolean;

  @Listen('click', {target: 'body'})
    onClick(e) {
      const checkPath = () => e.path.some(({id}) =>  id === `calendar-${this.randomNumber}`);
      if (this.openSelector && !checkPath()) return this.openSelector = false;
    }

  componentWillLoad() {
    const jdate = new JDate;
    this.hour = jdate._d.getHours();
    this.minute = jdate._d.getMinutes();
    if (this.hour >= 12) {
      this.hour = this.hour - 12;
      this.am = false;
    } else {
      this.am = true;
    }
  }

  componentWillRender() {
    const formatNumbers = (num: number) => ("0" + num).slice(-2);
    this.inputValue = formatNumbersToPersian(`${this.am ? 'ق ظ' : 'ب ظ'} ${formatNumbers(this.hour)}:${formatNumbers(this.minute)}`);
  }

  handleHourChange(num: number) {
    if (this.hour === 0 && num === -1) return this.hour = 11;
    if (this.hour === 11 && num === 1) return this.hour = 0;
    this.hour = this.hour + num;
  }

  handleMinuteChange(num: number) {
    if (this.minute === 0 && num === -1) return this.minute = 59;
    if (this.minute === 59 && num === 1) return this.minute = 0;
    this.minute = this.minute + num;
  }

  renderHourInput() {
    return (
      <div class="selector-container">
        <div class="icon up" innerHTML={icons['arrowUp']} onClick={() => this.handleHourChange(1)} />
        <input type="text" value={this.hour} readOnly />
        <div class="icon down" innerHTML={icons['arrowDown']} onClick={() => this.handleHourChange(-1)} />
      </div>
    );
  }

  renderMinuteInput() {
    return (
      <div class="selector-container">
        <div class="icon up" innerHTML={icons['arrowUp']} onClick={() => this.handleMinuteChange(1)} />
        <input type="text" value={this.minute} readOnly />
        <div class="icon down" innerHTML={icons['arrowDown']} onClick={() => this.handleMinuteChange(-1)} />
      </div>
    );
  }

  renderAmInput() {
    return (
      <div class="selector-container">
        <div class="icon up" innerHTML={icons['arrowUp']} onClick={() => this.am = !this.am} />
        <input type="text" value={this.am ? 'ق ظ' : 'ب ظ'} readOnly />
        <div class="icon down" innerHTML={icons['arrowDown']} onClick={() => this.am = !this.am} />
      </div>
    );
  }

  renderTimeSelector() {
    if (!this.openSelector) {
      return null;
    }
    return (
      <div
        class={`time`}
      >
        {this.renderHourInput()}
        {this.renderMinuteInput()}
        {this.renderAmInput()}
      </div>
    )
  }

  render() {
    return (
      <div
        class="input-container"
        id={`calendar-${this.randomNumber}`}
      >
        <label>{this.label}</label>
        <input type="text" value={this.inputValue} readOnly />
        <div
         class="placeholder"
         innerHTML={icons['clock']}
         onClick={() => this.openSelector = !this.openSelector}
        />
        {this.renderTimeSelector()}
      </div>
    );
  }

}
