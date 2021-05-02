import { Component, h, State, Listen, Prop, Event, EventEmitter } from '@stencil/core';
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
  @Prop() value: string;

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
  // @State() calendarLocationBottom: boolean = true;
  // @State() calendarLocationRight: boolean = true;
  // @State() calendarLocation: {bottom: boolean, right: boolean} = {bottom: true, right: true};

  @Event() jalaiDate: EventEmitter<string>;
  @Event() gregorianDate: EventEmitter<string>;

  // private calendarRef: HTMLElement;
  // private containerRef: HTMLElement;
  // private checkSpaceTimeout: ReturnType<typeof setTimeout>;

  @Listen('click', {target: 'body'})
    onClick(e) {
      const checkPath = () => e.path.some(({id}) => id === `calendar-${this.randomNumber}`);
      if (this.openCalendar && !checkPath()) return this.openCalendar = false;
    }
  // @Listen('scroll', {target: 'window'})
  //   onScroll() {
  //     clearTimeout(this.checkSpaceTimeout);
  //     this.checkSpaceTimeout = setTimeout(() => {
  //       this.checkSpace();
  //     }, 100);
  //   }
  // @Listen('resize', {target: 'window'})
  //   onResize() {
  //     clearTimeout(this.checkSpaceTimeout);
  //     this.checkSpaceTimeout = setTimeout(() => {
  //       this.checkSpace();
  //     }, 1000);
  //   }

  componentWillLoad() {
    let jdate;
    if (this.value) {
      const year = +this.value.slice(0,4);
      const month = +this.value.slice(5,7);
      const day = +this.value.slice(8,10);
      jdate = new JDate(new Date(year, month, day));
    } else {
      jdate = new JDate;
    }
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
    const jalaliDate = `${this.year}/${formatNumbers(this.month)}/${formatNumbers(this.dayOfTheMonth)}`;
    const gregorianDate = JDate.toGregorian(this.year, this.month, this.dayOfTheMonth);
    const gregorianYear = gregorianDate.toLocaleDateString('en-US', { year: 'numeric'});
    const gregorianMonth = gregorianDate.toLocaleDateString('en-US', { month: '2-digit'});
    const gregorianDay = gregorianDate.toLocaleDateString('en-US', { day: '2-digit'});

    this.inputValue = formatNumbersToPersian(jalaliDate);
    this.jalaiDate.emit(jalaliDate);
    this.gregorianDate.emit(`${gregorianYear}-${gregorianMonth}-${gregorianDay}`);
  }

  // componentDidRender() {
  //   this.checkSpace();
  // }

  // checkSpace() {
  //   if (this.openCalendar) {
  //     const position = this.containerRef.getBoundingClientRect().top;
  //     const containerHeight = this.containerRef.getBoundingClientRect().height;
  //     const calendarHeight = this.calendarRef.getBoundingClientRect().height;
  //     const screanHeight = window.innerHeight;
  //     let bottom: boolean;
  //     // let right: boolean;
  //     if (screanHeight - (position + containerHeight) > calendarHeight) {
  //       bottom = true;
  //     } else {
  //       bottom = false
  //     }

  //     this.calendarLocationBottom = bottom;
  //   }
  // }

  // selectClassess() {
  //   let classes: string;

  //   if (this.calendarLocationBottom) {
  //     classes = this.label ? 'c-bottom-with-label' : 'c-bottom';
  //   } else {
  //     classes = 'c-top';
  //   }

  //   if (this.calendarLocationRight) {
  //     classes = classes + ' c-right';
  //   } else {
  //     classes = classes + ' c-left';
  //   }

  //   return classes;
  // }

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
      <div 
        class='calendar'
        // ref={(el : HTMLElement) =>  this.calendarRef = el}
      >
        <div
         class="close-button" 
         innerHTML={icons['cross']} 
         onClick={() => this.openCalendar = false} 
        />
        <div class="header">
          <div
           class="icon left" 
           innerHTML={icons['arrowLeft']} 
           onClick={() => this.handleArrowClick(1)}
          />
          <div class="middle">
            {/* <div class="spacer-lg" /> */}
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
      <div
       class="input-container" 
       id={`calendar-${this.randomNumber}`}
      //  ref={(el : HTMLElement) =>  this.containerRef = el}
      >
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
