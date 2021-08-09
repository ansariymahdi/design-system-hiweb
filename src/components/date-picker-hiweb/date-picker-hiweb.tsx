import { Component, h, State, Listen, Prop, Event, EventEmitter } from '@stencil/core';
import { JalaliDateTime } from 'jalali-date-time';

import icons from '../../modules/iconsList';
import getRandomdInteger from '../../modules/getRandomInteger';
import range from '../../modules/range';
import formatNumbersToPersian, {persianMonths} from '../../modules/formatNumberToPersian';

const config = {
  timezone: 'Asia/Tehran',
  locale: 'en',
  fullTextFormat: 'W, D N Y H:I:S',
  titleFormat: 'W, D N Y',
  dateFormat: 'Y-M-D',
  timeFormat: 'H:I:S',
};

@Component({
  tag: 'date-picker-hiweb',
  styleUrl: 'date-picker-hiweb.scss',
  shadow: true,
})
export class DatePickerHiweb {
  @Prop() label: string = 'تاریخ';
  @Prop() value: string;
  @Prop() color: string = '#DDDFE0';

  @State() randomNumber: number = getRandomdInteger(1000,9999);
  @State() inputValue: string;
  @State() openCalendar: boolean;
  @State() year: number | string;
  @State() month: number | string;
  @State() dayOfTheMonth: number | string;
  @State() years: number[];
  // @State() calendarLocationBottom: boolean = true;
  // @State() calendarLocationRight: boolean = true;
  // @State() calendarLocation: {bottom: boolean, right: boolean} = {bottom: true, right: true};

  @Event() jalaiDate: EventEmitter<string>;
  @Event() gregorianDate: EventEmitter<string>;

  // private calendarRef: HTMLElement;
  // private containerRef: HTMLElement;
  // private checkSpaceTimeout: ReturnType<typeof setTimeout>;

  private jalali;

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
    this.jalali = JalaliDateTime(config);

    let today;
    if (this.value) {
      const year = +this.value.slice(0,4);
      const month = +this.value.slice(5,7);
      const day = +this.value.slice(8,10);
      today = this.jalali.toDate(new Date(year, month - 1, day), {
        timezone: 'Asia/Tehran',
        locale: 'en',
        format: 'Y-M-D',
      })
    } else {
      today = this.jalali.now({
        timezone: 'Asia/Tehran',
        locale: 'en',
        format: 'Y-M-D',
      });
    }
    this.year = today.slice(0,4);
    this.month = today.slice(5,7);
    this.dayOfTheMonth = today.slice(8,10);
    this.years = range(+this.year - 30, +this.year + 10, 1);
  }

  componentWillRender() {
  
    const jalaliDate = `${this.year}/${this.month}/${this.dayOfTheMonth}`;
    const gregorianDate = this.jalali.gregorian(`${this.year}-${this.month}-${this.dayOfTheMonth}`);

    this.inputValue = formatNumbersToPersian(jalaliDate);
    this.jalaiDate.emit(jalaliDate);
    this.gregorianDate.emit(`${gregorianDate.year}-${this.formatNumbers(+gregorianDate.month)}-${this.formatNumbers(+gregorianDate.day)}`);
  }

  formatNumbers(num: number) {
    return ("0" + num).slice(-2);
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
    if (+this.month === 12 && num === 1) {
      this.month = '01';
      this.year = `${+this.year + 1}`;
      return;
    }
    if (+this.month === 1 && num === -1) {
      this.month = '12';
      this.year = `${+this.year - 1}`;
      return;
    }
    this.month = this.formatNumbers(+this.month + num);
  }

  renderYearSelector() {
    return (
      <select
        id="year"
        onInput={(event) => this.year =event.target['value']}
      >
        {
          this.years.map(year => {
            return (
              <option
                selected={year === +this.year ? true : false}
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
        onInput={(event) => this.month = this.formatNumbers(event.target['value'])}
      >
        {
          persianMonths.map((month, index) => {
            const i = index + 1;   
            return (
              <option
                selected={i === +this.month ? true : false}
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
          this.jalali.calendar(this.year + '-' + this.month).weeks.map(week => {
            return week.map(({date,day}) => {
              return (
                <div
                 class={`day ${+date.slice(5,7) === +this.month ? 'active' : ''} ${day === +this.dayOfTheMonth ? 'current' : ''}`}
                  onClick={() => this.dayOfTheMonth = this.formatNumbers(day)}
                >
                  <div>
                    {formatNumbersToPersian(`${day}`)}
                  </div>  
                </div>
              )
            })
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
        <input
         type="text" 
         value={this.inputValue} 
         style={{ borderColor: this.color }}
         readOnly 
        />
        <div
          class="placeholder"
          innerHTML={icons['calendar']}
          style={{ background: this.color }}
          onClick={() => this.openCalendar = !this.openCalendar}
        />
        {this.renderCalendar()}
      </div>
    );
  }

}
