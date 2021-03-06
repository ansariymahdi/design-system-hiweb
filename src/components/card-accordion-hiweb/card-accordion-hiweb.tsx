import { Component, h, EventEmitter, Prop, State, Event } from '@stencil/core';
import ArrowUp from './../../assets/icons/ArrowUp.svg';

@Component({
  tag: 'card-accordion-hiweb',
  styleUrl: 'card-accordion-hiweb.scss',
  shadow: true,
})
export class CardAccordionHiweb {
  @Prop() label: string;

  @State() toggle: boolean = false;

  @Event() onToggle: EventEmitter;
  toggleComponent() {
    this.toggle = !this.toggle;
    this.onToggle.emit({ visible: this.toggle });
  }
  render() {
    return (
      <div class="row direction-rtl">
        <div class="col">
          <div class={`sidebar-nav-menu-item card ${this.toggle ? 'item-active' : ''}`}>
            <div class="card-header-" onClick={() => this.toggleComponent()}>
              <h5 class="card-title"> {this.label}</h5>
              <div class="placeholder fa-chevron-down" innerHTML={ArrowUp} />
            </div>
            <div class={'sidebar-nav-menu-item-body'}>
              <div class="row">
                <div class="card-body">
                  <p>
                    <slot></slot>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div class="row direction-rtl">
      //   <div class="col">
      //     <div class={`sidebar-nav-menu-item card ${this.toggle ? 'item-active' : ''}`}>
      //       <div class="card-header">
      //         <h5 class="card-title" onClick={() => this.toggleComponent()}>
      //           {' '}
      //           {this.label}
      //         </h5>
      //         {/* <div class="placeholder fa-chevron-down" innerHTML={ArrowUp} /> */}
      //         {/* <!-- <ArrowUp width={20} height={20} class="fa-chevron-down" /> --> */}
      //       </div>
      //       <div>
      //         <div class="row">
      //           <div class="card-body">
      //             <div class="table-responsive">

      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
