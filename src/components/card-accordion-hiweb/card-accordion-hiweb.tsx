import { Component, h, EventEmitter, Prop, State, Event } from '@stencil/core';
import ArrowUp from './../../assets/icons/ArrowUp.svg';

@Component({
  tag: 'card-accordion-hiweb',
  styleUrl: 'card-accordion-hiweb.scss',
  shadow: true,
})
export class CardAccordionHiweb {
  @Prop() label: string;
  @Prop() open: boolean;

  @State() toggle: boolean;

  @Event() onToggle: EventEmitter;
  componentWillLoad() {

    if (this.open) {
      this.toggle = true;

    } else {
      this.toggle = false;
    }

  }
  toggleComponent() {
    this.toggle = !this.toggle;
    this.onToggle.emit({ visible: this.toggle });
  }
  render() {
    return (
      <div class="row direction-rtl mat-card">
        <div class="col">
          <div class={`sidebar-nav-menu-item card ${this.toggle ? 'item-active' : ''}`}>
            <div class="card-header- mat-card" onClick={() => this.toggleComponent()}>
              <h5 class="card-title"> {this.label}</h5>
              <div class="placeholder fa-chevron-down" innerHTML={ArrowUp} />
            </div>
            <div class={'sidebar-nav-menu-item-body'}>
              <div class="row mat-card">
                <div class="card-body mat-card">
                  <p>
                    <slot></slot>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
