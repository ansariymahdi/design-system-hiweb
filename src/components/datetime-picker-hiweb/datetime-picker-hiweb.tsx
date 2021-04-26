import { Component, h, State, Listen } from '@stencil/core';
import JDate from 'jalali-date';
import Fragment from 'stencil-fragment';

import icons from '../../modules/iconsList';
import formatNumbersToPersian, {persianMonths} from '../../modules/formatNumberToPersian';
import getRandomdInteger from '../../modules/getRandomInteger';
import range from '../../modules/range';

@Component({
  tag: 'datetime-picker-hiweb',
  styleUrl: 'datetime-picker-hiweb.scss',
  shadow: true,
})
export class DatetimePickerHiweb {
  @State() randomNumber: number = getRandomdInteger(1000,9999);
  @State() inputValue: string;
  @State() openCalendar: boolean = false;
  @State() year: number;
  @State() month: number;
  @State() dayOfTheMonth: number;
  @State() dayOfTheWeek: number;
  @State() hour: number;
  @State() minute: number;
  @State() daysBefore: number[];
  @State() daysAfter: number[];
  @State() daysOfMonth: number[];
  @State() years: number[];

  private hoursArray: number[] = range(0, 24, 1);
  private minutesArray: number[] = range(0, 59, 1);

  @Listen('click', {target: 'body'})
    onClick(e) {
      const checkPath = () => e.path.some(({id}) =>  id === `calendar-${this.randomNumber}`);
      if (this.openCalendar && !checkPath()) return this.openCalendar = false
    }

  componentWillLoad() {
    const jdate = new JDate;
    this.year = jdate.getFullYear();
    this.month = jdate.getMonth();
    this.dayOfTheMonth = jdate.getDate();
    this.dayOfTheWeek = jdate.getDay() + 2;
    this.hour = jdate._d.getHours();
    this.minute = jdate._d.getMinutes();
    this.years = range(this.year - 30, this.year + 10, 1);
  }

  componentWillRender() {
    const jdateFirstDayOfMonth = new JDate(this.year, this.month, 1);
    const firstDayOfMonth = jdateFirstDayOfMonth.getDay() + 2;
    const daysInMonth = JDate.daysInMonth(this.year, this.month);
    const daysBeforeCheck = firstDayOfMonth - 1;
    const numberOfDaysBefore = daysBeforeCheck === 7 ? 0 : daysBeforeCheck;
    const numberOfDaysAfterCheck = 35 - (daysInMonth + numberOfDaysBefore);
    const numberOfDaysAfter = numberOfDaysAfterCheck < 0 ? numberOfDaysAfterCheck + 7 : numberOfDaysAfterCheck;
    const lastMonthNumberOfDays = this.month === 1 ? JDate.daysInMonth(this.year - 1, 12) : JDate.daysInMonth(this.year, this.month -1);

    this.daysBefore = range(lastMonthNumberOfDays - numberOfDaysBefore + 1, lastMonthNumberOfDays, 1);
    this.daysAfter = range(1, numberOfDaysAfter, 1);
    this.daysOfMonth = range(1, daysInMonth, 1);
  

    const formatNumbers = (num: number) => ("0" + num).slice(-2);
    this.inputValue = formatNumbersToPersian(`${this.year}/${formatNumbers(this.month)}/${formatNumbers(this.dayOfTheMonth)} - ${formatNumbers(this.hour)}:${formatNumbers(this.minute)}`);
  }

  renderYearSelector() {
    return (
      <select
        onInput={(event) => this.year = event.target['value']}
      >
        {
          this.years.map(year => {
            return (
              <option
                selected={year === this.year ? true : false}
                value={year}
              >
                {year}
              </option>
            )
          })
        }
      </select>
    );
  }

  renderMonthSelector() {
    return (
      <select
        onInput={(event) => this.month = event.target['value']}
      >
        {
          persianMonths.map((month, index) => {
            const i = index + 1;   
            return (
              <option
                selected={i === this.month ? true : false}
                value={i}
              >
                {month}
              </option>
            )
          })
        }
      </select>
    );
  }

  renderDaySelector() {
    return (
      <Fragment>
        <div class="daysOfWeek">
          <div>ش</div>
          <div>ی</div>
          <div>د</div>
          <div>س</div>
          <div>چ</div>
          <div>پ</div>
          <div>ج</div>
        </div>
        <div class="days-container">
          {
            this.daysBefore.map(day => {
              return (
                <div class="day">
                  {day}
                </div>
              )
            })
          }
          {
            this.daysOfMonth.map(day => {
              return (
                <div
                 class={`day active ${day === this.dayOfTheMonth ? 'current' : ''}`}
                 onClick={() => this.dayOfTheMonth = day}
                >
                  {day}
                </div>
              )
            })
          }
          {
            this.daysAfter.map(day => {
              return (
                <div class="day">
                  {day}
                </div>
              )
            })
          }
        </div>
      </Fragment>
    )
  }

  renderHourSelector() {
    return (
      <select
        onInput={(event) => this.hour = event.target['value']}
      >
        {
          this.hoursArray.map(hour => {  
            return (
              <option
                selected={hour === this.hour ? true : false}
                value={hour}
              >
                {hour}
              </option>
            )
          })
        }
      </select>
    );
  }

  renderMinuteSelector() {
    return (
      <select
        onInput={(event) => this.minute = event.target['value']}
      >
        {
          this.minutesArray.map(minute => {  
            return (
              <option
                selected={minute === this.minute ? true : false}
                value={minute}
              >
                {minute}
              </option>
            )
          })
        }
      </select>
    );
  }

  renderDateSelector() {
    if (!this.openCalendar) {
      return null;
    }
    return (
      <div class="calendar">
        <div class="header">
          {this.renderYearSelector()}
          {this.renderMonthSelector()}
        </div>
        <div class="body">
          {this.renderDaySelector()}
        </div>
        <div class="footer">
          {this.renderHourSelector()}
          {this.renderMinuteSelector()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="input-container" id={`calendar-${this.randomNumber}`}>
        <input type="text" value={this.inputValue} readOnly />
        <div
          class="placeholder" 
          innerHTML={icons['calendar']}
          onClick={() => this.openCalendar = !this.openCalendar}
        />
        {this.renderDateSelector()}
      </div>
    );
  }

}
