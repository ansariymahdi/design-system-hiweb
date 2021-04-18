import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

import icons from '../../modules/iconsList';

@Component({
  tag: 'survey-hiweb',
  styleUrl: 'survey-hiweb.scss',
  shadow: true,
})
export class SurveyHiweb {
  @Prop() title: string = '۱۳۹۹/۱۰/۱ - استادیوم آزادی';
  @Prop() subtitle: string = 'لیگ برتر خلیج فارس';
  @Prop() options: string[] = ['پرسپولیس تهران', 'پرسپولیس تهران'];
  @State() selected: number;
  @Event() optionSelected: EventEmitter;

  handleOptionClick(index: number) {
    this.selected = index;
    this.optionSelected.emit(this.options[index]);
  }

  render() {
    return (
      <div class="survey-hiweb">
        <div class="title">
            <h1>
              {this.title}
            </h1>
        </div>
        <div class="subtitle">
          <h1>
            {this.subtitle}
          </h1>
        </div>
        <div class="options">
          {
            this.options.map((option, index) => {
              return (
                <div class="option">
                  <h1 onClick={() => this.handleOptionClick(index)}>
                    {option}
                  </h1>
                  {
                    this.selected === index
                      ? <div class="placeholder" innerHTML={icons['checkmark']} />
                      : null
                  }
                </div>
              )
            })
          }
        </div>
        {/* <div class="button">
          <button>
            ثبت نظرسنجی
          </button>
        </div> */}
      </div>
    );
  }

}
