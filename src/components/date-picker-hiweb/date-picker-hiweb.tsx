import { Component, h, State, Listen, Prop } from '@stencil/core';
import JDate from 'jalali-date';

import icons from '../../modules/iconsList';
import getRandomdInteger from '../../modules/getRandomInteger';
import range from '../../modules/range';
import formatNumbersToPersian, {persianMonths} from '../../modules/formatNumberToPersian';

@Component({
  tag: 'date-picker-hiweb',
  styleUrl: 'date-picker-hiweb.scss',
  shadow: true,
})
export class DatePickerHiweb {
  @Prop() label: string = 'تاریخ';

  @State() randomNumber: number = getRandomdInteger(1000,9999);
  @State() inputValue: string;
  @State() openCalendar: boolean;
  @State() year: number;
  @State() month: number;
  @State() dayOfTheMonth: number;
  @State() dayOfTheWeek: number;
  @State() daysBefore: number[];
  @State() daysAfter: number[];
  @State() daysOfMonth: number[];
  @State() years: number[];

  @Listen('click', {target: 'body'})
    onClick(e) {
      const checkPath = () => e.path.some(({id}) => id === `calendar-${this.randomNumber}`);
      if (this.openCalendar && !checkPath()) return this.openCalendar = false;
    }

  componentWillLoad() {
    const jdate = new JDate;
    this.year = jdate.getFullYear();
    this.month = jdate.getMonth();
    this.dayOfTheMonth = jdate.getDate();
    this.dayOfTheWeek = jdate.getDay() + 2;
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
    this.inputValue = formatNumbersToPersian(`${this.year}/${formatNumbers(this.month)}/${formatNumbers(this.dayOfTheMonth)}`);

    console.log(this.openCalendar);
    
  }

  handleArrowClick(num: number) {
    if (this.month === 12 && num === 1) {
      this.month = 1;
      this.year = this.year + 1;
      return;
    }
    if (this.month === 1 && num === -1) {
      this.month = 12;
      this.year = this.year - 1;
      return;
    }
    this.month = this.month + num;
  }

  renderYearSelector() {
    return (
      <select
        id="year"
        onInput={(event) => this.year = +event.target['value']}
      >
        {
          this.years.map(year => {
            return (
              <option
                selected={year === this.year ? true : false}
                value={year}
              >
                {formatNumbersToPersian(`${year}`)}
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
        onInput={(event) => this.month = +event.target['value']}
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
      <div class="days-container">
          {
            this.daysBefore.map(day => {
              return (
                <div class="day">
                  {formatNumbersToPersian(`${day}`)}
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
                  <div>
                  {formatNumbersToPersian(`${day}`)}
                  </div>  
                </div>
              )
            })
          }
          {
            this.daysAfter.map(day => {
              return (
                <div class="day">
                  {formatNumbersToPersian(`${day}`)}
                </div>
              )
            })
          }
        </div>
    )
  }

  renderCalendar() {
    if (!this.openCalendar) {
      return null;
    }
    return (
      <div class={`calendar ${this.label ? 'with-label' : ''}`}>
        <div class="header">
          <div
           class="icon left" 
           innerHTML={icons['arrowLeft']} 
           onClick={() => this.handleArrowClick(1)}
          />
          <div class="middle">
            <div class="spacer-lg" />
            {this.renderYearSelector()}
            <div class="spacer" />
            {this.renderMonthSelector()}
          </div>
          <div
           class="icon right" 
           innerHTML={icons['arrowRight']} 
           onClick={() => this.handleArrowClick(-1)}
          />
        </div>
        <div class="body">
          <div class="daysOfWeek">
            <div>شنبه</div>
            <div>یکشنبه</div>
            <div>دوشنبه</div>
            <div>سه‌شنبه</div>
            <div>چهارشنبه</div>
            <div>پنجشنبه</div>
            <div>جمعه</div>
          </div>
        </div>
        {this.renderDaySelector()}
      </div>
    );
  }

  render() {
    return (
      <div class="input-container" id={`calendar-${this.randomNumber}`}>
        <label>{this.label}</label>
        <input type="text" value={this.inputValue} readOnly />
        <div
          class="placeholder"
          innerHTML={icons['calendar']}
          onClick={() => this.openCalendar = !this.openCalendar}
        />
        {this.renderCalendar()}
      </div>
    );
  }

}